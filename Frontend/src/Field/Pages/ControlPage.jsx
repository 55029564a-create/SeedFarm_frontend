import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';

const API_BASE = 'http://127.0.0.1:8000/api';
const batchId = 1;

const initialDevices = [
  {
    id: 'fan',
    name: '환기팬',
    mode: 'auto',
    value: 50,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 20,
    safeMax: 80,
    relatedDevice: 'fan',
  },
  {
    id: 'irrigation',
    name: '관수 장치',
    mode: 'auto',
    value: 40,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 20,
    safeMax: 70,
    relatedDevice: 'irrigation',
  },
  {
    id: 'fertigation',
    name: '양액 공급기',
    mode: 'auto',
    value: 45,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 20,
    safeMax: 80,
    relatedDevice: 'fertigation',
  },
  {
    id: 'humidifier',
    name: '가습기',
    mode: 'auto',
    value: 60,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 40,
    safeMax: 75,
    relatedDevice: 'humidifier',
  },
  {
    id: 'heater',
    name: '히터',
    mode: 'manual',
    value: 100,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 0,
    safeMax: 100,
    relatedDevice: 'heater',
  },
  {
    id: 'cooler',
    name: '냉방기',
    mode: 'auto',
    value: 0,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 0,
    safeMax: 100,
    relatedDevice: 'cooler',
  },
  {
    id: 'co2_gen',
    name: 'CO₂ 발생기',
    mode: 'auto',
    value: 50,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 20,
    safeMax: 80,
    relatedDevice: 'co2_gen',
  },
  {
    id: 'light',
    name: 'LED 조명',
    mode: 'manual',
    value: 100,
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    safeMin: 0,
    safeMax: 100,
    relatedDevice: 'light',
  },
];

