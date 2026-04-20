import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext();
  const [selectedBatch, setSelectedBatch] = useState('batch_1');
  const [timeRange, setTimeRange] = useState('week');

  // 🚨 1. 작기 목록 상태 (드롭다운에 즉각 반영하기 위해 State로 관리)
  const [batchList, setBatchList] = useState([
    { id: 'batch_1', name: '작기 #01 (토마토)', status: '진행중' },
    { id: 'batch_2', name: '작기 #02 (토마토)', status: '종료됨' },
  ]);

  // 🚨 2. 작기별 데이터 저장소 상태
  const [batchDataStore, setBatchDataStore] = useState({
    batch_1: {
      avgTemp: 23.9,
      tempError: 0.5,
      avgHumid: 62.1,
      humidError: 2.1,
      currentHeight: 12.8,
      charts: {
        day: [
          { label: '06:00', temp: 18, height: 12.8, leaf: 32.5 },
          { label: '09:00', temp: 22, height: 12.8, leaf: 32.5 },
          { label: '12:00', temp: 26, height: 12.8, leaf: 32.6 },
          { label: '15:00', temp: 27, height: 12.8, leaf: 32.8 },
          { label: '18:00', temp: 24, height: 12.8, leaf: 32.8 },
          { label: '21:00', temp: 20, height: 12.8, leaf: 32.8 },
        ],
        week: [
          { label: '04-14', temp: 22, height: 10.5, leaf: 25.1 },
          { label: '04-15', temp: 23, height: 11.1, leaf: 26.8 },
          { label: '04-16', temp: 25, height: 11.8, leaf: 28.5 },
          { label: '04-17', temp: 26, height: 12.2, leaf: 30.2 },
          { label: '04-18', temp: 24, height: 12.5, leaf: 31.5 },
          { label: '04-19', temp: 25, height: 12.8, leaf: 32.1 },
          { label: '04-20', temp: 24, height: 12.8, leaf: 32.8 },
        ],
        month: [
          { label: '3월 4주', temp: 19, height: 5.2, leaf: 12.5 },
          { label: '4월 1주', temp: 21, height: 8.5, leaf: 18.2 },
          { label: '4월 2주', temp: 23, height: 11.2, leaf: 24.5 },
          { label: '4월 3주', temp: 25, height: 12.8, leaf: 32.8 },
        ],
      },
      issues: [
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심6(스크롤 테스트)',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 2,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심5',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 10,
          type: 'growth',
          time: '04-20 08:00',
          title: '일일 AI 생육 정밀 분석',
          desc: '초장 12.8cm, 엽수 12장, 엽장 5.2cm. 목표 엽면적 도달 완료.',
          icon: '📈',
        },
        {
          id: 7,
          type: 'flower',
          time: '04-18 11:15',
          title: '3화방 개화 확인',
          desc: '작기 목표 대비 2일 빠르게 개화 진행 중.',
          icon: '🌼',
        },
        {
          id: 8,
          type: 'harvest',
          time: '04-15 09:00',
          title: '1구역 1차 수확 완료',
          desc: '총 45kg 수확 (특품 비율 85%)',
          icon: '🍅',
        },
        {
          id: 11,
          type: 'growth',
          time: '04-14 08:00',
          title: '일일 AI 생육 정밀 분석',
          desc: '초장 10.5cm, 엽수 9장. 광합성량 우수함.',
          icon: '📈',
        },
        {
          id: 9,
          type: 'system',
          time: '04-10 02:00',
          title: '비상 발전기 가동',
          desc: '외부 정전으로 인한 비상 전력 전환 (30분간)',
          icon: '⚡',
        },
      ],
    },
    batch_2: {
      avgTemp: 21.2,
      tempError: 0.8,
      avgHumid: 55.4,
      humidError: 3.5,
      currentHeight: 8.4,
      charts: {
        day: [
          { label: '12:00', temp: 21, height: 8.4, leaf: 15.2 },
          { label: '18:00', temp: 21, height: 8.4, leaf: 15.2 },
        ],
        week: [
          { label: '03-20', temp: 23, height: 8.0, leaf: 14.8 },
          { label: '03-21', temp: 22, height: 8.4, leaf: 15.2 },
        ],
        month: [
          { label: '3월 2주', temp: 18, height: 4.0, leaf: 8.5 },
          { label: '3월 3주', temp: 21, height: 8.4, leaf: 15.2 },
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

  // 🚨 3. 오작동 방지 로직: 새 작기 시작
  const handleStartBatch = () => {
    // 이미 진행 중인 작기가 있는지 확인
    const hasActive = batchList.some((b) => b.status === '진행중');
    if (hasActive) {
      alert(
        '오류: 이미 진행 중인 작기가 있습니다.\n기존 작기를 먼저 종료해야 새 작기를 생성할 수 있습니다.',
      );
      return;
    }

    if (!window.confirm('새로운 작기를 생성하시겠습니까?')) return;

    const newId = `batch_${Date.now()}`;
    const newNum = batchList.length + 1;
    const newBatchInfo = {
      id: newId,
      name: `작기 #${String(newNum).padStart(2, '0')} (토마토)`,
      status: '진행중',
    };

    // 새 작기용 빈 데이터 보드 생성
    setBatchDataStore((prev) => ({
      ...prev,
      [newId]: {
        avgTemp: 0,
        tempError: 0,
        avgHumid: 0,
        humidError: 0,
        currentHeight: 0,
        charts: { day: [], week: [], month: [] },
        issues: [
          {
            id: Date.now(),
            type: 'system',
            time: '오늘 08:00',
            title: '새 작기 시스템 할당',
            desc: '씨드팜 모니터링이 시작되었습니다.',
            icon: '🌱',
          },
        ],
      },
    }));

    setBatchList([newBatchInfo, ...batchList]); // 드롭다운 맨 위에 추가
    setSelectedBatch(newId); // 방금 만든 작기로 화면 자동 전환
    setTimeRange('week');
    alert(`[생성 완료] ${newBatchInfo.name} 모니터링을 시작합니다.`);
  };

  // 🚨 4. 오작동 방지 로직: 작기 종료
  const handleEndBatch = () => {
    const current = batchList.find((b) => b.id === selectedBatch);

    if (!current || current.status === '종료됨') {
      alert('오류: 이미 종료 처리된 작기입니다.');
      return;
    }

    if (
      !window.confirm(
        `[주의] ${current.name} 작기를 정말 종료하시겠습니까?\n종료 후에는 데이터를 수정하거나 상태를 되돌릴 수 없습니다.`,
      )
    )
      return;

    // 현재 작기 상태를 '종료됨'으로 변경
    setBatchList((prev) =>
      prev.map((b) =>
        b.id === selectedBatch ? { ...b, status: '종료됨' } : b,
      ),
    );
    alert(`[종료 완료] ${current.name} 작기가 마감되었습니다.`);
  };

  // --- 화면 렌더링용 데이터 추출 ---
  const currentData = useMemo(
    () => batchDataStore[selectedBatch],
    [selectedBatch, batchDataStore],
  );
  const activeChartData = currentData?.charts[timeRange] || [];

  // 현재 선택된 작기가 진행중인지 확인
  const isBatchActive =
    batchList.find((b) => b.id === selectedBatch)?.status === '진행중';

  // Y축 스케일 설정
  const maxTemp = 30;
  const minTemp = 15;
  const maxHeight = 20;
  const minHeight = 0;
  const maxLeaf = 50;
  const minLeaf = 0;

  const getX = (index, total) => (total > 1 ? (index / (total - 1)) * 100 : 0);
  const getY = (val, max, min = 0) => 90 - ((val - min) / (max - min)) * 80;

  // 🚨 빈 데이터일 때 차트 에러(NaN) 방지 처리
  const tempPoints =
    activeChartData.length > 0
      ? activeChartData
          .map(
            (d, i) =>
              `${getX(i, activeChartData.length)},${getY(d.temp, maxTemp, minTemp)}`,
          )
          .join(' ')
      : '';
  const heightPoints =
    activeChartData.length > 0
      ? activeChartData
          .map(
            (d, i) =>
              `${getX(i, activeChartData.length)},${getY(d.height, maxHeight, minHeight)}`,
          )
          .join(' ')
      : '';
  const leafPoints =
    activeChartData.length > 0
      ? activeChartData
          .map(
            (d, i) =>
              `${getX(i, activeChartData.length)},${getY(d.leaf, maxLeaf, minLeaf)}`,
          )
          .join(' ')
      : '';

  return (
    <Flex gap="1.5em" flex="1" style={{ height: '100%', minHeight: 0 }}>
      {/* 🚨 LEFT COLUMN: 필터 & 씨팜일지 */}
      <Flex
        dir="column"
        gap="1.5em"
        flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        {/* 수정된 FilterCard: 로직 연동 완료 */}
        <FilterCard>
          <Flex align="center" justify="space-between" width="100%">
            <div className="batch-selector">
              <span className="label">대상 작기</span>
              <select
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setTimeRange('week');
                }}
              >
                {/* 🚨 드롭다운 목록을 batchList 상태값과 동기화 */}
                {batchList.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} - [{b.status}]
                  </option>
                ))}
              </select>
            </div>

            <Flex gap="8px">
              {/* 작기 종료 버튼 (선택된 작기가 진행중일 때만 활성화) */}
              {isBatchActive && (
                <BatchBtn className="danger" onClick={handleEndBatch}>
                  작기 종료
                </BatchBtn>
              )}
              {/* 새 작기 시작 버튼 (진행중인 작기가 있으면 내부 로직에서 에러 띄움) */}
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
            <CardTitle style={{ margin: 0 }}>씨팜일지</CardTitle>
            <span className="filter-text">최신순 정렬</span>
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

      {/* 🚨 RIGHT COLUMN: 3단 통합 차트 영역 */}
      <Flex
        dir="column"
        gap="1.5em"
        flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <KpiRow>
          <MiniKpiCard>
            <div className="label">평균 온도 (오차 범위)</div>
            <div className="value">
              {currentData?.avgTemp || 0}
              <span className="unit">°C</span>{' '}
              <span className="error">±{currentData?.tempError || 0}</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard className="highlight">
            <div className="label">현재 측정 초장</div>
            <div className="value">
              {currentData?.currentHeight || 0}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard>
            <div className="label">평균 습도 (오차 범위)</div>
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
            {/* 1. 온도 차트 */}
            <div className="chart-section">
              <div className="chart-mini-title">
                온도 변화 추이 (Target Tracking)
              </div>
              <ChartContainer>
                <YAxis>
                  <span>{maxTemp}°C</span>
                  <span>{minTemp}°C</span>
                </YAxis>
                <GraphArea>
                  <GridLine style={{ top: '10%' }} />{' '}
                  <GridLine style={{ top: '90%' }} />
                  {tempPoints && (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        points={tempPoints}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
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

            {/* 2. 초장 차트 */}
            <div className="chart-section">
              <div className="chart-mini-title">
                수직 생장 분석 (Height Trend)
              </div>
              <ChartContainer>
                <YAxis>
                  <span>{maxHeight}cm</span>
                  <span>{minHeight}cm</span>
                </YAxis>
                <GraphArea>
                  <GridLine style={{ top: '10%' }} />{' '}
                  <GridLine style={{ top: '90%' }} />
                  {heightPoints && (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient
                          id="growthGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <polygon
                        points={`0,100 ${heightPoints} 100,100`}
                        fill="url(#growthGrad)"
                      />
                      <polyline
                        points={heightPoints}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
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

            {/* 3. 엽면적 차트 */}
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
                      <defs>
                        <linearGradient
                          id="leafGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#f59e0b"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="#f59e0b"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <polygon
                        points={`0,100 ${leafPoints} 100,100`}
                        fill="url(#leafGrad)"
                      />
                      <polyline
                        points={leafPoints}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
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

// --- 🎨 스타일링 ---
const FilterCard = styled(BaseCard)`
  flex: none;
  padding: 12px 15px;

  .batch-selector {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;

    .label {
      font-size: 0.8em;
      font-weight: 800;
      color: #64748b;
      white-space: nowrap;
    }

    select {
      width: 220px;
      height: 32px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      padding: 0 10px;
      border-radius: 6px;
      font-size: 0.85em;
      font-weight: 800;
      color: #0f172a;
      outline: none;
      cursor: pointer;
    }
  }
`;

const BatchBtn = styled.button`
  height: 32px;
  padding: 0 14px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &.primary {
    background: #0f172a;
    color: #fff;
    box-shadow: 0 2px 4px rgba(15, 23, 42, 0.15);
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

const TimelineWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
  min-height: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
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

const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  .time-col {
    width: 60px;
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    line-height: 1.3;
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
  &.disease .content-col {
    border-left: 4px solid #ef4444;
  }
  &.harvest .content-col {
    border-left: 4px solid #10b981;
  }
  &.growth .content-col {
    border-left: 4px solid #3b82f6;
  }
`;

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  flex: none;
`;
const MiniKpiCard = styled(BaseCard)`
  padding: 1.2em;
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    margin-bottom: 6px;
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
    .label {
      color: #2563eb;
    }
    .value {
      color: #1e40af;
    }
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
      border: 1px solid #e2e8f0;
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
    transition: all 0.3s ease;
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
  transition: all 0.3s ease;
`;
