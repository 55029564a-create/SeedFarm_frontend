import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  theme,
  AnimatedBox,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const DashboardWrap = styled(Section)`
  color: white;
`;

const DashboardMock = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  background: ${theme.colors.dashboardBg};
  border: 1px solid #23304a;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.24);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  min-height: 520px;
  border-radius: 22px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 1024px) {
    min-height: auto;
  }
`;

const LogoBox = styled.div`
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(
    135deg,
    rgba(102, 187, 106, 0.2),
    rgba(0, 194, 168, 0.18)
  );
  border: 1px solid rgba(102, 187, 106, 0.24);

  h4 {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.5;
  }
`;

const NavItem = styled.div`
  border-radius: 14px;
  padding: 14px 16px;
  background: ${({ active }) =>
    active ? 'rgba(102, 187, 106, 0.14)' : 'transparent'};
  border: 1px solid
    ${({ active }) => (active ? 'rgba(102, 187, 106, 0.24)' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : 'rgba(255,255,255,0.72)')};
  font-size: 14px;
  font-weight: 700;
`;

const SidebarBottom = styled.div`
  margin-top: auto;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #2a3855;
  padding: 14px;

  h5 {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 8px;
  }

  p {
    font-size: 12px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.68);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  h4 {
    font-size: 24px;
    color: #ffffff;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.72);
  }
`;

const StatusRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StatusChip = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: ${({ type }) =>
    type === 'green'
      ? 'rgba(102, 187, 106, 0.16)'
      : type === 'blue'
        ? 'rgba(0, 194, 168, 0.14)'
        : 'rgba(255,255,255,0.08)'};
  border: 1px solid
    ${({ type }) =>
      type === 'green'
        ? 'rgba(102, 187, 106, 0.22)'
        : type === 'blue'
          ? 'rgba(0, 194, 168, 0.2)'
          : '#2a3855'};
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  border-radius: 18px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
  padding: 18px;

  span {
    display: block;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.62);
    margin-bottom: 10px;
  }

  strong {
    display: block;
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 8px;
  }

  small {
    font-size: 12px;
    font-weight: 700;
    color: #7dd3a7;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  border-radius: 22px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
  padding: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;

  h5 {
    font-size: 16px;
    color: #ffffff;
  }

  span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.58);
  }
`;

/* 🚨 오직 여기 FakeChart CSS만 변경해서 그래프를 완벽하게 살려냈습니다! */
const FakeChart = styled.div`
  height: 260px;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  /* 배경 격자는 형님이 짜신 코드 그대로 유지! */
  background:
    linear-gradient(
      to top,
      rgba(102, 187, 106, 0.08),
      rgba(102, 187, 106, 0.01)
    ),
    repeating-linear-gradient(
      to right,
      transparent,
      transparent 72px,
      rgba(255, 255, 255, 0.06) 72px,
      rgba(255, 255, 255, 0.06) 73px
    ),
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 50px,
      rgba(255, 255, 255, 0.06) 50px,
      rgba(255, 255, 255, 0.06) 51px
    );

  /* 1. 끊기지 않는 완벽한 그라데이션 선 + 하단 채우기 (SVG Data URI 활용) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    /* CSS로 SVG 벡터 이미지를 직접 그렸습니다. 브라우저 창을 어떻게 줄여도 안 깨집니다! */
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%2366bb6a'/%3E%3Cstop offset='100%25' stop-color='%2300c2a8'/%3E%3C/linearGradient%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2366bb6a' stop-opacity='0.25'/%3E%3Cstop offset='100%25' stop-color='%2366bb6a' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='-10,110 -10,80 10,70 30,50 50,60 70,30 90,15 110,10 110,110' fill='url(%23a)'/%3E%3Cpolyline points='-10,80 10,70 30,50 50,60 70,30 90,15 110,10' fill='none' stroke='url(%23g)' stroke-width='3' vector-effect='non-scaling-stroke' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat center/100% 100%;
    z-index: 1;
  }

  /* 2. 선의 꺾임(Vertex) 위치에 정확하게 맞는 데이터 포인트 점 찍기 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    /* SVG 선의 퍼센트(%) 좌표와 완벽하게 일치하게 점들을 배치했습니다. */
    background:
      radial-gradient(
          circle,
          #fff 30%,
          #66bb6a 35%,
          #66bb6a 60%,
          transparent 65%
        )
        no-repeat 10% 70% / 14px 14px,
      radial-gradient(
          circle,
          #fff 30%,
          #66bb6a 35%,
          #66bb6a 60%,
          transparent 65%
        )
        no-repeat 30% 50% / 14px 14px,
      radial-gradient(
          circle,
          #fff 30%,
          #4caf50 35%,
          #4caf50 60%,
          transparent 65%
        )
        no-repeat 50% 60% / 14px 14px,
      radial-gradient(
          circle,
          #fff 30%,
          #00c2a8 35%,
          #00c2a8 60%,
          transparent 65%
        )
        no-repeat 70% 30% / 14px 14px,
      radial-gradient(
          circle,
          #fff 30%,
          #00c2a8 35%,
          #00c2a8 60%,
          transparent 65%
        )
        no-repeat 90% 15% / 14px 14px;
    filter: drop-shadow(0 4px 6px rgba(0, 194, 168, 0.4));
  }
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoCard = styled.div`
  border-radius: 18px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
  padding: 18px;

  h5 {
    font-size: 15px;
    color: #ffffff;
    margin-bottom: 14px;
  }
