import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
// 🚨 BaseCard는 아래에서 대시보드 전용으로 덮어썼으므로 import에서 제거했습니다!
import { CardTitle } from './Styles/AdminShared';

const DashboardPage = () => {
  const { selectedBranch } = useOutletContext();

  const dashboardData = useMemo(
    () => ({
      '천안 본점 (Cheonan Hub)': {
        score: 96,
        phase: '개화기 🌸',
        status: '작물 활력도 최상 (전주 대비 2% ↗)',
        sensors: [
          {
            label: '온도',
            value: 24.2,
            unit: '°C',
            trend: '+0.5',
            status: 'stable',
          },
          {
            label: '습도',
            value: 65,
            unit: '%',
            trend: '-2',
            status: 'down',
          },
          {
            label: '이산화탄소 농도',
            value: 410,
            unit: 'ppm',
            trend: '+15',
            status: 'up',
          },
          {
            label: 'LED 광량',
            value: 350,
            unit: 'μmol/m²/s',
            trend: 'Sunny',
            status: 'stable',
          },
          {
            label: '토양 EC',
            value: 1.2,
            unit: 'dS/m',
            trend: 'Stable',
            status: 'stable',
          },
          {
            label: '토양 pH',
            value: 5.8,
            unit: '',
            trend: 'Stable',
            status: 'stable',
          },
        ],
        growth: {
          height: '124.5 cm',
          leafCount: '18 개',
          leafLength: '15.2 cm',
          leafWidth: '12.0 cm',
        },
        logs: [
          {
            id: 1,
            time: '14:10',
            sector: 'Sector 01',
            zone: 'Section A',
            device: '💧 관수 펌프',
            action: '가동 중',
            desc: '설정값: Water 2.5L / EC 1.2 투입 완료',
            status: 'active',
          },
          {
            id: 2,
            time: '13:30',
            sector: 'Sector 02',
            zone: 'Section C',
            device: '💨 배기팬 2번',
            action: 'Level 2 전개',
            desc: '목표 온도 24°C 도달을 위한 강제 배기',
            status: 'active',
          },
          {
            id: 3,
            time: '11:00',
            sector: 'All Sectors',
            zone: 'Roof',
            device: '🌤️ 차광 스크린',
            action: '50% 닫힘',
            desc: '외부 일사량 초과로 인한 연동 제어',
            status: 'done',
          },
        ],
      },
      '천안 제2센터 (Cheonan B2)': {
        score: 88,
        phase: '정식기 🌱',
        status: '초기 활착 진행 중 (안정)',
        sensors: [
          {
            label: 'Temperature',
            value: 22.5,
            unit: '°C',
            trend: '+0.2',
            status: 'stable',
          },
          {
            label: 'Humidity',
            value: 70,
            unit: '%',
            trend: '+5',
            status: 'up',
          },
          {
            label: 'CO2 Level',
            value: 450,
            unit: 'ppm',
            trend: '-10',
            status: 'down',
          },
          {
            label: 'Radiation',
            value: 280,
            unit: 'W/m²',
            trend: 'Cloudy',
            status: 'stable',
          },
          {
            label: 'Soil EC',
            value: 1.0,
            unit: 'dS/m',
            trend: 'Stable',
            status: 'stable',
          },
          {
            label: 'Soil pH',
            value: 6.0,
            unit: '',
            trend: 'Stable',
            status: 'stable',
          },
        ],
        growth: {
          height: '45.0 cm',
          leafCount: '8 개',
          leafLength: '8.5 cm',
          leafWidth: '6.0 cm',
        },
        logs: [
          {
            id: 1,
            time: '14:15',
            sector: 'Sector 01',
            zone: 'Section B',
            device: '🌡️ 온풍기',
            action: '가동 대기',
            desc: '야간 목표 온도 18°C 설정 완료',
            status: 'done',
          },
          {
            id: 2,
            time: '12:00',
            sector: 'Sector 03',
            zone: 'Nursery',
            device: '💡 LED 보광등',
            action: '점등',
            desc: '일조량 부족 감지 -> 주간 모드 전환',
            status: 'active',
          },
        ],
      },
    }),
    [],
  );

  const currentData =
    dashboardData[selectedBranch] || dashboardData['천안 본점 (Cheonan Hub)'];
  const [liveSensors, setLiveSensors] = useState(currentData.sensors);

  useEffect(() => {
    setLiveSensors(currentData.sensors);

    const interval = setInterval(() => {
      setLiveSensors((prev) =>
        prev.map((s) => {
          if (s.label === 'Temperature' || s.label === 'Humidity') {
            const fluctuate = Math.random() * 0.2 - 0.1;
            return {
              ...s,
              value: (parseFloat(s.value) + fluctuate).toFixed(1),
            };
          }
          return s;
        }),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedBranch, currentData]);

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

  return (
    <ContentGrid>
      <LeftColumn>
        <FarmSummaryCard>
          <div className="header-row">
            <div>
              <CardTitle className="white-text">농장 현황</CardTitle>
              <div className="branch-name">{selectedBranch}</div>
            </div>
            <span className="optimal-badge">Phase: {currentData.phase}</span>
          </div>
          <div className="summary-body">
            <div className="main-info">
              <div className="score-area">
                <span className="score">{currentData.score}</span>
                <span className="label">/ 100 pt</span>
              </div>
              <p className="status-text">{currentData.status}</p>
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
          <CardTitle>실시간 센서 데이터</CardTitle>
          <SensorGrid>
            {liveSensors.map((sensor, index) => (
              <SensorItem key={index}>
                <div className="label">{sensor.label}</div>
                <div className="value-row">
                  <span className="value">{sensor.value}</span>
                  <span className="unit">{sensor.unit}</span>
                </div>
                <div className={`trend ${sensor.status}`}>
                  {sensor.status === 'up'
                    ? '▲ '
                    : sensor.status === 'down'
                      ? '▼ '
                      : ''}
                  {sensor.trend}
                </div>
              </SensorItem>
            ))}
          </SensorGrid>
        </SensorsGroupCard>
      </LeftColumn>

      <MiddleColumn>
        <LogGroupCard>
          <div className="log-header">
            <CardTitle>Device Activity Logs</CardTitle>
            <span className="sub-badge system">System Auto</span>
          </div>
          <LogList>
            {currentData.logs.map((log) => (
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

      <RightColumn>
        <CameraCard>
          <div className="header-row">
            <CardTitle>Live Feed</CardTitle>
            <span className="cam-label">Cam 01 (Sector 01)</span>
          </div>
          <div className="placeholder-content">
            <div className="pulse-ring"></div>
            <span className="icon">📹</span>
            <span className="text">Connecting to Stream...</span>
          </div>
        </CameraCard>

        <GrowthCard>
          <CardTitle>Crop Status</CardTitle>
          <GrowthGrid>
            <div className="g-item">
              <span className="l">초장 (Height)</span>
              <span className="v">{currentData.growth.height}</span>
            </div>
            <div className="g-item">
              <span className="l">엽수 (Leaves)</span>
              <span className="v">{currentData.growth.leafCount}</span>
            </div>
            <div className="g-item">
              <span className="l">엽장 (Length)</span>
              <span className="v">{currentData.growth.leafLength}</span>
            </div>
            <div className="g-item">
              <span className="l">엽폭 (Width)</span>
              <span className="v">{currentData.growth.leafWidth}</span>
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
  border-radius: 20px;
  padding: 1.5em;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

// 여기서 기존 CardTitle을 덮어씁니다 (디자인 통일)
const CardTitleStyled = styled.h2`
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
    margin-bottom: 0.2em;
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
  .branch-name {
    font-size: 0.85em;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
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
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.03em;
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
  transition: background 0.3s ease;
  &:hover {
    background-color: #f8fafc;
  }
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 0.2em;
    .value {
      font-size: 1.6em;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      transition: color 0.3s;
    }
    .unit {
      font-size: 0.8em;
      font-weight: 700;
      color: #94a3b8;
    }
  }
  .trend {
    font-size: 0.75em;
    font-weight: 800;
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
    font-weight: 800;
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
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;
const DeviceLogItem = styled.div`
  background: #f8fafc;
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
  &.active {
    border-left-color: #10b981;
    background: rgba(16, 185, 129, 0.03);
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
      font-weight: 800;
      color: #94a3b8;
    }
  }
  .log-mid {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .device {
      font-size: 1.1em;
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
      font-weight: 600;
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
  padding: 1.2em;
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .cam-label {
    font-size: 0.75em;
    font-weight: 800;
    color: #475569;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .placeholder-content {
    flex: 1;
    background: #0f172a;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
    .icon {
      font-size: 2.5em;
      margin-bottom: 8px;
      z-index: 2;
      opacity: 0.8;
    }
    .text {
      font-size: 0.8em;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      z-index: 2;
      opacity: 0.8;
    }
    .pulse-ring {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #10b981;
      animation: radar 2s infinite ease-out;
    }
  }
  @keyframes radar {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;

const GrowthCard = styled(BaseCard)`
  padding: 1.2em;
`;
const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  .g-item {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    background: #f8fafc;
    padding: 10px;
    border-radius: 12px;
    .l {
      font-size: 0.7em;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .v {
      font-size: 1.1em;
      font-weight: 800;
      color: #0f172a;
    }
  }
`;

const AILogGroupCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 0;
  padding: 1.2em;
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
    font-weight: 800;
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
    .badge {
      color: #10b981;
    }
  }
  &.warning {
    background: rgba(239, 68, 68, 0.05);
    border-left-color: #ef4444;
    .badge {
      color: #ef4444;
    }
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    .badge {
      font-size: 0.7em;
      font-weight: 900;
      background: #fff;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .time {
      font-size: 0.75em;
      color: #94a3b8;
      font-weight: 800;
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
    font-weight: 600;
  }
`;
