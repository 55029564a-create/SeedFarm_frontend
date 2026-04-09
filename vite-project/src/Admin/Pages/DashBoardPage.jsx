import React from 'react';
import styled from 'styled-components';

const DashboardPage = () => {
  // 🚨 1. 센서 데이터 6개 원상복구! 절대 안 빼먹었습니다.
  const sensorData = [
    { label: 'Temperature', value: '24.2°C', trend: '+0.5°C' },
    { label: 'Humidity', value: '65%', trend: '-2%' },
    { label: 'CO2 Level', value: '410 ppm', trend: '+15 ppm' },
    { label: 'Radiation', value: '350 W/m²', trend: 'Sunny' },
    { label: 'EC Supply', value: '1.2 dS/m', trend: 'Stable' },
    { label: 'pH Supply', value: '5.8', trend: 'Stable' },
  ];

  // 🚨 2. 기기 작동 로그: 구역/섹션/기기명 디테일 추가
  const deviceLogs = [
    {
      id: 1,
      time: '14:10',
      sector: 'Sector 01 (토마토)',
      zone: 'Section A',
      device: '💧 관수 펌프',
      action: '가동 중',
      desc: '설정값: Water 2.5L / EC 1.2 투입 완료',
      status: 'active',
    },
    {
      id: 2,
      time: '13:30',
      sector: 'Sector 02 (딸기)',
      zone: 'Section C',
      device: '💨 배기팬 2번',
      action: 'Level 2 전개',
      desc: '목표 온도 24°C 도달을 위한 강제 배기',
      status: 'active',
    },
    {
      id: 3,
      time: '11:00',
      sector: 'All Sectors (전체)',
      zone: 'Roof',
      device: '🌤️ 차광 스크린',
      action: '50% 닫힘',
      desc: '외부 일사량 400 W/m² 초과로 인한 연동 제어',
      status: 'done',
    },
    {
      id: 4,
      time: '09:15',
      sector: 'Sector 01 (토마토)',
      zone: 'Section B',
      device: '🪟 측창/천창',
      action: '30% 개방',
      desc: '내부 환기 및 습도 조절 스케줄 실행',
      status: 'done',
    },
  ];

  const aiLogs = [
    {
      time: '14:25',
      status: 'action',
      title: '관수량 10% 증가 권장',
      desc: '오후 일사량 급증 예상 (신뢰도: 95%)',
    },
    {
      time: '13:55',
      status: 'warning',
      title: '환기 타이밍 경고',
      desc: '향후 1시간 내 내부 온도 28°C 돌파 예상',
    },
  ];

  const growthData = {
    height: '124.5 cm',
    leafCount: '18 개',
    leafLength: '15.2 cm',
    leafWidth: '12.0 cm',
  };

  return (
    <ContentGrid>
      {/* 1열: 종합 요약 & 환경 센서 (6개) */}
      <LeftColumn>
        <FarmSummaryCard>
          <div className="header-row">
            <CardTitle className="white-text">Farm Overview</CardTitle>
            <span className="optimal-badge">Phase: 개화기 🌸</span>
          </div>
          <div className="summary-body">
            <div className="main-info">
              <div className="score-area">
                <span className="score">96</span>
                <span className="label">/ 100 pt</span>
              </div>
              <p className="status-text">작물 활력도 최상 (전주 대비 2% ↗)</p>
            </div>
            <div className="metrics-row">
              <div className="metric-box">
                <span className="m-label">진행중인 이슈</span>
                <span className="m-value warning">⚠️ 1 건 확인 요망</span>
              </div>
              <div className="divider"></div>
              <div className="metric-box">
                <span className="m-label">다음 예정 작업</span>
                <span className="m-value normal">자동 방제 (14:00)</span>
              </div>
            </div>
          </div>
        </FarmSummaryCard>

        <SensorsGroupCard>
          <CardTitle>Climate Sensors</CardTitle>
          <SensorGrid>
            {sensorData.map((sensor, index) => (
              <SensorItem key={index}>
                <div className="label">{sensor.label}</div>
                <div className="value">{sensor.value}</div>
                <div
                  className={`trend ${sensor.trend.includes('+') ? 'up' : sensor.trend.includes('-') ? 'down' : 'stable'}`}
                >
                  {sensor.trend}
                </div>
              </SensorItem>
            ))}
          </SensorGrid>
        </SensorsGroupCard>
      </LeftColumn>

      {/* 2열: 가운데 (크고 시원시원한 Device Logs) */}
      <MiddleColumn>
        <LogGroupCard>
          <div className="log-header">
            <CardTitle>Device Activity Logs</CardTitle>
            <span className="sub-badge system">System Auto</span>
          </div>
          <LogList>
            {deviceLogs.map((log) => (
              <DeviceLogItem key={log.id} className={log.status}>
                <div className="log-top">
                  <div className="badges">
                    <span className="sector-badge">{log.sector}</span>
                    <span className="zone-badge">{log.zone}</span>
                  </div>
                  <span className="time">{log.time}</span>
                </div>
                <div className="log-mid">
                  <span className="device">{log.device}</span>
                  <span className={`action ${log.status}`}>{log.action}</span>
                </div>
                <div className="log-bot">
                  <span className="desc">{log.desc}</span>
                </div>
              </DeviceLogItem>
            ))}
          </LogList>
        </LogGroupCard>
      </MiddleColumn>

      {/* 3열: CCTV -> 생육 데이터 -> AI Logs */}
      <RightColumn>
        <CameraCard>
          <div className="header-row">
            <CardTitle>Live Camera</CardTitle>
            <span className="cam-label">Cam 01</span>
          </div>
          <div className="placeholder-content">
            <span className="icon">🎥</span> CCTV Feed
          </div>
        </CameraCard>

        <GrowthCard>
          <CardTitle>Crop Status</CardTitle>
          <GrowthGrid>
            <div className="g-item">
              <span className="l">초장</span>
              <span className="v">{growthData.height}</span>
            </div>
            <div className="g-item">
              <span className="l">엽수</span>
              <span className="v">{growthData.leafCount}</span>
            </div>
            <div className="g-item">
              <span className="l">엽장</span>
              <span className="v">{growthData.leafLength}</span>
            </div>
            <div className="g-item">
              <span className="l">엽폭</span>
              <span className="v">{growthData.leafWidth}</span>
            </div>
          </GrowthGrid>
        </GrowthCard>

        <AILogGroupCard>
          <div className="log-header">
            <CardTitle>AI Insights</CardTitle>
            <span className="sub-badge ai">AI Active</span>
          </div>
          <AILogList>
            {aiLogs.map((log, index) => (
              <AILogItem key={index} className={log.status}>
                <div className="top-row">
                  <span className="badge">
                    {log.status === 'action' ? '추천' : '경고'}
                  </span>
                  <span className="time">{log.time}</span>
                </div>
                <div className="title">{log.title}</div>
                <div className="desc">{log.desc}</div>
              </AILogItem>
            ))}
          </AILogList>
        </AILogGroupCard>
      </RightColumn>
    </ContentGrid>
  );
};

