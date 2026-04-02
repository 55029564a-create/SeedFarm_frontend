import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  theme,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const DashboardWrap = styled(Section)`
  color: white;
`;

const DashboardMock = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  background: ${theme.colors.dashboardBg};
  border: 1px solid #23304a;
  border-radius: 24px;
  padding: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  min-height: 420px;
  border-radius: 18px;
  background: ${theme.colors.dashboardCard};

  @media (max-width: 640px) {
    min-height: 80px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Box = styled.div`
  height: ${({ h }) => h || '90px'};
  border-radius: 18px;
  background: ${theme.colors.dashboardCard};
  border: 1px solid #2a3855;
`;

const Dashboard = () => {
  // 💡 스크롤 감지 훅 호출
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <DashboardWrap id="dashboard" bg="#0F172A">
      {/* 💡 Container에 ref를 달아 스크롤 트리거 영역으로 설정 */}
      <Container ref={sectionRef}>
        {/* 💡 텍스트 영역이 먼저 나타납니다 (delay 0s) */}
        <AnimatedBox className={animateClass} delay="0s">
          <SectionLabel light>DASHBOARD SECTION</SectionLabel>
          <SectionTitle>AI 대시보드 미리보기</SectionTitle>
          <SectionDesc light>
            작물 생육 상태, 환경 데이터, 알림 정보를 한 화면에서 관리합니다.
          </SectionDesc>
        </AnimatedBox>

        {/* 💡 대시보드 Mock UI 전체가 이어서 나타납니다 (delay 0.2s) */}
        <AnimatedBox className={animateClass} delay="0.2s">
          <DashboardMock>
            <Sidebar />
            <Content>
              <Row3>
                <Box />
                <Box />
                <Box />
              </Row3>

              <Box h="220px" />

              <Row2>
                <Box h="140px" />
                <Box h="140px" />
              </Row2>
            </Content>
          </DashboardMock>
        </AnimatedBox>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;
