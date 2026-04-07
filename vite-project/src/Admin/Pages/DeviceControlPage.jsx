import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';
// 🚨 Sidebar, PageContainer, MainWrapper, TopHeader 등 불필요한 import 싹 다 삭제!

const DeviceControlPage = () => {
  // 1. 장치 상태 데이터
  const [devices, setDevices] = useState([
    { id: 1, name: 'Grow Lights', isAuto: true, target: '밝기 80%' },
    { id: 2, name: 'Water Pump', isAuto: false, target: '수분 40%' },
    { id: 3, name: 'Exhaust Fan', isAuto: true, target: '환기 2단계' },
    { id: 4, name: 'Nutrient Feed', isAuto: true, target: '양액 10L/h' },
    { id: 5, name: 'CO2 Gen', isAuto: false, target: '농도 800ppm' },
    { id: 6, name: 'Mist System', isAuto: true, target: '습도 65%' },
    { id: 7, name: 'Cooling System', isAuto: false, target: '온도 22°C' },
    { id: 8, name: 'Heating System', isAuto: true, target: '온도 20°C' },
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);

  // 2. 디바이스 히스토리 데이터
  const historyLogs = [
    {
      time: '14:20',
      device: 'Mist System',
      action: '습도 60% 도달로 자동 OFF',
    },
    {
      time: '13:55',
      device: 'Water Pump',
      action: '관리자 수동 개입: 급수 10분 진행',
    },
    {
      time: '12:30',
      device: 'Grow Lights',
      action: '일조량 부족으로 자동 ON (밝기 80%)',
    },
    {
      time: '11:00',
      device: 'Cooling System',
      action: '내부 온도 28°C 초과로 자동 ON',
    },
  ];

  const handleToggleAuto = (id, e) => {
    e.stopPropagation();
    setDevices(
      devices.map((dev) =>
        dev.id === id ? { ...dev, isAuto: !dev.isAuto } : dev,
      ),
    );
    if (selectedDevice && selectedDevice.id === id) {
      setSelectedDevice({ ...selectedDevice, isAuto: !selectedDevice.isAuto });
    }
  };

  return (
    // 🚨 빈 껍데기(<></>)로 최상위를 감싸고 바로 알맹이 시작!
    <>
      {/* 서브 메뉴 */}
      <SubMenuWrapper>
        <SubMenuBtn className="active">Sector 1 (토마토)</SubMenuBtn>
        <SubMenuBtn>Sector 2 (딸기)</SubMenuBtn>
        <SubMenuBtn>Sector 3 (파프리카)</SubMenuBtn>
        <SubMenuBtn>All Sectors</SubMenuBtn>
      </SubMenuWrapper>

      {/* 메인 레이아웃 그리드 */}
      <LayoutGrid>
        {/* [좌측 영역] */}
        <LeftColumn>
          <ControlGroupCard>
            <CardTitle>Manual or Auto Control</CardTitle>
            <DeviceGrid>
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className={selectedDevice?.id === device.id ? 'selected' : ''}
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
                      설정값: {device.target}
                    </span>
                  </div>
                </DeviceCard>
              ))}
            </DeviceGrid>
          </ControlGroupCard>

          <HistoryCard>
            <CardTitle>Device History (최근 1시간)</CardTitle>
            <HistoryList>
              {historyLogs.map((log, idx) => (
                <li key={idx}>
                  <span className="time">{log.time}</span>
                  <span className="device">[{log.device}]</span>
                  <span className="action">{log.action}</span>
                </li>
              ))}
            </HistoryList>
          </HistoryCard>
        </LeftColumn>

        {/* [우측 영역] 디테일 조정 패널 */}
        <RightColumn>
          <DetailCard>
            <CardTitle>Detail Adjustment</CardTitle>

            {!selectedDevice ? (
              <EmptyMessage>좌측에서 제어할 장치를 선택해주세요.</EmptyMessage>
            ) : selectedDevice.isAuto ? (
              <AutoLockedBox>
                <div className="icon">🔒</div>
                <h3>Auto Mode Active</h3>
                <p>
                  현재 <b>{selectedDevice.name}</b> 장치가{' '}
                  <b>자동(AUTO) 모드</b>로 제어되고 있습니다.
                </p>
                <p>
                  수동 조작을 원하시면 좌측 패널에서 장치를 <b>MANUAL(OFF)</b>로
                  변경해주세요.
                </p>
              </AutoLockedBox>
            ) : (
              <ManualControlBox>
                <h3>{selectedDevice.name} 수동 제어</h3>
                <div className="slider-group">
                  <label>목표치 상세 조정</label>
                  <input type="range" min="0" max="100" defaultValue="50" />
                  <div className="value-display">50%</div>
                </div>
                <div className="action-buttons">
                  <button className="btn-apply">적용하기 (Apply)</button>
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

// --- Styled Components ---

const SubMenuWrapper = styled.div`
  display: flex;
  gap: 1em;
  margin-bottom: 1.5em;
`;

const SubMenuBtn = styled.button`
  padding: 0.8em 2em;
  border: none;
  border-radius: 8px;
  background-color: var(--white);
  color: var(--subText);
  font-weight: 700;
  font-size: 0.95em;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  transition: all 0.2s;

  &.active {
    background-color: var(--primary-dark);
    color: var(--white);
  }
`;

const LayoutGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.5em;
  min-height: 0;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
`;

const ControlGroupCard = styled(BaseCard)`
  flex: 2;
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  flex: 1;
`;

const DeviceCard = styled.div`
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
  &.selected {
    border-color: var(--point-green);
    background-color: rgba(46, 125, 50, 0.05);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    .device-name {
      font-weight: 800;
      font-size: 1.1em;
      color: var(--primary-dark);
    }
  }

  .card-bottom {
    display: flex;
    align-items: center;
    gap: 0.8em;
    .status-badge {
      font-size: 0.75em;
      font-weight: 800;
      padding: 0.3em 0.8em;
      border-radius: 20px;
      &.auto {
        background: var(--light-green);
        color: white;
      }
      &.manual {
        background: #e2e8f0;
        color: #475569;
      }
    }
    .target-value {
      font-size: 0.9em;
      font-weight: 600;
      color: #64748b;
    }
  }
`;

const ToggleWrapper = styled.div`
  cursor: pointer;
  width: 3.5em;
  height: 1.8em;
  .toggle-bg {
    width: 100%;
    height: 100%;
    background-color: ${({ isOn }) =>
      isOn ? 'var(--point-green)' : '#CBD5E1'};
    border-radius: 2em;
    position: relative;
    transition: background-color 0.3s;
  }
  .toggle-knob {
    width: 1.4em;
    height: 1.4em;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 0.2em;
    left: ${({ isOn }) => (isOn ? 'calc(100% - 1.6em)' : '0.2em')};
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    padding: 0.8em 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.95em;
    display: flex;
    align-items: center;
    .time {
      color: #94a3b8;
      font-weight: 700;
      width: 4em;
    }
    .device {
      color: var(--primary-dark);
      font-weight: 800;
      margin-right: 0.5em;
    }
    .action {
      color: #475569;
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DetailCard = styled(BaseCard)`
  flex: 1;
`;

const EmptyMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 2em;
  .icon {
    font-size: 3em;
    margin-bottom: 0.5em;
  }
  h3 {
    font-size: 1.3em;
    color: var(--primary-dark);
    margin-bottom: 0.5em;
  }
  p {
    font-size: 1em;
    color: #64748b;
    line-height: 1.5;
  }
  b {
    color: var(--point-green);
  }
`;

const ManualControlBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  h3 {
    font-size: 1.4em;
    color: var(--primary-dark);
    margin-bottom: 1.5em;
    padding-bottom: 0.5em;
    border-bottom: 2px solid #f1f5f9;
  }
  .slider-group {
    margin-bottom: 3em;
    label {
      font-size: 1em;
      font-weight: 700;
      color: #64748b;
      display: block;
      margin-bottom: 1em;
    }
    input[type='range'] {
      width: 100%;
      margin-bottom: 1em;
      accent-color: var(--point-green);
    }
    .value-display {
      font-size: 2.5em;
      font-weight: 800;
      color: var(--point-green);
      text-align: center;
    }
  }
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: auto;
    button {
      padding: 1.2em;
      border-radius: 10px;
      font-size: 1.05em;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .btn-apply {
      background-color: var(--point-green);
      color: white;
    }
    .btn-apply:hover {
      background-color: #236026;
    }
    .btn-stop {
      background-color: rgba(230, 57, 70, 0.1);
      color: #e63946;
      border: 1px solid rgba(230, 57, 70, 0.3);
    }
    .btn-stop:hover {
      background-color: rgba(230, 57, 70, 0.2);
    }
  }
`;
