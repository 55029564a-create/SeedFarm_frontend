import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';
import client from '../../api/client';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext();
  const [selectedBatch, setSelectedBatch] = useState('');
  const [timeRange, setTimeRange] = useState('day');
  const [batchList, setBatchList] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);

  // 1. 작기 목록 불러오기
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await client.get('/analysis/growth-batch');

        const formattedList = res.data.map((b, idx) => ({
          id: b.id,
          name: `${b.description} (${b.crop_type})`,
          status: idx === 0 ? '진행중' : '종료됨',
        }));

        setBatchList(formattedList);

        if (formattedList.length > 0) {
          setSelectedBatch(formattedList[0].id);
        }
      } catch (error) {
        console.error('작기 목록 로드 실패:', error);
      }
    };

    fetchBatches();
  }, []);

  // 2. 대시보드 데이터 불러오기
  useEffect(() => {
    if (!selectedBatch) return;

    const fetchStats = async () => {
      try {
        const res = await client.get(
          `/analysis/stats/${selectedBatch}?range_type=${timeRange}`,
        );

        // 👉 프론트 그래프에 맞게 변환
        const formatted = res.data.map((d) => ({
          label: d.label || d.created_at || d.date,
          temp: d.temperature ?? null,
          extTemp: d.external_temperature ?? null,
          height: d.plant_height ?? null,
          stdHeight: d.standard_height ?? null,
        }));

        setStatsData(formatted);
      } catch (error) {
        console.error('❌ 에러', error);
      }
    };

    fetchStats();
  }, [selectedBatch, timeRange]);
  useEffect(() => {
    if (!selectedBatch) return;

    const fetchDashboard = async () => {
      try {
        const res = await client.get(`/analysis/dashboard/${selectedBatch}`);
        console.log('🔥 데이터페이지 API 응답:', res.data);
        setRawData(res.data);
      } catch (error) {
        console.error('❌ dashboard 에러', error);
      }
    };

    fetchDashboard();
  }, [selectedBatch]);

  // timeRange 변경 시 offset 초기화
  const handleSetTimeRange = (r) => {
    setTimeRange(r);
  };

  // 동별 가중치 (기존 유지)
  const branchModifiers = {
    'A동 (표준 생육실)': { height: 1.0, temp: 0, leaf: 1.0 },
    'B동 (성장 지연실)': { height: 0.8, temp: -2.5, leaf: 0.85 },
    'C동 (성장 촉진실)': { height: 1.15, temp: +1.5, leaf: 1.1 },
  };

  const currentData = useMemo(() => {
    if (!rawData) return null;
    const modifier = branchModifiers[selectedBranch] || {
      height: 1.0,
      temp: 0,
      leaf: 1.0,
    };
    const safeData = {
      avgTemp: rawData.sensors?.temperature?.value || 0,
      avgHumid: rawData.sensors?.humidity?.value || 0,
      currentHeight: rawData.crop_status?.plant_height || 0,
      targetHeight: 90.0,
      charts: rawData.charts || { day: [], week: [], month: [] },
      issues: rawData.issues || rawData.ai_reports || [],
      growthDelta: rawData.growthDelta || { day: 0, week: 0, month: 0 },
    };

    // growthDelta를 % 증가율로 변환 (평균 키 대비) — 실제 API 데이터만 사용
    const currentHeight = Number(safeData.currentHeight) || 1;

    safeData.growthPct = {
      day:
        rawData.growthDelta?.day != null
          ? +((rawData.growthDelta.day / currentHeight) * 100).toFixed(1)
          : null,
      week:
        rawData.growthDelta?.week != null
          ? +((rawData.growthDelta.week / currentHeight) * 100).toFixed(1)
          : null,
      month:
        rawData.growthDelta?.month != null
          ? +((rawData.growthDelta.month / currentHeight) * 100).toFixed(1)
          : null,
    };

    safeData.currentHeight = Number(safeData.currentHeight).toFixed(1);
    safeData.avgTemp = (parseFloat(safeData.avgTemp) + modifier.temp).toFixed(
      1,
    );

    return safeData;
  }, [rawData, selectedBranch]);
  console.log('데이터페이지 height:', currentData?.currentHeight);
  console.log('데이터페이지 growthDelta:', rawData?.growthDelta);
  const activeChartData = statsData || [];

  const xLabels = useMemo(() => {
    return activeChartData.map((d, i) => d.label || `${i + 1}`);
  }, [activeChartData]);

  const visibleXLabels = useMemo(() => {
    if (timeRange === 'month') {
      return xLabels.map((label, i) => {
        if (i === 0) return null;
        return i % 7 === 0 ? label : null;
      });
    }

    if (timeRange === 'all') {
      return xLabels.map((label, i) => {
        if (i === 0) return null;

        const currentMonth = label?.slice(0, 7);
        const prevMonth = xLabels[i - 1]?.slice(0, 7);

        return currentMonth !== prevMonth ? label : null;
      });
    }

    return xLabels;
  }, [xLabels, timeRange]);

  const heightDiff = currentData
    ? (currentData.currentHeight - currentData.targetHeight).toFixed(1)
    : 0;
  const isNormal = heightDiff >= -1.0;

  // 🚨 현재 선택된 작기의 상태를 실시간으로 확인
  const currentBatchStatus = useMemo(() => {
    return batchList.find((b) => b.id === selectedBatch)?.status || '종료됨';
  }, [batchList, selectedBatch]);

  // 🚨 작기 시작 로직 (UI 상태 업데이트 포함)
  const handleStartBatch = () => {
    const hasActive = batchList.some((b) => b.status === '진행중');
    if (hasActive) {
      alert(
        '⚠️ 이미 진행 중인 작기가 있습니다. 기존 작기를 종료 후 생성해주세요.',
      );
      return;
    }

    setBatchList((prev) =>
      prev.map((b) =>
        b.id === selectedBatch ? { ...b, status: '진행중' } : b,
      ),
    );
    alert('새로운 작기가 시작되었습니다.');
  };

  // 🚨 작기 종료 로직 (UI 상태 업데이트 포함)
  const handleEndBatch = () => {
    if (window.confirm('현재 진행 중인 작기를 정말 종료하시겠습니까?')) {
      setBatchList((prev) =>
        prev.map((b) =>
          b.id === selectedBatch ? { ...b, status: '종료됨' } : b,
        ),
      );
      alert('작기가 성공적으로 종료되었습니다.');
    }
  };

  const maxTemp = 40;
  const minTemp = 0;
  const maxHeight = 120;
  const minHeight = 0;

  const getX = (index, total) => {
    if (total <= 1) return 0;
    return (index / (total - 1)) * 100;
  };

  const getY = (val, max, min = 0) => {
    if (val == null || Number.isNaN(Number(val))) return null;
    return 90 - ((Number(val) - min) / (max - min)) * 80;
  };

  const makeSmoothPath = (data, key, max, min) => {
    const valid = data
      .map((d, i) => ({
        x: getX(i, data.length),
        y: getY(d[key], max, min),
      }))
      .filter((p) => p.y !== null);

    if (valid.length === 0) return '';
    if (valid.length === 1) return `M ${valid[0].x} ${valid[0].y}`;

    return valid
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = valid[i - 1];
        const midX = (prev.x + p.x) / 2;
        return `Q ${prev.x} ${prev.y}, ${midX} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
      })
      .join(' ');
  };

  const tempPath = makeSmoothPath(activeChartData, 'temp', maxTemp, minTemp);
  const extTempPath = makeSmoothPath(
    activeChartData,
    'extTemp',
    maxTemp,
    minTemp,
  );
  const heightPath = makeSmoothPath(
    activeChartData,
    'height',
    maxHeight,
    minHeight,
  );
  const stdHeightPath = makeSmoothPath(
    activeChartData,
    'stdHeight',
    maxHeight,
    minHeight,
  );

  const getHoverPoint = (chartType, index) => {
    const row = activeChartData[index];
    if (!row) return null;

    if (chartType === 'temp') {
      return {
        x: getX(index, activeChartData.length),
        y: getY(row.temp, maxTemp, minTemp),
        title: xLabels[index],
        mainLabel: '내부 온도',
        mainValue: row.temp != null ? `${row.temp}°C` : '데이터 없음',
        subLabel: '외부 온도',
        subValue: row.extTemp != null ? `${row.extTemp}°C` : '데이터 없음',
      };
    }

    return {
      x: getX(index, activeChartData.length),
      y: getY(row.height, maxHeight, minHeight),
      title: xLabels[index],
      mainLabel: '평균 초장',
      mainValue: row.height != null ? `${row.height}cm` : '데이터 없음',
      subLabel: '목표 기준',
      subValue: row.stdHeight != null ? `${row.stdHeight}cm` : '90cm',
    };
  };

  if (!rawData) {
    return (
      <Flex
        $justify="center"
        $align="center"
        $flex="1"
        style={{ height: '100%' }}
      >
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </Flex>
    );
  }

  return (
    <Flex $gap="1.5em" $flex="1" style={{ height: '100%', minHeight: 0 }}>
      {/* 왼쪽 영역 */}
      <Flex
        $dir="column"
        $gap="1.5em"
        $flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <FilterCard>
          <Flex
            $dir="row"
            $align="center"
            $justify="space-between"
            $width="100%"
            style={{ height: '100%' }}
          >
            <div className="batch-selector">
              <span className="label">대상 작기</span>
              <div className="select-wrapper">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(Number(e.target.value))}
                >
                  {batchList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="action-buttons">
              {currentBatchStatus === '종료됨' ? (
                <button className="btn primary" onClick={handleStartBatch}>
                  작기 생성
                </button>
              ) : (
                <button className="btn danger" onClick={handleEndBatch}>
                  작기 종료
                </button>
              )}
            </div>
          </Flex>
        </FilterCard>

        <TimelineCard>
          <Flex
            $justify="space-between"
            $align="center"
            style={{ marginBottom: '1.2em', flexShrink: 0 }}
          >
            <CardTitle style={{ margin: 0 }}>
              씨드팜 일지 (Seed Farm Log)
            </CardTitle>
          </Flex>

          <TimelineWrapper>
            {(currentData?.issues || []).map((ev) => (
              <TimelineItem key={ev.id}>
                <div className="time-col">
                  {ev.time?.split(' ')[0]}
                  <br />
                  {ev.time?.split(' ')[1]}
                </div>
                <div className="line-col">
                  <div className="icon-circle">{ev.icon}</div>
                  <div className="line-tail"></div>
                </div>
                <div className="content-col">
                  <div className="c-title">{ev.title}</div>
                  <div className="c-desc">{ev.desc}</div>
                </div>
              </TimelineItem>
            ))}
          </TimelineWrapper>
        </TimelineCard>
      </Flex>

      {/* 오른쪽 영역 */}
      <Flex
        $dir="column"
        $gap="1.5em"
        $flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <KpiRow>
          <MiniKpiCard>
            <span className="label">평균 온도</span>
            <div className="value">
              {currentData?.avgTemp}
              <span className="unit">°C</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard className="highlight">
            <Flex $justify="space-between" $align="center" $width="100%">
              <span className="label">현재 측정 초장</span>
              <StatusBadge className={isNormal ? 'normal' : 'warning'}>
                {isNormal ? '정상 🟢' : '편차 발생 🔻'}
              </StatusBadge>
            </Flex>
            <div className="value">
              {currentData?.currentHeight}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard>
            <span className="label">평균 습도</span>
            <div className="value">
              {currentData?.avgHumid}
              <span className="unit">%</span>
            </div>
          </MiniKpiCard>
        </KpiRow>

        <AnalyticsCard>
          {/* ── 헤더 ── */}
          <div className="analytics-header">
            <CardTitle>AI 생육 종합 분석</CardTitle>
            <div className="header-controls">
              {/* 기간 탭 — 1일일 때 시간단위 인라인 표시 */}
              <div className="toggle-bg">
                {['day', 'week', 'month', 'all'].map((r) => (
                  <button
                    key={r}
                    className={timeRange === r ? 'active' : ''}
                    onClick={() => handleSetTimeRange(r)}
                  >
                    {r === 'day'
                      ? '1일'
                      : r === 'week'
                        ? '1주'
                        : r === 'month'
                          ? '1개월'
                          : '전체'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="charts-wrapper">
            {/* ── 온도 차트 ── */}
            <div className="chart-section">
              <div className="chart-header">
                <div>
                  <div className="chart-title">환경 온도 분석</div>
                  <div className="chart-subtitle">적정 범위 18°C ~ 28°C</div>
                </div>

                <div className="chart-legend">
                  <span className="legend-item coral">내부 온도</span>
                  <span className="legend-item sky">외부 온도</span>
                  <span className="legend-item danger">상한선</span>
                  <span className="legend-item safe">하한선</span>
                </div>
              </div>

              <ModernChartBox>
                <YAxis>
                  <span>{maxTemp}°C</span>
                  <span>{Math.round((maxTemp + minTemp) / 2)}°C</span>
                  <span>{minTemp}°C</span>
                </YAxis>

                <GraphArea onMouseLeave={() => setHoverInfo(null)}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect
                      x="0"
                      y={getY(28, maxTemp, minTemp)}
                      width="100"
                      height={
                        getY(18, maxTemp, minTemp) - getY(28, maxTemp, minTemp)
                      }
                      fill="#0f766e"
                      opacity="0.12"
                    />

                    {[10, 30, 50, 70, 90].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        className="grid-line"
                      />
                    ))}

                    <line
                      x1="0"
                      y1={getY(28, maxTemp, minTemp)}
                      x2="100"
                      y2={getY(28, maxTemp, minTemp)}
                      className="limit-line danger"
                    />

                    <line
                      x1="0"
                      y1={getY(18, maxTemp, minTemp)}
                      x2="100"
                      y2={getY(18, maxTemp, minTemp)}
                      className="limit-line safe"
                    />

                    <path d={extTempPath} className="chart-line sky dashed" />
                    <path d={tempPath} className="chart-line coral" />

                    {activeChartData.map((d, i) => {
                      const point = getHoverPoint('temp', i);
                      if (!point || point.y === null) return null;

                      const isActive =
                        hoverInfo?.chart === 'temp' && hoverInfo?.index === i;

                      return (
                        <g
                          key={`temp-hover-${i}`}
                          onMouseEnter={() =>
                            setHoverInfo({
                              chart: 'temp',
                              index: i,
                              ...point,
                            })
                          }
                        >
                          <rect
                            x={Math.max(point.x - 4, 0)}
                            y="0"
                            width="8"
                            height="100"
                            fill="transparent"
                          />
                          {isActive && (
                            <>
                              <line
                                x1={point.x}
                                y1="0"
                                x2={point.x}
                                y2="100"
                                className="hover-line"
                              />
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="1.8"
                                className="hover-dot coral"
                              />
                            </>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {hoverInfo?.chart === 'temp' && (
                    <ChartTooltip
                      style={{
                        left: `${Math.min(Math.max(hoverInfo.x, 12), 88)}%`,
                        top: `${Math.min(Math.max(hoverInfo.y, 18), 72)}%`,
                      }}
                    >
                      <div className="tooltip-title">{hoverInfo.title}</div>
                      <div className="tooltip-row">
                        <span>{hoverInfo.mainLabel}</span>
                        <b>{hoverInfo.mainValue}</b>
                      </div>
                      <div className="tooltip-row">
                        <span>{hoverInfo.subLabel}</span>
                        <b>{hoverInfo.subValue}</b>
                      </div>
                    </ChartTooltip>
                  )}

                  {visibleXLabels.map((label, i) => {
                    if (!label) return null;

                    return (
                      <XLabel
                        key={`temp-label-${i}`}
                        style={{
                          left: `${(i / Math.max(xLabels.length - 1, 1)) * 100}%`,
                        }}
                      >
                        {label}
                      </XLabel>
                    );
                  })}
                </GraphArea>
              </ModernChartBox>
            </div>

            {/* ── 초장 차트 ── */}
            <div className="chart-section">
              <div className="chart-header">
                <div>
                  <div className="chart-title">생육 초장 분석</div>
                  <div className="chart-subtitle">목표 기준 90cm</div>
                </div>

                <div className="chart-legend">
                  <span className="legend-item mint">평균 초장</span>
                  <span className="legend-item purple">목표 기준</span>
                </div>
              </div>

              <ModernChartBox>
                <YAxis>
                  <span>{maxHeight}cm</span>
                  <span>{Math.round((maxHeight + minHeight) / 2)}cm</span>
                  <span>{minHeight}cm</span>
                </YAxis>

                <GraphArea onMouseLeave={() => setHoverInfo(null)}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[10, 30, 50, 70, 90].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        className="grid-line"
                      />
                    ))}

                    <path d={stdHeightPath} className="limit-line purple" />
                    <path d={heightPath} className="chart-line mint" />

                    {activeChartData.map((d, i) => {
                      const point = getHoverPoint('height', i);
                      if (!point || point.y === null) return null;

                      const isActive =
                        hoverInfo?.chart === 'height' && hoverInfo?.index === i;

                      return (
                        <g
                          key={`height-hover-${i}`}
                          onMouseEnter={() =>
                            setHoverInfo({
                              chart: 'height',
                              index: i,
                              ...point,
                            })
                          }
                        >
                          <rect
                            x={Math.max(point.x - 4, 0)}
                            y="0"
                            width="8"
                            height="100"
                            fill="transparent"
                          />

                          {isActive && (
                            <>
                              <line
                                x1={point.x}
                                y1="0"
                                x2={point.x}
                                y2="100"
                                className="hover-line"
                              />
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="1.8"
                                className="hover-dot mint"
                              />
                            </>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {hoverInfo?.chart === 'height' && (
                    <ChartTooltip
                      style={{
                        left: `${Math.min(Math.max(hoverInfo.x, 12), 88)}%`,
                        top: `${Math.min(Math.max(hoverInfo.y, 18), 72)}%`,
                      }}
                    >
                      <div className="tooltip-title">{hoverInfo.title}</div>
                      <div className="tooltip-row">
                        <span>{hoverInfo.mainLabel}</span>
                        <b>{hoverInfo.mainValue}</b>
                      </div>
                      <div className="tooltip-row">
                        <span>{hoverInfo.subLabel}</span>
                        <b>{hoverInfo.subValue}</b>
                      </div>
                    </ChartTooltip>
                  )}

                  {visibleXLabels.map((label, i) => {
                    if (!label) return null;

                    return (
                      <XLabel
                        key={`temp-label-${i}`}
                        style={{
                          left: `${(i / Math.max(xLabels.length - 1, 1)) * 100}%`,
                        }}
                      >
                        {label}
                      </XLabel>
                    );
                  })}
                </GraphArea>
              </ModernChartBox>
            </div>

            {/* ── 기간별 생장 속도 비교 ── */}
            <div className="chart-section">
              <div className="chart-mini-title">
                기간별 생장 속도 비교 (농장 평균 증가율)
              </div>
              <GrowthBarsContainer>
                {[
                  {
                    key: 'day',
                    label: '어제 대비',
                    cls: 'day',
                    pct: currentData?.growthPct?.day,
                  },
                  {
                    key: 'week',
                    label: '1주 전 대비',
                    cls: 'week',
                    pct: currentData?.growthPct?.week,
                  },
                  {
                    key: 'month',
                    label: '1개월 전 대비',
                    cls: 'month',
                    pct: currentData?.growthPct?.month,
                  },
                ].map(({ key, label, cls, pct }) => (
                  <div className="bar-row" key={key}>
                    <span className="time-label">{label}</span>
                    <div className="bar-track">
                      {pct != null ? (
                        <div
                          className={`bar-fill ${cls}`}
                          style={{ width: `${Math.min(Math.abs(pct), 100)}%` }}
                        />
                      ) : (
                        <div
                          className="bar-fill no-data"
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                    <span className="value-label">
                      {pct != null ? `${pct > 0 ? '+' : ''}${pct}%` : '—'}
                    </span>
                  </div>
                ))}
              </GrowthBarsContainer>
            </div>
          </div>
        </AnalyticsCard>
      </Flex>
    </Flex>
  );
};

const LoadingText = styled.h3`
  color: #64748b;
  font-weight: 800;
`;

const FilterCard = styled(BaseCard)`
  flex: none;
  height: 100px;
  padding: 0 24px;
  .batch-selector {
    display: flex;
    align-items: center;
    gap: 15px;
    .label {
      font-size: 0.9em;
      font-weight: 800;
      color: #64748b;
    }
    .select-wrapper {
      position: relative;
      width: 280px;
      select {
        width: 100%;
        height: 35px;
        appearance: none;
        background: #fff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 0 15px;
        font-size: 1.1em;
        font-weight: 700;
        cursor: pointer;
        color: #1e293b;
      }
      &::after {
        content: '▾';
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        pointer-events: none;
      }
    }
  }
  .action-buttons {
    display: flex;
    gap: 10px;
    .btn {
      width: 84px;
      height: 35px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      font-size: 0.9em;
      &.primary {
        background: #1e293b;
        color: white;
      }
      &.danger {
        background: #e63946;
        color: white;
      }
    }
  }
`;

const TimelineCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;
const TimelineWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  .time-col {
    width: 60px;
    font-size: 0.7em;
    font-weight: 800;
    color: #94a3b8;
    text-align: right;
  }
  .line-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .icon-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }
    .line-tail {
      position: absolute;
      top: 30px;
      bottom: -20px;
      width: 2px;
      background: #f1f5f9;
      z-index: 1;
    }
  }
  .content-col {
    flex: 1;
    padding: 12px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    .c-title {
      font-size: 0.85em;
      font-weight: 800;
      color: #0f172a;
    }
    .c-desc {
      font-size: 0.75em;
      color: #64748b;
      margin-top: 4px;
    }
  }
`;
const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5em;
`;
const MiniKpiCard = styled(BaseCard)`
  height: 100px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .label {
    font-size: 0.75em;
    font-weight: 600;
    color: #94a3b8;
  }
  .value {
    font-size: 1.6em;
    font-weight: 700;
    color: #1e293b;
    .unit {
      font-size: 0.6em;
      margin-left: 2px;
    }
  }
  &.highlight {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
`;
const StatusBadge = styled.div`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7em;
  font-weight: 800;
  &.normal {
    background: #f0fdf4;
    color: #15803d;
  }
  &.warning {
    background: #fef2f2;
    color: #dc2626;
  }
`;
const AnalyticsCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  min-height: 0;
  background: #ffffff;
  box-shadow: none;

  ${CardTitle} {
    color: #1e293b;
    margin: 0;
  }

  .analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    gap: 12px;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chart-mini-title {
    font-size: 0.95em;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 10px;
  }

  .toggle-bg {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    padding: 4px;
    border-radius: 10px;
    gap: 4px;

    button {
      min-width: 62px;
      padding: 7px 14px;
      border: none;
      background: transparent;
      font-size: 0.78em;
      font-weight: 800;
      color: #64748b;
      cursor: pointer;
      border-radius: 8px;

      &.active {
        background: #ffffff;
        color: #0f172a;
      }
    }
  }

  .charts-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 0;

    .chart-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 4px 0 0;
      box-shadow: none;
    }
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 12px;
  }

  .chart-title {
    font-size: 0.95em;
    font-weight: 700;
    color: #1e293b;
  }

  .chart-subtitle {
    font-size: 0.7em;
    font-weight: 500; // 통일
    color: #94a3b8;
  }

  .chart-legend {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .legend-item {
    font-size: 0.66em;
    font-weight: 600;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;

    &::before {
      content: '';
      width: 14px;
      height: 3px;
      border-radius: 999px;
      display: inline-block;
    }

    &.coral::before {
      background: #ef476f;
    }

    &.sky::before {
      background: #118ab2;
    }

    &.mint::before {
      background: #06d6a0;
    }

    &.purple::before {
      background: #7c3aed;
    }

    &.danger::before {
      background: #ef4444;
    }

    &.safe::before {
      background: #22c55e;
    }

    &.warning::before {
      background: #f59e0b;
    }
  }
`;
const ModernChartBox = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 8px 22px 0;
  overflow: visible;
`;
const YAxis = styled.div`
  width: 42px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 8px;

  span {
    font-size: 0.64em;
    font-weight: 600;
    color: #64748b;
  }
`;

const GraphArea = styled.div`
  flex: 1;
  position: relative;
  margin-left: 8px;
  margin-bottom: 18px;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: #e2e8f0;
    stroke-width: 0.45;
  }

  .limit-line {
    stroke-width: 0.75;
    stroke-dasharray: 5 5;
    opacity: 0.9;

    &.danger {
      stroke: #ef4444;
    }

    &.safe {
      stroke: #22c55e;
    }

    &.purple {
      stroke: #7c3aed;
    }

    &.warning {
      stroke: #f59e0b;
    }
  }

  .chart-line {
    fill: none;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;

    &.coral {
      stroke: #ef476f;
    }

    &.sky {
      stroke: #118ab2;
    }

    &.mint {
      stroke: #06d6a0;
    }

    &.purple {
      stroke: #8b5cf6;
      opacity: 0.6;
    }

    &.dashed {
      stroke-dasharray: 7 6;
      opacity: 0.75;
    }
  }

  .hover-line {
    stroke: #64748b;
    stroke-width: 0.65;
    stroke-dasharray: 4 4;
    opacity: 0.7;
  }

  .hover-dot {
    stroke: #ffffff;
    stroke-width: 0.9;

    &.coral {
      fill: #ef476f;
    }

    &.mint {
      fill: #06d6a0;
    }
  }
`;

const XLabel = styled.span`
  position: absolute;
  bottom: -17px;
  transform: translateX(-50%);
  font-size: 0.6em;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
`;
const GrowthBarsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;

  .bar-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .time-label {
      width: 82px;
      font-size: 0.75em;
      font-weight: 700;
      color: #64748b;
      text-align: right;
      flex-shrink: 0;
    }

    .bar-track {
      flex: 1;
      height: 12px;
      background: #f1f5f9;
      border-radius: 6px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        border-radius: 6px;
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        &.day {
          background: linear-gradient(90deg, #6ee7b7, #10b981);
        }
        &.week {
          background: linear-gradient(90deg, #93c5fd, #3b82f6);
        }
        &.month {
          background: linear-gradient(90deg, #c4b5fd, #6366f1);
        }
        &.no-data {
          background: repeating-linear-gradient(
            90deg,
            #e2e8f0 0px,
            #e2e8f0 6px,
            transparent 6px,
            transparent 12px
          );
          opacity: 0.5;
        }
      }
    }

    .value-label {
      width: 52px;
      font-size: 0.8em;
      font-weight: 800;
      color: #0f172a;
      flex-shrink: 0;
    }
  }
`;
const ChartTooltip = styled.div`
  position: absolute;
  transform: translate(-50%, -110%);
  min-width: 132px;
  padding: 10px 12px;
  background: #ffffff;
  border-radius: 10px;
  color: #0f172a;
  pointer-events: none;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);

  .tooltip-title {
    font-size: 0.72em;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }

  .tooltip-row {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    font-size: 0.68em;
    font-weight: 500;
    color: #64748b;
    margin-top: 5px;

    b {
      color: #0f172a;
      font-weight: 500;
    }
  }
`;
const GlobalFont = styled.div`
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: #1e293b;

  * {
    font-family: inherit;
    letter-spacing: -0.2px;
  }
`;

export default DataAnalysisPage;
