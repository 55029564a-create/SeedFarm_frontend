import React, { useState } from 'react';
import styled from 'styled-components';

// 🚨 기존 AdminShared에서 가져오던 BaseCard를 덮어쓰기 위해 로컬로 재정의합니다.
const BaseCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 1.5em;
  /* 🚨 촌스러운 테두리 제거, 하이엔드 벤토 스타일의 부드러운 이중 그림자 적용 */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const CardTitle = styled.h2`
  font-size: 1.1em;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1.2em 0;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DataAnalysisPage = () => {
  const [selectedBatch, setSelectedBatch] = useState('batch_1');
  const [startDate, setStartDate] = useState('2026-04-01');
  const [endDate, setEndDate] = useState('2026-04-07');

  const farmDataLogs = [
    {
      timestamp: '04-07 14:00',
      temp: 25.1,
      rh: 60,
      height: 124,
      water: 2.5,
      aiDecision: '유지 (Maintain)',
    },
    {
      timestamp: '04-07 13:00',
      temp: 25.5,
      rh: 58,
      height: 124,
      water: 2.0,
      aiDecision: '환기팬 가동',
    },
    {
      timestamp: '04-07 12:00',
      temp: 26.0,
      rh: 55,
      height: 123,
      water: 2.0,
      aiDecision: '차광막 전개',
    },
    {
      timestamp: '04-07 11:00',
      temp: 24.8,
      rh: 62,
      height: 123,
      water: 3.5,
      aiDecision: '관수량 증가',
    },
    {
      timestamp: '04-07 10:00',
      temp: 23.5,
      rh: 65,
      height: 122,
      water: 1.5,
      aiDecision: '유지 (Maintain)',
    },
  ];

  const chartData = [
    {
      label: '04-01',
      temp: 20.5,
      water_supply: 12.5,
      cx: 15,
      cy: 75,
      barHeight: 40,
    },
    {
      label: '04-02',
      temp: 22.1,
      water_supply: 15.0,
      cx: 28,
      cy: 59,
      barHeight: 50,
    },
    {
      label: '04-03',
      temp: 23.5,
      water_supply: 18.5,
      cx: 41,
      cy: 45,
      barHeight: 65,
    },
    {
      label: '04-04',
      temp: 24.8,
      water_supply: 22.0,
      cx: 54,
      cy: 32,
      barHeight: 80,
    },
    {
      label: '04-05',
      temp: 26.0,
      water_supply: 25.5,
      cx: 68,
      cy: 20,
      barHeight: 95,
    },
    {
      label: '04-06',
      temp: 25.5,
      water_supply: 20.0,
      cx: 81,
      cy: 25,
      barHeight: 70,
    },
    {
      label: '04-07',
      temp: 25.1,
      water_supply: 16.5,
      cx: 95,
      cy: 29,
      barHeight: 55,
    },
  ];

  return (
    <DashboardGrid>
      {/* 🚨 [좌측 기둥] */}
      <LeftColumn>
        <FilterCard>
          <div className="filter-group">
            <label>📍 생육 배치</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="batch_1">Batch #1 (26.02.10 ~)</option>
              <option value="batch_2">Batch #2 (26.03.01 ~)</option>
            </select>
          </div>
          <div className="filter-group">
            <label>📅 조회 기간</label>
            <div className="date-picker">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button className="btn-search">조회</button>
            </div>
          </div>
        </FilterCard>

        <TableCard>
          <CardTitle>Farm Data & AI Log</CardTitle>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temp / RH</th>
                  <th>Height</th>
                  <th>Water</th>
                  <th>AI Decision</th>
                </tr>
              </thead>
              <tbody>
                {farmDataLogs.map((row, idx) => (
                  <tr key={idx}>
                    <td className="time-col">{row.timestamp}</td>
                    <td className="temp-col">
                      {row.temp}°C / {row.rh}%
                    </td>
                    <td>{row.height} cm</td>
                    <td>{row.water} L</td>
                    <td>
                      <span
                        className={`ai-badge ${row.aiDecision.includes('유지') ? 'good' : 'action'}`}
                      >
                        {row.aiDecision}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </TableCard>
      </LeftColumn>

      {/* 🚨 [우측 기둥] */}
      <RightColumn>
        <KpiRow>
          <MiniKpiCard>
            <div className="stat-label">
              <span className="icon">🌡️</span> 평균 온도
            </div>
            <div className="stat-value">
              23.9<span className="unit">°C</span>
            </div>
            <div className="stat-trend up">▲ 적정 범위</div>
          </MiniKpiCard>
          <MiniKpiCard className="highlight">
            <div className="stat-label">
              <span className="icon">🌿</span> 평균 초장
            </div>
            <div className="stat-value point">
              124<span className="unit">cm</span>
            </div>
            <div className="stat-trend">전주 대비 12cm 성장</div>
          </MiniKpiCard>
          <MiniKpiCard>
            <div className="stat-label">
              <span className="icon">💧</span> 일일 관수량
            </div>
            <div className="stat-value">
              16.5<span className="unit">L</span>
            </div>
            <div className="stat-trend">EC/pH 공급 안정적</div>
          </MiniKpiCard>
        </KpiRow>

        <GraphCard>
          <div className="graph-header">
            <CardTitle style={{ marginBottom: 0 }}>Temperature Trend</CardTitle>
          </div>
          <SvgChartWrapper>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <text
                x="0"
                y="20"
                className="y-axis-label"
                alignmentBaseline="middle"
              >
                26°C
              </text>
              <text
                x="0"
                y="50"
                className="y-axis-label"
                alignmentBaseline="middle"
              >
                23°C
              </text>
              <text
                x="0"
                y="80"
                className="y-axis-label"
                alignmentBaseline="middle"
              >
                20°C
              </text>
              <line x1="9" y1="20" x2="100" y2="20" className="grid-line" />
              <line x1="9" y1="50" x2="100" y2="50" className="grid-line" />
              <line x1="9" y1="80" x2="100" y2="80" className="grid-line" />
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="1.5"
                points={chartData.map((d) => `${d.cx},${d.cy}`).join(' ')}
              />
              {chartData.map((data, idx) => (
                <g className="data-point" key={`line-${idx}`}>
                  <circle cx={data.cx} cy={data.cy} r="1.5" className="dot" />
                  <circle
                    cx={data.cx}
                    cy={data.cy}
                    r="6"
                    fill="transparent"
                    className="hit-area"
                  />
                  <g className="tooltip-group">
                    <rect
                      x={data.cx - 8}
                      y={data.cy - 12}
                      width="16"
                      height="8"
                      rx="2"
                      className="tooltip-bg"
                    />
                    <text x={data.cx} y={data.cy - 7} className="tooltip-text">
                      {data.temp}°C
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </SvgChartWrapper>
        </GraphCard>

        <GraphCard>
          <div className="graph-header">
            <CardTitle style={{ marginBottom: 0 }}>
              Water Supply Usage
            </CardTitle>
          </div>
          <BarChartWrapper>
            <div className="grid-container">
              <div className="grid-row" style={{ bottom: '100%' }}>
                <span className="y-label">30L</span>
                <div className="line"></div>
              </div>
              <div className="grid-row" style={{ bottom: '66%' }}>
                <span className="y-label">20L</span>
                <div className="line"></div>
              </div>
              <div className="grid-row" style={{ bottom: '33%' }}>
                <span className="y-label">10L</span>
                <div className="line"></div>
              </div>
            </div>
            <div className="bar-area">
              {chartData.map((data, idx) => (
                <div className="bar-group" key={`bar-${idx}`}>
                  <div
                    className="bar-fill"
                    style={{ height: `${data.barHeight}%` }}
                  >
                    <div className="bar-tooltip">{data.water_supply}L</div>
                  </div>
                  <div className="bar-label">{data.label}</div>
                </div>
              ))}
            </div>
          </BarChartWrapper>
        </GraphCard>
      </RightColumn>
    </DashboardGrid>
  );
};

export default DataAnalysisPage;

// --- 🎨 하이엔드 투명도(rgba) 기반 스타일링 ---

const DashboardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 1.5em;
  min-height: 0;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-width: 0;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-width: 0;
`;

