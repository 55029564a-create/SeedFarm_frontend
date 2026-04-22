import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';
import c1 from '../image/cctv1.png';
import c2 from '../image/cctv2.png';
import c3 from '../image/cctv3.png';
import fallback from '../image/fallback.jpg';

const FALLBACK_IMAGE = fallback;

const CctvPage = () => {
  const sectors = [
    { id: 'sec_1', name: '1구역 (토마토 A동)' },
    { id: 'sec_2', name: '2구역 (토마토 B동)' },
    { id: 'sec_3', name: '3구역 (육묘장)' },
  ];

  const cameras = [
    {
      id: 'c_1',
      sectorId: 'sec_1',
      name: 'A블록 - 상단 (작물 생육부)',
      status: 'Live',
      image: c1,
    },
    {
      id: 'c_2',
      sectorId: 'sec_1',
      name: 'A블록 - 하단 (근권부)',
      status: 'Live',
      image: c2,
    },
    {
      id: 'c_3',
      sectorId: 'sec_1',
      name: 'B블록 - 중앙 통로',
      status: 'Live',
      image: c3,
    },
    {
      id: 'c_4',
      sectorId: 'sec_2',
      name: 'A블록 - 전체 전경',
      status: 'Warning',
      image: fallback,
    },
    {
      id: 'c_5',
      sectorId: 'sec_2',
      name: 'B블록 - 측면 관측',
      status: 'Warning',
      image: fallback,
    },
    {
      id: 'c_6',
      sectorId: 'sec_3',
      name: '발아실 내부',
      status: 'Warning',
      image: fallback,
    },
  ];

  const [activeSector, setActiveSector] = useState(sectors[0].id);
  const [selectedCam, setSelectedCam] = useState(cameras[0]);
  const [displayedCam, setDisplayedCam] = useState(cameras[0]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [imgSrc, setImgSrc] = useState(cameras[0].image || FALLBACK_IMAGE);

  const connectTimerRef = useRef(null);

  const isFallbackCamera = (cam) => cam?.image === FALLBACK_IMAGE;
  const isInactiveStatus = (cam) => cam?.status !== 'Live';
  const shouldShowErrorOverlay = (cam) =>
    isFallbackCamera(cam) || isInactiveStatus(cam);

  const startCameraLoading = (cam) => {
    setSelectedCam(cam);
    setIsConnecting(true);

    if (connectTimerRef.current) {
      clearTimeout(connectTimerRef.current);
    }

    connectTimerRef.current = setTimeout(() => {
      setDisplayedCam(cam);
      setImgSrc(cam.image || FALLBACK_IMAGE);
      setIsConnecting(false);
    }, 2000);
  };

  useEffect(() => {
    startCameraLoading(cameras[0]);

    return () => {
      if (connectTimerRef.current) {
        clearTimeout(connectTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const firstCamOfSector = cameras.find(
      (cam) => cam.sectorId === activeSector,
    );

    if (firstCamOfSector) {
      startCameraLoading(firstCamOfSector);
    }
  }, [activeSector]);

  const handleCameraClick = (cam) => {
    startCameraLoading(cam);
  };

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      alert(
        `📸 [이미지 수집 완료]\n- 현재 프레임이 image_data DB에 정상 저장되었습니다.\n- AI 생육 분석 서버로 전송을 시작합니다.`,
      );
    }, 150);
  };

  const currentCam = isConnecting ? selectedCam : displayedCam;

  return (
    <ContentGrid>
      <Flex dir="column" flex="1" style={{ minWidth: 0 }}>
        <BaseCard flex="1">
          <CardTitle>현장 카메라 목록</CardTitle>

          <NavContainer>
            {sectors.map((sector) => {
              const isActiveSector = activeSector === sector.id;
              const sectorCams = cameras.filter(
                (cam) => cam.sectorId === sector.id,
              );

              return (
                <div key={sector.id} className="sector-group">
                  <div
                    className={`sector-header ${isActiveSector ? 'expanded' : ''}`}
                    onClick={() => setActiveSector(sector.id)}
                  >
                    <span className="icon">{isActiveSector ? '📂' : '📁'}</span>
                    <span className="name">{sector.name}</span>
                  </div>

                  {isActiveSector && (
                    <div className="cam-list">
                      {sectorCams.map((cam) => (
                        <div
                          key={cam.id}
                          className={`cam-item ${selectedCam.id === cam.id ? 'active' : ''}`}
                          onClick={() => handleCameraClick(cam)}
                        >
                          <span className="cam-name">{cam.name}</span>
                          <span
                            className={`status-dot ${cam.status === 'Live' ? 'live' : 'warning'}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </NavContainer>
        </BaseCard>
      </Flex>

      <Flex dir="column" flex="1" style={{ minWidth: 0 }}>
        <CameraCard>
          <div className="camera-header">
            <div className="title-area">
              <CardTitle style={{ marginBottom: 0 }}>
                {sectors.find((s) => s.id === currentCam.sectorId)?.name} /{' '}
                {currentCam.name}
              </CardTitle>
              <span className="cam-id">
                기기 ID: {currentCam.id.toUpperCase()}
              </span>
            </div>

            <div
              className={`live-badge ${currentCam.status === 'Live' ? 'live' : 'warning'}`}
            >
              {currentCam.status === 'Live'
                ? '🔴 실시간 관제 중'
                : '⚠️ 신호 미약 (점검 요망)'}
            </div>
          </div>

          <div className={`camera-container ${isCapturing ? 'capturing' : ''}`}>
            <div className="camera-frame">
              {!isConnecting && !isFallbackCamera(displayedCam) && (
                <img
                  src={imgSrc}
                  alt={displayedCam.name}
                  className="camera-image"
                  onError={() => setImgSrc(FALLBACK_IMAGE)}
                />
              )}

              {!isConnecting && isFallbackCamera(displayedCam) && (
                <div
                  className="camera-fallback-bg"
                  style={{ backgroundImage: `url(${FALLBACK_IMAGE})` }}
                />
              )}

              {isConnecting && (
                <div className="camera-layer connecting-layer">
                  <div className="video-placeholder">
                    <span className="icon">📡</span>
                    <p>실시간 영상 스트리밍 연결 중...</p>
                  </div>
                </div>
              )}

              {!isConnecting && shouldShowErrorOverlay(displayedCam) && (
                <div className="camera-layer camera-overlay">
                  <div className="overlay-content">
                    <div className="overlay-badge">신호 없음</div>
                    <h3>카메라 연결이 불안정합니다</h3>
                    <p>
                      현재 영상을 불러오지 못했습니다. 연결을 다시 시도해주세요.
                    </p>
                    <button
                      className="retry-btn"
                      onClick={() => startCameraLoading(displayedCam)}
                    >
                      연결 재시도
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CameraControls>
            <div className="control-group">
              <button>◀ 좌측 회전</button>
              <button>우측 회전 ▶</button>
            </div>

            <div className="control-group">
              <button>➕ 줌 인 (확대)</button>
              <button>➖ 줌 아웃 (축소)</button>
            </div>

            <button className="primary-btn" onClick={handleCapture}>
              📸 분석용 화면 캡처
            </button>
          </CameraControls>
        </CameraCard>
      </Flex>
    </ContentGrid>
  );
};

export default CctvPage;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  gap: 1.5em;
  width: 100%;
  min-height: 0;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5em;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }

  .sector-group {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
  }

  .sector-header {
    display: flex;
    align-items: center;
    gap: 0.8em;
    padding: 1em;
    border-radius: 12px;
    background: #f8fafc;
    cursor: pointer;
    transition: 0.2s;

    .icon {
      font-size: 1.1em;
    }

    .name {
      font-size: 0.95em;
      font-weight: 800;
      color: #475569;
    }

    &:hover {
      background: #f1f5f9;
    }

    &.expanded {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

      .name {
        color: #0f172a;
      }
    }
  }

  .cam-list {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    margin-left: 1em;
    padding-left: 1em;
    border-left: 2px solid #f1f5f9;

    .cam-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8em 1em;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.2s;
      background: transparent;

      .cam-name {
        font-size: 0.85em;
        font-weight: 600;
        color: #64748b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;

        &.live {
          background-color: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        &.warning {
          background-color: #f59e0b;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
        }
      }

      &:hover {
        background: #f8fafc;

        .cam-name {
          color: #0f172a;
        }
      }

      &.active {
        background: rgba(16, 185, 129, 0.08);

        .cam-name {
          color: #10b981;
          font-weight: 800;
        }
      }
    }
  }
`;

const CameraCard = styled(BaseCard)`
  flex: 1;
  padding: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);

  .camera-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em 2em;
    background-color: #ffffff;
    z-index: 10;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);

    .title-area {
      display: flex;
      align-items: baseline;
      gap: 1em;

      .cam-id {
        font-size: 0.8em;
        font-weight: 700;
        color: #94a3b8;
        background: #f8fafc;
        padding: 4px 8px;
        border-radius: 6px;
      }
    }

    .live-badge {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: 800;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;

      &.live {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
        animation: pulseRed 2s infinite;
      }

      &.warning {
        color: #f59e0b;
        background: rgba(245, 158, 11, 0.1);
      }
    }
  }

  .camera-container {
    flex: 1;
    position: relative;
    background: #080c14;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    min-height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.05s ease-out,
      opacity 0.05s ease-out;

    &.capturing {
      background: #ffffff;
      opacity: 0.9;
    }
  }

  .camera-frame {
    position: relative;
    width: 100%;
    height: 100%;
    background: #0b1220;
  }

  .camera-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    z-index: 1;
  }

  .camera-fallback-bg {
    position: absolute;
    inset: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px) brightness(0.6);
    transform: scale(1.05);
    z-index: 1;
  }

  .camera-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .connecting-layer {
    background: rgba(8, 12, 20, 0.85);
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.3);

    .icon {
      font-size: 4em;
      margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.15);
    }

    p {
      font-size: 1.15em;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: none;
    }
  }

  .camera-overlay {
    background: rgba(0, 0, 0, 0.45);
    padding: 24px;
  }

  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
    max-width: 420px;
  }

  .overlay-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    margin-bottom: 14px;
    border-radius: 999px;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #fecaca;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .overlay-content h3 {
    margin: 0 0 10px;
    font-size: 1.45rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .overlay-content p {
    margin: 0 0 18px;
    font-size: 0.98rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.82);
  }

  .retry-btn {
    border: none;
    border-radius: 12px;
    padding: 12px 18px;
    background: #ffffff;
    color: #0f172a;
    font-size: 0.95rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .retry-btn:hover {
    transform: translateY(-2px);
    background: #f8fafc;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }

  @keyframes pulseRed {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CameraControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2em 2em;
  background-color: #ffffff;
  z-index: 10;
  border-top: 1px solid rgba(226, 232, 240, 0.6);

  .control-group {
    display: flex;
    gap: 0.8em;
  }

  button {
    padding: 0.8em 1.2em;
    border-radius: 10px;
    border: none;
    background-color: #f8fafc;
    color: #475569;
    font-weight: 700;
    font-size: 0.9em;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: #e2e8f0;
      color: #0f172a;
      transform: translateY(-2px);
    }
  }

  .primary-btn {
    background-color: #0f172a;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
      background-color: #1e293b;
      color: #fff;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    }
  }
`;