export default DashboardPage;

// --- 🎨 하이엔드 투명도(rgba) 기반 스타일링 ---

const BaseCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 1.5em;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const CardTitle = styled.h2`
  font-size: 1.1em;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1.2em 0;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.white-text {
    color: #ffffff;
  }
`;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr;
  gap: 1.5em;
  width: 100%;
  min-height: 0;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    & > div:nth-child(3) {
      grid-column: 1 / 3;
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    & > div:nth-child(3) {
      flex-direction: column;
    }
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const FarmSummaryCard = styled(BaseCard)`
  flex: 1;
  min-height: 220px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3);
  color: #ffffff;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .optimal-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 800;
    white-space: nowrap;
  }

  .summary-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-top: 1em;
  }
  .main-info {
    .score-area {
      display: flex;
      align-items: baseline;
      .score {
        font-size: 3rem;
        font-weight: 800;
        line-height: 1;
      }
      .label {
        font-size: 0.9rem;
        margin-left: 6px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 600;
      }
    }
    .status-text {
      margin: 0.5em 0 0 0;
      font-size: 0.9em;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .metrics-row {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.15);
    padding: 1em;
    border-radius: 16px;
    margin-top: 1em;
    .divider {
      width: 1px;
      height: 30px;
      background: rgba(255, 255, 255, 0.2);
      margin: 0 1em;
      flex-shrink: 0;
    }
    .metric-box {
      display: flex;
      flex-direction: column;
      gap: 0.4em;
      flex: 1;
      min-width: 0;
      .m-label {
        font-size: 0.75em;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .m-value {
        font-size: 1em;
        font-weight: 800;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.warning {
          color: #fecaca;
        }
      }
    }
  }
`;

const SensorsGroupCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 0;
`;

/* 🚨 6개 센서 3x2 배열 복구 */
const SensorGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;

const SensorItem = styled.div`
  background-color: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 0;
  .label {
    font-size: 0.8em;
    font-weight: 600;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .value {
    font-size: 1.5em;
    font-weight: 800;
    color: #0f172a;
    margin-top: 0.2em;
    letter-spacing: -0.02em;
  }
  .trend {
    font-size: 0.75em;
    font-weight: 700;
    margin-top: 1em;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
    &.up {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }
    &.down {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
    &.stable {
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }
  }
`;

const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

/* 🚨 가운데 열 꽉 채우는 Device Log 컴포넌트 */
const LogGroupCard = styled(BaseCard)`
  flex: 1;
  min-height: 0;
  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .sub-badge {
    font-size: 0.7em;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    &.system {
      background: #f1f5f9;
      color: #475569;
    }
  }
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.5em;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;

/* 🚨 시원시원하고 디테일 빵빵하게 들어간 개별 Log 박스 */
const DeviceLogItem = styled.div`
  background: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 1.2em 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  min-width: 0;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
  border-left: 4px solid transparent;

  &:hover {
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    transform: translateY(-2px);
  }

  &.active {
    border-left-color: #10b981;
  }
  &.done {
    border-left-color: #94a3b8;
  }

  .log-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .badges {
      display: flex;
      gap: 0.5em;
      .sector-badge {
        font-size: 0.75em;
        font-weight: 800;
        color: #475569;
        background: #e2e8f0;
        padding: 4px 10px;
        border-radius: 8px;
      }
      .zone-badge {
        font-size: 0.75em;
        font-weight: 700;
        color: #64748b;
        padding: 4px 0;
      }
    }
    .time {
      font-size: 0.8em;
      font-weight: 700;
      color: #94a3b8;
    }
  }

  .log-mid {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .device {
      font-size: 1.2em;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      font-size: 0.9em;
      font-weight: 800;
      white-space: nowrap;
      flex-shrink: 0;
      &.active {
        color: #10b981;
      }
      &.done {
        color: #64748b;
      }
    }
  }

  .log-bot {
    .desc {
      font-size: 0.85em;
      font-weight: 500;
      color: #64748b;
      line-height: 1.4;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const CameraCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 220px;
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .cam-label {
    font-size: 0.8em;
    font-weight: 700;
    color: #475569;
    background: rgba(241, 245, 249, 0.8);
    padding: 4px 10px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .placeholder-content {
    flex: 1;
    margin-top: 1em;
    background: #1e293b;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    font-size: 1em;
    .icon {
      font-size: 2.5em;
      margin-bottom: 8px;
    }
  }
`;

const GrowthCard = styled(BaseCard)`
  padding: 1.2em 1.5em;
`;

const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  .g-item {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    .l {
      font-size: 0.75em;
      font-weight: 600;
      color: #94a3b8;
    }
    .v {
      font-size: 1em;
      font-weight: 800;
      color: #0f172a;
    }
  }
`;

const AILogGroupCard = styled(BaseCard)`
  flex: 1;
  min-height: 0;
  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .sub-badge {
    font-size: 0.7em;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    &.ai {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
  }
`;

const AILogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.5em;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;

const AILogItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 12px;
  margin-bottom: 0.5em;
  min-width: 0;
  border-left: 3px solid transparent;
  &.action {
    background: rgba(16, 185, 129, 0.05);
    border-left-color: #10b981;
  }
  &.warning {
    background: rgba(239, 68, 68, 0.05);
    border-left-color: #ef4444;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    .badge {
      font-size: 0.7em;
      font-weight: 800;
      color: #0f172a;
    }
    .time {
      font-size: 0.75em;
      color: #94a3b8;
      font-weight: 600;
    }
  }
  .title {
    font-size: 0.9em;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    font-size: 0.8em;
    color: #475569;
    line-height: 1.4;
  }
`;
