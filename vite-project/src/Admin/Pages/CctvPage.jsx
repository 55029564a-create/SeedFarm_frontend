import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';

const CctvPage = () => {
  // 예시 데이터: 구역 리스트
  const sectors = [
    { id: 1, name: 'Sector 01 - Tomato', status: 'Good' },
    { id: 2, name: 'Sector 02 - Lettuce', status: 'Warning' },
    { id: 3, name: 'Sector 03 - Strawberry', status: 'Good' },
    { id: 4, name: 'Sector 04 - Paprika', status: 'Good' },
  ];

  // 현재 선택된 구역 상태 관리 (기본값: 첫 번째 구역)
  const [activeSector, setActiveSector] = useState(sectors[0].id);

  return (
    <>
      {/* 2단 분할 그리드: 좌(리스트) / 우(카메라 화면 꽉 채우기) */}
      <ContentGrid>
        {/* [1열] 좌측: 구역(Sector) 선택 리스트 */}
        <LeftColumn>
          <BaseCard style={{ flex: 1, padding: '1.25em 0.9em' }}>
            <CardTitle style={{ paddingLeft: '0.6em' }}>Select Sector</CardTitle>
            <SectorList>
              {sectors.map((sector) => (
                <SectorItem
                  key={sector.id}
                  className={activeSector === sector.id ? 'active' : ''}
                  onClick={() => setActiveSector(sector.id)}
                >
                  <div className="info">
                    <span className="name">{sector.name}</span>
                    <span className={`status-dot ${sector.status.toLowerCase()}`}></span>
                  </div>
                </SectorItem>
              ))}
            </SectorList>
          </BaseCard>
        </LeftColumn>

        {/* [2열] 우측: 대형 CCTV 화면 + 둥둥 떠있는 반투명 AI 요약(HUD) */}
        <MainCameraColumn>
          <CameraCard>
            <div className="camera-header">
              <CardTitle style={{ marginBottom: 0 }}>
                Camera 01 - {sectors.find((s) => s.id === activeSector)?.name}
              </CardTitle>
              <div className="live-badge">🔴 LIVE</div>
            </div>

            <div className="camera-container">
              {/* 실제 영상이 들어갈 배경 */}
              <div className="video-placeholder">
                <span className="icon">📹</span>
                <p>Live Video Feed</p>
              </div>

              {/* ✨ 핵심: 영상 위에 반투명하게 떠 있는 AI Summary ✨ */}
              <FloatingSummaryHUD>
                <h3 className="hud-title">AI Vision Summary</h3>
                <SummaryData>
                  <div className="data-row">
                    <span className="label">Plant Health</span>
                    <span className="value safe">94% (Good)</span>
                  </div>
                  <div className="data-row">
                    <span className="label">Pest Detection</span>
                    <span className="value safe">None</span>
                  </div>
                  <div className="data-row">
                    <span className="label">Growth Stage</span>
                    <span className="value">Vegetative Day 14</span>
                  </div>
                  <div className="data-row">
                    <span className="label">AI Suggestion</span>
                    <span className="value highlight">Increase water slightly</span>
                  </div>
                </SummaryData>
              </FloatingSummaryHUD>
            </div>

            <CameraControls>
              <button>Pan Left</button>
              <button>Pan Right</button>
              <button>Zoom In</button>
              <button>Zoom Out</button>
            </CameraControls>
          </CameraCard>
        </MainCameraColumn>
      </ContentGrid>
    </>
  );
};

export default CctvPage;

// --- CCTV 페이지 전용 Styled Components ---

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  /* ✨ 3단에서 2단으로 변경: 좌측 리스트 1 비율, 우측 카메라 3.5 비율로 쾌적하게! */
  grid-template-columns: 1fr 3.5fr;
  gap: 1.25em;
  min-height: 0;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SectorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  overflow-y: auto;
`;

const SectorItem = styled.div`
  padding: 1em 0.9em;
  border-radius: 0.75em;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  .info { display: flex; justify-content: space-between; align-items: center; }
  .name { font-size: 0.95em; font-weight: 600; color: var(--primary-dark); }
  .status-dot {
    width: 0.6em; height: 0.6em; border-radius: 50%;
    &.good { background-color: var(--light-green); }
    &.warning { background-color: #f59e0b; }
  }

  &:hover { background-color: #f1f5f9; }
  &.active {
    background-color: var(--white);
    border-color: var(--point-green);
    box-shadow: 0 0.25em 0.6em rgba(46, 125, 50, 0.1);
    .name { color: var(--point-green); }
  }
`;

const MainCameraColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CameraCard = styled(BaseCard)`
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .camera-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25em 1.5em; border-bottom: 1px solid #f1f5f9;
    background-color: white; z-index: 10;
  }

  .live-badge {
    background-color: rgba(230, 57, 70, 0.1); color: #e63946;
    padding: 0.25em 0.75em; border-radius: 1.25em; font-size: 0.85em; font-weight: 800;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .camera-container {
    flex: 1;
    position: relative; /* ✨ HUD 오버레이를 띄우기 위한 필수 설정 */
    display: flex;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    background-color: #0f172a; /* 나중에 실제 영상으로 교체될 부분 */
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: #475569;

    .icon { font-size: 3em; margin-bottom: 0.6em; }
    p { font-size: 1.1em; font-weight: 600; }
  }
`;

/* ✨ 반투명하게 둥둥 떠 있는 AI Summary HUD 디자인 ✨ */
const FloatingSummaryHUD = styled.div`
  position: absolute;
  top: 1.5em;
  right: 1.5em;
  width: 320px;
  
  /* 글래스모피즘(Glassmorphism) 효과 */
  background: rgba(15, 23, 42, 0.75); 
  backdrop-filter: blur(12px); /* 배경을 흐리게 처리 */
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  border-radius: 16px;
  padding: 1.5em;
  color: white;
  z-index: 20;

  .hud-title {
    font-size: 1.1em;
    font-weight: 800;
    margin-bottom: 1.2em;
    padding-bottom: 0.8em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
  }
`;

const SummaryData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    font-size: 0.85em;
    color: #94a3b8; /* 어두운 배경에 맞는 연한 텍스트 */
    font-weight: 600;
  }

  .value {
    font-size: 0.95em;
    font-weight: 800;
    color: #f8fafc;

    &.safe { color: #4ade80; } /* 짙은 배경에 어울리는 밝은 네온 그린 */
    &.highlight { color: #38bdf8; } /* 짙은 배경에 어울리는 밝은 네온 블루 */
  }
`;

const CameraControls = styled.div`
  display: flex; justify-content: center; gap: 0.9em;
  padding: 0.9em 1.25em; background-color: var(--white);
  border-top: 1px solid #f1f5f9; z-index: 10;

  button {
    padding: 0.6em 1.25em; border-radius: 0.5em; border: 1px solid #e2e8f0;
    background-color: #f8fafc; color: var(--primary-dark); font-weight: 600;
    cursor: pointer; transition: background 0.2s;
    &:hover { background-color: #e2e8f0; }
  }
`;