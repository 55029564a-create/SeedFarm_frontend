import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';

const CctvPage = () => {
  const sectors = [
    { id: 'sec_1', name: 'Sector 01 (토마토 A동)' },
    { id: 'sec_2', name: 'Sector 02 (토마토 B동)' },
    { id: 'sec_3', name: 'Sector 03 (육묘장)' },
  ];

  // 🚨 AI 잡다한 데이터 다 빼고 순수 카메라 메타데이터만 남김
  const cameras = [
    {
      id: 'c_1',
      sectorId: 'sec_1',
      name: 'Section A - 상단 (Canopy)',
      status: 'Live',
    },
    {
      id: 'c_2',
      sectorId: 'sec_1',
      name: 'Section A - 하단 (Root)',
      status: 'Live',
    },
    {
      id: 'c_3',
      sectorId: 'sec_1',
      name: 'Section B - 중앙 통로',
      status: 'Warning',
    },
    {
      id: 'c_4',
      sectorId: 'sec_2',
      name: 'Section A - 전경 (Full View)',
      status: 'Live',
    },
    {
      id: 'c_5',
      sectorId: 'sec_2',
      name: 'Section B - 측창 (Side)',
      status: 'Live',
    },
    { id: 'c_6', sectorId: 'sec_3', name: '발아실 내부', status: 'Live' },
  ];

  const [activeSector, setActiveSector] = useState(sectors[0].id);
  const [activeCam, setActiveCam] = useState(cameras[0]);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const firstCamOfSector = cameras.find(
      (cam) => cam.sectorId === activeSector,
    );
    if (firstCamOfSector) setActiveCam(firstCamOfSector);
  }, [activeSector]);

  // 🚨 캡처 액션: 사진만 딱 찍어서 image_data 테이블로 넘기는 용도
  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      alert(
        `📸 [캡처 완료]\n- 현재 프레임이 image_data 테이블에 저장되었습니다.\n- AI 서버로 이미지 분석을 요청합니다.`,
      );
    }, 150); // 실제 카메라 셔터처럼 짧고 강렬하게 번쩍!
  };

  return (
    <ContentGrid>
      <LeftColumn>
        <NavCard>
          <CardTitle>Camera List</CardTitle>
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
                          className={`cam-item ${activeCam.id === cam.id ? 'active' : ''}`}
                          onClick={() => setActiveCam(cam)}
                        >
                          <span className="cam-name">{cam.name}</span>
                          <span
                            className={`status-dot ${cam.status === 'Live' ? 'live' : 'warning'}`}
                          ></span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </NavContainer>
        </NavCard>
      </LeftColumn>

      <MainCameraColumn>
        <CameraCard>
          <div className="camera-header">
            <div className="title-area">
              <CardTitle style={{ marginBottom: 0 }}>
                {sectors.find((s) => s.id === activeCam.sectorId)?.name} /{' '}
                {activeCam.name}
              </CardTitle>
              <span className="cam-id">ID: {activeCam.id.toUpperCase()}</span>
            </div>

            <div
              className={`live-badge ${activeCam.status === 'Live' ? 'live' : 'warning'}`}
            >
              {activeCam.status === 'Live' ? '🔴 LIVE FEED' : '⚠️ SIGNAL WEAK'}
            </div>
          </div>

          <div className={`camera-container ${isCapturing ? 'capturing' : ''}`}>
            {/* 배경 영상 플레이스홀더 */}
            <div className="video-placeholder">
              <span className="icon">
                {activeCam.status === 'Live' ? '📹' : '📡'}
              </span>
              <p>
                {activeCam.status === 'Live'
                  ? 'Real-time Video Streaming...'
                  : 'Connection Lost. Retrying...'}
              </p>
            </div>
          </div>

          <CameraControls>
            <div className="control-group">
              <button>◀ Pan Left</button>
              <button>Pan Right ▶</button>
            </div>
            <div className="control-group">
              <button>➕ Zoom In</button>
              <button>➖ Zoom Out</button>
            </div>
            <button className="primary-btn" onClick={handleCapture}>
              📸 Capture Frame
            </button>
          </CameraControls>
        </CameraCard>
      </MainCameraColumn>
    </ContentGrid>
  );
};

export default CctvPage;

// --- 🎨 스타일링 ---

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
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;
const NavCard = styled(BaseCard)`
  flex: 1;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
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

const MainCameraColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
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

  /* 🚨 캡처 이펙트 (번쩍!) */
  .camera-container {
    flex: 1;
    position: relative;
    display: flex;
    background: #080c14;
    overflow: hidden;
    transition:
      background-color 0.05s ease-out,
      opacity 0.05s ease-out; /* 셔터처럼 빠르게 */
    &.capturing {
      background: #ffffff;
      opacity: 0.9;
    }
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
      font-size: 1.3em;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  @keyframes pulseRed {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
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
