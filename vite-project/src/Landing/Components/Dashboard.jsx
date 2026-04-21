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

const weatherData = {
  icon: '☀️',
  temp: '15.2',
  unit: '°C',
  desc: '맑음 · 습도 42%',
};

const scoreData = {
  score: 96,
  status: '작물 활력도 최상 (전주 대비 2% 상승)',
  phase: '개화기 🌸',
  grade: '매우 좋음',
};

const growthData = [
  { label: '초장 (세로 높이)', value: '124.5 cm' },
  { label: '엽수 (잎 개수)', value: '18 개' },
  { label: '엽장 (잎 길이)', value: '15.2 cm' },
  { label: '엽폭 (잎 너비)', value: '12.0 cm' },
];

const deviceLogs = [
  {
    id: 1,
    time: '14:10',
    device: '💧 메인 펌프',
    action: '가동',
    desc: 'EC 1.2 공급',
    status: 'active',
  },
  {
    id: 2,
    time: '13:30',
    device: '💨 배기팬 2번',
    action: '2단계',
    desc: '온도 초과 배기',
    status: 'active',
  },
];

const aiLogs = [
  {
    time: '14:25',
    status: 'action',
    title: '관수량 10% 증량 권장',
    desc: '오후 외부 일사량 급증 예상 대비',
  },
  {
    time: '13:55',
    status: 'warning',
    title: '고온 피해 주의보',
    desc: '내부 온도 28°C 돌파 예상 - 사전 환기 필요',
  },
];

const sensorData = [
  {
    label: '내부 온도',
    value: '24.5',
    unit: '°C',
    trend: '+0.5',
    status: 'stable',
    range: '정상 22~26°C',
    updatedAt: '방금 전',
  },
  {
    label: '내부 습도',
    value: '64.5',
    unit: '%',
    trend: '-2',
    status: 'down',
    range: '정상 55~70%',
    updatedAt: '방금 전',
  },
  {
    label: 'CO2 농도',
    value: '410',
    unit: 'ppm',
    trend: '+15',
    status: 'up',
    range: '정상 350~500 ppm',
    updatedAt: '1분 전',
  },
  {
    label: '광합성 광량',
    value: '350',
    unit: 'PPFD',
    trend: '최적',
    status: 'stable',
    range: '기준 250~400 PPFD',
    updatedAt: '1분 전',
  },
  {
    label: '토양 양액 농도(EC)',
    value: '1.2',
    unit: 'dS/m',
    trend: '유지',
    status: 'stable',
    range: '정상 1.0~1.5 dS/m',
    updatedAt: '방금 전',
  },
  {
    label: '토양 산도(pH)',
    value: '5.8',
    unit: 'pH',
    trend: '유지',
    status: 'stable',
    range: '정상 5.5~6.5 pH',
    updatedAt: '방금 전',
  },
];

