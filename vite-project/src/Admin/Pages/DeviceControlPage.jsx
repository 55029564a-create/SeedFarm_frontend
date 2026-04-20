import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';

const DeviceControlPage = () => {
  const { selectedBranch } = useOutletContext();
  const [activeSector, setActiveSector] = useState(1);

  // 🚨 한글화 및 환경 목표 중심으로 세팅된 데이터
  const [sectorData, setSectorData] = useState({
    1: [
      {
        id: 'temp',
        name: '목표 온도',
        isAuto: true,
        value: 22.0,
        unit: '°C',
        min: 10,
        max: 35,
        step: 0.5,
        safeMin: 18,
        safeMax: 26,
        relatedDevice: '공조기, 환기팬',
      },
      {
        id: 'humi',
        name: '목표 습도',
        isAuto: true,
        value: 65,
        unit: '%',
        min: 30,
        max: 90,
        step: 1,
        safeMin: 50,
        safeMax: 70,
        relatedDevice: '제습기, 환기팬',
      },
      {
        id: 'light',
        name: '목표 광량',
        isAuto: true,
        value: 80,
        unit: '%',
        min: 0,
        max: 100,
        step: 1,
        safeMin: 60,
        safeMax: 90,
        relatedDevice: 'LED 시스템',
      },
      {
        id: 'pump',
        name: '일일 관수량',
        isAuto: true,
        value: 2.5,
        unit: 'L',
        min: 0,
        max: 10,
        step: 0.5,
        safeMin: 1,
        safeMax: 5,
        relatedDevice: '메인 펌프',
      },
      {
        id: 'nutri',
        name: '양액 농도 (EC)',
        isAuto: true,
        value: 1.2,
        unit: 'EC',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        safeMin: 1.0,
        safeMax: 1.8,
        relatedDevice: '양액 배합기',
      },
      {
        id: 'co2',
        name: '대기 CO2 농도',
        isAuto: false,
        value: 800,
        unit: 'ppm',
        min: 400,
        max: 1500,
        step: 10,
        safeMin: 700,
        safeMax: 1200,
        relatedDevice: 'CO2 발생기',
      },
    ],
  });

  const currentDevices = sectorData[activeSector] || sectorData[1];
  const [selectedId, setSelectedId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [tempValue, setTempValue] = useState(null);
  const selectedDevice = currentDevices.find((d) => d.id === selectedId);

  const handleApply = () => {
    if (!selectedDevice) return;
    setSectorData({
      ...sectorData,
      [activeSector]: sectorData[activeSector].map((dev) =>
        dev.id === selectedId ? { ...dev, value: tempValue } : dev,
      ),
    });

    const timeStr = new Date().toLocaleTimeString('ko-KR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    setLogs([
      {
        time: timeStr,
        device: selectedDevice.name,
        action: `[강제 지정] 목표치 ${tempValue}${selectedDevice.unit} 적용 완료`,
      },
      ...logs,
    ]);
    alert('새로운 목표 수치가 시스템에 전송되었습니다.');
  };

  const handleEmergencyStop = (id, e) => {
    e.stopPropagation();
    const deviceName = currentDevices.find((d) => d.id === id).name;
    const timeStr = new Date().toLocaleTimeString('ko-KR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    setSectorData({
      ...sectorData,
      [activeSector]: sectorData[activeSector].map((dev) =>
        dev.id === id ? { ...dev, isAuto: false, value: 0 } : dev,
      ),
    });
    setLogs([
      {
        time: timeStr,
        device: deviceName,
        action: `🚨 긴급 차단 (EMERGENCY STOP) 발령`,
      },
      ...logs,
    ]);
    alert(`🚨 [경고] ${deviceName} 연동 기기가 즉시 강제 차단되었습니다.`);
  };

  return (
    <>
      <SubMenuWrapper>
        {[1, 2, 3].map((num) => (
          <SubMenuBtn
            key={num}
            className={activeSector === num ? 'active' : ''}
            onClick={() => setActiveSector(num)}
          >
            {num === 1 ? `${selectedBranch} - ${num}구역` : `${num}구역`}
          </SubMenuBtn>
        ))}
      </SubMenuWrapper>

      <LayoutGrid>
        {/* 🚨 LeftColumn 대신 Flex 사용 */}
        <Flex dir="column" gap="1.5em" style={{ minWidth: 0 }}>
          <ControlGroupCard>
            <div
              className="header-flex"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.2em',
              }}
            >
              <CardTitle style={{ margin: 0 }}>지능형 목표 수치 설정</CardTitle>
              <ModeBadge>마스터 권한 활성화</ModeBadge>
            </div>

            <DeviceGrid>
              {currentDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  onClick={() => {
                    setSelectedId(device.id);
                    setTempValue(device.value);
                  }}
                  className={selectedId === device.id ? 'selected' : ''}
                >
                  <div className="card-top">
                    <span className="device-name">{device.name}</span>
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        className={`status-tag ${device.isAuto ? 'auto' : 'manual'}`}
                      >
                        {device.isAuto ? '자동' : '수동'}
                      </span>
                      <StopBtn
                        onClick={(e) => handleEmergencyStop(device.id, e)}
                      >
                        긴급 정지
                      </StopBtn>
                    </div>
                  </div>

                  <div className="card-mid">
                    <div className="val-box">
                      <span className="label">현재 목표치</span>
                      <span className="value">
                        {device.value}
                        {device.unit}
                      </span>
                    </div>
                    <div className="info-box">
                      <span>연동 기기: {device.relatedDevice}</span>
                    </div>
                  </div>
                </DeviceCard>
              ))}
            </DeviceGrid>
          </ControlGroupCard>

          <HistoryCard>
            <CardTitle>씨팜 영농일지 (운영 기록)</CardTitle>
            <HistoryList>
              {logs.map((log, idx) => (
                <li
                  key={idx}
                  className={log.action.includes('긴급') ? 'emergency' : ''}
                >
                  <span className="time">{log.time}</span>
                  <div className="log-content">
                    <strong>{log.device}</strong>
                    <span>{log.action}</span>
                  </div>
                </li>
              ))}
            </HistoryList>
          </HistoryCard>
        </Flex>

        <Flex dir="column" style={{ minWidth: 0 }}>
          <DetailCard>
            <CardTitle>세부 목표 수치 개입</CardTitle>
            {!selectedDevice ? (
              <EmptyState>
                제어할 환경 지표를 좌측에서 선택해 주세요.
              </EmptyState>
            ) : selectedDevice.isAuto ? (
              <AutoLockedBox>
                <div className="status-ring">
                  <span className="ai-icon">🤖</span>
                </div>
                <h3>AI 최적화 가동 중</h3>
                <p>
                  시스템이{' '}
                  <strong>
                    {selectedDevice.safeMin}
                    {selectedDevice.unit} ~ {selectedDevice.safeMax}
                    {selectedDevice.unit}
                  </strong>{' '}
                  사이의
                  <br />
                  최적 생육 타겟을 자동 유지하고 있습니다.
                </p>
                <button
                  className="switch-btn"
                  onClick={(e) => {
                    setSectorData({
                      ...sectorData,
                      [activeSector]: sectorData[activeSector].map((d) =>
                        d.id === selectedId ? { ...d, isAuto: false } : d,
                      ),
                    });
                  }}
                >
                  목표값 강제 개입 (수동 모드)
                </button>
              </AutoLockedBox>
            ) : (
              <PremiumControlArea>
                <div className="override-header">
                  <div className="title-area">
                    <h4>{selectedDevice.name} 강제 지정</h4>
                    <span className="badge">마스터 권한</span>
                  </div>
                  <p className="limit-info">
                    안전 허용 범위: {selectedDevice.safeMin} ~{' '}
                    {selectedDevice.safeMax} {selectedDevice.unit}
                  </p>
                </div>

                <div className="target-display">
                  <span className="target-label">새로운 목표 수치 설정</span>
                  <div className="number-group">
                    <input
                      type="number"
                      value={tempValue}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val > selectedDevice.safeMax)
                          val = selectedDevice.safeMax;
                        if (val < selectedDevice.safeMin)
                          val = selectedDevice.safeMin;
                        setTempValue(val);
                      }}
                    />
                    <span className="unit">{selectedDevice.unit}</span>
                  </div>
                </div>

                {/* 🚨 뚝뚝 끊김을 완벽하게 해결한 하이엔드 슬라이더 */}
                <SliderContainer
                  style={{
                    '--slider-ratio':
                      (tempValue - selectedDevice.safeMin) /
                      (selectedDevice.safeMax - selectedDevice.safeMin),
                  }}
                >
                  <input
                    type="range"
                    min={selectedDevice.safeMin}
                    max={selectedDevice.safeMax}
                    step={selectedDevice.step}
                    value={tempValue}
                    onChange={(e) => setTempValue(Number(e.target.value))}
                  />
                </SliderContainer>

                <div className="slider-labels">
                  <span>최소 {selectedDevice.safeMin}</span>
                  <span>최대 {selectedDevice.safeMax}</span>
                </div>

                <div className="action-row">
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setSectorData({
                        ...sectorData,
                        [activeSector]: sectorData[activeSector].map((d) =>
                          d.id === selectedId ? { ...d, isAuto: true } : d,
                        ),
                      });
                    }}
                  >
                    취소 (자동 복귀)
                  </button>
                  <button className="btn-apply" onClick={handleApply}>
                    수치 전송 (적용)
                  </button>
                </div>
              </PremiumControlArea>
            )}
          </DetailCard>
        </Flex>
      </LayoutGrid>
    </>
  );
};

