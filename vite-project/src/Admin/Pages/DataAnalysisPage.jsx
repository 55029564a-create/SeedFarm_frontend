import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext(); // AdminLayout에서 보낸 A동, B동 정보 받기
  const [selectedBatch, setSelectedBatch] = useState('batch_1');
  const [timeRange, setTimeRange] = useState('week');

  const [batchList, setBatchList] = useState([
    { id: 'batch_1', name: '작기 #01 (토마토)', status: '진행중' },
    { id: 'batch_2', name: '작기 #02 (토마토)', status: '종료됨' },
  ]);

  const [batchDataStore, setBatchDataStore] = useState({
    batch_1: {
      avgTemp: 23.9,
      tempError: 0.5,
      avgHumid: 62.1,
      humidError: 2.1,
      currentHeight: 85.4,
      targetHeight: 90.0,
      charts: {
        day: [
          {
            label: '00:00',
            temp: 18.2,
            extTemp: 10.5,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.5,
          },
          {
            label: '04:00',
            temp: 16.8,
            extTemp: 8.2,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.5,
          },
          {
            label: '08:00',
            temp: 19.2,
            extTemp: 15.4,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.6,
          },
          {
            label: '12:00',
            temp: 26.1,
            extTemp: 32.5,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.6,
          },
          {
            label: '16:00',
            temp: 26.5,
            extTemp: 29.8,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.7,
          },
          {
            label: '20:00',
            temp: 20.5,
            extTemp: 16.5,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.8,
          },
        ],
        week: [
          {
            label: '04-14',
            temp: 22.1,
            extTemp: 14.5,
            height: 80.5,
            stdHeight: 82.0,
            leaf: 38.1,
          },
          {
            label: '04-15',
            temp: 23.5,
            extTemp: 18.2,
            height: 81.2,
            stdHeight: 83.5,
            leaf: 39.0,
          },
          {
            label: '04-16',
            temp: 21.8,
            extTemp: 12.0,
            height: 82.0,
            stdHeight: 85.0,
            leaf: 39.8,
          },
          {
            label: '04-17',
            temp: 24.2,
            extTemp: 22.5,
            height: 82.8,
            stdHeight: 86.2,
            leaf: 40.5,
          },
          {
            label: '04-18',
            temp: 25.0,
            extTemp: 24.1,
            height: 83.5,
            stdHeight: 87.5,
            leaf: 41.2,
          },
          {
            label: '04-19',
            temp: 23.9,
            extTemp: 17.8,
            height: 84.5,
            stdHeight: 88.8,
            leaf: 42.0,
          },
          {
            label: '04-20',
            temp: 24.5,
            extTemp: 20.2,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.8,
          },
        ],
        month: [
          {
            label: '1주차',
            temp: 21.5,
            extTemp: 15.5,
            height: 45.0,
            stdHeight: 45.5,
            leaf: 20.5,
          },
          {
            label: '2주차',
            temp: 22.8,
            extTemp: 18.0,
            height: 55.2,
            stdHeight: 58.0,
            leaf: 26.0,
          },
          {
            label: '3주차',
            temp: 23.5,
            extTemp: 22.5,
            height: 68.5,
            stdHeight: 72.5,
            leaf: 33.5,
          },
          {
            label: '4주차',
            temp: 24.1,
            extTemp: 19.8,
            height: 85.4,
            stdHeight: 90.0,
            leaf: 42.8,
          },
        ],
      },
      issues: [
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 10,
          type: 'growth',
          time: '04-20 08:00',
          title: '생육 진단: 성장 지연 주의',
          desc: '표준 생육 가이드 대비 초장이 4.6cm 미달입니다. 환경 데이터를 점검하세요.',
          icon: '⚠️',
        },
        {
          id: 7,
          type: 'flower',
          time: '04-18 11:15',
          title: '3화방 개화 확인',
          desc: '작기 목표 대비 2일 빠르게 개화 진행 중.',
          icon: '🌼',
        },
      ],
    },
    batch_2: {
      avgTemp: 21.2,
      tempError: 0.8,
      avgHumid: 55.4,
      humidError: 3.5,
      currentHeight: 18.4,
      targetHeight: 18.0,
      charts: {
        day: [],
        month: [],
        week: [
          {
            label: '03-15',
            temp: 20,
            extTemp: 12,
            height: 16.0,
            stdHeight: 15.5,
            leaf: 14.8,
          },
          {
            label: '03-18',
            temp: 23,
            extTemp: 15,
            height: 17.5,
            stdHeight: 17.0,
            leaf: 15.0,
          },
          {
            label: '03-21',
            temp: 22,
            extTemp: 14,
            height: 18.4,
            stdHeight: 18.0,
            leaf: 15.2,
          },
        ],
      },
      issues: [
        {
          id: 5,
          type: 'harvest',
          time: '03-21 10:00',
          title: '작기 종료 및 최종 수확',
          desc: '누적 수합량 1.2톤 달성',
          icon: '🏁',
        },
      ],
    },
  });

  // 🚨 형님 파일에 누락되어 있던 A/B동 가중치 계산 로직 복구
  const branchModifiers = {
    'A동 (표준 생육실)': { height: 1.0, temp: 0, leaf: 1.0 },
    'B동 (성장 지연실)': { height: 0.8, temp: -2.5, leaf: 0.85 }, // B동은 성장이 느림
    'C동 (성장 촉진실)': { height: 1.15, temp: +1.5, leaf: 1.1 }, // C동은 성장이 빠름
  };

  const currentData = useMemo(() => {
    const rawData = batchDataStore[selectedBatch];
    if (!rawData) return null;

    // AdminLayout에서 받아온 이름과 정확히 매칭!
    const modifier = branchModifiers[selectedBranch] || {
      height: 1.0,
      temp: 0,
      leaf: 1.0,
    };
    const modified = JSON.parse(JSON.stringify(rawData)); // 원본 보호 깊은 복사

    modified.currentHeight = (modified.currentHeight * modifier.height).toFixed(
      1,
    );
    modified.avgTemp = (parseFloat(modified.avgTemp) + modifier.temp).toFixed(
      1,
    );

    Object.keys(modified.charts).forEach((range) => {
      modified.charts[range] = modified.charts[range].map((d) => ({
        ...d,
        height: (d.height * modifier.height).toFixed(1),
        temp: (parseFloat(d.temp) + modifier.temp).toFixed(1),
        leaf: (d.leaf * modifier.leaf).toFixed(1),
      }));
    });

    return modified;
  }, [selectedBatch, batchDataStore, selectedBranch]);

  const activeChartData = currentData?.charts[timeRange] || [];
  const isBatchActive =
    batchList.find((b) => b.id === selectedBatch)?.status === '진행중';

  const handleStartBatch = () => {
    if (batchList.some((b) => b.status === '진행중')) {
      alert('이미 진행 중인 작기가 있습니다.');
      return;
    }
    if (!window.confirm('새로운 작기를 생성하시겠습니까?')) return;
    const newId = `batch_${Date.now()}`;
    const newBatchInfo = {
      id: newId,
      name: `작기 #${String(batchList.length + 1).padStart(2, '0')} (토마토)`,
      status: '진행중',
    };
    setBatchDataStore((prev) => ({
      ...prev,
      [newId]: {
        avgTemp: 0,
        tempError: 0,
        avgHumid: 0,
        humidError: 0,
        currentHeight: 0,
        targetHeight: 0,
        charts: { day: [], week: [], month: [] },
        issues: [],
      },
    }));
    setBatchList([newBatchInfo, ...batchList]);
    setSelectedBatch(newId);
    setTimeRange('week');
  };

  const handleEndBatch = () => {
    const current = batchList.find((b) => b.id === selectedBatch);
    if (!current || current.status === '종료됨') return;
    if (!window.confirm('정말 종료하시겠습니까?')) return;
    setBatchList((prev) =>
      prev.map((b) =>
        b.id === selectedBatch ? { ...b, status: '종료됨' } : b,
      ),
    );
  };

  const heightDiff = currentData
    ? (currentData.currentHeight - currentData.targetHeight).toFixed(1)
    : 0;
  const isNormal = heightDiff >= -1.0;

  const maxTemp = 40;
  const minTemp = 0;
  const maxHeight = 100;
  const minHeight = 0;
  const maxLeaf = 60;
  const minLeaf = 0;

  const getX = (index, total) => (total > 1 ? (index / (total - 1)) * 100 : 0);
  const getY = (val, max, min = 0) => 90 - ((val - min) / (max - min)) * 80;

  const tempPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.temp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const extTempPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.extTemp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const heightPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.height, maxHeight, minHeight)}`,
    )
    .join(' ');
  const stdHeightPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.stdHeight, maxHeight, minHeight)}`,
    )
    .join(' ');
  const leafPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.leaf, maxLeaf, minLeaf)}`,
    )
    .join(' ');

  return (
    <Flex gap="1.5em" flex="1" style={{ height: '100%', minHeight: 0 }}>
      <Flex
        dir="column"
        gap="1.5em"
        flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        {/* 🚨 수정된 상단 필터/작기 선택 카드 */}
        <FilterCard>
          <Flex align="center" justify="space-between" width="100%">
            <div className="batch-selector">
              <span className="label">대상 작기</span>
              <div className="select-wrapper">
                <select
                  value={selectedBatch}
                  onChange={(e) => {
                    setSelectedBatch(e.target.value);
                    setTimeRange('week');
                  }}
                >
                  {batchList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} - [{b.status}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Flex gap="8px">
              {isBatchActive && (
                <BatchBtn className="danger" onClick={handleEndBatch}>
                  작기 종료
                </BatchBtn>
              )}
              <BatchBtn className="primary" onClick={handleStartBatch}>
                + 새 작기 시작
              </BatchBtn>
            </Flex>
          </Flex>
        </FilterCard>

        <TimelineCard>
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: '1.2em', flexShrink: 0 }}
          >
            <CardTitle style={{ margin: 0 }}>
              씨드팜 일지 (Seed Farm Log)
            </CardTitle>
            <span className="filter-text">AI 분석 히스토리</span>
          </Flex>
          <TimelineWrapper>
            {currentData?.issues.map((ev) => (
              <TimelineItem key={ev.id} className={ev.type}>
                <div className="time-col">
                  {ev.time.split(' ')[0]}
                  <br />
                  {ev.time.split(' ')[1]}
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

      <Flex
        dir="column"
        gap="1.5em"
        flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <KpiRow>
          <MiniKpiCard>
            <div className="kpi-header">
              <span className="label">평균 온도 (오차 범위)</span>
            </div>
            <div className="value">
              {currentData?.avgTemp || 0}
              <span className="unit">°C</span>{' '}
              <span className="error">±{currentData?.tempError || 0}</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard className="highlight">
            <Flex
              justify="space-between"
              align="center"
              style={{ width: '100%', marginBottom: '8px' }}
            >
              <span className="label" style={{ margin: 0 }}>
                현재 측정 초장
              </span>
              {currentData && (
                <StatusBadge className={isNormal ? 'normal' : 'warning'}>
                  {isNormal
                    ? '정상 🟢'
                    : `${Math.abs(heightDiff).toFixed(1)}cm 편차 🔻`}
                </StatusBadge>
              )}
            </Flex>
            <div className="value">
              {currentData?.currentHeight || 0}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard>
            <div className="kpi-header">
              <span className="label">평균 습도 (오차 범위)</span>
            </div>
            <div className="value">
              {currentData?.avgHumid || 0}
              <span className="unit">%</span>{' '}
              <span className="error">±{currentData?.humidError || 0}</span>
            </div>
          </MiniKpiCard>
        </KpiRow>

        <AnalyticsCard>
          <div className="analytics-header">
            <CardTitle style={{ margin: 0 }}>
              AI 생육 종합 분석 (Analytics)
            </CardTitle>
            <div className="toggle-bg">
              <button
                className={timeRange === 'day' ? 'active' : ''}
                onClick={() => setTimeRange('day')}
              >
                1일
              </button>
              <button
                className={timeRange === 'week' ? 'active' : ''}
                onClick={() => setTimeRange('week')}
              >
                1주
              </button>
              <button
                className={timeRange === 'month' ? 'active' : ''}
                onClick={() => setTimeRange('month')}
              >
                1개월
              </button>
            </div>
          </div>
          <div className="charts-wrapper">
            <div className="chart-section">
              <Flex justify="space-between" align="center" width="100%">
                <div className="chart-mini-title">
                  내/외부 환경 및 임계치 제어 (Env & Threshold)
                </div>
                <ChartLegend>
                  <span className="actual" style={{ color: '#10b981' }}>
                    ● 내부 온도
                  </span>
                  <span className="standard">-- 외부 온도</span>
                  <span className="area-box">■ 적정 임계치(18~25°C)</span>
                </ChartLegend>
              </Flex>
              <ChartContainer>
                <YAxis>
                  <span>{maxTemp}°C</span>
                  <span>{minTemp}°C</span>
                </YAxis>
                <GraphArea>
                  <GridLine style={{ top: '10%' }} />{' '}
                  <GridLine style={{ top: '90%' }} />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: `${getY(25, maxTemp, minTemp)}%`,
                      bottom: `${100 - getY(18, maxTemp, minTemp)}%`,
                      background: 'rgba(16, 185, 129, 0.08)',
                      zIndex: 0,
                    }}
                  />
                  {extTempPoints && (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ zIndex: 1 }}
                    >
                      <polyline
                        points={extTempPoints}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="4"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                  {tempPoints && (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ zIndex: 2 }}
                    >
                      <polyline
                        points={tempPoints}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                  {activeChartData.map((d, i) => (
                    <HoverZone
                      key={`t-hover-${i}`}
                      style={{
                        left: `${getX(i, activeChartData.length)}%`,
                        top: `${getY(d.temp, maxTemp, minTemp)}%`,
                        color: '#10b981',
                      }}
                    >
                      <div className="dot" />
                      <div className="tooltip">
                        <b>{d.label}</b>
                        <br />
                        내부: {d.temp}°C
                        <br />
                        외부: {d.extTemp}°C
                      </div>
                    </HoverZone>
                  ))}
                  {activeChartData.map((d, i) => (
                    <XLabel
                      key={`t-${i}`}
                      style={{ left: `${getX(i, activeChartData.length)}%` }}
                    >
                      {d.label}
                    </XLabel>
                  ))}
                </GraphArea>
              </ChartContainer>
            </div>
            <div className="section-divider"></div>
            <div className="chart-section">
              <Flex justify="space-between" align="center" width="100%">
                <div className="chart-mini-title">
                  수직 생장 분석 (Height Trend)
                </div>
                <ChartLegend>
                  <span className="actual">● 실측치</span>{' '}
                  <span className="standard">-- 표준치</span>
                </ChartLegend>
              </Flex>
              <ChartContainer>
                <YAxis>
                  <span>{maxHeight}cm</span>
                  <span>{minHeight}cm</span>
                </YAxis>
                <GraphArea>
                  <GridLine style={{ top: '10%' }} />{' '}
                  <GridLine style={{ top: '90%' }} />
                  {stdHeightPoints && (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        points={stdHeightPoints}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeDasharray="4"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                  {heightPoints && (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        points={heightPoints}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                  {activeChartData.map((d, i) => (
                    <HoverZone
                      key={`h-hover-${i}`}
                      style={{
                        left: `${getX(i, activeChartData.length)}%`,
                        top: `${getY(d.height, maxHeight, minHeight)}%`,
                        color: '#3b82f6',
                      }}
                    >
                      <div className="dot" />
                      <div className="tooltip">
                        <b>{d.label}</b>
                        <br />
                        실측: {d.height}cm
                        <br />
                        표준: {d.stdHeight}cm
                      </div>
                    </HoverZone>
                  ))}
                  {activeChartData.map((d, i) => (
                    <XLabel
                      key={`h-${i}`}
                      style={{ left: `${getX(i, activeChartData.length)}%` }}
                    >
                      {d.label}
                    </XLabel>
                  ))}
                </GraphArea>
              </ChartContainer>
            </div>
            <div className="section-divider"></div>
            <div className="chart-section">
              <div className="chart-mini-title">
                수평 생장 및 엽면적 지수 (Leaf Area Trend)
              </div>
              <ChartContainer>
                <YAxis>
                  <span>{maxLeaf}</span>
                  <span>{minLeaf}</span>
                </YAxis>
                <GraphArea>
                  <GridLine style={{ top: '10%' }} />{' '}
                  <GridLine style={{ top: '90%' }} />
                  {leafPoints && (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        points={leafPoints}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                  {activeChartData.map((d, i) => (
                    <HoverZone
                      key={`l-hover-${i}`}
                      style={{
                        left: `${getX(i, activeChartData.length)}%`,
                        top: `${getY(d.leaf, maxLeaf, minLeaf)}%`,
                        color: '#f59e0b',
                      }}
                    >
                      <div className="dot" />
                      <div className="tooltip">
                        <b>{d.label}</b>
                        <br />
                        엽면적: {d.leaf}
                      </div>
                    </HoverZone>
                  ))}
                  {activeChartData.map((d, i) => (
                    <XLabel
                      key={`l-${i}`}
                      style={{ left: `${getX(i, activeChartData.length)}%` }}
                    >
                      {d.label}
                    </XLabel>
                  ))}
                </GraphArea>
              </ChartContainer>
            </div>
          </div>
        </AnalyticsCard>
      </Flex>
    </Flex>
  );
};

export default DataAnalysisPage;

// --- 🎨 스타일링 (드롭다운 디자인 통일 완료) ---
const FilterCard = styled(BaseCard)`
  flex: none;
  height: 110px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  .batch-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    .label {
      font-size: 0.8em;
      font-weight: 800;
      color: #64748b;
      white-space: nowrap;
    }
    /* 🚨 대상 작기 드롭다운을 어드민 헤더와 완벽하게 동일한 디자인으로 수정 */
    .select-wrapper {
      position: relative;
      width: 220px;
      height: 34px;
    }
    .select-wrapper select {
      width: 100%;
      height: 100%;
      appearance: none;
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 0 30px 0 12px;
      font-size: 0.85em;
      font-weight: 700;
      color: #1e293b;
      outline: none;
      cursor: pointer;
      transition: 0.2s;
    }
    .select-wrapper select:hover {
      background-color: #f1f5f9;
    }
    .select-wrapper::after {
      content: '▾';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 1.1em;
      pointer-events: none;
    }
  }
