import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { CardTitle } from './Styles/AdminShared';

const DashboardPage = () => {
  const { selectedBranch } = useOutletContext();

  const dashboardData = useMemo(
    () => ({
      '천안 본점 (종합관제센터)': {
        score: 96,
        phase: '개화기 🌸',
        status: '작물 활력도 최상 (전주 대비 2% 상승)',
        sensors: [
          {
            label: '내부 온도',
            value: 24.2,
            unit: '°C',
            trend: '+0.5',
            status: 'stable',
          },
          {
            label: '내부 습도',
            value: 65,
            unit: '%',
            trend: '-2',
            status: 'down',
          },
          {
            label: 'CO2 농도',
            value: 410,
            unit: 'ppm',
            trend: '+15',
            status: 'up',
          },
          {
            label: '광합성 광량',
            value: 350,
            unit: 'PPFD',
            trend: '최적',
            status: 'stable',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 1.2,
            unit: 'dS/m',
            trend: '유지',
            status: 'stable',
          },
          {
            label: '토양 산도(pH)',
            value: 5.8,
            unit: 'pH',
            trend: '유지',
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
          {
            id: 3,
            time: '11:00',
            device: '🌤️ 차광 스크린',
            action: '50% 전개',
            desc: '일사량 차단',
            status: 'done',
          },
          {
            id: 4,
            time: '10:00',
            device: '💡 LED 보광등',
            action: '소등',
            desc: '주간 모드 전환',
            status: 'done',
          },
        ],
      },
      '천안 제2센터 (육묘 전용)': {
        score: 88,
        phase: '정식기 🌱',
        status: '초기 활착 안정적 진행 중',
        sensors: [
          {
            label: '내부 온도',
            value: 22.5,
            unit: '°C',
            trend: '+0.2',
            status: 'stable',
          },
          {
            label: '내부 습도',
            value: 70,
            unit: '%',
            trend: '+5',
            status: 'up',
          },
          {
            label: 'CO2 농도',
            value: 450,
            unit: 'ppm',
            trend: '-10',
            status: 'down',
          },
          {
            label: '광합성 광량',
            value: 280,
            unit: 'PPFD',
            trend: '흐림',
            status: 'stable',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 1.0,
            unit: 'dS/m',
            trend: '유지',
            status: 'stable',
          },
          {
            label: '토양 산도(pH)',
            value: 6.0,
            unit: 'pH',
            trend: '유지',
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
            device: '🌡️ 온풍기',
            action: '대기 모드',
            desc: '야간 설정 온도 18°C 대기 중',
            status: 'done',
          },
          {
            id: 2,
            time: '12:00',
            device: '💡 LED 보광등',
            action: '점등 가동',
            desc: '일조량 부족 감지 -> 광량 보충 실행',
            status: 'active',
          },
        ],
      },
    }),
    [],
  );

  const currentData =
    dashboardData[selectedBranch] || dashboardData['천안 본점 (종합관제센터)'];

  const [liveSensors, setLiveSensors] = useState(currentData.sensors);

  const weatherData = {
    temp: 15.2,
    desc: '맑음',
    humidity: 42,
    aqi: '보통',
    icon: '🌤️',
  };

  useEffect(() => {
    setLiveSensors(currentData.sensors);

    const interval = setInterval(() => {
      setLiveSensors((prev) =>
        prev.map((s) => {
          if (s.label === '내부 온도' || s.label === '내부 습도') {
            const fluctuate = Math.random() * 0.2 - 0.1;
            return {
              ...s,
              value: Number(parseFloat(s.value) + fluctuate).toFixed(1),
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
      title: '관수량 10% 증량 권장',
      desc: '오후 외부 일사량 급증 예상 대비',
    },
    {
      time: '13:55',
      status: 'warning',
      title: '고온 피해 주의보',
      desc: '내부 온도 28°C 돌파 예상 - 사전 환기 필요',
    },
    {
      time: '13:20',
      status: 'warning',
      title: 'CO2 공급 부족 감지',
      desc: '외부 유입이 없어 CO2 농도 유지 실패, 공급 시스템 점검 필요',
    },
  ];

  const sensorMetaMap = {
    '내부 온도': {
      range: '정상 22~26°C',
      updatedAt: '방금 전',
    },
    '내부 습도': {
      range: '정상 55~70%',
      updatedAt: '방금 전',
    },
    'CO2 농도': {
      range: '정상 350~500 ppm',
      updatedAt: '1분 전',
    },
    '광합성 광량': {
      range: '기준 250~400 PPFD',
      updatedAt: '1분 전',
    },
    '토양 양액 농도(EC)': {
      range: '정상 1.0~1.5 dS/m',
      updatedAt: '방금 전',
    },
    '토양 산도(pH)': {
      range: '정상 5.5~6.5 pH',
      updatedAt: '방금 전',
    },
  };

  const mainSensorCards = [
    liveSensors.find((s) => s.label === '내부 온도'),
    liveSensors.find((s) => s.label === '내부 습도'),
    liveSensors.find((s) => s.label === 'CO2 농도'),
    liveSensors.find((s) => s.label === '광합성 광량'),
    liveSensors.find((s) => s.label === '토양 양액 농도(EC)'),
    liveSensors.find((s) => s.label === '토양 산도(pH)'),
  ]
    .filter(Boolean)
    .map((sensor) => ({
      ...sensor,
      range: sensorMetaMap[sensor.label]?.range || '',
      updatedAt: sensorMetaMap[sensor.label]?.updatedAt || '방금 전',
    }));

  return (
    <PageGrid>
      <TopRow>
        <TopLeftGroup>
          <WeatherMiniCard>
            <div className="header-row">
              <div className="small-title">외부 기상 관측</div>
              <div className="small-link">참고 지표</div>
            </div>

            <div className="weather-main">
              <div className="weather-icon">{weatherData.icon}</div>
              <div className="weather-info">
                <div className="temp">
                  {weatherData.temp}
                  <span>°C</span>
                </div>
                <div className="desc">
                  {weatherData.desc} · 습도 {weatherData.humidity}%
                </div>
              </div>
            </div>

            <div className="bottom-row">
              <span className="badge">대기: {weatherData.aqi}</span>
              <span className="muted">광주/환기 연동 대기</span>
            </div>
          </WeatherMiniCard>

          <ScoreMiniCard>
            <div className="score-top">
              <div className="small-title">종합 생육 점수</div>
              <div className="score-badge">매우 좋음</div>
            </div>

            <div className="score-row">
              <div className="score-wrap">
                <span className="score">{currentData.score}</span>
                <span className="percent">%</span>
              </div>
              <div className="phase-badge">{currentData.phase}</div>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${currentData.score}%` }}
              />
            </div>

            <div className="status">{currentData.status}</div>
          </ScoreMiniCard>
        </TopLeftGroup>

        <GrowthCard>
          <CardTitle>식물 생육 지표</CardTitle>
          <GrowthGrid>
            <div className="g-item">
              <span className="l">초장 (세로 높이)</span>
              <span className="v">{currentData.growth.height}</span>
            </div>
            <div className="g-item">
              <span className="l">엽수 (잎 개수)</span>
              <span className="v">{currentData.growth.leafCount}</span>
            </div>
            <div className="g-item">
              <span className="l">엽장 (잎 길이)</span>
              <span className="v">{currentData.growth.leafLength}</span>
            </div>
            <div className="g-item">
              <span className="l">엽폭 (잎 너비)</span>
              <span className="v">{currentData.growth.leafWidth}</span>
            </div>
          </GrowthGrid>
        </GrowthCard>
      </TopRow>

      <BottomRow>
        <CameraCard>
          <div className="header-row">
            <CardTitle>현장 모니터링 (CCTV)</CardTitle>
            <span className="cam-label">1번 카메라</span>
          </div>
          <div className="placeholder-content">
            <div className="pulse-ring"></div>
            <span className="icon">📹</span>
            <span className="text">스트리밍 연결 중...</span>
          </div>
        </CameraCard>

        <CenterColumn>
          <LogGroupCard>
            <div className="log-header">
              <CardTitle>장치 작동 이력</CardTitle>
            </div>
            <LogList>
              {currentData.logs.map((log) => (
                <DeviceLogItem key={log.id} className={log.status}>
                  <div className="log-top">
                    <div className="badges">
                      <span className="sector-badge">{log.time}</span>
                    </div>
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
        </CenterColumn>

        <RightColumn>
          <SensorsGroupCard>
            <CardTitle>환경 측정 데이터</CardTitle>
            <SensorGrid>
              {mainSensorCards.map((sensor, index) => (
                <SensorGridItem key={index}>
                  <div className="top">
                    <div className="label">{sensor.label}</div>
                    <div className={`trend ${sensor.status}`}>
                      {sensor.status === 'up'
                        ? '▲ '
                        : sensor.status === 'down'
                          ? '▼ '
                          : ''}
                      {sensor.trend}
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
                </SensorGridItem>
              ))}
            </SensorGrid>
          </SensorsGroupCard>
        </RightColumn>
      </BottomRow>
    </PageGrid>
  );
};

export default DashboardPage;

const BaseCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.1em;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 10px 15px -3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const PageGrid = styled.div`
  --grid-gap: 1.1em;

  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--grid-gap);
  width: 100%;
  min-height: 0;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns:
    calc((100% - (var(--grid-gap) * 2)) * (1.5 / 3.35))
    calc(
      100% - ((100% - (var(--grid-gap) * 2)) * (1.5 / 3.35)) - var(--grid-gap)
    );
  gap: var(--grid-gap);
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const TopLeftGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--grid-gap);
  min-width: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.85fr;
  gap: var(--grid-gap);
  width: 100%;
  height: 610px;
  min-height: 610px;
  max-height: 610px;
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--grid-gap);
  min-width: 0;
  height: 610px;
  min-height: 610px;
  max-height: 610px;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 610px;
  min-height: 610px;
  max-height: 610px;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

const WeatherMiniCard = styled(BaseCard)`
  justify-content: space-between;
  min-height: 190px;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.9em;
  }

  .small-title {
    font-size: 0.92em;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .small-link {
    font-size: 0.75em;
    font-weight: 700;
    color: #94a3b8;
  }

  .weather-main {
    display: flex;
    align-items: center;
    gap: 0.9em;
  }

  .weather-icon {
    font-size: 2em;
  }

  .weather-info {
    display: flex;
    flex-direction: column;
  }

  .temp {
    font-size: 2em;
    font-weight: 800;
    color: #0f172a;
    line-height: 1;

    span {
      font-size: 0.55em;
      margin-left: 2px;
    }
  }

  .desc {
    margin-top: 0.35em;
    font-size: 0.84em;
    font-weight: 700;
    color: #475569;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
    margin-top: 0.1em;
    margin-bottom: 1.2em;
  }

  .badge {
    font-size: 0.72em;
    font-weight: 800;
    color: #475569;
    background: #f1f5f9;
    padding: 5px 10px;
    border-radius: 999px;
  }

  .muted {
    font-size: 0.73em;
    font-weight: 700;
    color: #94a3b8;
  }
`;

const ScoreMiniCard = styled(BaseCard)`
  min-height: 190px;
  justify-content: center;
  background: linear-gradient(180deg, #ecfdf5 0%, #dff7eb 100%);
  border: 1px solid rgba(16, 185, 129, 0.12);
  padding: 1.15em 1.1em;

  .score-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.9em;
  }

  .small-title {
    font-size: 0.92em;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .score-badge {
    font-size: 0.68em;
    font-weight: 800;
    color: #059669;
    background: rgba(16, 185, 129, 0.12);
    padding: 5px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .score-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.8em;
    margin-bottom: 0.8em;
  }

  .score-wrap {
    display: flex;
    align-items: baseline;
    gap: 4px;
    line-height: 1;
  }

  .score {
    font-size: 2.5rem;
    font-weight: 900;
    color: #059669;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .percent {
    font-size: 1rem;
    font-weight: 800;
    color: #10b981;
    line-height: 1;
  }

  .phase-badge {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    background: #10b981;
    color: #ffffff;
    padding: 6px 11px;
    border-radius: 999px;
    font-size: 0.74em;
    font-weight: 800;
    white-space: nowrap;
  }

  .progress-track {
    width: 100%;
    height: 10px;
    background: rgba(15, 23, 42, 0.08);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 0.85em;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }

  .status {
    font-size: 0.82em;
    font-weight: 700;
    line-height: 1.45;
    color: #166534;
  }
`;

const CameraCard = styled(BaseCard)`
  height: 610px;
  min-height: 610px;
  max-height: 610px;
  padding: 1em;
  overflow: hidden;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.8em;

    h2 {
      margin-bottom: 0;
    }
  }

  .cam-label {
    font-size: 0.72em;
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
    height: calc(100% - 42px);
    min-height: 0;

    .icon {
      font-size: 2.3em;
      margin-bottom: 8px;
      z-index: 2;
      opacity: 0.8;
    }

    .text {
      font-size: 0.84em;
      font-weight: 700;
      letter-spacing: 0.02em;
      z-index: 2;
      opacity: 0.85;
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

  @media (max-width: 1200px) {
    height: auto;
    min-height: 520px;
    max-height: none;
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

const LogGroupCard = styled(BaseCard)`
  flex: 0 0 300px;
  height: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow: hidden;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8em;

    h2 {
      margin-bottom: 0;
    }
  }

  @media (max-width: 1200px) {
    flex: none;
    height: auto;
    min-height: 300px;
    max-height: none;
  }
`;

const AILogGroupCard = styled(BaseCard)`
  flex: 1;
  height: calc(610px - 300px - var(--grid-gap));
  min-height: 240px;
  max-height: calc(610px - 300px - var(--grid-gap));
  padding: 1em;
  overflow: hidden;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8em;

    h2 {
      margin-bottom: 0;
    }
  }

  .sub-badge {
    font-size: 0.68em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;

    &.ai {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
  }

  @media (max-width: 1200px) {
    height: auto;
    min-height: 240px;
    max-height: none;
  }
`;

const SensorsGroupCard = styled(BaseCard)`
  flex: 1;
  height: 610px;
  min-height: 610px;
  max-height: 610px;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: auto;
    min-height: 400px;
    max-height: none;
  }
`;

const SensorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr); // 6칸 고정
  gap: 0.55em;

  flex: 1;
  min-height: 0;
  height: 100%; // 부모 높이 꽉 채움
`;

const SensorGridItem = styled.div`
  background-color: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 0.6em 0.9em;

  display: flex;
  flex-direction: column;
  justify-content: center; // 카드 내부 내용 세로 가운데
  gap: 2px;

  min-width: 0;
  min-height: 0;
  transition: background 0.3s ease;

  &:hover {
    background-color: #f8fafc;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .label {
    font-size: 0.68em;
    font-weight: 800;
    color: #64748b;
    line-height: 1.2;
    letter-spacing: -0.01em;
    word-break: keep-all;
  }

  .trend {
    font-size: 0.65em;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;

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

  .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    .left {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value {
      font-size: 1.2em;
      font-weight: 800;
      color: #0f172a;
      line-height: 1;
    }

    .unit {
      font-size: 0.75em;
      color: #94a3b8;
      line-height: 1;
    }

    .right {
      display: flex;
      gap: 6px;
      font-size: 0.65em;
      font-weight: 700;
      color: #94a3b8;
      line-height: 1;
    }

    .range {
      color: #64748b;
    }
  }
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.3em;

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
  padding: 0.9em 1.1em;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
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
        font-size: 0.72em;
        font-weight: 800;
        color: #475569;
        background: #e2e8f0;
        padding: 4px 10px;
        border-radius: 8px;
      }
    }
  }

  .log-mid {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;

    .device {
      font-size: 0.96em;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .action {
      font-size: 0.82em;
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
      font-size: 0.78em;
      font-weight: 600;
      color: #64748b;
      line-height: 1.35;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const GrowthCard = styled(BaseCard)`
  min-height: 190px;
  padding: 1em;
`;

const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8em;

  .g-item {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    background: #f8fafc;
    padding: 9px;
    border-radius: 12px;

    .l {
      font-size: 0.66em;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
    }

    .v {
      font-size: 1em;
      font-weight: 800;
      color: #0f172a;
    }
  }
`;

const AILogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.3em;

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
  padding: 0.9em;
  border-radius: 12px;
  margin-bottom: 0.35em;
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
    margin-bottom: 0.4em;

    .badge {
      font-size: 0.68em;
      font-weight: 900;
      background: #fff;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .time {
      font-size: 0.72em;
      color: #94a3b8;
      font-weight: 800;
    }
  }

  .title {
    font-size: 0.84em;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.25em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    font-size: 0.75em;
    color: #475569;
    line-height: 1.35;
    font-weight: 600;
  }
`;