const FilterCard = styled(BaseCard)`
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1.2em 1.5em;
  /* 기존 테두리(border) 완전 삭제 */

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    flex: 1;
    min-width: 0;

    label {
      font-size: 0.75em;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      white-space: nowrap;
    }

    select {
      width: 100%;
      min-width: 0;
      padding: 0.7em 1em;
      font-size: 0.9em;
      font-weight: 700;
      border-radius: 12px;
      /* 부드러운 배경색과 아주 연한 테두리 */
      background-color: #f8fafc;
      border: 1px solid rgba(226, 232, 240, 0.8);
      color: #0f172a;
      outline: none;
      transition: all 0.2s;
      text-overflow: ellipsis;
      &:focus {
        border-color: #10b981;
        background-color: #ffffff;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
    }

    .date-picker {
      display: flex;
      align-items: center;
      gap: 0.5em;
      width: 100%;
      span {
        font-weight: 800;
        color: #94a3b8;
        font-size: 0.9em;
      }

      input[type='date'] {
        flex: 1;
        min-width: 0;
        padding: 0.7em 0.8em;
        font-size: 0.9em;
        font-weight: 700;
        border-radius: 12px;
        background-color: #f8fafc;
        border: 1px solid rgba(226, 232, 240, 0.8);
        color: #0f172a;
        outline: none;
        transition: all 0.2s;
        &:focus {
          border-color: #10b981;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }
      }

      .btn-search {
        padding: 0.7em 1.2em;
        font-size: 0.9em;
        border-radius: 12px;
        background-color: #10b981;
        color: white;
        font-weight: 800;
        border: none;
        cursor: pointer;
        flex-shrink: 0;
        transition:
          transform 0.2s,
          background-color 0.2s;
        &:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }
      }
    }
  }
`;