export default DeviceControlPage;

// --- 🎨 하이엔드 스타일 유지 (한글화 크기 미세 조정) ---

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
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  background: #fff;
  color: #64748b;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
  }
  &:active {
    transform: scale(0.97);
  }
  &.active {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  }
`;

const ControlGroupCard = styled(BaseCard)`
  flex: 2;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.05),
    0 10px 15px -3px rgba(15, 23, 42, 0.05),
    0 0 0 1px rgba(226, 232, 240, 0.8);
`;
const ModeBadge = styled.span`
  background: #f1f5f9;
  color: #475569;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid #e2e8f0;
`;
const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2em;
  overflow-y: auto;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
    &:hover {
      background: #94a3b8;
    }
  }
`;
const DeviceCard = styled.div`
  margin-top: 6px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.2em;
  cursor: pointer;
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background: #ffffff;
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(15, 23, 42, 0.1);
  }
  &.selected {
    background: #ffffff;
    border-color: #10b981;
    box-shadow:
      0 0 0 3px rgba(16, 185, 129, 0.15),
      0 4px 16px rgba(16, 185, 129, 0.1);
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .device-name {
      font-weight: 800;
      color: #0f172a;
      font-size: 1.1em;
      letter-spacing: -0.02em;
    }
    .status-tag {
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      &.auto {
        background: #ecfdf5;
        color: #10b981;
        border: 1px solid #d1fae5;
      }
      &.manual {
        background: #fef2f2;
        color: #ef4444;
        border: 1px solid #fecaca;
      }
    }
  }
  .card-mid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .val-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .label {
        font-size: 12px;
        font-weight: 700;
        color: #64748b;
      }
      .value {
        font-size: 1.4em;
        font-weight: 900;
        color: #0f172a;
      }
    }
    .info-box {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
      padding-top: 8px;
      border-top: 1px dashed #e2e8f0;
    }
  }
`;
const StopBtn = styled.button`
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
<<<<<<< HEAD
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
  transition: 0.2s;
  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
=======
  width: 40px;
  height: 20px;
  .toggle-bg {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: ${(p) => (p.$isOn ? '#10B981' : '#CBD5E1')};
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
    left: ${(p) => (p.$isOn ? '23px' : '3px')};
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
>>>>>>> e39c9cef2216581ecee4ce46559c03168e9ccb55
  }
`;
const HistoryCard = styled(BaseCard)`
  flex: 1;
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.05),
    0 0 0 1px rgba(226, 232, 240, 0.8);
`;
const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
  li {
    display: flex;
    gap: 15px;
    padding: 12px 0;
    border-bottom: 1px solid #f8fafc;
    transition: background 0.2s;
    &.emergency {
      background: #fff1f2;
      padding-left: 10px;
      border-radius: 8px;
      .time,
      strong,
      span {
        color: #e11d48;
      }
    }
    &:hover {
      background: #f8fafc;
      border-radius: 8px;
      padding-left: 8px;
    }
    .time {
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      width: 60px;
    }
    .log-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      strong {
        color: #0f172a;
        font-weight: 800;
      }
      span {
        color: #64748b;
        font-weight: 600;
      }
    }
  }
