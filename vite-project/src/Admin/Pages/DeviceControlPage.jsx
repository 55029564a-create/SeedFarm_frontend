import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle } from './Styles/AdminShared';

const DeviceControlPage = () => {
  const { selectedBranch } = useOutletContext();
  const [activeSector, setActiveSector] = useState(1);

  const [sectorData, setSectorData] = useState({
    1: [
      {
        id: 1,
        name: 'LED Grow Lights',
        isAuto: true,
        value: 80,
        unit: '%',
        min: 0,
        max: 100,
        step: 1,
        safeMin: 60,
        safeMax: 90,
      },
      {
        id: 2,
        name: 'HVAC (공조기)',
        isAuto: true,
        value: 22,
        unit: '°C',
        min: 10,
        max: 35,
        step: 1,
        safeMin: 18,
        safeMax: 26,
      },
      {
        id: 3,
        name: 'Dehumidifier',
        isAuto: true,
        value: 65,
        unit: '%',
        min: 30,
        max: 80,
        step: 1,
        safeMin: 50,
        safeMax: 70,
      },
      {
        id: 4,
        name: 'Nutrient Doser',
        isAuto: true,
        value: 1.2,
        unit: 'EC',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        safeMin: 1.0,
        safeMax: 1.8,
      },
      {
        id: 5,
        name: 'CO2 Generator',
        isAuto: false,
        value: 800,
        unit: 'ppm',
        min: 400,
        max: 1500,
        step: 10,
        safeMin: 700,
        safeMax: 1200,
      },
      {
        id: 6,
        name: 'Circulation Fan',
        isAuto: true,
        value: 2,
        unit: '단계',
        min: 0,
        max: 5,
        step: 1,
        safeMin: 1,
        safeMax: 4,
      },
      {
        id: 7,
        name: 'Water Pump',
        isAuto: false,
        value: 2.5,
        unit: 'L',
        min: 0,
        max: 10,
        step: 0.5,
        safeMin: 1,
        safeMax: 5,
      },
      {
        id: 8,
        name: 'Water Chiller',
        isAuto: true,
        value: 18,
        unit: '°C',
        min: 10,
        max: 25,
        step: 1,
        safeMin: 16,
        safeMax: 22,
      },
    ],
    2: [
      {
        id: 1,
        name: 'LED Grow Lights',
        isAuto: false,
        value: 40,
        unit: '%',
        min: 0,
        max: 100,
        step: 1,
        safeMin: 60,
        safeMax: 90,
      },
      {
        id: 2,
        name: 'HVAC (공조기)',
        isAuto: true,
        value: 25,
        unit: '°C',
        min: 10,
        max: 35,
        step: 1,
        safeMin: 18,
        safeMax: 26,
      },
      {
        id: 3,
        name: 'Dehumidifier',
        isAuto: true,
        value: 55,
        unit: '%',
        min: 30,
        max: 80,
        step: 1,
        safeMin: 50,
        safeMax: 70,
      },
      {
        id: 4,
        name: 'Nutrient Doser',
        isAuto: true,
        value: 1.0,
        unit: 'EC',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        safeMin: 1.0,
        safeMax: 1.8,
      },
      {
        id: 5,
        name: 'CO2 Generator',
        isAuto: true,
        value: 600,
        unit: 'ppm',
        min: 400,
        max: 1500,
        step: 10,
        safeMin: 700,
        safeMax: 1200,
      },
      {
        id: 6,
        name: 'Circulation Fan',
        isAuto: true,
        value: 1,
        unit: '단계',
        min: 0,
        max: 5,
        step: 1,
        safeMin: 1,
        safeMax: 4,
      },
      {
        id: 7,
        name: 'Water Pump',
        isAuto: false,
        value: 1.5,
        unit: 'L',
        min: 0,
        max: 10,
        step: 0.5,
        safeMin: 1,
        safeMax: 5,
      },
      {
        id: 8,
        name: 'Water Chiller',
        isAuto: true,
        value: 20,
        unit: '°C',
        min: 10,
        max: 25,
        step: 1,
        safeMin: 16,
        safeMax: 22,
      },
    ],
    3: [
      {
        id: 1,
        name: 'LED Grow Lights',
        isAuto: true,
        value: 95,
        unit: '%',
        min: 0,
        max: 100,
        step: 1,
        safeMin: 60,
        safeMax: 90,
      },
      {
        id: 2,
        name: 'HVAC (공조기)',
        isAuto: true,
        value: 19,
        unit: '°C',
        min: 10,
        max: 35,
        step: 1,
        safeMin: 18,
        safeMax: 26,
      },
      {
        id: 3,
        name: 'Dehumidifier',
        isAuto: false,
        value: 45,
        unit: '%',
        min: 30,
        max: 80,
        step: 1,
        safeMin: 50,
        safeMax: 70,
      },
      {
        id: 4,
        name: 'Nutrient Doser',
        isAuto: true,
        value: 1.5,
        unit: 'EC',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        safeMin: 1.0,
        safeMax: 1.8,
      },
      {
        id: 5,
        name: 'CO2 Generator',
        isAuto: false,
        value: 950,
        unit: 'ppm',
        min: 400,
        max: 1500,
        step: 10,
        safeMin: 700,
        safeMax: 1200,
      },
      {
        id: 6,
        name: 'Circulation Fan',
        isAuto: true,
        value: 4,
        unit: '단계',
        min: 0,
        max: 5,
        step: 1,
        safeMin: 1,
        safeMax: 4,
      },
      {
        id: 7,
        name: 'Water Pump',
        isAuto: true,
        value: 4.0,
        unit: 'L',
        min: 0,
        max: 10,
        step: 0.5,
        safeMin: 1,
        safeMax: 5,
      },
      {
        id: 8,
        name: 'Water Chiller',
        isAuto: true,
        value: 15,
        unit: '°C',
        min: 10,
        max: 25,
        step: 1,
        safeMin: 16,
        safeMax: 22,
      },
    ],
  });

  const currentDevices = sectorData[activeSector];
  const [selectedId, setSelectedId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [tempValue, setTempValue] = useState(null);
  const selectedDevice = currentDevices.find((d) => d.id === selectedId);

  const getTrendData = useMemo(() => {
    return [40, 45, 42, 50, 48, 55, 52, 60].map((v) => v + Math.random() * 15);
  }, [activeSector, selectedId]);

  const handleSectorChange = (num) => {
    setActiveSector(num);
    setSelectedId(null);
    setTempValue(null);
  };

  const handleSelectDevice = (device) => {
    setSelectedId(device.id);
    setTempValue(device.value);
  };

  const handleToggleAuto = (id, e) => {
    e.stopPropagation();
    setSectorData({
      ...sectorData,
      [activeSector]: sectorData[activeSector].map((dev) =>
        dev.id === id ? { ...dev, isAuto: !dev.isAuto } : dev,
      ),
    });
  };

  const handleApply = () => {
    if (!selectedDevice) return;
    setSectorData({
      ...sectorData,
      [activeSector]: sectorData[activeSector].map((dev) =>
        dev.id === selectedId ? { ...dev, value: tempValue } : dev,
      ),
    });

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogs([
      {
        time: timeStr,
        device: selectedDevice.name,
        action: `[Sector ${activeSector}] ${tempValue}${selectedDevice.unit} 적용`,
      },
      ...logs,
    ]);
    alert('적용되었습니다.');
  };

  return (
    <>
      <SubMenuWrapper>
        {[1, 2, 3].map((num) => (
          <SubMenuBtn
            key={num}
            className={activeSector === num ? 'active' : ''}
            onClick={() => handleSectorChange(num)}
          >
            {num === 1 ? `${selectedBranch} - Sector 1` : `Sector ${num}`}
          </SubMenuBtn>
        ))}
      </SubMenuWrapper>

      <LayoutGrid>
        <LeftColumn>
          <ControlGroupCard>
            <div className="header-flex">
              <CardTitle style={{ marginBottom: 0, marginTop: 0 }}>
                Device Control Panel
              </CardTitle>
              <span className="info-badge">Expert Mode</span>
            </div>
            <DeviceGrid>
              {currentDevices.map((device) => {
                const isWarning =
                  device.value < device.safeMin ||
                  device.value > device.safeMax;
                return (
                  <DeviceCard
                    key={device.id}
                    onClick={() => handleSelectDevice(device)}
                    className={selectedId === device.id ? 'selected' : ''}
                  >
                    <div className="card-top">
                      <span className="device-name">{device.name}</span>
                      <ToggleWrapper
                        isOn={device.isAuto}
                        onClick={(e) => handleToggleAuto(device.id, e)}
                      >
                        <div className="toggle-bg">
                          <div className="toggle-knob"></div>
                        </div>
                      </ToggleWrapper>
                    </div>

                    <MiniChartWrapper>
                      <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient
                            id={`grad-${device.id}`}
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor={isWarning ? '#EF4444' : '#10B981'}
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor={isWarning ? '#EF4444' : '#10B981'}
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M 0,30 ${getTrendData.map((v, i) => `L ${i * 14.3},${30 - (v / 100) * 30}`).join(' ')} L 100,30 Z`}
                          fill={`url(#grad-${device.id})`}
                        />
                        <polyline
                          fill="none"
                          stroke={isWarning ? '#EF4444' : '#10B981'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={getTrendData
                            .map((v, i) => `${i * 14.3},${30 - (v / 100) * 30}`)
                            .join(' ')}
                        />
                        {(() => {
                          const lastVal = getTrendData[getTrendData.length - 1];
                          return (
                            <circle
                              cx="100"
                              cy={30 - (lastVal / 100) * 30}
                              r="3"
                              fill={isWarning ? '#EF4444' : '#10B981'}
                            />
                          );
                        })()}
                      </svg>
                    </MiniChartWrapper>

                    <div className="card-bottom">
                      <span
                        className={`status-badge ${device.isAuto ? 'auto' : 'manual'}`}
                      >
                        {device.isAuto ? 'AUTO' : 'MANUAL'}
                      </span>
                      <span
                        className={`target-value ${isWarning ? 'warning' : ''}`}
                      >
                        현재:{' '}
                        <span className="val">
                          {device.value}
                          {device.unit}
                        </span>
                      </span>
                    </div>
                  </DeviceCard>
                );
              })}
            </DeviceGrid>
          </ControlGroupCard>

          <HistoryCard>
            <CardTitle>Action Logs</CardTitle>
            <HistoryList>
              {logs.map((log, idx) => (
                <li key={idx}>
                  <span className="time">{log.time}</span>
                  <div className="log-info">
                    <span className="device">{log.device}</span>
                    <span className="action">{log.action}</span>
                  </div>
                </li>
              ))}
            </HistoryList>
          </HistoryCard>
        </LeftColumn>

        <RightColumn>
          <DetailCard>
            <CardTitle>Detail Adjustment</CardTitle>
            {!selectedDevice ? (
              <EmptyMessage>
                <p>장치를 선택해 주세요</p>
              </EmptyMessage>
            ) : selectedDevice.isAuto ? (
              <AutoLockedBox>
                <div className="icon-wrapper">
                  <span className="icon">🤖</span>
                </div>
                <h3>Auto Mode Active</h3>
                <p>AI가 최적 범위를 유지 중입니다.</p>
              </AutoLockedBox>
            ) : (
              <ManualControlBox>
                <div className="manual-header">
                  <h3>{selectedDevice.name}</h3>
                  <span className="override-badge">Manual Override</span>
                </div>
                <div className="slider-group">
                  <div className="slider-labels">
                    <label>
                      수동 설정 (권장: {selectedDevice.safeMin}~
                      {selectedDevice.safeMax})
                    </label>
                    <div className="input-wrap">
                      <input
                        type="number"
                        value={tempValue === 0 ? '' : tempValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTempValue(val === '' ? 0 : Number(val));
                        }}
                        onFocus={(e) => e.target.select()}
                      />
                      <span className="unit">{selectedDevice.unit}</span>
                    </div>
                  </div>

                  {/* 🚨 여기가 빠졌던 부분입니다. 렌더링 정상화 완료 */}
                  <div className="range-container">
                    <input
                      type="range"
                      min={selectedDevice.min}
                      max={selectedDevice.max}
                      step={selectedDevice.step}
                      value={tempValue}
                      onChange={(e) => setTempValue(Number(e.target.value))}
                    />
                    <SafeRangeBar
                      min={selectedDevice.min}
                      max={selectedDevice.max}
                      safeMin={selectedDevice.safeMin}
                      safeMax={selectedDevice.safeMax}
                    />
                  </div>
                  <div className="range-marks">
                    <span>
                      {selectedDevice.min}
                      {selectedDevice.unit}
                    </span>
                    <span>
                      {selectedDevice.max}
                      {selectedDevice.unit}
                    </span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn-apply" onClick={handleApply}>
                    설정 적용
                  </button>
                  <button
                    className="btn-stop"
                    onClick={() => alert('🚨 EMERGENCY STOP 가동')}
                  >
                    강제 정지
                  </button>
                </div>
              </ManualControlBox>
            )}
          </DetailCard>
        </RightColumn>
      </LayoutGrid>
    </>
  );
};

export default DeviceControlPage;

// --- 🎨 스타일 컴포넌트 (절대 삭제 금지) ---
const MiniChartWrapper = styled.div`
  height: 40px;
  margin: 10px 0;
  overflow: visible;
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
  }
`;

const SafeRangeBar = styled.div`
  position: absolute;
  top: 11px;
  left: 0;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  z-index: 1;
  /* 🚨 Linear Gradient를 이용해 슬라이더 트랙에 안전 영역 표시 */
  background: ${(props) => {
    const s1 = ((props.safeMin - props.min) / (props.max - props.min)) * 100;
    const s2 = ((props.safeMax - props.min) / (props.max - props.min)) * 100;
    return `linear-gradient(to right, #E2E8F0 0%, #E2E8F0 ${s1}%, #10B98144 ${s1}%, #10B98144 ${s2}%, #E2E8F0 ${s2}%, #E2E8F0 100%)`;
  }};
`;

const ManualControlBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  .range-container {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;

    input[type='range'] {
      width: 100%;
      -webkit-appearance: none;
      background: transparent;
      z-index: 5;
      cursor: pointer;
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px;
        background: transparent;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background: #10b981;
        margin-top: -7px;
        box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
      }
    }
  }
  .slider-group {
    background: #f8fafc;
    padding: 1.5em;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    .slider-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      label {
        font-size: 0.9em;
        font-weight: 700;
        color: #64748b;
      }
      .input-wrap {
        display: flex;
        align-items: baseline;
        gap: 5px;
        background: #fff;
        padding: 5px 10px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        input {
          width: 50px;
          border: none;
          outline: none;
          font-size: 1.2em;
          font-weight: 800;
          color: #10b981;
          text-align: right;
        }
        .unit {
          font-size: 0.8em;
          color: #94a3b8;
        }
      }
    }
    .range-marks {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.75em;
        color: #94a3b8;
      }
    }
  }
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    button {
      padding: 12px;
      border-radius: 12px;
      border: none;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s;
      &.btn-apply {
        background: #10b981;
        color: #fff;
        &:hover {
          background: #059669;
        }
      }
      &.btn-stop {
        background: #fef2f2;
        color: #ef4444;
        &:hover {
          background: #fee2e2;
        }
      }
    }
  }
`;

const LayoutGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.5em;
  min-height: 0;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;
const SubMenuWrapper = styled.div`
  display: flex;
  gap: 0.8em;
  margin-bottom: 1.5em;
`;
const SubMenuBtn = styled.button`
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 12px;
  background: #fff;
  color: #64748b;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  &.active {
    background: #0f172a;
    color: #fff;
  }
`;
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
  min-width: 0;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;
const ControlGroupCard = styled(BaseCard)`
  flex: 2;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
`;
const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2em;
  overflow-y: auto;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;
const DeviceCard = styled.div`
  background: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 1.2em;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.2s;
  &:hover {
    background: #fff;
    transform: translateY(-2px);
  }
  &.selected {
    background: #fff;
    border-color: #10b981;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.1);
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .device-name {
      font-weight: 800;
      color: #0f172a;
    }
  }
  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    .status-badge {
      font-size: 0.7em;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 10px;
      &.auto {
        background: #10b98115;
        color: #10b981;
      }
      &.manual {
        background: #e2e8f0;
        color: #64748b;
      }
    }
    .target-value {
      font-size: 0.8em;
      font-weight: 600;
      color: #94a3b8;
      &.warning .val {
        color: #ef4444;
      }
      .val {
        color: #0f172a;
        font-weight: 800;
        margin-left: 4px;
      }
    }
  }
`;
const ToggleWrapper = styled.div`
  cursor: pointer;
  width: 40px;
  height: 20px;
  .toggle-bg {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: ${(p) => (p.isOn ? '#10B981' : '#CBD5E1')};
    position: relative;
    transition: 0.3s;
  }
  .toggle-knob {
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: ${(p) => (p.isOn ? '23px' : '3px')};
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
const HistoryCard = styled(BaseCard)`
  flex: 1;
`;
const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  li {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.85em;
    .time {
      color: #94a3b8;
      font-weight: 700;
      width: 40px;
    }
    .log-info {
      display: flex;
      flex-direction: column;
      .device {
        font-weight: 800;
        color: #0f172a;
      }
      .action {
        color: #64748b;
      }
    }
  }
`;
const DetailCard = styled(BaseCard)`
  flex: 1;
  padding: 1.5em;
`;
const EmptyMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #94a3b8;
  font-weight: 600;
`;
const AutoLockedBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  h3 {
    margin: 0;
    color: #0f172a;
  }
  p {
    color: #64748b;
    margin: 0;
  }
`;
