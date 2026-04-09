import React from 'react';
import styled from 'styled-components';
import { BaseCard, CardTitle } from './Styles/AdminShared';

const DashboardPage = () => {
  const sensorData = [
    { label: 'Temperature', value: '24.2°C', trend: '+0.5°C' },
    { label: 'Humidity', value: '65%', trend: '-2%' },
    { label: 'CO2 Level', value: '410 ppm', trend: '+15 ppm' },
    { label: 'Radiation', value: '350 W/m²', trend: 'Sunny' },
    { label: 'EC Supply', value: '1.2 dS/m', trend: 'Stable' },
    { label: 'pH Supply', value: '5.8', trend: 'Stable' },
  ];

  const aiLogs = [
    {
      time: '14:25',
      type: 'ai',
      status: 'action',
      title: '관수량 증가 필요',
      desc: '일사량 증가로 인한 수분 부족 예측 (Confidence: 95%)',
    },
    {
      time: '14:10',
      type: 'system',
      status: 'normal',
      title: '자동 관수 실행',
      desc: 'Water Supply: 2.5L / EC: 1.2 / pH: 5.8',
    },
    {
      time: '13:55',
      type: 'ai',
      status: 'warning',
      title: '환기팬 가동 권장',
      desc: '내부 온도 상승 감지 (26°C 초과 예상, Confidence: 89%)',
    },
    {
      time: '13:30',
      type: 'system',
      status: 'normal',
      title: '환기 시스템 가동',
      desc: 'Exhaust Fan ON (Level 2)',
    },
    {
      time: '12:45',
      type: 'ai',
      status: 'normal',
      title: '생육 상태 양호',
      desc: '현재 환경 설정 유지 (Maintain, Confidence: 98%)',
    },
  ];

  const growthData = {
    height: '124.5 cm',
    leafCount: '18 개',
    leafLength: '15.2 cm',
    leafWidth: '12.0 cm',
  };

  return (
    <>
      <ContentGrid>
        <LeftColumn>
          <LiveEnvironmentCard>
            <CardTitle>Live Environment</CardTitle>
            <div className="placeholder-content">🌱 Greenhouse 3D View</div>
          </LiveEnvironmentCard>
          <SensorsGroupCard>
            <CardTitle>Farm Sensors (Real-time)</CardTitle>
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

        <MiddleColumn>
          <DeviceLogGroupCard>
            <div className="log-header">
              <CardTitle style={{ marginBottom: 0 }}>
                AI & System Logs
              </CardTitle>
              <div className="status-badge">AI Monitoring: Active</div>
            </div>
            <LogList>
              {aiLogs.map((log, index) => (
                <LogItem key={index} className={log.status}>
                  <span className="time">{log.time}</span>
                  <div className="info">
                    <div className="device-info">
                      <span className={`badge ${log.type}`}>
                        {log.type.toUpperCase()}
                      </span>
                      <span className="name">{log.title}</span>
                    </div>
                    <div className="detailed-text">{log.desc}</div>
                  </div>
                </LogItem>
              ))}
            </LogList>
          </DeviceLogGroupCard>
        </MiddleColumn>

        <RightColumn>
          <CameraCard>
            <CardTitle>Live Camera</CardTitle>
            <div className="placeholder-content">🎥 CCTV Feed - Cam 1</div>
          </CameraCard>
          <GrowthCard>
            <CardTitle>Crop Growth Status</CardTitle>
            <div className="growth-summary">
              <div className="status-indicator">
                <span className="pulse"></span> 실시간 AI 비전 분석 중
              </div>
            </div>
            <GrowthList>
              <div className="growth-item">
                <span className="label">초장 (Height)</span>
                <span className="value">{growthData.height}</span>
              </div>
              <div className="growth-item">
                <span className="label">엽수 (Leaf Count)</span>
                <span className="value">{growthData.leafCount}</span>
              </div>
              <div className="growth-item">
                <span className="label">엽장 (Leaf Length)</span>
                <span className="value">{growthData.leafLength}</span>
              </div>
              <div className="growth-item">
                <span className="label">엽폭 (Leaf Width)</span>
                <span className="value">{growthData.leafWidth}</span>
              </div>
            </GrowthList>
          </GrowthCard>
        </RightColumn>
      </ContentGrid>
    </>
  );
};

export default DashboardPage;

// --- Styled Components ---
// --- DashboardPage.jsx 하단 Styled Components 교체용 ---
const ContentGrid = styled.div`
  flex: 1; display: grid; grid-template-columns: 2fr 1.5fr 1.2fr; gap: 1.5em; min-height: 0;

  /* 💊 태블릿 (1024px 이하) */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr; /* 2단으로 변경 */
    /* 3번째 컬럼(우측)을 밑으로 내리고 가로로 꽉 채우기 */
    & > div:nth-child(3) {
      grid-column: 1 / 3;
      flex-direction: row; 
    }
  }

  /* 📱 모바일 (768px 이하) */
  @media (max-width: 768px) {
    display: flex; flex-direction: column; /* 1단으로 다 쌓아버리기 */
    & > div:nth-child(3) {
      flex-direction: column; /* 밑에 내린 카드들도 다시 세로로 */
    }
  }
`;

