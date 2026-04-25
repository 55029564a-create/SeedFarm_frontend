import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { CardTitle } from './Styles/AdminShared';
import { getCameraByBranch, FALLBACK_IMAGE } from '../data/cctvData';

const API_BASE = 'http://127.0.0.1:8000/api';
const WS_BASE = 'ws://127.0.0.1:8000/api/ws/dashboard';

const getGrowthByPercent = (percent, phase) => {
  const standardDB = {
    '육묘기 🌱': { height: 25.0, leaf: 6, length: 5.5, width: 4.5 },
    '정식기 🪴': { height: 48.0, leaf: 9, length: 8.0, width: 6.5 },
    '초기 활착기 🌿': { height: 75.0, leaf: 12, length: 10.5, width: 8.5 },
    '영양 생장기 🍃': { height: 105.0, leaf: 16, length: 13.0, width: 11.0 },
    '1화방 개화기 🌼': { height: 135.0, leaf: 19, length: 15.0, width: 12.5 },
    '2~3화방 개화기 🌸': { height: 165.0, leaf: 22, length: 16.5, width: 13.5 },
    '과실 비대기 🍏': { height: 195.0, leaf: 25, length: 17.5, width: 14.5 },
    '첫 수확기 🍅': { height: 225.0, leaf: 28, length: 18.0, width: 15.0 },
    '연속 수확기 🔄': { height: 260.0, leaf: 30, length: 18.5, width: 15.5 },
  };

  const target = standardDB[phase] || standardDB['1화방 개화기 🌼'];
  const ratio = percent / 100;

  return {
    height: {
      value: +(target.height * ratio).toFixed(1),
      target: target.height,
      unit: 'cm',
    },
    leafCount: {
      value: Math.round(target.leaf * ratio),
      target: target.leaf,
      unit: '개',
    },
    leafLength: {
      value: +(target.length * ratio).toFixed(1),
      target: target.length,
      unit: 'cm',
    },
    leafWidth: {
      value: +(target.width * ratio).toFixed(1),
      target: target.width,
      unit: 'cm',
    },
  };
};

