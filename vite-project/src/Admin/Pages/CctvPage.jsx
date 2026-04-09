import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// 🚨 중복 선언 방지: 형님의 AdminShared에서 정확히 가져옵니다.
import { BaseCard, CardTitle } from './Styles/AdminShared';

const CctvPage = () => {
  // 1. 농장 구역(Sector) 데이터
  const sectors = [
    { id: 'sec_1', name: 'Sector 01 (토마토 A동)' },
    { id: 'sec_2', name: 'Sector 02 (토마토 B동)' },
    { id: 'sec_3', name: 'Sector 03 (육묘장)' },
  ];

  // 2. 구역별 세부 카메라(Section) 데이터
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

  // 현재 열려있는 섹터와 선택된 카메라 상태 관리
  const [activeSector, setActiveSector] = useState(sectors[0].id);
  const [activeCam, setActiveCam] = useState(cameras[0]);

  // 섹터가 바뀔 때마다 해당 섹터의 첫 번째 카메라를 자동으로 메인 화면에 띄움
  useEffect(() => {
    const firstCamOfSector = cameras.find(
      (cam) => cam.sectorId === activeSector,
    );
    if (firstCamOfSector) setActiveCam(firstCamOfSector);
  }, [activeSector]);

  return (
    <ContentGrid>
      {/* [1열] 좌측: 섹터 및 세부 카메라 선택 네비게이션 */}
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
                  {/* 섹터 (폴더 역할) */}
                  <div
                    className={`sector-header ${isActiveSector ? 'expanded' : ''}`}
                    onClick={() => setActiveSector(sector.id)}
                  >
                    <span className="icon">{isActiveSector ? '📂' : '📁'}</span>
                    <span className="name">{sector.name}</span>
                  </div>

                  {/* 세부 카메라 리스트 (선택된 섹터만 펼쳐짐) */}
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

      {/* [2열] 우측: 초대형 카메라 화면 꽉 채우기 (AI, 생육 정보 싹 다 뺌) */}
      <MainCameraColumn>
        <CameraCard>
          {/* 카메라 헤더 정보 */}
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

          {/* 광활한 영상 영역 */}
          <div className="camera-container">
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

          {/* 하단 PTZ(Pan/Tilt/Zoom) 및 제어 버튼 */}
          <CameraControls>
            <div className="control-group">
              <button>◀ Pan Left</button>
              <button>Pan Right ▶</button>
            </div>
            <div className="control-group">
              <button>➕ Zoom In</button>
              <button>➖ Zoom Out</button>
            </div>
            <button className="primary-btn">📸 Capture Frame</button>
          </CameraControls>
        </CameraCard>
      </MainCameraColumn>
    </ContentGrid>
  );
};

export default CctvPage;

// --- 🎨 하이엔드 벤토 + 초대형 모니터 스타일링 ---

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  /* 🚨 좌측 네비게이션 1 : 우측 초대형 화면 3.5 비율 유지 */
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

/* 좌측 네비게이션 카드 */
const NavCard = styled(BaseCard)`
  flex: 1;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  /* AdminShared의 BaseCard 위에 고급스러운 투명 그림자만 추가 */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
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

    /* 섹터 (폴더) 디자인 */
    .sector-header {
      display: flex;
      align-items: center;
      gap: 0.8em;
      padding: 1em;
      border-radius: 12px;
      background: #f8fafc;
      cursor: pointer;
      transition: all 0.2s ease;
      .icon {
        font-size: 1.1em;
      }
      .name {
        font-size: 0.95em;
        font-weight: 800;
        color: #475569;
        transition: color 0.2s;
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

    /* 세부 카메라 리스트 디자인 */
    .cam-list {
      display: flex;
      flex-direction: column;
      gap: 0.3em;
      margin-left: 1em;
      padding-left: 1em;
      border-left: 2px solid #f1f5f9; /* 트리 구조 느낌을 주는 왼쪽 선 */

      .cam-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8em 1em;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;

        .cam-name {
          font-size: 0.85em;
          font-weight: 600;
          color: #64748b;
          transition: color 0.2s;
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
  }
`;

const MainCameraColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

/* 🚨 우측 초대형 카메라 카드 */
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
    padding: 1.5em 2em;
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

  /* 🚨 영상 영역: 남는 공간을 모두 차지하도록 flex: 1 설정 */
  .camera-container {
    flex: 1;
    position: relative;
    display: flex;
    background: #080c14; /* 딥 블랙 톤으로 몰입감 극대화 */
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

  /* 하단 카메라 조작 버튼부 */
  .camera-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em 2em;
    background-color: #ffffff;
    z-index: 10;
    border-top: 1px solid rgba(226, 232, 240, 0.6);
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
    transition: all 0.2s ease;
    &:hover {
      background-color: #e2e8f0;
      color: #0f172a;
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(0);
    }
  }

  .primary-btn {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
    &:hover {
      background-color: rgba(16, 185, 129, 0.2);
      color: #059669;
    }
  }
`;