`;

const AlertItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.55;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  strong {
    color: #7dd3a7;
    margin-right: 8px;
  }
`;

const VisionPreview = styled.div`
  height: 140px;
  border-radius: 16px;
  background:
    radial-gradient(
      circle at 30% 30%,
      rgba(102, 187, 106, 0.18),
      transparent 26%
    ),
    linear-gradient(135deg, #1f2e49, #18253c);
  border: 1px solid #2a3855;
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    inset: 18px;
    border: 2px dashed rgba(125, 211, 167, 0.4);
    border-radius: 16px;
  }
`;

const AutoControlList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ControlItem = styled.div`
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #2a3855;
  padding: 12px 14px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.76);

  strong {
    display: block;
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BottomCard = styled.div`
  border-radius: 18px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
  padding: 18px;

  h5 {
    font-size: 15px;
    color: #ffffff;
    margin-bottom: 14px;
  }
`;

const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BarRow = styled.div`
  span {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.72);
    margin-bottom: 6px;
  }
`;

const Bar = styled.div`
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;

  div {
    height: 100%;
    width: ${({ width }) => width};
    border-radius: 999px;
    background: linear-gradient(90deg, #66bb6a, #00c2a8);
  }
`;

const ZoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ZoneCard = styled.div`
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #2a3855;
  padding: 14px;

  h6 {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 6px;
  }

  p {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.5;
  }
`;

const Dashboard = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <DashboardWrap id="dashboard" bg="#0F172A">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} delay="0s">
          <SectionTitle>AI 대시보드 미리보기</SectionTitle>
          <SectionDesc light>
            작물 생육 상태, 환경 데이터, 알림, 제어 흐름을 한 화면에서
            직관적으로 확인할 수 있습니다.
          </SectionDesc>
        </AnimatedBox>

        <AnimatedBox className={animateClass} delay="0.2s">
          <DashboardMock>
            <Sidebar>
              <LogoBox>
                <h4>Seed Farm</h4>
                <p>스마트팜 통합 관제 시스템</p>
              </LogoBox>

              <NavItem active>Overview</NavItem>
              <NavItem>Vision Analysis</NavItem>
              <NavItem>Environment</NavItem>
              <NavItem>Automation</NavItem>
              <NavItem>Alerts</NavItem>
              <NavItem>Reports</NavItem>

              <SidebarBottom>
                <h5>오늘의 요약</h5>
                <p>
                  전체 6개 구역이 정상 운영 중이며, 3번 구역에서 생육 상태
                  변화가 감지되어 추가 관찰이 진행 중입니다.
                </p>
              </SidebarBottom>
            </Sidebar>

            <Content>
              <TopBar>
                <TitleGroup>
                  <h4>Greenhouse Overview</h4>
                  <p>토마토 생육 상태 · 실시간 환경 및 제어 현황</p>
                </TitleGroup>

                <StatusRow>
                  <StatusChip type="green">정상 운영 중</StatusChip>
                  <StatusChip type="blue">AI 분석 활성화</StatusChip>
                  <StatusChip>오늘 기준 데이터 12,480건</StatusChip>
                </StatusRow>
              </TopBar>

              <MetricGrid>
                <MetricCard>
                  <span>평균 온도</span>
                  <strong>24.3℃</strong>
                  <small>목표 범위 유지</small>
                </MetricCard>

                <MetricCard>
                  <span>평균 습도</span>
                  <strong>67%</strong>
                  <small>관수 최적화 진행</small>
                </MetricCard>

                <MetricCard>
                  <span>CO₂ 농도</span>
                  <strong>521 ppm</strong>
                  <small>자동 보정 중</small>
                </MetricCard>

                <MetricCard>
                  <span>생육 안정도</span>
                  <strong>92점</strong>
                  <small>전일 대비 +4</small>
                </MetricCard>
              </MetricGrid>

              <MainGrid>
                <ChartCard>
                  <CardHeader>
                    <h5>환경 / 생육 추이</h5>
                    <span>최근 6시간 기준</span>
                  </CardHeader>
                  <FakeChart />
                </ChartCard>

                <SideColumn>
                  <InfoCard>
                    <h5>실시간 알림</h5>
                    <AlertItem>
                      <strong>AI</strong>
                      3번 구역 잎 처짐 패턴이 감지되어 상태 변화를 추적
                      중입니다.
                    </AlertItem>
                    <AlertItem>
                      <strong>급수</strong>
                      토양 수분 기준으로 관수량이 자동 조정되었습니다.
                    </AlertItem>
                    <AlertItem>
                      <strong>예보</strong>
                      오후 시간대 습도 상승 가능성이 예측되었습니다.
                    </AlertItem>
                  </InfoCard>

                  <InfoCard>
                    <h5>비전 분석 결과</h5>
                    <VisionPreview />
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: '1.6',
                      }}
                    >
                      카메라 기반으로 잎 색상, 처짐, 생육 균형을 분석해 이상
                      징후를 조기에 감지합니다.
                    </p>
                  </InfoCard>

                  <InfoCard>
                    <h5>자동 제어 상태</h5>
                    <AutoControlList>
                      <ControlItem>
                        <strong>관수 시스템</strong>
                        설정 목표 대비 92% 수준으로 자동 제어 중
                      </ControlItem>
                      <ControlItem>
                        <strong>환기 시스템</strong>
                        내부 습도 상승 대응을 위해 단계 조절 중
                      </ControlItem>
                    </AutoControlList>
                  </InfoCard>
                </SideColumn>
              </MainGrid>

              <BottomGrid>
                <BottomCard>
                  <h5>구역별 관수 현황</h5>
                  <BarList>
                    <BarRow>
                      <span>
                        <b>1구역</b>
                        <b>78%</b>
                      </span>
                      <Bar width="78%">
                        <div />
                      </Bar>
                    </BarRow>
                    <BarRow>
                      <span>
                        <b>2구역</b>
                        <b>64%</b>
                      </span>
                      <Bar width="64%">
                        <div />
                      </Bar>
                    </BarRow>
                    <BarRow>
                      <span>
                        <b>3구역</b>
                        <b>91%</b>
                      </span>
                      <Bar width="91%">
                        <div />
                      </Bar>
                    </BarRow>
                  </BarList>
                </BottomCard>

                <BottomCard>
                  <h5>구역 상태 요약</h5>
                  <ZoneGrid>
                    <ZoneCard>
                      <h6>Zone A</h6>
                      <p>정상 · 온도 안정 · 생육 양호</p>
                    </ZoneCard>
                    <ZoneCard>
                      <h6>Zone B</h6>
                      <p>주의 · 습도 상승 감지</p>
                    </ZoneCard>
                    <ZoneCard>
                      <h6>Zone C</h6>
                      <p>정상 · 관수 최적화 완료</p>
                    </ZoneCard>
                    <ZoneCard>
                      <h6>Zone D</h6>
                      <p>정상 · 비전 분석 진행 중</p>
                    </ZoneCard>
                  </ZoneGrid>
                </BottomCard>
              </BottomGrid>
            </Content>
          </DashboardMock>
        </AnimatedBox>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;
