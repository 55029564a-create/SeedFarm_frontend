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
    // 🚨 여기서부터 시작! (AdminLayout이 껍데기를 담당하므로 빈 태그로 감싸줍니다)
    <>
      {/* 3단 분할 그리드: 좌(리스트) / 중(카메라) / 우(요약) */}
      <ContentGrid>
        {/* [1열] 좌측: 구역(Sector) 선택 리스트 */}
        <LeftColumn>
          <BaseCard style={{ flex: 1, padding: '1.25em 0.9em' }}>
            <CardTitle style={{ paddingLeft: '0.6em' }}>
              Select Sector
            </CardTitle>
            <SectorList>
              {sectors.map((sector) => (
                <SectorItem
                  key={sector.id}
                  className={activeSector === sector.id ? 'active' : ''}
                  onClick={() => setActiveSector(sector.id)}
                >
                  <div className="info">
                    <span className="name">{sector.name}</span>
                    <span
                      className={`status-dot ${sector.status.toLowerCase()}`}
                    ></span>
                  </div>
                </SectorItem>
              ))}
            </SectorList>
          </BaseCard>
        </LeftColumn>

        {/* [2열] 중앙: 대형 CCTV 화면 */}
        <CenterColumn>
          <CameraCard>
            <div className="camera-header">
              <CardTitle style={{ marginBottom: 0 }}>
                Camera 01 - {sectors.find((s) => s.id === activeSector)?.name}
              </CardTitle>
              <div className="live-badge">🔴 LIVE</div>
            </div>
            <div className="video-placeholder">
              <span className="icon">📹</span>
              <p>Live Video Feed</p>
            </div>
            <CameraControls>
              <button>Pan Left</button>
              <button>Pan Right</button>
              <button>Zoom In</button>
              <button>Zoom Out</button>
            </CameraControls>
          </CameraCard>
        </CenterColumn>

        {/* [3열] 우측: AI 분석 요약 (Summary) */}
        <RightColumn>
          <SummaryCard>
            <CardTitle>AI Vision Summary</CardTitle>
            <div className="image-snapshot">
              <p>Last Snapshot (10 mins ago)</p>
            </div>

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
          </SummaryCard>
        </RightColumn>
      </ContentGrid>
    </>
  );
};

export default CctvPage;

// --- CCTV 페이지 전용 Styled Components (기존 코드와 동일) ---

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1.2fr;
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

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-size: 0.95em;
    font-weight: 600;
    color: var(--primary-dark);
  }

  .status-dot {
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    &.good {
      background-color: var(--light-green);
    }
    &.warning {
      background-color: #f59e0b;
    }
  }

  &:hover {
    background-color: #f1f5f9;
  }

  &.active {
    background-color: var(--white);
    border-color: var(--point-green);
    box-shadow: 0 0.25em 0.6em rgba(46, 125, 50, 0.1);
    .name {
      color: var(--point-green);
    }
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CameraCard = styled(BaseCard)`
  flex: 1;
  padding: 0;
  overflow: hidden;

  .camera-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25em 1.5em;
    border-bottom: 1px solid #f1f5f9;
  }

  .live-badge {
    background-color: rgba(230, 57, 70, 0.1);
    color: #e63946;
    padding: 0.25em 0.75em;
    border-radius: 1.25em;
    font-size: 0.85em;
    font-weight: 800;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
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

  .video-placeholder {
    flex: 1;
    background-color: #0f172a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #475569;

    .icon {
      font-size: 3em;
      margin-bottom: 0.6em;
    }
    p {
      font-size: 1.1em;
      font-weight: 600;
    }
  }
`;

const CameraControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.9em;
  padding: 0.9em 1.25em;
  background-color: var(--white);

  button {
    padding: 0.6em 1.25em;
    border-radius: 0.5em;
    border: 1px solid #e2e8f0;
    background-color: #f8fafc;
    color: var(--primary-dark);
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #e2e8f0;
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SummaryCard = styled(BaseCard)`
  flex: 1;

  .image-snapshot {
    height: 11.25em;
    background-color: #e2e8f0;
    border-radius: 0.75em;
    margin-bottom: 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 0.9em;
    font-weight: 600;
  }
`;

const SummaryData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9em;

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.6em;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }
  }

  .label {
    font-size: 0.9em;
    color: #64748b;
    font-weight: 600;
  }

  .value {
    font-size: 0.95em;
    font-weight: 700;
    color: var(--primary-dark);

    &.safe {
      color: var(--point-green);
    }
    &.highlight {
      color: var(--teal);
    }
  }
`;