`;
const DetailCard = styled(BaseCard)`
  flex: 1;
  padding: 1.5em;
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.05),
    0 0 0 1px rgba(226, 232, 240, 0.8);
`;
const EmptyState = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #94a3b8;
  font-weight: 600;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  min-height: 200px;
`;
const AutoLockedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 15px;
  padding: 2em;
  .status-ring {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ecfdf5;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.1);
    margin-bottom: 10px;
    .ai-icon {
      font-size: 36px;
    }
  }
  h3 {
    color: #0f172a;
    margin: 0;
    font-size: 1.3em;
    font-weight: 800;
  }
  p {
    font-size: 0.95em;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }
  strong {
    color: #10b981;
  }
  .switch-btn {
    margin-top: 15px;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    background: #0f172a;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    transition: 0.2s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.3);
    }
  }
`;
const PremiumControlArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .override-header {
    margin-bottom: 25px;
    .title-area {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
      h4 {
        margin: 0;
        font-size: 1.1em;
        font-weight: 800;
        color: #0f172a;
      }
      .badge {
        background: #fee2e2;
        color: #dc2626;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.75em;
        font-weight: 800;
      }
    }
    .limit-info {
      margin: 0;
      font-size: 0.8em;
      color: #64748b;
      font-weight: 600;
    }
  }
  .target-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #e2e8f0;
    .target-label {
      font-size: 0.8em;
      font-weight: 800;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .number-group {
      display: flex;
      align-items: baseline;
      gap: 6px;
      input {
        width: 120px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 3em;
        font-weight: 900;
        color: #10b981;
        text-align: center;
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      .unit {
        font-size: 1.2em;
        font-weight: 700;
        color: #64748b;
      }
    }
  }
  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: auto;
    span {
      font-size: 0.75em;
      font-weight: 700;
      color: #94a3b8;
    }
  }
  .action-row {
    display: flex;
    gap: 12px;
    margin-top: 30px;
    button {
      flex: 1;
      padding: 14px;
      border-radius: 12px;
      font-size: 0.95em;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      border: none;
    }
    .btn-cancel {
      background: #f1f5f9;
      color: #64748b;
      &:hover {
        background: #e2e8f0;
      }
    }
    .btn-apply {
      background: #0f172a;
      color: #fff;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.1);
      &:hover {
        background: #1e293b;
        transform: translateY(-2px);
      }
    }
  }
`;

// 🚨 테슬라/스마트홈 스타일의 초정밀 슬라이더 스타일
const SliderContainer = styled.div`
  width: 100%;
  height: 36px;
  background: #e2e8f0;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);

  input[type='range'] {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    background: transparent;
    outline: none;
    cursor: grab;
    position: relative;
    z-index: 10;
    margin: 0;
    padding: 0;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border: 2px solid #e2e8f0;
      cursor: grabbing;
      transition: 0.1s ease;
    }
    &:active::-webkit-slider-thumb {
      transform: scale(0.9);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 18px;

    /* 💡 수정된 핵심 로직: 
       시작점(0%)에서는 18px(정중앙)부터 출발하고, 
       끝점(100%)에 도달하면 정확히 100%로 꽉 차도록 오차를 보정함.
       중간에 드래그할 때는 게이지 끝부분이 동그라미 '안쪽'에 숨어서 따라다님. */
    background: linear-gradient(
      90deg,
      #10b981 0%,
      #10b981 calc(18px + (100% - 18px) * var(--slider-ratio)),
      transparent calc(18px + (100% - 18px) * var(--slider-ratio))
    );
    pointer-events: none;
    z-index: 5;
  }
`;
