import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';

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
    <>
      <TopRow>
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
        <MiniKpiCard>
          <div className="stat-label">
            <span className="icon">🌡️</span> 평균 온도
          </div>
          <div className="stat-value">23.9°C</div>
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
            <span className="icon">💧</span> 일일 평균 관수량
          </div>
          <div className="stat-value">
            16.5<span className="unit">L</span>
          </div>
          <div className="stat-trend">EC/pH 공급 안정적</div>
        </MiniKpiCard>
      </TopRow>

      <BottomDataRow>
        <TableCard flex={1.3}>
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

        <GraphColumn>
          <GraphCard>
            <div className="graph-header">
              <CardTitle style={{ marginBottom: 0 }}>
                Temperature Trend
              </CardTitle>
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
                  stroke="var(--point-green)"
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
                      <text
                        x={data.cx}
                        y={data.cy - 7}
                        className="tooltip-text"
                      >
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
        </GraphColumn>
      </BottomDataRow>
    </>
  );
};

export default DataAnalysisPage;

// --- Styled Components ---
const TopRow = styled.div`
  display: flex;
  gap: 1.5em;
  height: auto;
  margin-bottom: 0.5em;
`;
const FilterCard = styled(BaseCard)`
  flex: 1.8;
  flex-direction: row;
  align-items: center;
  gap: 2em;
  padding: 1em 2em;
  border: 1px solid #e2e8f0;
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    label {
      font-size: 0.8em;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
    }
    select,
    input[type='date'] {
      padding: 0.7em 1em;
      font-size: 0.95em;
      font-weight: 600;
      border-radius: 0.8em;
      border: 1px solid #cbd5e1;
      background-color: #f8fafc;
      color: var(--primary-dark);
      outline: none;
      transition: border-color 0.2s;
      &:focus {
        border-color: var(--point-green);
      }
    }
    .date-picker {
      display: flex;
      align-items: center;
      gap: 0.8em;
      span {
        font-weight: 700;
        color: #94a3b8;
      }
      .btn-search {
        padding: 0.7em 1.5em;
        border-radius: 0.8em;
        background-color: var(--point-green);
        color: white;
        font-weight: 700;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: #236026;
        }
      }
    }
  }
`;
const MiniKpiCard = styled(BaseCard)`
  flex: 1;
  padding: 1.5em;
  justify-content: space-between;
  position: relative;
  border: 1px solid #e2e8f0;
  .stat-label {
    font-size: 0.9em;
    font-weight: 700;
    color: #64748b;
    .icon {
      font-size: 1.2em;
      margin-right: 0.3em;
    }
  }
  .stat-value {
    font-size: 2.8em;
    font-weight: 800;
    color: var(--primary-dark);
    margin-top: 0.2em;
    .unit {
      font-size: 0.4em;
      color: #94a3b8;
      margin-left: 0.2em;
    }
  }
  .stat-value.point {
    color: var(--point-green);
  }
  .stat-trend {
    font-size: 0.85em;
    font-weight: 600;
    color: #94a3b8;
    margin-top: 0.2em;
  }
  .stat-trend.up {
    background-color: rgba(0, 194, 168, 0.1);
    color: var(--teal);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    display: inline-block;
  }
  &.highlight {
    background-color: rgba(46, 125, 50, 0.02);
    border: 2px solid var(--point-green);
  }
`;
const BottomDataRow = styled.div`
  flex: 1;
  display: flex;
  gap: 1.5em;
  min-height: 0;
`;
const TableCard = styled(BaseCard)`
  flex: 1.3;
  overflow: hidden;
  padding-bottom: 0.5em;
  border: 1px solid #e2e8f0;
`;
const TableWrapper = styled.div`
  flex: 1;
  margin-top: 1em;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 1em;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 0.95em;
  th {
    background-color: #f8fafc;
    color: #64748b;
    font-weight: 700;
    padding: 1.2em 0.5em;
    position: sticky;
    top: 0;
    z-index: 1;
    text-transform: uppercase;
    border-bottom: 2px solid #cbd5e1;
  }
  td {
    padding: 1.4em 0.5em;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    font-weight: 500;
  }
  tbody tr:nth-child(even) {
    background-color: #f8fafc;
  }
  tbody tr:hover {
    background-color: rgba(46, 125, 50, 0.05);
  }
  .time-col {
    font-weight: 700;
    color: var(--primary-dark);
  }
  .temp-col {
    color: var(--primary-dark);
    font-weight: 700;
  }
  .ai-badge {
    padding: 0.4em 0.8em;
    border-radius: 1.2em;
    font-size: 0.85em;
    font-weight: 700;
    &.good {
      background-color: rgba(0, 194, 168, 0.1);
      color: var(--teal);
    }
    &.action {
      background-color: rgba(230, 57, 70, 0.1);
      color: #e63946;
    }
  }
`;
const GraphColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
const GraphCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #e2e8f0;
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
      stroke: #e2e8f0;
      stroke-width: 0.5;
      stroke-dasharray: 4 4;
    }
    .data-point {
      cursor: pointer;
      .dot {
        fill: var(--primary-dark);
        transition: all 0.2s;
      }
      .tooltip-group {
        opacity: 0;
        pointer-events: none;
        transition: all 0.2s;
        transform: translateY(2px);
        .tooltip-bg {
          fill: white;
          stroke: var(--primary-dark);
          stroke-width: 0.5;
        }
        .tooltip-text {
          font-size: 4px;
          fill: var(--primary-dark);
          font-weight: 800;
          text-anchor: middle;
        }
      }
      &:hover .dot {
        r: 3;
        fill: var(--point-green);
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
  border-bottom: 2px solid #cbd5e1;
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
        font-weight: 700;
        color: #94a3b8;
        width: 2.5em;
        text-align: left;
      }
      .line {
        flex: 1;
        border-top: 1px dashed #e2e8f0;
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
        background: linear-gradient(180deg, #b2dfdb 0%, #00c2a8 100%);
        border-radius: 4px 4px 0 0;
        position: relative;
        cursor: pointer;
        transition:
          filter 0.2s,
          transform 0.2s;
        .bar-tooltip {
          position: absolute;
          top: -3em;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          color: var(--primary-dark);
          padding: 0.5em 1em;
          border-radius: 8px;
          font-size: 0.8em;
          font-weight: 700;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          &::after {
            border-width: 5px;
            border-style: solid;
            border-color: white transparent transparent transparent;
          }
          &::before {
            border-width: 5px;
            border-style: solid;
            border-color: #e2e8f0 transparent transparent transparent;
            z-index: -1;
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
        font-weight: 700;
        color: #64748b;
      }
    }
  }
`;
