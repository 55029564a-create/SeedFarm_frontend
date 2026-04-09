import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';

const DeviceControlPage = () => {
  // 🚨 1. 기기별로 값(value), 단위(unit), 조절범위(min/max/step)를 세밀하게 분리했습니다.
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'LED Grow Lights',
      isAuto: true,
      value: 80,
      unit: '%',
      min: 0,
      max: 100,
      step: 1,
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
    },
  ]);

  // 🚨 2. 선택된 기기의 'ID'만 기억하게 해서 왼쪽-오른쪽 화면이 완벽하게 동기화되게 수정!
  const [selectedId, setSelectedId] = useState(null);
  const selectedDevice = devices.find((d) => d.id === selectedId);

  const historyLogs = [
    {
      time: '14:20',
      device: 'Dehumidifier',
      action: '내부 습도 75% 초과 감지 -> 강제 제습 가동',
    },
    {
      time: '13:55',
      device: 'Nutrient Doser',
      action: '관리자 수동 개입: pH 하강제(산) 추가 투입',
    },
    {
      time: '12:30',
      device: 'LED Grow Lights',
      action: '스케줄 연동: 주간 모드(ON) 전환 완료',
    },
    {
      time: '11:00',
      device: 'HVAC',
      action: 'LED 발열로 인한 온도 상승 -> 냉방 모드 가동',
    },
  ];

  // 오토/매뉴얼 토글 함수
  const handleToggleAuto = (id, e) => {
    e.stopPropagation();
    setDevices(
      devices.map((dev) =>
        dev.id === id ? { ...dev, isAuto: !dev.isAuto } : dev,
      ),
    );
  };

  // 🚨 3. 슬라이더나 인풋창에서 값이 변할 때 즉시 전체 데이터를 업데이트하는 핵심 함수!
  const handleValueChange = (newVal) => {
    if (!selectedId) return;
    setDevices(
      devices.map((dev) =>
        dev.id === selectedId ? { ...dev, value: Number(newVal) } : dev,
      ),
    );
  };

  return (
    <>
      <SubMenuWrapper>
        <SubMenuBtn className="active">Sector 1 (토마토 A동)</SubMenuBtn>
        <SubMenuBtn>Sector 2 (토마토 B동)</SubMenuBtn>
        <SubMenuBtn>Sector 3 (육묘실)</SubMenuBtn>
        <SubMenuBtn>All Sectors</SubMenuBtn>
      </SubMenuWrapper>

      <LayoutGrid>
        {/* [좌측 영역] */}
        <LeftColumn>
          <ControlGroupCard>
            <div className="header-flex">
              <CardTitle style={{ marginBottom: 0 }}>
                Device Control Panel
              </CardTitle>
              <span className="info-badge">8 Devices Active</span>
            </div>
            <DeviceGrid>
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  onClick={() => setSelectedId(device.id)}
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

                  <div className="card-bottom">
                    <span
                      className={`status-badge ${device.isAuto ? 'auto' : 'manual'}`}
                    >
                      {device.isAuto ? 'AUTO' : 'MANUAL'}
                    </span>
                    <span className="target-value">
                      목표:{' '}
                      <span className="val">
                        {device.value}
                        {device.unit}
                      </span>
                    </span>
                  </div>
                </DeviceCard>
              ))}
            </DeviceGrid>
          </ControlGroupCard>

          <HistoryCard>
            <CardTitle>Recent Activity (1H)</CardTitle>
            <HistoryList>
              {historyLogs.map((log, idx) => (
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

        {/* [우측 영역] 디테일 패널 */}
        <RightColumn>
          <DetailCard>
            <CardTitle>Detail Adjustment</CardTitle>

            {!selectedDevice ? (
              <EmptyMessage>
                <div className="empty-icon">🎛️</div>
                <p>좌측에서 제어할 장치를 선택해주세요</p>
              </EmptyMessage>
            ) : selectedDevice.isAuto ? (
              <AutoLockedBox>
                <div className="icon-wrapper">
                  <span className="icon">🤖</span>
                </div>
                <h3>Auto Mode Active</h3>
                <p>
                  현재 <b>{selectedDevice.name}</b> 장치가
                  <br />
                  AI 스케줄러에 의해 <b>자동 제어</b> 중입니다.
                </p>
                <div className="warning-text">
                  수동 제어를 원하시면 좌측 카드에서
                  <br />
                  토글을 <b>MANUAL</b>로 변경해주세요.
                </div>
              </AutoLockedBox>
            ) : (
              <ManualControlBox>
                <div className="manual-header">
                  <h3>{selectedDevice.name}</h3>
                  <span className="override-badge">Manual Override</span>
                </div>

                <div className="slider-group">
                  <div className="slider-labels">
                    <label>목표치 수동 설정</label>
                    {/* 🚨 4. 직접 숫자를 타이핑해서 넣을 수 있는 인풋 박스 추가 */}
                    <div className="input-wrap">
                      <input
                        type="number"
                        value={selectedDevice.value}
                        step={selectedDevice.step}
                        min={selectedDevice.min}
                        max={selectedDevice.max}
                        onChange={(e) => handleValueChange(e.target.value)}
                      />
                      <span className="unit">{selectedDevice.unit}</span>
                    </div>
                  </div>

                  {/* 🚨 5. 움직이는 즉시 값이 변하는 슬라이더 */}
                  <input
                    type="range"
                    min={selectedDevice.min}
                    max={selectedDevice.max}
                    step={selectedDevice.step}
                    value={selectedDevice.value}
                    onChange={(e) => handleValueChange(e.target.value)}
                  />
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
                  <button className="btn-apply">설정 적용하기 (Apply)</button>
                  <button className="btn-stop">
                    강제 정지 (Emergency Stop)
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

// --- 🎨 하이엔드 벤토 스타일링 ---

const SubMenuWrapper = styled.div`
  display: flex;
  gap: 0.8em;
  margin-bottom: 1.5em;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubMenuBtn = styled.button`
  padding: 0.7em 1.5em;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  color: #64748b;
  font-weight: 700;
  font-size: 0.9em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
  }
  &.active {
    background-color: #0f172a;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
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
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);

  .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5em;
    .info-badge {
      background: #f1f5f9;
      color: #475569;
      font-size: 0.75em;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 20px;
    }
  }
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.5em;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  padding: 1.2em 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  min-width: 0;

  &:hover {
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    transform: translateY(-2px);
  }

  &.selected {
    background: #ffffff;
    border-color: rgba(16, 185, 129, 0.2);
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.08);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .device-name {
      font-weight: 800;
      font-size: 1em;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .status-badge {
      font-size: 0.7em;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 12px;
      letter-spacing: 0.05em;
      &.auto {
        background: rgba(16, 185, 129, 0.1);
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
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  .toggle-bg {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    position: relative;
    transition: background-color 0.3s;
    background-color: ${({ isOn }) => (isOn ? '#10B981' : '#CBD5E1')};
  }
  .toggle-knob {
    width: 18px;
    height: 18px;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: ${({ isOn }) => (isOn ? 'calc(100% - 21px)' : '3px')};
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const HistoryCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }

  li {
    padding: 0.8em 0;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    display: flex;
    align-items: flex-start;
    &:last-child {
      border-bottom: none;
    }
    .time {
      color: #94a3b8;
      font-weight: 700;
      font-size: 0.8em;
      width: 4em;
      padding-top: 0.1em;
      flex-shrink: 0;
    }
    .log-info {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      min-width: 0;
    }
    .device {
      color: #0f172a;
      font-weight: 800;
      font-size: 0.9em;
    }
    .action {
      color: #64748b;
      font-size: 0.85em;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const DetailCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
`;

const EmptyMessage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  .empty-icon {
    font-size: 3em;
    opacity: 0.5;
    filter: grayscale(1);
  }
  p {
    color: #94a3b8;
    font-weight: 600;
    font-size: 0.95em;
  }
`;

const AutoLockedBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 2em;
  border: 1px solid rgba(226, 232, 240, 0.6);

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    .icon {
      font-size: 2em;
    }
  }
  h3 {
    font-size: 1.2em;
    color: #0f172a;
    font-weight: 800;
    margin-bottom: 0.5em;
  }
  p {
    font-size: 0.9em;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1.5em;
    b {
      color: #10b981;
    }
  }
  .warning-text {
    font-size: 0.8em;
    font-weight: 600;
    color: #94a3b8;
    background: #f1f5f9;
    padding: 1em;
    border-radius: 12px;
    width: 100%;
    b {
      color: #475569;
    }
  }
`;

const ManualControlBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .manual-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    h3 {
      font-size: 1.3em;
      color: #0f172a;
      font-weight: 800;
      margin: 0;
    }
    .override-badge {
      font-size: 0.7em;
      font-weight: 800;
      background: #f1f5f9;
      color: #475569;
      padding: 4px 10px;
      border-radius: 8px;
      text-transform: uppercase;
    }
  }

  .slider-group {
    margin-bottom: 3em;
    background: #f8fafc;
    padding: 1.5em;
    border-radius: 16px;

    .slider-labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5em;
      label {
        font-size: 0.9em;
        font-weight: 700;
        color: #64748b;
      }

      /* 🚨 인풋 박스 하이엔드 디자인 */
      .input-wrap {
        display: flex;
        align-items: baseline;
        gap: 4px;
        background: #ffffff;
        padding: 0.4em 0.8em;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        input {
          width: 60px;
          border: none;
          outline: none;
          font-size: 1.5em;
          font-weight: 800;
          color: #10b981;
          text-align: right;
          background: transparent;
          /* 숫자 올리기/내리기 스피너 화살표 숨김 */
          &::-webkit-inner-spin-button,
          &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
        .unit {
          font-size: 0.9em;
          font-weight: 700;
          color: #94a3b8;
        }
      }
    }

    input[type='range'] {
      width: 100%;
      margin-bottom: 0.5em;
      -webkit-appearance: none;
      background: transparent;
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #10b981;
        margin-top: -8px;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
      }
    }
    .range-marks {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.7em;
        font-weight: 600;
        color: #94a3b8;
      }
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    margin-top: auto;
    button {
      padding: 1em;
      border-radius: 12px;
      font-size: 0.95em;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-apply {
      background-color: #10b981;
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
      &:hover {
        background-color: #059669;
        transform: translateY(-2px);
      }
    }
    .btn-stop {
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      &:hover {
        background-color: rgba(239, 68, 68, 0.15);
        transform: translateY(-2px);
      }
    }
  }
`;