const LeftColumn = styled.div`display: flex; flex-direction: column; gap: 1.5em; flex: 1;`;
const LiveEnvironmentCard = styled(BaseCard)`flex: 1.2; min-height: 200px; .placeholder-content {flex: 1; background-color: #F1F5F9; border-radius: 0.8em; display: flex; align-items: center; justify-content: center; color: #64748B; font-weight: 700; font-size: 1.2em;}`;
const SensorsGroupCard = styled(BaseCard)`flex: 1;`;

const SensorGrid = styled.div`
  flex: 1; 
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 0.8em;
  
  /* 📱 모바일 UX 혁신: 세로 쌓기 금지! 옆으로 스와이프! */
  @media (max-width: 768px) {
    display: flex; /* 그리드를 풀고 flex로 가로 나열 */
    flex-wrap: nowrap; /* 밑으로 떨어지지 않게 강제 1줄 유지 */
    overflow-x: auto; /* 넘치는 건 가로 스크롤 허용 */
    scroll-snap-type: x mandatory; /* 스와이프 할 때 카드 단위로 착착 감기게 설정 */
    padding-bottom: 0.5em; /* 스크롤바 겹치지 않게 여백 */
    
    /* 스크롤바 예쁘게 다듬기 (선택사항) */
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

    /* 각 센서 카드가 찌그러지지 않게 최소 너비 보장 */
    > div {
      min-width: 140px; /* 폰 화면에 2개 반 정도 보이게 세팅 */
      scroll-snap-align: start; /* 넘길 때 카드 시작점에 딱 멈춤 */
    }
  }
`;

const SensorItem = styled.div`background-color: #F8FAFC; border-radius: 0.8em; padding: 1.2em; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 1px solid #E2E8F0; .label { font-size: 0.85em; font-weight: 700; color: #64748B; margin-bottom: 0.5em; text-align: center; } .value { font-size: 1.4em; font-weight: 800; color: var(--primary-dark); } .trend { font-size: 0.8em; font-weight: 700; margin-top: 0.4em; padding: 0.2em 0.6em; border-radius: 1em; &.up { color: #E63946; background: rgba(230, 57, 70, 0.1); } &.down { color: #0077B6; background: rgba(0, 119, 182, 0.1); } &.stable { color: var(--teal); background: rgba(0, 194, 168, 0.1); } }`;
const MiddleColumn = styled.div`display: flex; flex-direction: column; gap: 1.5em; flex: 1;`;
const DeviceLogGroupCard = styled(BaseCard)`flex: 1; min-height: 300px; .log-header {display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5em;} .status-badge {font-size: 0.85em; font-weight: 700; padding: 0.4em 0.8em; background: rgba(0, 194, 168, 0.1); color: var(--teal); border-radius: 1.2em;}`;
const LogList = styled.div`display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; overflow-y: auto; &::-webkit-scrollbar { width: 4px; } &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }`;
const LogItem = styled.div`display: flex; align-items: flex-start; padding: 1.2em 0; border-bottom: 1px solid #E2E8F0; &:last-child { border-bottom: none; padding-bottom: 0; } .time { font-size: 0.85em; font-weight: 700; color: #94A3B8; width: 3.5em; margin-top: 0.2em; } .info { flex: 1; display: flex; flex-direction: column; gap: 0.4em; margin-left: 0.5em; } .device-info { display: flex; align-items: center; gap: 0.6em; .badge { font-size: 0.7em; font-weight: 800; padding: 0.2em 0.5em; border-radius: 4px; &.ai { background-color: var(--primary-dark); color: white; } &.system { background-color: #E2E8F0; color: #475569; } } .name { font-size: 0.95em; font-weight: 700; color: var(--primary-dark); } } .detailed-text { font-size: 0.85em; font-weight: 500; color: #64748B; line-height: 1.4; } border-left: 4px solid transparent; padding-left: 0.8em; &.normal { border-left-color: #E2E8F0; } &.action { border-left-color: var(--point-green); background-color: rgba(76, 175, 80, 0.02); } &.warning { border-left-color: #E63946; background-color: rgba(230, 57, 70, 0.02); }`;
const RightColumn = styled.div`display: flex; flex-direction: column; gap: 1.5em; flex: 1;`;
const CameraCard = styled(BaseCard)`flex: 1; min-height: 200px; .placeholder-content {flex: 1; background-color: #1E293B; border-radius: 0.8em; display: flex; align-items: center; justify-content: center; color: #94A3B8; font-weight: 700;}`;
const GrowthCard = styled(BaseCard)`flex: 1.2; .growth-summary {display: flex; justify-content: flex-end; margin-bottom: 1em; .status-indicator {display: flex; align-items: center; gap: 0.5em; font-size: 0.8em; font-weight: 700; color: var(--teal); .pulse {width: 8px; height: 8px; background-color: var(--teal); border-radius: 50%; box-shadow: 0 0 0 0 rgba(0, 194, 168, 0.4); animation: pulse 1.5s infinite;} } }`;
const GrowthList = styled.div`display: flex; flex-direction: column; gap: 0.8em; flex: 1; justify-content: center; .growth-item {background-color: #F8FAFC; padding: 1em 1.2em; border-radius: 0.8em; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; .label { font-size: 0.9em; font-weight: 700; color: #64748B; } .value { font-size: 1.2em; font-weight: 800; color: var(--point-green); } }`;