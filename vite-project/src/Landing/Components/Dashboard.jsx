import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  AnimatedBox,
  SectionLabel,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { useState, useRef } from 'react';

const sensorData = [
  {
    label: 'Temperature',
    value: '24.2',
    unit: '°C',
    trend: '+0.5',
    status: 'stable',
  },
  {
    label: 'Humidity',
    value: '65',
    unit: '%',
    trend: '-2',
    status: 'down',
  },
  {
    label: 'CO2 Level',
    value: '410',
    unit: 'ppm',
    trend: '+15',
    status: 'up',
  },
  {
    label: 'Radiation',
    value: '350',
    unit: 'W/m²',
    trend: 'Sunny',
    status: 'stable',
  },
  {
    label: 'Soil EC',
    value: '1.2',
    unit: 'dS/m',
    trend: 'Stable',
    status: 'stable',
  },
  {
    label: 'Soil pH',
    value: '5.8',
    unit: '',
    trend: 'Stable',
    status: 'stable',
  },
];

const deviceLogs = [
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

const growthData = [
  { label: '초장 (Height)', value: '124.5 cm' },
  { label: '엽수 (Leaves)', value: '18 개' },
  { label: '엽장 (Length)', value: '15.2 cm' },
  { label: '엽폭 (Width)', value: '12.0 cm' },
];

const showcaseCards = [
  {
    title: '실시간 센서 모니터링',
    desc: '온도, 습도, CO₂, EC, pH 등 핵심 환경 데이터를 실시간으로 확인합니다.',
    className: 'leftTop',
    feature: 'sensors',
  },
  {
    title: '비전 기반 생육 분석',
    desc: '카메라를 통해 잎 상태와 생육 편차를 분석하고 이상 징후를 빠르게 파악합니다.',
    className: 'leftBottom',
    feature: 'vision',
  },
  {
    title: '이상 알림 및 경고',
    desc: '환경 변화와 생육 패턴을 바탕으로 위험 신호를 먼저 알려줍니다.',
    className: 'rightTop',
    feature: 'alerts',
  },
  {
    title: '자동 제어 및 작업 로그',
    desc: '관수, 환기, 차광 등 자동화 설비의 동작 이력을 한눈에 볼 수 있습니다.',
    className: 'rightMiddle',
    feature: 'logs',
  },
  {
    title: 'AI 운영 인사이트',
    desc: '환경 데이터와 생육 상태를 종합해 운영 추천과 대응 방향을 제안합니다.',
    className: 'rightBottom',
    feature: 'ai',
  },
];

const Dashboard = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <DashboardWrap id="dashboard">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionLabel>Dashboard Showcase</SectionLabel>
          <SectionTitle>AI 대시보드 미리보기</SectionTitle>
          <SectionDesc>
            실제 스마트팜 통합 관제 화면이 어떤 구조로 구성되는지 한눈에
            보여주는 예시 화면입니다.
          </SectionDesc>
        </AnimatedBox>

        <AnimatedBox className={animateClass} $delay="0.2s">
          <DashboardShowcase>
            {showcaseCards.map((card) => (
              <FloatingCard
                key={card.title}
                className={card.className}
                $active={activeFeature === card.feature}
                $hidden={
                  activeFeature !== null && activeFeature !== card.feature
                }
                onMouseEnter={() => setActiveFeature(card.feature)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </FloatingCard>
            ))}

            <DashboardMock>
              <ContentGrid>
                <LeftColumn>
                  <FarmSummaryCard
                    $active={activeFeature === 'alerts'}
                    $dimmed={
                      activeFeature !== null && activeFeature !== 'alerts'
                    }
                  >
                    <div className="header-row">
                      <div>
                        <WhiteCardTitle>Farm Overview</WhiteCardTitle>
                        <div className="branch-name">
                          천안 본점 (Cheonan Hub)
                        </div>
                      </div>
                      <span className="optimal-badge">Phase: 개화기 🌸</span>
                    </div>

                    <div className="summary-body">
                      <div className="main-info">
                        <div className="score-area">
                          <span className="score">96</span>
                          <span className="label">/ 100 pt</span>
                        </div>
                        <p className="status-text">
                          작물 활력도 최상 (전주 대비 2% ↗)
                        </p>
                      </div>

                      <div className="metrics-row">
                        <div className="metric-box">
                          <span className="m-label">진행중인 이슈</span>
                          <span className="m-value warning">
                            ⚠️ 1 건 확인 요망
                          </span>
                        </div>

                        <div className="divider"></div>

                        <div className="metric-box">
                          <span className="m-label">다음 예정 작업</span>
                          <span className="m-value normal">
                            자동 방제 (14:00)
                          </span>
                        </div>
                      </div>
                    </div>
                  </FarmSummaryCard>

                  <SensorsGroupCard
                    $active={activeFeature === 'sensors'}
                    $dimmed={
                      activeFeature !== null && activeFeature !== 'sensors'
                    }
                  >
                    <CardTitle>Real-time Sensors</CardTitle>
                    <SensorGrid>
                      {sensorData.map((sensor, index) => (
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
                  <LogGroupCard
                    $active={activeFeature === 'logs'}
                    $dimmed={activeFeature !== null && activeFeature !== 'logs'}
                  >
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
                            <span className={`action ${log.status}`}>
                              {log.action}
                            </span>
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
                  <CameraCard
                    $active={activeFeature === 'vision'}
                    $dimmed={
                      activeFeature !== null && activeFeature !== 'vision'
                    }
                  >
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

                  <GrowthCard
                    $active={activeFeature === 'vision'}
                    $dimmed={
                      activeFeature !== null && activeFeature !== 'vision'
                    }
                  >
                    <CardTitle>Crop Status</CardTitle>
                    <GrowthGrid>
                      {growthData.map((item, index) => (
                        <div className="g-item" key={index}>
                          <span className="l">{item.label}</span>
                          <span className="v">{item.value}</span>
                        </div>
                      ))}
                    </GrowthGrid>
                  </GrowthCard>

                  <AILogGroupCard
                    $active={activeFeature === 'ai'}
                    $dimmed={activeFeature !== null && activeFeature !== 'ai'}
                  >
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
            </DashboardMock>
          </DashboardShowcase>
        </AnimatedBox>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;

const DashboardWrap = styled(Section)`
  color: #0f172a;
`;

const DashboardShowcase = styled.div`
  position: relative;
  margin-top: 8px;
  padding-top: 34px;
`;

const DashboardMock = styled.div`
  margin-top: 8px;
  background: linear-gradient(180deg, #f8fafc 0%, #eef5f1 100%);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 32px;
  padding: 28px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.06),
    0 24px 60px rgba(15, 23, 42, 0.08);
  transition: box-shadow 0.28s ease;

  @media (max-width: 768px) {
    padding: 18px;
    border-radius: 24px;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  z-index: ${({ $active }) => ($active ? 8 : 4)};
  width: 280px;
  min-height: 132px;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};

  background: rgba(255, 255, 255, 0.97);
  border: ${({ $active }) =>
    $active
      ? '2px dashed rgba(16, 185, 129, 0.6)'
      : '1px solid rgba(203, 213, 225, 0.85)'};
  border-radius: 18px;
  padding: 18px;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 18px 40px rgba(16, 185, 129, 0.16), 0 24px 50px rgba(15, 23, 42, 0.10)'
      : '0 10px 25px rgba(15, 23, 42, 0.08), 0 24px 50px rgba(15, 23, 42, 0.08)'};

  transform: ${({ $active }) => ($active ? 'translateY(-4px)' : 'none')};
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border 0.22s ease;

  h4 {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    color: #475569;
    margin: 0;
  }

  &.leftTop {
    top: -16px;
    left: -18px;
  }

  &.leftBottom {
    top: 278px;
    left: -36px;
  }

  &.rightTop {
    top: -26px;
    right: -8px;
  }

  &.rightMiddle {
    top: 196px;
    right: -34px;
  }

  &.rightBottom {
    top: 396px;
    right: 6px;
  }

  @media (max-width: 1280px) {
    position: static;
    width: 100%;
    min-height: auto;
    display: block;
    margin-bottom: 16px;
  }
`;

const BaseCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid rgba(226, 232, 240, 0.85);

  outline: ${({ $active }) =>
    $active ? '2px dashed rgba(16, 185, 129, 0.7)' : 'none'};
  outline-offset: 4px;

  transition:
    opacity 0.28s ease,
    filter 0.28s ease,
    transform 0.28s ease,
    box-shadow 0.28s ease,
    outline 0.28s ease;

  opacity: ${({ $dimmed }) => ($dimmed ? 0.28 : 1)};
  filter: ${({ $dimmed }) =>
    $dimmed ? 'grayscale(0.18) brightness(0.94)' : 'none'};
  transform: ${({ $active }) => ($active ? 'translateY(-4px)' : 'none')};

  box-shadow: ${({ $active }) =>
    $active
      ? '0 12px 28px rgba(16, 185, 129, 0.16), 0 18px 40px rgba(15, 23, 42, 0.08)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.04)'};
`;

const CardTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1.2em 0;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WhiteCardTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.2em 0;
  letter-spacing: -0.02em;
`;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr;
  gap: 1.5em;
  width: 100%;
  min-height: 0;

  @media (max-width: 1180px) {
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
  min-height: 0;
  min-width: 0;
`;

const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-height: 0;
  min-width: 0;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
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
    gap: 12px;
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

  .score-area {
    display: flex;
    align-items: baseline;
  }

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

  .status-text {
    margin: 0.5em 0 0 0;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }

  .metrics-row {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.15);
    padding: 1em;
    border-radius: 16px;
    margin-top: 1em;
  }

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
  }

  .m-label {
    font-size: 0.75em;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 700;
  }

  .m-value {
    font-size: 1em;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .m-value.warning {
    color: #fecaca;
  }

  @media (max-width: 640px) {
    .header-row,
    .metrics-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .divider {
      display: none;
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

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SensorItem = styled.div`
  background-color: rgba(241, 245, 249, 0.8);
  border-radius: 16px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 0;
  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
  }

  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 0.2em;
  }

  .value {
    font-size: 1.6em;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .unit {
    font-size: 0.8em;
    font-weight: 700;
    color: #94a3b8;
  }

  .trend {
    font-size: 0.75em;
    font-weight: 800;
    margin-top: 1em;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .trend.up {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .trend.down {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }

  .trend.stable {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }
`;

const LogGroupCard = styled(BaseCard)`
  flex: 1;
  min-height: 0;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    gap: 10px;
  }

  .sub-badge {
    font-size: 0.7em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .sub-badge.system {
    background: #f1f5f9;
    color: #475569;
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
    gap: 10px;
  }

  .badges {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }

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

  .time {
    font-size: 0.8em;
    font-weight: 800;
    color: #94a3b8;
    white-space: nowrap;
  }

  .log-mid {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .device {
    font-size: 1.05em;
    font-weight: 800;
    color: #0f172a;
  }

  .action {
    font-size: 0.9em;
    font-weight: 800;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .action.active {
    color: #10b981;
  }

  .action.done {
    color: #64748b;
  }

  .desc {
    font-size: 0.85em;
    font-weight: 600;
    color: #64748b;
    line-height: 1.4;
    display: block;
  }

  @media (max-width: 640px) {
    .log-mid {
      flex-direction: column;
      align-items: flex-start;
    }
  }
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
    gap: 10px;
  }

  .cam-label {
    font-size: 0.75em;
    font-weight: 800;
    color: #475569;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 8px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .placeholder-content {
    flex: 1;
    min-height: 180px;
    background: #0f172a;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }

  .icon {
    font-size: 2.5em;
    margin-bottom: 8px;
    z-index: 2;
    opacity: 0.85;
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
  }

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
    gap: 10px;
  }

  .sub-badge {
    font-size: 0.7em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .sub-badge.ai {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
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
    gap: 10px;
  }

  .badge {
    font-size: 0.7em;
    font-weight: 900;
    background: #fff;
    padding: 2px 6px;
    border-radius: 4px;
  }

  &.action .badge {
    color: #10b981;
  }

  &.warning .badge {
    color: #ef4444;
  }

  .time {
    font-size: 0.75em;
    color: #94a3b8;
    font-weight: 800;
  }

  .title {
    font-size: 0.9em;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.3em;
  }

  .desc {
    font-size: 0.8em;
    color: #475569;
    line-height: 1.4;
    font-weight: 600;
  }
`;
