import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext();
  const [selectedBatch, setSelectedBatch] = useState('batch_1');
  const [timeRange, setTimeRange] = useState('week');

  // 🚨 3번째 차트(엽면적) 데이터 및 씨팜일지(AI 분석 데이터) 추가
  const dataByBatch = {
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
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심5',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심4',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심3',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심2',
          desc: '신뢰도 92%, 심각도 Lv.3. 즉각적인 방제 권장.',
          icon: '🔴',
        },
        {
          id: 1,
          type: 'disease',
          time: '04-20 14:30',
          title: '잎마름병(Blight) 발병 의심1',
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
          id: 2,
          type: 'flower',
          time: '04-18 11:15',
          title: '3화방 개화 확인',
          desc: '작기 목표 대비 2일 빠르게 개화 진행 중.',
          icon: '🌼',
        },
        {
          id: 3,
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
          id: 4,
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
  };

  const currentData = useMemo(
    () => dataByBatch[selectedBatch],
    [selectedBatch],
  );
  const activeChartData = currentData.charts[timeRange] || [];

  // Y축 스케일 설정
  const maxTemp = 30;
  const minTemp = 15;
  const maxHeight = 20;
  const minHeight = 0;
  const maxLeaf = 50;
  const minLeaf = 0; // 엽면적 스케일 추가

  const getX = (index, total) => (total > 1 ? (index / (total - 1)) * 100 : 0);
  const getY = (val, max, min = 0) => 90 - ((val - min) / (max - min)) * 80;

  const tempPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.temp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const heightPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.height, maxHeight, minHeight)}`,
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
      {/* 🚨 LEFT COLUMN: 필터 & 씨팜일지 */}
      <Flex
        dir="column"
        gap="1.5em"
        flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <FilterCard>
          <FilterGroup>
            <FilterItem className="location-box">
              <span className="label">관제 지점</span>
              <span className="value">{selectedBranch}</span>
            </FilterItem>
            <div className="divider"></div>
            <FilterItem className="batch-box">
              <span className="label">대상 작기</span>
              <select
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setTimeRange('week');
                }}
              >
                <option value="batch_1">작기 #01 (토마토 - 진행중)</option>
                <option value="batch_2">작기 #02 (토마토 - 종료됨)</option>
              </select>
            </FilterItem>
          </FilterGroup>
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

          {/* 🚨 레이아웃 밀림 방지용 투명 스크롤 래퍼 */}
          <TimelineWrapper>
            {currentData.issues.map((ev) => (
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
              {currentData.avgTemp}
              <span className="unit">°C</span>{' '}
              <span className="error">±{currentData.tempError}</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard className="highlight">
            <div className="label">현재 측정 초장</div>
            <div className="value">
              {currentData.currentHeight}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard>
            <div className="label">평균 습도 (오차 범위)</div>
            <div className="value">
              {currentData.avgHumid}
              <span className="unit">%</span>{' '}
              <span className="error">±{currentData.humidError}</span>
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
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      points={tempPoints}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
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

            {/* 🚨 3. 엽면적 차트 (신규 추가) */}
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
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="leafGrad" x1="0" y1="0" x2="0" y2="1">
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
  flex-direction: row;
  align-items: center;
  padding: 1.2em 1.5em;
  .divider {
    width: 1px;
    height: 35px;
    background: #e2e8f0;
    margin: 0 1.5em;
  }
`;
const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  &.location-box {
    width: 210px;
  }
  &.batch-box {
    width: 210px;
  }
  .label {
    font-size: 0.65em;
    font-weight: 800;
    color: #94a3b8;
  }
  .value {
    font-size: 1.1em;
    font-weight: 800;
    color: #10b981;
  }
  select {
    width: 100%;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: 800;
    color: #0f172a;
    outline: none;
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

/* 🚨 레이아웃 밀림 없는 투명/호버 스크롤 기술 적용 */
const TimelineWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-y: overlay;
  padding-right: 8px;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 6px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
  } /* 마우스 올렸을 때만 스르륵 등장 */
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
  } /* 🚨 생육 일지용 파란선 추가 */
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

    /* 🚨 3개의 차트가 남은 공간을 예쁘게 나눠 쓰도록 설정 */
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