`;

const BatchBtn = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  &.primary {
    background: #0f172a;
    color: #fff;
    &:hover {
      background: #1e293b;
    }
  }
  &.danger {
    background: #fff;
    color: #dc2626;
    border: 1px solid #fecaca;
    &:hover {
      background: #fef2f2;
    }
  }
`;

const TimelineCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  .filter-text {
    font-size: 0.75em;
    font-weight: 800;
    color: #64748b;
  }
`;

const TimelineWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
  min-height: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  .time-col {
    width: 60px;
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    text-align: right;
    flex-shrink: 0;
  }
  .line-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 32px;
    flex-shrink: 0;
    .icon-circle {
      width: 32px;
      height: 32px;
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
      top: 32px;
      bottom: -25px;
      width: 2px;
      background: #f1f5f9;
      z-index: 1;
    }
  }
  .content-col {
    flex: 1;
    padding: 12px 15px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: 0.2s;
    &:hover {
      border-color: #cbd5e1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .c-title {
      font-size: 0.9em;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .c-desc {
      font-size: 0.8em;
      font-weight: 500;
      color: #64748b;
      line-height: 1.4;
      word-break: keep-all;
    }
  }
`;

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  flex: none;
`;

const MiniKpiCard = styled(BaseCard)`
  height: 110px;
  padding: 0 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .kpi-header {
    margin-bottom: 8px;
  }
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
  }
  .value {
    font-size: 1.6em;
    font-weight: 800;
    color: #0f172a;
    .unit {
      font-size: 0.6em;
      color: #94a3b8;
      margin-left: 2px;
    }
    .error {
      font-size: 0.5em;
      color: #ef4444;
      margin-left: 5px;
      font-weight: 700;
    }
  }
  &.highlight {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
  }