const TableCard = styled(BaseCard)`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  padding-bottom: 0.5em;
`;

const TableWrapper = styled.div`
  flex: 1;
  margin-top: 0.5em;
  overflow-y: auto;
  /* 기존 테두리 삭제 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.95em;
  th {
    background-color: #ffffff;
    color: #64748b;
    font-weight: 800;
    padding: 1.2em 0.5em;
    position: sticky;
    top: 0;
    z-index: 1;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #f1f5f9;
  }
  td {
    padding: 1.2em 0.5em;
    border-bottom: 1px solid #f8fafc;
    color: #475569;
    font-weight: 600;
  }
  tbody tr {
    transition: background-color 0.2s;
  }
  tbody tr:hover {
    background-color: #f8fafc;
  } /* 호버 효과도 부드럽게 */

  .time-col {
    font-weight: 800;
    color: #0f172a;
  }
  .temp-col {
    font-weight: 800;
    color: #0f172a;
  }

  /* 뱃지 투명도(rgba) 적용 */
  .ai-badge {
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 800;
    white-space: nowrap;
    &.good {
      background-color: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
    &.action {
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }
`;

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  min-width: 0;
`;

const MiniKpiCard = styled(BaseCard)`
  padding: 1.5em;
  justify-content: space-between;
  position: relative;
  min-width: 0;

  .stat-label {
    font-size: 0.85em;
    font-weight: 800;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .icon {
      font-size: 1.2em;
      margin-right: 0.3em;
    }
  }
  .stat-value {
    font-size: 2.2em;
    font-weight: 800;
    color: #0f172a;
    margin-top: 0.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .unit {
      font-size: 0.4em;
      color: #94a3b8;
      margin-left: 0.2em;
    }
  }
  .stat-value.point {
    color: #10b981;
  }

  /* 뱃지 투명도(rgba) 적용 */
  .stat-trend {
    font-size: 0.75em;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 0.6em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stat-trend.up {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
    padding: 4px 8px;
    border-radius: 6px;
    display: inline-block;
  }

  /* 하이라이트 카드는 투박한 선 대신 옅은 초록 그라데이션 적용 */
  &.highlight {
    background: linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.03) 0%,
      rgba(16, 185, 129, 0.08) 100%
    );
  }
`;

const GraphCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  .graph-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1em;
  }
`;

const SvgChartWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 0.5em 0;
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    .y-axis-label {
      font-size: 3.5px;
      fill: #94a3b8;
      font-weight: 700;
    }
    .grid-line {
      stroke: #f1f5f9;
      stroke-width: 0.5;
      stroke-dasharray: 4 4;
    }
    .data-point {
      cursor: pointer;
      .dot {
        fill: #0f172a;
        transition: all 0.2s;
      }
      .tooltip-group {
        opacity: 0;
        pointer-events: none;
        transition: all 0.2s;
        transform: translateY(2px);
        .tooltip-bg {
          fill: #0f172a;
          stroke: none;
        }
        .tooltip-text {
          font-size: 4px;
          fill: #ffffff;
          font-weight: 800;
          text-anchor: middle;
        }
      }
      &:hover .dot {
        r: 3;
        fill: #10b981;
      }
      &:hover .tooltip-group {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const BarChartWrapper = styled.div`
  flex: 1;
  position: relative;
  margin-top: 1em;
  display: flex;
  border-bottom: 2px solid #f1f5f9;
  .grid-container {
    position: absolute;
    top: 0;
    bottom: 2em;
    left: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;
    .grid-row {
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;
      .y-label {
        font-size: 0.75em;
        font-weight: 800;
        color: #94a3b8;
        width: 2.5em;
        text-align: left;
      }
      .line {
        flex: 1;
        border-top: 1px dashed #f1f5f9;
      }
    }
  }
  .bar-area {
    flex: 1;
    margin-left: 2.5em;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    z-index: 1;
    .bar-group {
      height: 100%;
      width: 12%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      .bar-fill {
        width: 100%;
        background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
        border-radius: 6px 6px 0 0;
        position: relative;
        cursor: pointer;
        transition:
          filter 0.2s,
          transform 0.2s;
        .bar-tooltip {
          position: absolute;
          top: -3.5em;
          left: 50%;
          transform: translateX(-50%);
          background-color: #0f172a;
          color: #ffffff;
          padding: 0.6em 1em;
          border-radius: 8px;
          font-size: 0.8em;
          font-weight: 800;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          &::after {
            border-width: 5px;
            border-style: solid;
            border-color: #0f172a transparent transparent transparent;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            position: absolute;
            content: ' ';
          }
        }
        &:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
        &:hover .bar-tooltip {
          opacity: 1;
        }
      }
      .bar-label {
        margin-top: 1em;
        font-size: 0.85em;
        font-weight: 800;
        color: #64748b;
      }
    }
  }
`;
