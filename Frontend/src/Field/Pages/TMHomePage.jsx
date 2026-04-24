import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';
import { connectDashboardWebSocket, getDashboard } from '../api/fieldApi';
import { FIELD_BATCH_ID } from '../fieldConfig';
import c1 from '../../Admin/image/cctv1.png';
import fallback from '../../Admin/image/fallback.jpg';

export default function TMHomePage() {
  const [dashboard, setDashboard] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeRoom, setActiveRoom] = useState('A룸');
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  const handleRetryCamera = () => {
    setIsRetrying(true);

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }

    retryTimerRef.current = setTimeout(() => {
      setIsRetrying(false);
    }, 2000);
  };

  const rooms = {
    A룸: {
      branch: 'A동',
      status: 'Live',
      image: c1,
      updatedAt: '방금 전',
    },
    B룸: {
      branch: 'B동',
      status: 'Warning',
      image: fallback,
      updatedAt: '2분 전',
    },
    C룸: {
      branch: 'C동',
      status: 'Warning',
      image: fallback,
      updatedAt: '3분 전',
    },
  };

  const currentRoom = rooms[activeRoom] || rooms['A룸'];
  const isCameraLive = currentRoom.status === 'Live';

  useEffect(() => {
    let ws;
    let pingTimer;

    const bootstrap = async () => {
      try {
        const initial = await getDashboard(FIELD_BATCH_ID);
        setDashboard(initial);
      } catch (error) {
        console.error('Dashboard load failed:', error);
      }

      ws = connectDashboardWebSocket(FIELD_BATCH_ID, (payload) => {
        if (
          (payload?.type === 'dashboard_init' ||
            payload?.type === 'dashboard_update') &&
          payload.data
        ) {
          setDashboard(payload.data);
          setConnected(true);
        }
      });

      pingTimer = window.setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send('ping');
        }
      }, 5000);

      ws.onclose = () => setConnected(false);
    };

    bootstrap();

    return () => {
      if (pingTimer) window.clearInterval(pingTimer);
      if (ws && ws.readyState < 2) ws.close();
    };
  }, []);

  const sensors = dashboard?.sensors;
  const overview = dashboard?.overview;
  const eventHistory = dashboard?.device_logs ?? [];

  const cards = useMemo(
    () => [
      {
        label: '온도',
        value: sensors?.temperature?.value,
        unit: sensors?.temperature?.unit || '°C',
      },
      {
        label: '습도',
        value: sensors?.humidity?.value,
        unit: sensors?.humidity?.unit || '%',
      },
      {
        label: 'CO2',
        value: sensors?.co2?.value,
        unit: sensors?.co2?.unit || 'ppm',
      },
      {
        label: '토양수분',
        value: sensors?.soil_moisture?.value,
        unit: sensors?.soil_moisture?.unit || '%',
      },
    ],
    [sensors],
  );

  return (
    <FieldPageShell
      title="Home"
      rightText={connected ? 'LIVE' : 'SYNC'}
      selectedSector={activeRoom}
      onSectorChange={setActiveRoom}
    >
      <TopArea>
        <HeroCard>
          <div className="status">
            {connected ? 'WebSocket Connected' : 'API Sync'}
          </div>
          <h2>{overview?.summary || '환경 데이터를 불러오는 중입니다.'}</h2>
          <p>
            배치 {FIELD_BATCH_ID} · 생육 단계 {overview?.phase || '-'} · 점수{' '}
            {overview?.score ?? '-'}
          </p>
        </HeroCard>
        <CameraCard>
          <div className="camera-view">
            {isRetrying ? (
              <div className="camera-overlay">
                <div className="overlay-content">
                  <div className="overlay-badge retry">재연결 중</div>
                  <strong>실시간 영상 스트리밍 연결 중...</strong>
                  <span>카메라 신호를 다시 확인하고 있습니다.</span>
                </div>
              </div>
            ) : isCameraLive ? (
              <img
                src={currentRoom.image}
                alt={`${currentRoom.branch} CCTV`}
                className="camera-image"
              />
            ) : (
              <>
                <div
                  className="camera-fallback-bg"
                  style={{ backgroundImage: `url(${fallback})` }}
                />

                <div className="camera-overlay">
                  <div className="overlay-content">
                    <div className="overlay-badge">신호 없음</div>
                    <strong>카메라 연결이 불안정합니다</strong>
                    <span>현재 영상을 불러오지 못했습니다.</span>

                    <button className="retry-btn" onClick={handleRetryCamera}>
                      연결 재시도
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={`badge ${isCameraLive ? 'live' : 'warning'}`}>
            {isRetrying ? 'CONNECTING' : isCameraLive ? 'LIVE' : 'SIGNAL WEAK'}
          </div>

          <div className="room-badge">{currentRoom.branch}</div>
        </CameraCard>
      </TopArea>

      <SectionTitle>핵심 환경 상태</SectionTitle>
      <StatusGrid>
        {cards.map((card) => (
          <StatusCard key={card.label}>
            <span>{card.label}</span>
            <strong>
              {card.value ?? '-'}
              {card.value !== null && card.value !== undefined ? card.unit : ''}
            </strong>
          </StatusCard>
        ))}
      </StatusGrid>

      <SectionTitle>빠른 조치</SectionTitle>
      <ActionGrid>
        <ActionBtn $light>자동모드</ActionBtn>
        <ActionBtn $danger>긴급정지</ActionBtn>
      </ActionGrid>

      <SectionTitle>이벤트 내역</SectionTitle>
      <AlertList>
        {eventHistory.length === 0 ? (
          <EmptyText>표시할 이벤트가 없습니다.</EmptyText>
        ) : (
          eventHistory.slice(0, 4).map((item) => (
            <AlertItem key={item.id}>
              <div>
                <h4>{item.device || '장치 이벤트'}</h4>
                <p>{item.detail || '상세 메시지 없음'}</p>
              </div>
              <time>{item.time || '-'}</time>
            </AlertItem>
          ))
        )}
      </AlertList>
    </FieldPageShell>
  );
}

const TopArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.1fr;
    gap: 16px;
    margin-bottom: 18px;
  }