const DashboardPage = () => {
  const { selectedBranch } = useOutletContext();

  // 우선 테스트용으로 고정
  const batchId = 1;

  const [serverDashboard, setServerDashboard] = useState(null);
  const wsRef = useRef(null);

  const dashboardData = useMemo(
    () => ({
      'A동 (표준 생육실)': {
        percent: 96,
        phase: '1화방 개화기 🌼',
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
        growth: getGrowthByPercent(96, '1화방 개화기 🌼'),
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

      'B동 (성장 지연실)': {
        percent: 82,
        phase: '정식기 🪴',
        status: '생육 속도 저하 감지, 환경 보정 진행 중',
        sensors: [
          {
            label: '내부 온도',
            value: 21.4,
            unit: '°C',
            trend: '-0.4',
            status: 'down',
          },
          {
            label: '내부 습도',
            value: 72,
            unit: '%',
            trend: '+3',
            status: 'up',
          },
          {
            label: 'CO2 농도',
            value: 380,
            unit: 'ppm',
            trend: '-12',
            status: 'down',
          },
          {
            label: '광합성 광량',
            value: 240,
            unit: 'PPFD',
            trend: '부족',
            status: 'down',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 0.9,
            unit: 'dS/m',
            trend: '낮음',
            status: 'down',
          },
          {
            label: '토양 산도(pH)',
            value: 6.2,
            unit: 'pH',
            trend: '유지',
            status: 'stable',
          },
        ],
        growth: getGrowthByPercent(82, '정식기 🪴'),
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

      'C동 (성장 촉진실)': {
        percent: 91,
        phase: '과실 비대기 🍏',
        status: '촉진 생육 모드 정상 운영 중',
        sensors: [
          {
            label: '내부 온도',
            value: 25.1,
            unit: '°C',
            trend: '+0.3',
            status: 'stable',
          },
          {
            label: '내부 습도',
            value: 63,
            unit: '%',
            trend: '-1',
            status: 'stable',
          },
          {
            label: 'CO2 농도',
            value: 460,
            unit: 'ppm',
            trend: '+18',
            status: 'up',
          },
          {
            label: '광합성 광량',
            value: 390,
            unit: 'PPFD',
            trend: '충분',
            status: 'stable',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 1.4,
            unit: 'dS/m',
            trend: '유지',
            status: 'stable',
          },
          {
            label: '토양 산도(pH)',
            value: 5.7,
            unit: 'pH',
            trend: '유지',
            status: 'stable',
          },
        ],
        growth: getGrowthByPercent(91, '과실 비대기 🍏'),
        logs: [
          {
            id: 1,
            time: '14:20',
            device: '💧 관수 밸브',
            action: '자동 급액',
            desc: '생육 촉진 레시피 적용',
            status: 'active',
          },
          {
            id: 2,
            time: '13:40',
            device: '💡 LED 보광등',
            action: '출력 상승',
            desc: '광량 보강 15% 적용',
            status: 'active',
          },
        ],
      },
    }),
    [],
  );

  const currentData =
    dashboardData[selectedBranch] || dashboardData['A동 (표준 생육실)'];
  const [liveSensors, setLiveSensors] = useState(currentData.sensors);

  const currentCctv = getCameraByBranch(selectedBranch || 'A동 (표준 생육실)');
  const isCctvWarning = currentCctv.status !== 'Live';
  const isFallback = currentCctv.image === FALLBACK_IMAGE;

  const [isRetrying, setIsRetrying] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
  const [relativeUpdatedText, setRelativeUpdatedText] = useState('방금 전');
  const retryTimerRef = useRef(null);

  const getNowTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const getRelativeTimeText = (timestamp) => {
    const diffMs = Date.now() - timestamp;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin <= 0) return '방금 전';
    if (diffMin === 1) return '1분 전';
    if (diffMin < 60) return `${diffMin}분 전`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour === 1) return '1시간 전';
    if (diffHour < 24) return `${diffHour}시간 전`;

    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  };

  const parseUpdatedAtToTimestamp = (text) => {
    if (text === '방금 전') return Date.now();
    if (text === '1분 전') return Date.now() - 1 * 60000;
    if (text === '2분 전') return Date.now() - 2 * 60000;
    if (text === '3분 전') return Date.now() - 3 * 60000;
    return Date.now();
  };

  const handleRetryCctv = () => {
    setIsRetrying(true);

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }

    retryTimerRef.current = setTimeout(() => {
      setIsRetrying(false);
      const now = Date.now();
      setLastUpdatedAt(now);
      setRelativeUpdatedText('방금 전');
    }, 2000);
  };

  useEffect(() => {
    const baseTimestamp = parseUpdatedAtToTimestamp(currentCctv.updatedAt);
    setLastUpdatedAt(baseTimestamp);
    setRelativeUpdatedText(getRelativeTimeText(baseTimestamp));
  }, [selectedBranch, currentCctv.updatedAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeUpdatedText(getRelativeTimeText(lastUpdatedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedAt]);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  const weatherData = {
    temp: 15.2,
    desc: '맑음',
    humidity: 42,
    aqi: '보통',
    icon: '🌤️',
  };

  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/${batchId}`);
      const text = await res.text();
      console.log('dashboard raw', text);

      const json = JSON.parse(text);
      setServerDashboard(json);
    } catch (err) {
      console.error('dashboard 조회 실패', err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [batchId]);

  useEffect(() => {
    const ws = new WebSocket(`${WS_BASE}/${batchId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('dashboard websocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('dashboard ws type:', message.type);
        console.log('dashboard ws data:', message.data);
        console.log('dashboard ws sensors:', message.data?.sensors);
        console.log('dashboard ws device_logs:', message.data?.device_logs);

        if (
          message.type === 'dashboard_init' ||
          message.type === 'dashboard_update'
        ) {
          setServerDashboard(message.data);
        }
      } catch (err) {
        console.error('dashboard ws parse 실패', err);
      }
    };

    ws.onerror = (err) => {
      console.error('dashboard websocket error', err);
    };

    ws.onclose = () => {
      console.log('dashboard websocket closed');
    };

    return () => {
      ws.close();
    };
  }, [batchId]);

  // mock 실시간 효과라 실제 웹소켓 값이 들어오면 방해됨
  // useEffect(() => {
  //   setLiveSensors(currentData.sensors);
  //   const interval = setInterval(() => {
  //     setLiveSensors((prev) =>
  //       prev.map((s) => {
  //         if (s.label === '내부 온도' || s.label === '내부 습도') {
  //           const fluctuate = Math.random() * 0.2 - 0.1;
  //           return {
  //             ...s,
  //             value: Number(parseFloat(s.value) + fluctuate).toFixed(1),
  //           };
  //         }
  //         return s;
  //       }),
  //     );
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [selectedBranch, currentData]);

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
    '내부 온도': { range: '정상 22~26°C', updatedAt: '방금 전' },
    '내부 습도': { range: '정상 55~70%', updatedAt: '방금 전' },
    'CO2 농도': { range: '정상 350~500 ppm', updatedAt: '1분 전' },
    '광합성 광량': { range: '기준 250~400 PPFD', updatedAt: '1분 전' },
    '토양 양액 농도(EC)': { range: '정상 1.0~1.5 dS/m', updatedAt: '방금 전' },
    '토양 산도(pH)': { range: '정상 5.5~6.5 pH', updatedAt: '방금 전' },
  };

  const overview = serverDashboard?.overview;
  const sensors = serverDashboard?.sensors;
  const cropStatus = serverDashboard?.crop_status;
  const deviceLogs = serverDashboard?.device_logs || [];
  const aiReports = serverDashboard?.ai_reports || [];

  const mainSensorCards = sensors
    ? [
        {
          label: '내부 온도',
          value: sensors.temperature?.value ?? '-',
          unit: sensors.temperature?.unit ?? '°C',
          trend:
            sensors.temperature?.delta == null
              ? '-'
              : `${sensors.temperature.delta > 0 ? '+' : ''}${sensors.temperature.delta}`,
          status:
            sensors.temperature?.delta > 0
              ? 'up'
              : sensors.temperature?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['내부 온도']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
        {
          label: '내부 습도',
          value: sensors.humidity?.value ?? '-',
          unit: sensors.humidity?.unit ?? '%',
          trend:
            sensors.humidity?.delta == null
              ? '-'
              : `${sensors.humidity.delta > 0 ? '+' : ''}${sensors.humidity.delta}`,
          status:
            sensors.humidity?.delta > 0
              ? 'up'
              : sensors.humidity?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['내부 습도']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
        {
          label: 'CO2 농도',
          value: sensors.co2?.value ?? '-',
          unit: sensors.co2?.unit ?? 'ppm',
          trend:
            sensors.co2?.delta == null
              ? '-'
              : `${sensors.co2.delta > 0 ? '+' : ''}${sensors.co2.delta}`,
          status:
            sensors.co2?.delta > 0
              ? 'up'
              : sensors.co2?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['CO2 농도']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
        {
          label: '광합성 광량',
          value: sensors.radiation?.value ?? '-',
          unit: sensors.radiation?.unit ?? 'W/m²',
          trend:
            sensors.radiation?.delta == null
              ? '-'
              : `${sensors.radiation.delta > 0 ? '+' : ''}${sensors.radiation.delta}`,
          status:
            sensors.radiation?.delta > 0
              ? 'up'
              : sensors.radiation?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['광합성 광량']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
        {
          label: '토양 양액 농도(EC)',
          value: sensors.soil_ec?.value ?? '-',
          unit: sensors.soil_ec?.unit ?? 'dS/m',
          trend:
            sensors.soil_ec?.delta == null
              ? '-'
              : `${sensors.soil_ec.delta > 0 ? '+' : ''}${sensors.soil_ec.delta}`,
          status:
            sensors.soil_ec?.delta > 0
              ? 'up'
              : sensors.soil_ec?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['토양 양액 농도(EC)']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
        {
          label: '토양 산도(pH)',
          value: sensors.soil_ph?.value ?? '-',
          unit: sensors.soil_ph?.unit ?? 'pH',
          trend:
            sensors.soil_ph?.delta == null
              ? '-'
              : `${sensors.soil_ph.delta > 0 ? '+' : ''}${sensors.soil_ph.delta}`,
          status:
            sensors.soil_ph?.delta > 0
              ? 'up'
              : sensors.soil_ph?.delta < 0
                ? 'down'
                : 'stable',
          range: sensorMetaMap['토양 산도(pH)']?.range || '',
          updatedAt: sensors.recorded_at || '방금 전',
        },
      ]
    : liveSensors.map((sensor) => ({
        ...sensor,
        range: sensorMetaMap[sensor.label]?.range || '',
        updatedAt: sensorMetaMap[sensor.label]?.updatedAt || '방금 전',
      }));

  const growthData = cropStatus
    ? {
        height: {
          value: cropStatus.plant_height ?? 0,
          target: currentData.growth.height.target,
          unit: 'cm',
        },
        leafCount: {
          value: cropStatus.leaf_count ?? 0,
          target: currentData.growth.leafCount.target,
          unit: '개',
        },
        leafLength: {
          value: cropStatus.leaf_length ?? 0,
          target: currentData.growth.leafLength.target,
          unit: 'cm',
        },
        leafWidth: {
          value: cropStatus.leaf_width ?? 0,
          target: currentData.growth.leafWidth.target,
          unit: 'cm',
        },
      }
    : currentData.growth;

  const dashboardLogs = deviceLogs.length
    ? deviceLogs.map((log) => ({
        id: log.id,
        time: log.time || '-',
        device: log.device,
        action: log.mode,
        desc: log.detail || '',
        status: log.status === 'issued' ? 'active' : 'done',
      }))
    : currentData.logs;

  const dashboardAiLogs = aiReports.length
    ? aiReports.map((log) => ({
        time: log.time || '-',
        status: log.level === '경고' ? 'warning' : 'action',
        title: log.title,
        desc: `confidence=${log.confidence ?? '-'} / severity=${log.severity ?? '-'}`,
      }))
    : aiLogs;

  const renderGrowthItem = (label, data) => {
    const diff = (data.value - data.target).toFixed(1);
    const isUnder = diff < -0.5;

    let badgeClass = 'normal';
    let badgeText = '정상 🟢';

    if (isUnder) {
      badgeClass = 'warning';
      badgeText = `${Math.abs(diff)}${data.unit} 미달 🔻`;
    } else if (diff > 0.5) {
      badgeClass = 'good';
      badgeText = `+${diff}${data.unit} 초과 🔵`;
    }

    return (
      <div className="g-item">
        <div className="g-header">
          <span className="l">{label}</span>
          <span className={`diff-badge ${badgeClass}`}>{badgeText}</span>
        </div>
        <div className="g-body">
          <span className="v">{data.value}</span>
          <span className="u">{data.unit}</span>
          <span className="std">
            표준 {data.target}
            {data.unit}
          </span>
        </div>
      </div>
    );
  };

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
              <div className="small-title">종합 생육 진행도</div>
              <div className="score-badge">매우 좋음</div>
            </div>
            <div className="score-row">
              <div className="score-wrap">
                <span className="score">
                  {overview?.score ?? currentData.percent}
                </span>
                <span className="percent">%</span>
              </div>
              <div className="phase-badge">
                {overview?.phase ?? currentData.phase}
              </div>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${overview?.score ?? currentData.percent}%` }}
              />
            </div>
            <div className="status">
              {overview?.summary ?? currentData.status}
            </div>
          </ScoreMiniCard>
        </TopLeftGroup>

        <GrowthCard>
          <CardTitle>식물 생육 지표 (AI 편차 분석)</CardTitle>
          <GrowthGrid>
            {renderGrowthItem('초장 (세로 높이)', growthData.height)}
            {renderGrowthItem('엽수 (잎 개수)', growthData.leafCount)}
            {renderGrowthItem('엽장 (잎 길이)', growthData.leafLength)}
            {renderGrowthItem('엽폭 (잎 너비)', growthData.leafWidth)}
          </GrowthGrid>
        </GrowthCard>
      </TopRow>

      <BottomRow>
        <CameraCard>
          <div className="header-row">
            <CardTitle>현장 모니터링 (CCTV)</CardTitle>
            <span className="cam-label">{currentCctv.name}</span>
          </div>

          <div className="camera-view">
            {!isFallback && (
              <img
                src={currentCctv.image}
                alt={currentCctv.name}
                className="camera-image"
              />
            )}

            {isFallback && (
              <div
                className="camera-fallback-bg"
                style={{ backgroundImage: `url(${FALLBACK_IMAGE})` }}
              />
            )}

            <div className="camera-topbar">
              <div
                className={`live-dot ${isCctvWarning ? 'warning' : 'live'}`}
              />
              <span className="live-text">
                {isRetrying
                  ? 'RECONNECTING'
                  : isCctvWarning
                    ? 'SIGNAL WEAK'
                    : 'LIVE'}
              </span>
              <span className="updated-time">{relativeUpdatedText}</span>
            </div>

            {isRetrying ? (
              <div className="camera-overlay">
                <div className="overlay-content">
                  <div className="overlay-badge retry">재연결 중</div>
                  <h3>실시간 영상 스트리밍 연결 중...</h3>
                  <p>카메라 연결을 다시 시도하고 있습니다.</p>
                </div>
              </div>
            ) : (
              isCctvWarning && (
                <div className="camera-overlay">
                  <div className="overlay-content">
                    <div className="overlay-badge">신호 없음</div>
                    <h3>카메라 연결이 불안정합니다</h3>
                    <p>
                      현재 영상을 불러오지 못했습니다. 연결 상태를 확인해주세요.
                    </p>
                    <button className="retry-btn" onClick={handleRetryCctv}>
                      연결 재시도
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </CameraCard>

        <CenterColumn>
          <LogGroupCard>
            <div className="log-header">
              <CardTitle>장치 작동 이력</CardTitle>
            </div>
            <LogList>
              {dashboardLogs.map((log) => (
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
            <div className="chart-section">
              <div className="chart-mini-title">기간별 생장 속도 비교</div>

              <GrowthBarsContainer>
                <div className="bar-row">
                  <span className="time-label">어제 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill day"
                      style={{
                        width: `${Math.min(((currentData?.growthDelta?.day ?? 2.4) / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.day ?? 2.4}cm
                  </span>
                </div>

                <div className="bar-row">
                  <span className="time-label">1주 전 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill week"
                      style={{
                        width: `${Math.min(((currentData?.growthDelta?.week ?? 8.7) / 15) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.week ?? 8.7}cm
                  </span>
                </div>

                <div className="bar-row">
                  <span className="time-label">1개월 전 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill month"
                      style={{
                        width: `${Math.min(((currentData?.growthDelta?.month ?? 21.5) / 30) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.month ?? 21.5}cm
                  </span>
                </div>
              </GrowthBarsContainer>
            </div>
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

// --- styled-components ---

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
  --bottom-height: 548px;

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
  height: var(--bottom-height);
  min-height: var(--bottom-height);
  max-height: var(--bottom-height);
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
  height: var(--bottom-height);
  min-height: var(--bottom-height);
  max-height: var(--bottom-height);
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
  height: var(--bottom-height);
  min-height: var(--bottom-height);
  max-height: var(--bottom-height);
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
  height: var(--bottom-height);
  min-height: var(--bottom-height);
  max-height: var(--bottom-height);
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

  .camera-view {
    position: relative;
    flex: 1;
    height: calc(100% - 42px);
    min-height: 0;
    border-radius: 16px;
    overflow: hidden;
    background: #0f172a;
  }

  .camera-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .camera-fallback-bg {
    position: absolute;
    inset: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px) brightness(0.65);
    transform: scale(1.04);
  }

  .camera-topbar {
    position: absolute;
    top: 14px;
    left: 14px;
    right: 14px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 0.74em;
    font-weight: 800;
  }

  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.live {
      background: #ef4444;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
    }

    &.warning {
      background: #f59e0b;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }
  }

  .live-text {
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.58);
    backdrop-filter: blur(8px);
  }

  .updated-time {
    margin-left: auto;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.58);
    backdrop-filter: blur(8px);
  }

  .camera-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
    max-width: 380px;
  }

  .overlay-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    margin-bottom: 14px;
    border-radius: 999px;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #fecaca;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.04em;

    &.retry {
      background: rgba(59, 130, 246, 0.16);
      border: 1px solid rgba(59, 130, 246, 0.35);
      color: #bfdbfe;
    }
  }

  .overlay-content h3 {
    margin: 0 0 10px;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .overlay-content p {
    margin: 0 0 18px;
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.82);
  }

  .retry-btn {
    border: none;
    border-radius: 12px;
    padding: 12px 18px;
    background: #ffffff;
    color: #0f172a;
    font-size: 0.92rem;
    font-weight: 800;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .retry-btn:hover {
    transform: translateY(-2px);
    background: #f8fafc;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: 1200px) {
    height: auto;
    min-height: 520px;
    max-height: none;
  }
`;

const LogGroupCard = styled(BaseCard)`
  flex: 0 0 380px;
  height: 430px;
  min-height: 380px;
  max-height: 380px;
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
  height: calc(var(--bottom-height) - 340px - var(--grid-gap));
  min-height: 0;
  max-height: calc(var(--bottom-height) - 340px - var(--grid-gap));
  padding: 0.95em 1em;
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

  .chart-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chart-mini-title {
    font-size: 0.95em;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 14px;
  }
`;

const SensorsGroupCard = styled(BaseCard)`
  flex: 1;
  height: var(--bottom-height);
  min-height: var(--bottom-height);
  max-height: var(--bottom-height);
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
  grid-template-rows: repeat(6, 1fr);
  gap: 0.55em;
  flex: 1;
  min-height: 0;
  height: 100%;
`;

const SensorGridItem = styled.div`
  background-color: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 0.6em 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    gap: 0.4em;
    background: #f8fafc;
    padding: 10px 12px;
    border-radius: 12px;

    .g-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .l {
      font-size: 0.66em;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
    }

    .diff-badge {
      font-size: 0.65em;
      font-weight: 800;
      padding: 3px 6px;
      border-radius: 4px;

      &.normal {
        background: #f0fdf4;
        color: #15803d;
      }

      &.warning {
        background: #fef2f2;
        color: #dc2626;
      }

      &.good {
        background: #eff6ff;
        color: #1d4ed8;
      }
    }

    .g-body {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .v {
      font-size: 1.1em;
      font-weight: 800;
      color: #0f172a;
    }

    .u {
      font-size: 0.7em;
      font-weight: 700;
      color: #64748b;
    }

    .std {
      font-size: 0.65em;
      font-weight: 600;
      color: #94a3b8;
      margin-left: auto;
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

const GrowthBarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 4px;

  .bar-row {
    display: grid;
    grid-template-columns: 72px 1fr 58px;
    align-items: center;
    gap: 10px;
  }

  .time-label {
    font-size: 0.74em;
    font-weight: 700;
    color: #64748b;
    text-align: right;
  }

  .bar-track {
    height: 18px;
    background: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 999px;

    &.day {
      background: #38bdf8;
    }

    &.week {
      background: #3b82f6;
    }

    &.month {
      background: #6366f1;
    }
  }

  .value-label {
    font-size: 0.8em;
    font-weight: 800;
    color: #0f172a;
  }
`;
