import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';
import { getDashboard } from '../api/fieldApi';
import { FIELD_BATCH_ID } from '../fieldConfig';

const TYPE_MAP = {
  disease: '병해 분석',
  flowering: '개화',
  harvest: '수확 예측',
  quality: '품질 분석',

  normal: '정상',
  warning: '주의',
  danger: '위험',
  fail: '실패',
  triggered: '자동 개입',
  applied: '적용 완료',

  auto: '자동',
  manual: '수동',
  issued: '명령 전송',
  done: '완료',
  success: '성공',
};

const VALUE_MAP = {
  Healthy: '정상',
  Defective: '불량',
  'Leaf Miner': '잎굴파리 피해',
  'Late Blight': '역병',
  'Early Blight': '겹무늬병',
  'Leaf Mold': '잎곰팡이병',
  'Spider Mites': '응애 피해',
  'Bacterial Spot': '세균성 반점병',
  'Tomato Leaf Curl Virus': '토마토 잎말림 바이러스',
};

const toKoreanType = (type) => {
  return TYPE_MAP[String(type || '').toLowerCase()] || type || '-';
};

const toKoreanValue = (value) => {
  return VALUE_MAP[String(value || '')] || value || '-';
};

const toKoreanStatus = (value) => {
  return TYPE_MAP[String(value || '').toLowerCase()] || value || '-';
};

export default function AlertsPage() {
  const [events, setEvents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard(FIELD_BATCH_ID);
        setEvents(data?.ai_reports ?? []);
        setLogs(data?.device_logs ?? []);
      } catch (error) {
        console.error('Alert logs load failed:', error);
      }
    };

    load();
  }, []);

  const summary = useMemo(() => {
    const eventTotal = events.filter((event) =>
      ['disease', 'flowering', 'harvest', 'quality'].includes(
        String(event.result_type || '').toLowerCase(),
      ),
    ).length;

    const visibleEvents = showAllEvents
      ? events.slice(0, 20)
      : events.slice(0, 4);

    const critical = logs.filter((log) =>
      ['fail', 'triggered'].includes(String(log.status || '').toLowerCase()),
    ).length;

    const normal = logs.filter(
      (log) =>
        !['fail', 'triggered'].includes(String(log.status || '').toLowerCase()),
    ).length;

    return {
      critical,
      normal,
      total: logs.length,
      eventTotal,
      visibleEvents,
    };
  }, [events, logs, showAllEvents]);

  return (
    <FieldPageShell title="Alerts" rightText={`${summary.total} Logs`}>
      <TopSummary>
        <SummaryCard>
          <span>Critical</span>
          <strong>{summary.critical}</strong>
        </SummaryCard>

        <SummaryCard>
          <span>Normal</span>
          <strong>{summary.normal}</strong>
        </SummaryCard>

        <SummaryCard>
          <span>Event</span>
          <strong>{summary.eventTotal}</strong>
        </SummaryCard>
      </TopSummary>

      <PrimaryAlert>
        <div className="badge">TELEGRAM</div>
        <h2>경고는 텔레그램으로 전송됩니다.</h2>
        <p>
          이 페이지는 텔레그램으로 발송된 경고/동작의 최근 이력을 보여줍니다.
        </p>
      </PrimaryAlert>

      <SectionTitle>이벤트 이력 (병/개화/수확시기)</SectionTitle>

      <AlertList>
        {events.length === 0 && (
          <EmptyCard>
            <div className="title">아직 수집된 이벤트가 없습니다.</div>
            <div className="desc">
              병/개화/수확시기 이벤트가 발생하면 여기에 표시됩니다.
            </div>
          </EmptyCard>
        )}

        {summary.visibleEvents.map((item) => (
          <AlertCard
            key={`event-${item.id}`}
            $level={item.level === '경고' ? 'danger' : 'normal'}
          >
            <div className="top">
              <div className="left">
                <div className="title">
                  {toKoreanType(item.result_type)}:{' '}
                  {toKoreanValue(item.result_value)}
                </div>
                <div className="desc">{item.title || '이벤트 메시지 없음'}</div>
              </div>

              <div className="time">{item.time || '-'}</div>
            </div>

            <div className="bottom">
              <div className="action">
                신뢰도: {item.confidence ?? '-'} / 심각도:{' '}
                {toKoreanStatus(item.severity)}
              </div>
            </div>
          </AlertCard>
        ))}

        {events.length > 4 && (
          <MoreButton onClick={() => setShowAllEvents((prev) => !prev)}>
            {showAllEvents
              ? '접기'
              : `더 보기 (${Math.min(events.length, 20) - 4}개)`}
          </MoreButton>
        )}
      </AlertList>

      <SectionTitle>디바이스 가동내역</SectionTitle>

      <AlertList>
        {logs.length === 0 && (
          <EmptyCard>
            <div className="title">아직 수집된 이력이 없습니다.</div>
            <div className="desc">
              디바이스 가동내역이 생기면 이 영역에 누적됩니다.
            </div>
          </EmptyCard>
        )}

        {logs.map((item) => (
          <AlertCard
            key={`log-${item.id}`}
            $level={
              ['fail', 'triggered'].includes(
                String(item.status || '').toLowerCase(),
              )
                ? 'danger'
                : 'normal'
            }
          >
            <div className="top">
              <div className="left">
                <div className="title">{item.device || '시스템'}</div>
                <div className="desc">{item.detail || '메시지 없음'}</div>
              </div>

              <div className="time">{item.time || '-'}</div>
            </div>

            <div className="bottom">
              <div className="action">
                상태: {toKoreanStatus(item.status)} / 모드:{' '}
                {toKoreanStatus(item.mode)}
              </div>
            </div>
          </AlertCard>
        ))}
      </AlertList>
    </FieldPageShell>
  );
}

const TopSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    gap: 14px;
    margin-bottom: 16px;
  }
`;

const SummaryCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 12px;

  span {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 24px;
    color: #111827;
    font-weight: 800;
  }
`;

const PrimaryAlert = styled.section`
  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
  border: 1px solid #fecdd3;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 14px;

  .badge {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    background: #dc2626;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
    color: #7f1d1d;
  }

  p {
    font-size: 14px;
    color: #991b1b;
    line-height: 1.45;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 8px 0 10px;
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  border-left: 5px solid #cbd5e1;

  .title {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }
`;

const AlertCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  border-left: 5px solid
    ${({ $level }) =>
      $level === 'danger'
        ? '#dc2626'
        : $level === 'warning'
          ? '#f59e0b'
          : '#22c55e'};

  .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .left {
    min-width: 0;
  }

  .title {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }

  .time {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 700;
    white-space: nowrap;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .action {
    font-size: 13px;
    font-weight: 700;
    color: #374151;
  }
`;

const MoreButton = styled.button`
  width: 100%;
  padding: 13px 14px;
  border: none;
  border-radius: 16px;
  background: #111827;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;
