import styled from 'styled-components';
import { useState } from 'react';
import {
  Container,
  Section,
  PrimaryButton,
  SecondaryButton,
  MockBox,
  theme,
  AnimatedBox,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      420px circle at ${({ $mouseX = '50%' }) => $mouseX}
        ${({ $mouseY = '30%' }) => $mouseY},
      rgba(102, 187, 106, 0.14),
      transparent 55%
    ),
    radial-gradient(
      280px circle at calc(${({ $mouseX = '50%' }) => $mouseX} + 8%)
        calc(${({ $mouseY = '30%' }) => $mouseY} + 4%),
      rgba(0, 194, 168, 0.1),
      transparent 60%
    ),
    radial-gradient(
      circle at top left,
      rgba(102, 187, 106, 0.12),
      transparent 28%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(0, 194, 168, 0.1),
      transparent 24%
    ),
    linear-gradient(180deg, #f5f7f6 0%, #eef5ef 100%);

  transition: background 0.12s ease-out;

  @media (max-width: 640px) {
    min-height: auto;
    padding-top: 120px;
    padding-bottom: 80px;
  }
`;

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 68px;
    line-height: 1.08;
    margin-bottom: 20px;
    letter-spacing: -1.5px;
  }

  .highlight {
    color: ${theme.colors.primary};
  }

  p {
    font-size: 20px;
    line-height: 1.8;
    color: ${theme.colors.subText};
    margin-bottom: 32px;
    max-width: 640px;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 52px;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 40px;
      line-height: 1.15;
    }

    p {
      font-size: 16px;
    }
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(46, 125, 50, 0.08);
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
  border: 1px solid rgba(46, 125, 50, 0.12);
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  box-shadow: 0 0 0 6px rgba(46, 125, 50, 0.12);
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #dbe4dd;
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  backdrop-filter: blur(8px);

  strong {
    color: ${theme.colors.primary};
    margin-right: 6px;
  }
`;

const LargeMock = styled(MockBox)`
  min-height: 500px;
  position: relative;
  padding: 24px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(12px);

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const DashboardShell = styled.div`
  width: 100%;
  min-height: 440px;
  border-radius: 26px;
  background: linear-gradient(180deg, #f8fbf8 0%, #eef4ef 100%);
  border: 1px solid #dbe4dd;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 18px;
  position: relative;
  overflow: visible;

  @media (max-width: 640px) {
    padding: 14px;
    border-radius: 20px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const TopTitle = styled.div`
  min-width: 0;

  h4 {
    font-size: 18px;
    margin-bottom: 4px;
    color: #0f172a;
    line-height: 1.3;
  }

  p {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
  }
`;

const StatusChip = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: #e8f5e9;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #dde7df;
  padding: 16px;
  min-width: 0;

  span {
    display: block;
    font-size: 13px;
    color: #64748b;
    margin-bottom: 10px;
  }

  strong {
    display: block;
    font-size: 28px;
    color: #0f172a;
    font-weight: 800;
    line-height: 1.2;
    word-break: keep-all;
  }

  small {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    color: ${theme.colors.primary};
    line-height: 1.4;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: 230px 130px;
  grid-template-areas:
    'chart alert'
    'vision vision'; /* 비전 카드가 두 열을 모두 차지하여 전체 너비 사용 */
  gap: 12px;
  align-items: stretch;
  position: relative; /* 폰 배치를 위한 기준점 */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'chart'
      'alert'
      'vision'
      'phone'; /* 모바일에서는 다시 폰 영역 할당 */
  }
`;

const ChartPanel = styled.div`
  grid-area: chart;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #dde7df;
  padding: 18px;
  min-height: 220px;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  h5 {
    font-size: 15px;
    color: #0f172a;
    line-height: 1.4;
  }

  span {
    font-size: 12px;
    color: #64748b;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const FakeChart = styled.div`
  flex-grow: 1;
  border-radius: 16px;
  background:
    linear-gradient(
      to top,
      rgba(102, 187, 106, 0.12),
      rgba(102, 187, 106, 0.02)
    ),
    repeating-linear-gradient(
      to right,
      transparent,
      transparent 48px,
      rgba(148, 163, 184, 0.12) 48px,
      rgba(148, 163, 184, 0.12) 49px
    ),
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 36px,
      rgba(148, 163, 184, 0.12) 36px,
      rgba(148, 163, 184, 0.12) 37px
    );
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 14px;
    right: 14px;
    top: 50%;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(90deg, #8bc34a 0%, #4caf50 35%, #00c2a8 100%);
    transform: translateY(-50%) skewX(-18deg);
    box-shadow: 0 0 18px rgba(76, 175, 80, 0.18);
  }
`;

const AlertCard = styled.div`
  grid-area: alert;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #dde7df;
  padding: 16px;
  min-width: 0;
  min-height: 230px;

  h5 {
    font-size: 15px;
    margin-bottom: 10px;
    color: #0f172a;
  }
`;

const AlertItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #edf2ef;
  font-size: 13px;
  color: #475569;
  line-height: 1.55;
  word-break: keep-all;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  strong {
    display: inline-block;
    margin-right: 8px;
    color: ${theme.colors.primary};
  }
`;

const VisionCard = styled.div`
  grid-area: vision;
  border-radius: 18px;
  background: linear-gradient(135deg, #f0f7f1, #e5f2e7); /* 원본 색상 복구 */
  border: 1px solid #dde7df;
  padding: 16px;
  min-height: 130px;
  height: 100%;
  position: relative;
  overflow: hidden;

  h5 {
    font-size: 15px;
    margin-bottom: 10px;
    color: #0f172a;
    position: relative;
    z-index: 1;
  }

  p {
    font-size: 13px;
    color: #475569;
    line-height: 1.55;
    position: relative;
    z-index: 1;
    word-break: keep-all;
  }

  &::after {
    content: '';
    position: absolute;
    right: -18px;
    bottom: -18px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: rgba(46, 125, 50, 0.08);
  }
`;

const PhoneWrap = styled.div`
  position: absolute; /* 데스크탑에서는 그리드 바깥에 떠 있도록 설정 */
  right: 0px;
  bottom: 0px;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    right: auto;
    bottom: auto;
    grid-area: phone;
    min-height: 210px;
  }
`;

const MobileCard = styled.div`
  width: 170px;
  height: 250px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #d0ddd2;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
  padding: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: absolute;
    transform: none;
    left: 0;
    bottom: 0;
  }
`;

const MobileTop = styled.div`
  height: 14px;
  width: 46px;
  border-radius: 999px;
  background: #eef4ef;
  margin: 0 auto 10px;
`;

const MobileScreen = styled.div`
  height: calc(100% - 24px);
  border-radius: 16px;
  background: linear-gradient(180deg, #f5faf6 0%, #edf5ef 100%);
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const MobileStatus = styled.div`
  border-radius: 12px;
  background: #e8f5e9;
  color: ${theme.colors.primary};
  padding: 8px 10px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 8px;
  line-height: 1.35;
  word-break: keep-all;
`;

const MobileMiniCard = styled.div`
  height: 42px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #dde7df;
  margin-bottom: 6px;
  flex-shrink: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Hero = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  const [mousePos, setMousePos] = useState({ x: '50%', y: '30%' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({
      x: `${x}%`,
      y: `${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: '50%', y: '30%' });
  };

  return (
    <HeroSection
      id="hero"
      $mouseX={mousePos.x}
      $mouseY={mousePos.y}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <HeroInner ref={sectionRef}>
          <HeroText>
            <AnimatedBox className={animateClass} $delay="0s">
              <HeroBadge>
                <Dot />
                AI Smart Farm Automation
              </HeroBadge>
            </AnimatedBox>

            <AnimatedBox className={animateClass} $delay="0.1s">
              <h1>
                AI가 농장을 보고,
                <br />
                <span className="highlight">스스로 관리합니다</span>
              </h1>
            </AnimatedBox>

            <AnimatedBox className={animateClass} $delay="0.2s">
              <p>
                Seed Farm은 작물 이미지, 환경 센서, 분석 데이터를 하나로 연결해
                이상 징후를 빠르게 감지하고 관수·환기·운영 판단까지 더 똑똑하게
                돕는 스마트팜 관리 솔루션입니다.
              </p>
            </AnimatedBox>

            <AnimatedBox className={animateClass} $delay="0.3s">
              <HeroButtons>
                <PrimaryButton>무료 상담 받기</PrimaryButton>
                <SecondaryButton>데모 보기</SecondaryButton>
              </HeroButtons>
            </AnimatedBox>

            <AnimatedBox className={animateClass} $delay="0.4s">
              <HeroStats>
                <StatPill>
                  <strong>+30%</strong> 수확 효율 향상
                </StatPill>
                <StatPill>
                  <strong>-50%</strong> 관리 시간 절감
                </StatPill>
                <StatPill>
                  <strong>24/7</strong> 실시간 모니터링
                </StatPill>
              </HeroStats>
            </AnimatedBox>
          </HeroText>

          <AnimatedBox className={animateClass} $delay="0.35s">
            <LargeMock>
              <DashboardShell>
                <TopBar>
                  <TopTitle>
                    <h4>Greenhouse Overview</h4>
                    <p>토마토 생육 상태 · 실시간 환경 모니터링</p>
                  </TopTitle>
                  <StatusChip>정상 운영 중</StatusChip>
                </TopBar>

                <MetricsGrid>
                  <MetricCard>
                    <span>온도</span>
                    <strong>24.3℃</strong>
                    <small>적정 범위 유지</small>
                  </MetricCard>

                  <MetricCard>
                    <span>습도</span>
                    <strong>67%</strong>
                    <small>관수 최적화 중</small>
                  </MetricCard>

                  <MetricCard>
                    <span>CO₂</span>
                    <strong>521 ppm</strong>
                    <small>AI 자동 보정</small>
                  </MetricCard>
                </MetricsGrid>

                <MainGrid>
                  <ChartPanel>
                    <ChartHeader>
                      <h5>오늘의 생육/환경 추이</h5>
                      <span>최근 6시간</span>
                    </ChartHeader>
                    <FakeChart />
                  </ChartPanel>

                  <AlertCard>
                    <h5>실시간 알림</h5>
                    <AlertItem>
                      <strong>AI</strong>
                      3번 구역 잎 처짐 패턴 감지
                    </AlertItem>
                    <AlertItem>
                      <strong>급수</strong>
                      토양 수분 기준 관수량 자동 조정
                    </AlertItem>
                    <AlertItem>
                      <strong>예측</strong>
                      오후 습도 상승 가능성 감지
                    </AlertItem>
                  </AlertCard>

                  <VisionCard>
                    <h5>비전 분석 카메라</h5>
                    <p>
                      잎 색상, 생육 상태, 이상 징후를 이미지 기반으로
                      분석합니다.
                    </p>
                  </VisionCard>

                  {/* <PhoneWrap>
                    <MobileCard>
                      <MobileTop />
                      <MobileScreen>
                        <MobileStatus>현장 앱 연결됨</MobileStatus>
                        <MobileMiniCard />
                        <MobileMiniCard />
                        <MobileMiniCard />
                      </MobileScreen>
                    </MobileCard>
                  </PhoneWrap> */}
                </MainGrid>
              </DashboardShell>
            </LargeMock>
          </AnimatedBox>
        </HeroInner>
      </Container>
    </HeroSection>
  );
};

export default Hero;
