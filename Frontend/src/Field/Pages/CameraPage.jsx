import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';
import c1 from '../../Admin/image/cctv1.png';
import fallback from '../../Admin/image/fallback.jpg';
import { FIELD_CAMERA_STREAM_URL } from '../fieldConfig';

const rooms = {
  A: {
    label: 'A룸',
    branch: 'A동',
    status: 'Live',
    image: c1,
    updatedAt: '방금 전',
  },
  B: {
    label: 'B룸',
    branch: 'B동',
    status: 'Warning',
    image: fallback,
    updatedAt: '2분 전',
  },
  C: {
    label: 'C룸',
    branch: 'C동',
    status: 'Warning',
    image: fallback,
    updatedAt: '3분 전',
  },
};

const roomKeyMap = {
  A룸: 'A',
  B룸: 'B',
  C룸: 'C',
};

export default function CameraPage() {
  const [activeRoom, setActiveRoom] = useState('A룸');
  const [isConnecting, setIsConnecting] = useState(true);
  const [cameraControl, setCameraControl] = useState({
    x: 0,
    zoom: 1,
  });

  const timerRef = useRef(null);

  const currentRoom = rooms[roomKeyMap[activeRoom] || 'A'];
  const isLive = currentRoom.status === 'Live';

  const startConnection = () => {
    setIsConnecting(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  const moveCamera = (direction) => {
    setCameraControl((prev) => ({
      ...prev,
      x:
        direction === 'left'
          ? Math.max(prev.x - 20, -80)
          : Math.min(prev.x + 20, 80),
    }));
  };

  const zoomCamera = (type) => {
    setCameraControl((prev) => ({
      ...prev,
      zoom:
        type === 'in'
          ? Math.min(prev.zoom + 0.15, 1.8)
          : Math.max(prev.zoom - 0.15, 1),
    }));
  };

  useEffect(() => {
    setCameraControl({ x: 0, zoom: 1 });
    startConnection();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeRoom]);

  return (
    <FieldPageShell
      title="Camera"
      rightText={isConnecting ? 'CONNECTING' : isLive ? 'LIVE' : 'WEAK'}
      selectedSector={activeRoom}
      onSectorChange={(sector) => {
        setActiveRoom(sector);
      }}
    >
      <PageGrid>
        <CameraSection>
          <CameraBox>
            <div className="camera-topbar">
              <div
                className={`live-dot ${
                  isConnecting ? 'warning' : isLive ? 'live' : 'warning'
                }`}
              />

              <span className="live-text">
                {isConnecting ? 'CONNECTING' : isLive ? 'LIVE' : 'SIGNAL WEAK'}
              </span>

              <span className="room-label">{currentRoom.branch}</span>

              <span className="updated-time">
                {isConnecting ? '연결 중' : currentRoom.updatedAt}
              </span>
            </div>

            <div className="screen">
              {isConnecting ? (
                <div className="connecting-screen">
                  <span className="connect-icon">📡</span>
                  <strong>실시간 영상 스트리밍 연결 중...</strong>
                  <p>카메라 신호를 확인하고 있습니다.</p>
                </div>
              ) : isLive ? (
                <img
                  src={currentRoom.image}
                  alt={`${currentRoom.label} CCTV`}
                  className="camera-image"
                  style={{
                    transform: `translateX(${cameraControl.x}px) scale(${cameraControl.zoom})`,
                  }}
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
                      <h3>카메라 연결이 불안정합니다</h3>
                      <p>현재 영상을 불러오지 못했습니다.</p>
                      <button className="retry-btn" onClick={startConnection}>
                        연결 재시도
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CameraBox>

          <ControlRow>
            <CamButton
              onClick={() => moveCamera('left')}
              disabled={!isLive || isConnecting}
            >
              ◀ 좌측 이동
            </CamButton>

            <CamButton
              onClick={() => moveCamera('right')}
              disabled={!isLive || isConnecting}
            >
              우측 이동 ▶
            </CamButton>

            <CamButton
              onClick={() => zoomCamera('in')}
              disabled={!isLive || isConnecting}
            >
              ＋ 줌인
            </CamButton>

            <CamButton
              onClick={() => zoomCamera('out')}
              disabled={!isLive || isConnecting}
            >
              － 줌아웃
            </CamButton>
          </ControlRow>
        </CameraSection>

        <Caption>
          카메라 페이지는 PTZ 조작 중심으로 구성했습니다. (AI summary/백엔드
          연동 없음)
        </Caption>
      </PageGrid>
    </FieldPageShell>
  );
}

const PageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const CameraSection = styled.section``;

const CameraBox = styled.div`
  position: relative;
  height: 260px;
  border-radius: 22px;
  overflow: hidden;
  background: #0f172a;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.14);

  .screen {
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
    transition: transform 0.25s ease;
    transform-origin: center center;
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

  .connecting-screen {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: #080c14;
    color: rgba(255, 255, 255, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
  }

  .connect-icon {
    font-size: 34px;
    opacity: 0.45;
  }

  .connecting-screen strong {
    font-size: 14px;
    font-weight: 900;
  }

  .connecting-screen p {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.42);
  }

  .camera-topbar {
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    flex-wrap: wrap;
  }

  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.live {
      background: #ef4444;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.7);
    }

    &.warning {
      background: #f59e0b;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
    }
  }

  .live-text,
  .updated-time,
  .room-label {
    padding: 5px 9px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.62);
    backdrop-filter: blur(8px);
  }

  .updated-time {
    margin-left: auto;
  }

  .camera-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px;
  }

  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 320px;
    color: #ffffff;
  }

  .overlay-badge {
    padding: 6px 12px;
    margin-bottom: 12px;
    border-radius: 999px;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #fecaca;
    font-size: 12px;
    font-weight: 800;
  }

  .overlay-content h3 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 900;
  }

  .overlay-content p {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.82);
  }

  .retry-btn {
    border: none;
    border-radius: 12px;
    padding: 11px 16px;
    background: #ffffff;
    color: #0f172a;
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    height: 420px;

    .overlay-content h3 {
      font-size: 22px;
    }

    .overlay-content p {
      font-size: 14px;
    }
  }
`;

const ControlRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CamButton = styled.button`
  height: 48px;
  border: none;
  border-radius: 14px;
  background: #ffffff;
  color: #111827;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

const Caption = styled.p`
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 340px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.45;
  text-align: center;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  padding: 10px 14px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  z-index: 30;

  @media (min-width: 768px) {
    max-width: 520px;
    font-size: 13px;
  }
`;
