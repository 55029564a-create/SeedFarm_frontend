import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FieldPageShell from "../Components/FieldPageShell";
import { getDashboard } from "../api/fieldApi";
import { FIELD_BATCH_ID } from "../fieldConfig";

export default function AlertsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard(FIELD_BATCH_ID);
        setLogs(data?.device_logs ?? []);
      } catch (error) {
        console.error("Alert logs load failed:", error);
      }
    };
    load();
  }, []);

  const summary = useMemo(() => {
    const critical = logs.filter((log) =>
      ["fail", "triggered"].includes((log.status || "").toLowerCase())
    ).length;
    const normal = logs.filter(
      (log) => !["fail", "triggered"].includes((log.status || "").toLowerCase())
    ).length;
    return { critical, normal, total: logs.length };
  }, [logs]);

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
          <span>Total</span>
          <strong>{summary.total}</strong>
        </SummaryCard>
      </TopSummary>

      <PrimaryAlert>
        <div className="badge">TELEGRAM</div>
        <h2>경고는 텔레그램으로 전송됩니다.</h2>
        <p>이 페이지는 텔레그램으로 발송된 경고/동작의 최근 이력을 보여줍니다.</p>
      </PrimaryAlert>

      <SectionTitle>경고/이벤트 이력</SectionTitle>

      <AlertList>
        {logs.length === 0 && <EmptyText>아직 수집된 이력이 없습니다.</EmptyText>}
        {logs.map((item) => (
          <AlertCard
            key={item.id}
            $level={["fail", "triggered"].includes((item.status || "").toLowerCase()) ? "danger" : "normal"}
          >
            <div className="top">
              <div className="left">
                <div className="title">{item.device || "시스템"}</div>
                <div className="desc">{item.detail || "메시지 없음"}</div>
              </div>
              <div className="time">{item.time || "-"}</div>
            </div>

            <div className="bottom">
              <div className="action">
                상태: {item.status || "-"} / 모드: {item.mode || "-"}
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

const EmptyText = styled.p`
  color: #6b7280;
  font-size: 14px;
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