`;

const StatusBadge = styled.div`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.7em;
  font-weight: 800;
  white-space: nowrap;
  flex-shrink: 0;
  &.normal {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  }
  &.warning {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 10px;
  font-size: 0.65em;
  font-weight: 700;
  align-items: center;
  .actual {
    color: #3b82f6;
  }
  .standard {
    color: #94a3b8;
  }
  .area-box {
    color: #10b981;
    opacity: 0.7;
  }
`;

const AnalyticsCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 1.5em;
  .analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-shrink: 0;
    .toggle-bg {
      display: flex;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 8px;
      button {
        padding: 6px 14px;
        border: none;
        background: transparent;
        border-radius: 6px;
        font-size: 0.75em;
        font-weight: 800;
        color: #64748b;
        cursor: pointer;
        transition: 0.2s;
        &.active {
          background: #fff;
          color: #0f172a;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        &:hover:not(.active) {
          color: #0f172a;
        }
      }
    }
  }
  .charts-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    gap: 8px;
    .chart-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      position: relative;
      .chart-mini-title {
        font-size: 0.75em;
        font-weight: 800;
        color: #64748b;
        margin-bottom: 5px;
      }
    }
    .section-divider {
      width: 100%;
      height: 1px;
      background: dashed 1px #e2e8f0;
      margin: 2px 0;
      flex-shrink: 0;
    }
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
`;
const YAxis = styled.div`
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 10px;
  padding-bottom: 15px;
  border-right: 1px solid #f1f5f9;
  span {
    font-size: 0.6em;
    font-weight: 800;
    color: #94a3b8;
  }
`;
const GraphArea = styled.div`
  flex: 1;
  position: relative;
  margin: 0 10px 15px 10px;
  min-height: 0;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }
`;
const GridLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px dashed #e2e8f0;
  pointer-events: none;
`;
const XLabel = styled.span`
  position: absolute;
  bottom: -15px;
  transform: translateX(-50%);
  font-size: 0.6em;
  font-weight: 800;
  color: #94a3b8;
`;

const HoverZone = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  .dot {
    width: 8px;
    height: 8px;
    background: #fff;
    border: 2px solid currentColor;
    border-radius: 50%;
    opacity: 0;
    transition: 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .tooltip {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.9);
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.7em;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    z-index: 20;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    line-height: 1.4;
    font-weight: 500;
    b {
      color: #38bdf8;
      font-weight: 800;
    }
  }
  &:hover .dot {
    opacity: 1;
    transform: scale(1.2);
  }
  &:hover .tooltip {
    opacity: 1;
    bottom: 25px;
  }
`;