`;

const HeroCard = styled.section`
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 20px;
  padding: 18px;

  .status {
    display: inline-flex;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.45;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 26px;
    }
  }
`;

const CameraCard = styled.div`
  position: relative;
  height: 190px;
  border-radius: 20px;
  overflow: hidden;
  background: #0f172a;

  .retry-btn {
    margin-top: 10px;
    border: none;
    border-radius: 12px;
    padding: 10px 14px;
    background: #ffffff;
    color: #0f172a;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
  }

  .overlay-badge.retry {
    background: rgba(59, 130, 246, 0.16);
    border: 1px solid rgba(59, 130, 246, 0.35);
    color: #bfdbfe;
  }

  .camera-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #0f172a;
  }

  .camera-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .camera-fallback-bg {
    position: absolute;
    inset: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px) brightness(0.65);
    transform: scale(1.04);
  }

  .camera-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
  }

  .overlay-content {
    color: #ffffff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    strong {
      font-size: 15px;
      font-weight: 900;
    }

    span {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.78);
    }
  }

  .overlay-badge {
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #fecaca;
    font-size: 11px;
    font-weight: 800;
  }

  .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 11px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    z-index: 3;

    &.live {
      color: #fecaca;
    }

    &.warning {
      color: #fde68a;
    }
  }

  .room-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 8px 11px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    z-index: 3;
  }

  @media (min-width: 768px) {
    height: 240px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0 12px;

  @media (min-width: 768px) {
    font-size: 18px;
    margin: 14px 0 12px;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;

  span {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 22px;
    font-weight: 800;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ActionBtn = styled.button`
  height: 50px;
  border-radius: 14px;
  font-weight: 800;
  background: ${({ $danger, $light, theme }) =>
    $danger
      ? theme.colors.dangerBg
      : $light
        ? theme.colors.border
        : theme.colors.primary};
  color: ${({ $danger, $light, theme }) =>
    $danger ? theme.colors.danger : $light ? theme.colors.text : '#fff'};
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.subText};
  font-size: 14px;
`;

const AlertItem = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.4;
  }

  time {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 700;
    white-space: nowrap;
  }
`;