const Dashboard = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <DashboardWrap id="dashboard">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionLabel>Dashboard Showcase</SectionLabel>
          <SectionTitle>AI 대시보드 미리보기</SectionTitle>
          <SectionDesc>
            Seed Farm의 스마트팜 관제 대시보드 예시 화면입니다.
          </SectionDesc>
        </AnimatedBox>

        <AnimatedBox className={animateClass} $delay="0.1s">
          <DashboardMock>
            <TopSummaryRow>
              <WeatherCard>
                <div className="header-row">
                  <div className="small-title">외부 기상 관측</div>
                  <div className="small-link">참고 지표</div>
                </div>

                <div className="weather-main">
                  <div className="weather-icon">{weatherData.icon}</div>
                  <div className="weather-info">
                    <div className="temp">
                      {weatherData.temp}
                      <span>{weatherData.unit}</span>
                    </div>
                    <div className="desc">{weatherData.desc}</div>
                  </div>
                </div>

                <div className="bottom-row">
                  <span className="badge">대기: 보통</span>
                  <span className="muted">광주/환기 연동 대기</span>
                </div>
              </WeatherCard>

              <ScoreCard>
                <div className="score-top">
                  <div className="small-title">종합 생육 점수</div>
                  <div className="score-badge">{scoreData.grade}</div>
                </div>

                <div className="score-row">
                  <div className="score-wrap">
                    <span className="score">{scoreData.score}</span>
                    <span className="percent">%</span>
                  </div>
                  <div className="phase-badge">{scoreData.phase}</div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${scoreData.score}%` }}
                  />
                </div>

                <div className="status">{scoreData.status}</div>
              </ScoreCard>

              <GrowthCard>
                <CardHeader>식물 생육 지표</CardHeader>
                <GrowthGrid>
                  {growthData.map((item) => (
                    <div className="g-item" key={item.label}>
                      <span className="l">{item.label}</span>
                      <span className="v">{item.value}</span>
                    </div>
                  ))}
                </GrowthGrid>
              </GrowthCard>
            </TopSummaryRow>

            <MainGrid>
              <CameraPanel>
                <div className="header-row">
                  <CardHeader>현장 모니터링 (CCTV)</CardHeader>
                  <span className="cam-label">1번 카메라</span>
                </div>

                <div className="camera-box">
                  <div className="camera-center">
                    <div className="pulse-ring" />
                    <span className="icon">📹</span>
                    <span className="text">스트리밍 연결 중...</span>
                  </div>
                </div>
              </CameraPanel>

              <CenterColumn>
                <LogCard>
                  <div className="log-header">
                    <CardHeader>장치 작동 이력</CardHeader>
                  </div>

                  <LogList>
                    {deviceLogs.map((log) => (
                      <DeviceLogItem key={log.id} className={log.status}>
                        <div className="log-top">
                          <span className="time-badge">{log.time}</span>
                        </div>

                        <div className="log-mid">
                          <span className="device">{log.device}</span>
                          <span className={`action ${log.status}`}>
                            {log.action}
                          </span>
                        </div>

                        <div className="log-bot">{log.desc}</div>
                      </DeviceLogItem>
                    ))}
                  </LogList>
                </LogCard>

                <AILogCard>
                  <div className="log-header">
                    <CardHeader>AI Insights</CardHeader>
                    <span className="sub-badge ai">AI Active</span>
                  </div>

                  <AILogList>
                    {aiLogs.map((log) => (
                      <AILogItem key={log.time} className={log.status}>
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
                </AILogCard>
              </CenterColumn>

              <SensorPanel>
                <CardHeader>환경 측정 데이터</CardHeader>
                <SensorGrid>
                  {sensorData.map((sensor) => (
                    <SensorItem key={sensor.label}>
                      <div className="top">
                        <div className="label">{sensor.label}</div>
                        <div className={`trend ${sensor.status}`}>
                          {sensor.status === 'up'
                            ? `▲ ${sensor.trend}`
                            : sensor.status === 'down'
                              ? `▼ ${sensor.trend}`
                              : sensor.trend}
                        </div>
                      </div>

                      <div className="middle">
                        <div className="left">
                          <span className="value">{sensor.value}</span>
                          <span className="unit">{sensor.unit}</span>
                        </div>

                        <div className="right">
                          <span className="range">{sensor.range}</span>
                          <span className="updated">{sensor.updatedAt}</span>
                        </div>
                      </div>
                    </SensorItem>
                  ))}
                </SensorGrid>
              </SensorPanel>
            </MainGrid>
          </DashboardMock>
        </AnimatedBox>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;

const DashboardWrap = styled(Section)`
  color: #1a1f36;
`;

const DashboardMock = styled.div`
  margin-top: 40px;
  background: #eef2f3;
  border: 1px solid #e1e7ea;
  border-radius: 24px;
  padding: 16px;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.06),
    0 4px 12px rgba(15, 23, 42, 0.04);

  @media (max-width: 1180px) {
    padding: 14px;
  }
`;

const TopSummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2.7fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr 0.92fr;
  gap: 12px;
  min-height: 560px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const BaseCard = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #e4eaee;
  border-radius: 18px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
`;

const CardHeader = styled.h3`
  font-size: 0.98rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
`;

const WeatherCard = styled(BaseCard)`
  min-height: 128px;
  justify-content: space-between;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .small-title {
    font-size: 0.88rem;
    font-weight: 800;
    color: #0f172a;
  }

  .small-link {
    font-size: 0.72rem;
    color: #94a3b8;
    font-weight: 700;
  }

  .weather-main {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .weather-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #fff8d6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.55rem;
    flex-shrink: 0;
  }

  .temp {
    font-size: 2rem;
    line-height: 1;
    font-weight: 900;
    color: #0f172a;

    span {
      font-size: 0.55em;
      margin-left: 2px;
      color: #334155;
      font-weight: 800;
    }
  }

  .desc {
    margin-top: 4px;
    font-size: 0.78rem;
    color: #334155;
    font-weight: 700;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .badge {
    font-size: 0.68rem;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 999px;
    background: #eef2ff;
    color: #334155;
  }

  .muted {
    font-size: 0.68rem;
    color: #94a3b8;
    font-weight: 700;
  }
`;

const ScoreCard = styled(BaseCard)`
  min-height: 128px;
  background: linear-gradient(180deg, #dff6ea 0%, #d0efe0 100%);
  border-color: #bfe4cf;
  justify-content: center;

  .score-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .small-title {
    font-size: 0.88rem;
    font-weight: 800;
    color: #0f172a;
  }

  .score-badge {
    font-size: 0.66rem;
    font-weight: 800;
    color: #059669;
    background: rgba(16, 185, 129, 0.14);
    padding: 4px 8px;
    border-radius: 999px;
  }

  .score-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 10px;
  }

  .score-wrap {
    display: flex;
    align-items: baseline;
    line-height: 1;
  }

  .score {
    font-size: 2.35rem;
    font-weight: 900;
    color: #059669;
    letter-spacing: -0.05em;
  }

  .percent {
    font-size: 0.95rem;
    font-weight: 900;
    color: #10b981;
    margin-left: 2px;
  }

  .phase-badge {
    display: inline-flex;
    align-items: center;
    background: #10b981;
    color: #fff;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(15, 23, 42, 0.08);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }

  .status {
    font-size: 0.74rem;
    font-weight: 700;
    color: #166534;
    line-height: 1.4;
  }
`;