export default function ControlPage() {
  const [devices, setDevices] = useState(initialDevices);
  const [selectedId, setSelectedId] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const selectedDevice = devices.find((d) => d.id === selectedId);
  const manualCount = devices.filter((d) => d.mode === 'manual').length;

  useEffect(() => {
    const applyGlobalControlState = () => {
      const saved = localStorage.getItem('globalControlState');
      if (!saved) return;

      const state = JSON.parse(saved);

      if (state.mode === 'auto') {
        setDevices((prev) =>
          prev.map((device) => ({
            ...device,
            mode: 'auto',
          })),
        );
        setEmergency(false);
      }

      if (state.mode === 'emergency') {
        setEmergency(true);
      }
    };

    applyGlobalControlState();

    window.addEventListener(
      'globalControlStateChanged',
      applyGlobalControlState,
    );

    window.addEventListener('storage', applyGlobalControlState);

    return () => {
      window.removeEventListener(
        'globalControlStateChanged',
        applyGlobalControlState,
      );

      window.removeEventListener('storage', applyGlobalControlState);
    };
  }, []);

  const updateDevice = (id, nextData) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, ...nextData } : device,
      ),
    );
  };

  const changeMode = async (deviceId, mode) => {
    const res = await fetch(`${API_BASE}/control/device/mode/${batchId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device: deviceId, mode }),
    });

    if (!res.ok) throw new Error('모드 변경 실패');

    updateDevice(deviceId, { mode });
  };

  const changeTarget = async (deviceId, value) => {
    const res = await fetch(`${API_BASE}/control/device/target/${batchId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device: deviceId, value }),
    });

    if (!res.ok) throw new Error('목표값 설정 실패');

    updateDevice(deviceId, { value });
  };

  const handleManualMode = async () => {
    if (!selectedDevice) return;

    try {
      setLoading(true);
      await changeMode(selectedDevice.id, 'manual');
      updateDevice(selectedDevice.id, { mode: 'manual' });
    } catch (err) {
      console.error(err);
      alert('수동 모드 전환에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoMode = async () => {
    if (!selectedDevice) return;

    try {
      setLoading(true);
      await changeMode(selectedDevice.id, 'auto');
      updateDevice(selectedDevice.id, { mode: 'auto' });
    } catch (err) {
      console.error(err);
      alert('자동 모드 복귀에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedDevice) return;

    try {
      setLoading(true);
      await changeMode(selectedDevice.id, 'manual');
      await changeTarget(selectedDevice.id, tempValue);

      alert('새로운 목표 수치가 전송되었습니다.');
    } catch (err) {
      console.error(err);
      alert('목표 수치 적용에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyStop = async (deviceId, e) => {
    e.stopPropagation();

    const targetDevice = devices.find((d) => d.id === deviceId);
    if (!targetDevice) return;

    if (!window.confirm(`${targetDevice.name} 장치를 긴급 정지할까요?`)) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/control/emergency/${batchId}/${deviceId}?is_stop=true`,
        { method: 'POST' },
      );

      if (!res.ok) throw new Error('긴급 정지 실패');

      setEmergency(true);
      alert(`${targetDevice.name} 긴급 정지가 실행되었습니다.`);
    } catch (err) {
      console.error(err);
      alert('긴급 정지에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FieldPageShell
      title="Control"
      rightText={manualCount > 0 ? 'Manual Mode' : 'Auto Mode'}
    >
      <StatusStrip>
        <StatusCard>
          <span>자동 제어</span>
          <strong>{manualCount > 0 ? '부분 수동' : '활성'}</strong>
        </StatusCard>

        <StatusCard>
          <span>수동 장치</span>
          <strong>{manualCount}</strong>
        </StatusCard>

        <StatusCard $danger={emergency}>
          <span>긴급 상태</span>
          <strong>{emergency ? '정지 발생' : '없음'}</strong>
        </StatusCard>
      </StatusStrip>

      <DevicePanel>
        <SectionTitle>장치 상태</SectionTitle>

        <DeviceGrid>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              className={selectedId === device.id ? 'selected' : ''}
              onClick={() => {
                setSelectedId(device.id);
                setTempValue(device.value);
              }}
            >
              <div className="top">
                <div>
                  <div className="name">{device.name}</div>
                  <div className="target">
                    현재 목표값: {device.value}
                    {device.unit}
                  </div>
                </div>

                <div className="badges">
                  <ModeBadge $mode={device.mode}>
                    {device.mode === 'auto' ? '자동' : '수동'}
                  </ModeBadge>

                  <StopBtn
                    disabled={loading}
                    onClick={(e) => handleEmergencyStop(device.id, e)}
                  >
                    긴급 정지
                  </StopBtn>
                </div>
              </div>

              <div className="info">연동 장치: {device.relatedDevice}</div>
            </DeviceCard>
          ))}
        </DeviceGrid>
      </DevicePanel>

      <ManualAdjustPanel>
        <SectionTitle>수동 조정</SectionTitle>

        {!selectedDevice ? (
          <EmptyText>조정할 장치를 선택해주세요.</EmptyText>
        ) : selectedDevice.mode === 'auto' ? (
          <AutoBox>
            <strong>{selectedDevice.name}</strong>
            <p>현재 AI 자동 제어 중입니다.</p>
            <button disabled={loading} onClick={handleManualMode}>
              목표값 강제 개입
            </button>
          </AutoBox>
        ) : (
          <AdjustCard>
            <div className="adjust-head">
              <div>
                <strong>{selectedDevice.name}</strong>
                <p>
                  안전 범위 {selectedDevice.safeMin}
                  {selectedDevice.unit} ~ {selectedDevice.safeMax}
                  {selectedDevice.unit}
                </p>
              </div>
              <button disabled={loading} onClick={handleAutoMode}>
                자동 복귀
              </button>
            </div>

            <input
              type="range"
              min={selectedDevice.safeMin}
              max={selectedDevice.safeMax}
              step={selectedDevice.step}
              value={tempValue ?? selectedDevice.value}
              onChange={(e) => setTempValue(Number(e.target.value))}
            />

            <div className="value">
              {tempValue}
              {selectedDevice.unit}
            </div>

            <ApplyBtn disabled={loading} onClick={handleApply}>
              수치 전송
            </ApplyBtn>
          </AdjustCard>
        )}
      </ManualAdjustPanel>
    </FieldPageShell>
  );
}

const StatusStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
`;

const StatusCard = styled.div`
  background: ${({ $danger }) => ($danger ? '#fee2e2' : '#ffffff')};
  border-radius: 16px;
  padding: 14px 12px;

  span {
    display: block;
    font-size: 12px;
    color: ${({ $danger }) => ($danger ? '#dc2626' : '#6b7280')};
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 20px;
    color: ${({ $danger }) => ($danger ? '#dc2626' : '#111827')};
    font-weight: 800;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
`;

const DevicePanel = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 12px;
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const DeviceCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  &.selected {
    background: #ffffff;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.14);
  }

  .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .name {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 6px;
  }

  .target,
  .info {
    font-size: 13px;
    color: #6b7280;
    font-weight: 600;
  }

  .badges {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }
`;

const ModeBadge = styled.div`
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  background: ${({ $mode }) => ($mode === 'auto' ? '#dcfce7' : '#fee2e2')};
  color: ${({ $mode }) => ($mode === 'auto' ? '#166534' : '#dc2626')};
`;

const StopBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  background: #ef4444;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
`;

const ManualAdjustPanel = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;

  position: sticky;
  bottom: 12px;
  z-index: 20;

  box-shadow:
    0 -6px 18px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(226, 232, 240, 0.9);
`;

const EmptyText = styled.div`
  padding: 24px 12px;
  border-radius: 14px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

const AutoBox = styled.div`
  padding: 22px 14px;
  border-radius: 16px;
  background: #f9fafb;
  text-align: center;

  strong {
    font-size: 17px;
    color: #111827;
  }

  p {
    margin: 8px 0 14px;
    font-size: 13px;
    font-weight: 700;
    color: #6b7280;
  }

  button {
    height: 44px;
    padding: 0 18px;
    border-radius: 12px;
    background: #111827;
    color: #ffffff;
    font-weight: 800;
  }
`;

const AdjustCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 14px;

  .adjust-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;

    strong {
      font-size: 16px;
      color: #111827;
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #6b7280;
      font-weight: 700;
    }

    button {
      height: 36px;
      padding: 0 12px;
      border-radius: 10px;
      background: #e5e7eb;
      color: #374151;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }
  }

  input[type='range'] {
    width: 100%;
    accent-color: #2f6f4f;
  }

  .value {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 14px;
    font-size: 30px;
    font-weight: 900;
    color: #2f6f4f;
  }
`;

const ApplyBtn = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 14px;
  background: #2f6f4f;
  color: #ffffff;
  font-weight: 800;
`;
