import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FieldPageShell from "../Components/FieldPageShell";
import { connectDashboardWebSocket, getDashboard } from "../api/fieldApi";
import { FIELD_BATCH_ID } from "../fieldConfig";

export default function TMHomePage() {
  const [dashboard, setDashboard] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws;
    let pingTimer;

    const bootstrap = async () => {
      try {
        const initial = await getDashboard(FIELD_BATCH_ID);
        setDashboard(initial);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      }

      ws = connectDashboardWebSocket(FIELD_BATCH_ID, (payload) => {
        if (
          (payload?.type === "dashboard_init" ||
            payload?.type === "dashboard_update") &&
          payload.data
        ) {
          setDashboard(payload.data);
          setConnected(true);
        }
      });

      pingTimer = window.setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send("ping");
        }
      }, 5000);

      ws.onclose = () => setConnected(false);
    };

    bootstrap();

    return () => {
      if (pingTimer) window.clearInterval(pingTimer);
      if (ws && ws.readyState < 2) ws.close();
    };
  }, []);

  const sensors = dashboard?.sensors;
  const overview = dashboard?.overview;
  const eventHistory = dashboard?.device_logs ?? [];

  const cards = useMemo(
    () => [
      {
        label: "온도",
        value: sensors?.temperature?.value,
        unit: sensors?.temperature?.unit || "°C",
      },
      {
        label: "습도",
        value: sensors?.humidity?.value,
        unit: sensors?.humidity?.unit || "%",
      },
      {
        label: "CO2",
        value: sensors?.co2?.value,
        unit: sensors?.co2?.unit || "ppm",
      },
      {
        label: "토양수분",
        value: sensors?.soil_moisture?.value,
        unit: sensors?.soil_moisture?.unit || "%",
      },
    ],
    [sensors]
  );

  return (
    <FieldPageShell title="Home" rightText={connected ? "LIVE" : "SYNC"}>
      <TopArea>
        <HeroCard>
          <div className="status">{connected ? "WebSocket Connected" : "API Sync"}</div>
          <h2>{overview?.summary || "환경 데이터를 불러오는 중입니다."}</h2>
          <p>
            배치 {FIELD_BATCH_ID} · 생육 단계 {overview?.phase || "-"} · 점수{" "}
            {overview?.score ?? "-"}
          </p>
        </HeroCard>

        <CameraCard>
          <div className="camera">Live Camera</div>
          <div className="badge">{connected ? "WS Live" : "Waiting"}</div>
        </CameraCard>
      </TopArea>

      <SectionTitle>핵심 환경 상태</SectionTitle>
      <StatusGrid>
        {cards.map((card) => (
          <StatusCard key={card.label}>
            <span>{card.label}</span>
            <strong>
              {card.value ?? "-"}
              {card.value !== null && card.value !== undefined ? card.unit : ""}
            </strong>
          </StatusCard>
        ))}
      </StatusGrid>

      <SectionTitle>빠른 조치</SectionTitle>
      <ActionGrid>
        <ActionBtn $light>자동모드</ActionBtn>
        <ActionBtn $danger>긴급정지</ActionBtn>
      </ActionGrid>

      <SectionTitle>이벤트 내역</SectionTitle>
      <AlertList>
        {eventHistory.length === 0 ? (
          <EmptyText>표시할 이벤트가 없습니다.</EmptyText>
        ) : (
          eventHistory.slice(0, 4).map((item) => (
            <AlertItem key={item.id}>
              <div>
                <h4>{item.device || "장치 이벤트"}</h4>
                <p>{item.detail || "상세 메시지 없음"}</p>
              </div>
              <time>{item.time || "-"}</time>
            </AlertItem>
          ))
        )}
      </AlertList>
    </FieldPageShell>
  );
}

const TopArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.1fr;
    gap: 16px;
    margin-bottom: 18px;
  }
`;

const HeroCard = styled.section`
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 20px;
  padding: 18px;

  .status {
    display: inline-flex;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.45;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 26px;
    }
  }
`;

const CameraCard = styled.div`
  position: relative;
  height: 190px;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};

  .camera {
    height: 100%;
    background: #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    font-weight: 800;
    font-size: 18px;
  }

  .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 11px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
  }

  @media (min-width: 768px) {
    height: 240px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0 12px;

  @media (min-width: 768px) {
    font-size: 18px;
    margin: 14px 0 12px;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;

  span {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 22px;
    font-weight: 800;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ActionBtn = styled.button`
  height: 50px;
  border-radius: 14px;
  font-weight: 800;
  background: ${({ $danger, $light, theme }) =>
    $danger
      ? theme.colors.dangerBg
      : $light
        ? theme.colors.border
        : theme.colors.primary};
  color: ${({ $danger, $light, theme }) =>
    $danger ? theme.colors.danger : $light ? theme.colors.text : '#fff'};
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.subText};
  font-size: 14px;
`;

const AlertItem = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.4;
  }

  time {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 700;
    white-space: nowrap;
  }
`;