const GrowthCard = styled(BaseCard)`
  min-height: 128px;
`;

const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  flex: 1;

  .g-item {
    background: rgba(248, 250, 252, 0.9);
    border: 1px solid #edf2f7;
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .l {
    font-size: 0.65rem;
    color: #94a3b8;
    font-weight: 800;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }

  .v {
    font-size: 1rem;
    font-weight: 800;
    color: #0f172a;
  }
`;

const CameraPanel = styled(BaseCard)`
  min-height: 0;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .cam-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: #64748b;
    background: #f1f5f9;
    padding: 4px 9px;
    border-radius: 999px;
  }

  .camera-box {
    flex: 1;
    border-radius: 14px;
    background: linear-gradient(180deg, #0b1738 0%, #07142d 100%);
    position: relative;
    overflow: hidden;
    min-height: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .camera-center {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 6px;
  }

  .text {
    font-size: 0.82rem;
    font-weight: 700;
    opacity: 0.9;
  }

  .pulse-ring {
    position: absolute;
    width: 54px;
    height: 54px;
    border-radius: 999px;
    border: 2px solid rgba(16, 185, 129, 0.8);
    animation: radar 2s infinite ease-out;
  }

  @keyframes radar {
    0% {
      transform: scale(0.6);
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

const LogCard = styled(BaseCard)`
  flex: 0 0 178px;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeviceLogItem = styled.div`
  background: rgba(248, 250, 252, 0.9);
  border-radius: 14px;
  padding: 12px 12px 11px;
  border-left: 3px solid transparent;

  &.active {
    border-left-color: #10b981;
  }

  .log-top {
    margin-bottom: 6px;
  }

  .time-badge {
    display: inline-flex;
    padding: 3px 8px;
    border-radius: 999px;
    background: #e2e8f0;
    color: #475569;
    font-size: 0.66rem;
    font-weight: 800;
  }

  .log-mid {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 5px;
  }

  .device {
    font-size: 0.92rem;
    font-weight: 800;
    color: #0f172a;
  }

  .action {
    font-size: 0.8rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .action.active {
    color: #10b981;
  }

  .log-bot {
    font-size: 0.74rem;
    font-weight: 700;
    color: #64748b;
  }
`;

const AILogCard = styled(BaseCard)`
  flex: 1;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .sub-badge.ai {
    font-size: 0.66rem;
    font-weight: 800;
    padding: 4px 9px;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
`;

const AILogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AILogItem = styled.div`
  padding: 11px 12px;
  border-radius: 12px;
  border-left: 3px solid transparent;

  &.action {
    background: rgba(16, 185, 129, 0.05);
    border-left-color: #10b981;
  }

  &.warning {
    background: rgba(239, 68, 68, 0.06);
    border-left-color: #ef4444;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .badge {
    font-size: 0.66rem;
    font-weight: 900;
    color: #10b981;
  }

  .time {
    font-size: 0.68rem;
    font-weight: 800;
    color: #94a3b8;
  }

  &.warning .badge {
    color: #ef4444;
  }

  .title {
    font-size: 0.82rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 3px;
  }

  .desc {
    font-size: 0.72rem;
    line-height: 1.4;
    font-weight: 700;
    color: #64748b;
  }
`;

const SensorPanel = styled(BaseCard)`
  min-height: 0;
`;

const SensorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
  flex: 1;
  min-height: 0;

  @media (max-width: 1180px) {
    grid-template-rows: repeat(6, minmax(74px, auto));
  }
`;

const SensorItem = styled.div`
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid #edf2f7;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .label {
    font-size: 0.66rem;
    font-weight: 800;
    color: #64748b;
  }

  .trend {
    font-size: 0.66rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .trend.up {
    color: #ef4444;
  }

  .trend.down {
    color: #3b82f6;
  }

  .trend.stable {
    color: #10b981;
  }

  .middle {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 10px;
  }

  .left {
    display: flex;
    align-items: baseline;
    gap: 3px;
    min-width: 0;
  }

  .value {
    font-size: 1.55rem;
    font-weight: 900;
    color: #0f172a;
    line-height: 1;
  }

  .unit {
    font-size: 0.72rem;
    font-weight: 800;
    color: #94a3b8;
    line-height: 1;
  }

  .right {
    display: flex;
    gap: 5px;
    font-size: 0.6rem;
    font-weight: 800;
    line-height: 1;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .range {
    color: #64748b;
  }

  .updated {
    color: #94a3b8;
  }
`;
