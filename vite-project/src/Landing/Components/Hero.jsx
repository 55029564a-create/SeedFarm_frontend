import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  PrimaryButton,
  SecondaryButton,
  MockBox,
  theme,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const HeroSection = styled(Section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #f5f7f6 0%, #eef5ef 100%);

  @media (max-width: 640px) {
    min-height: auto;
    padding-top: 120px;
    padding-bottom: 80px;
  }
`;

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 68px;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    line-height: 1.8;
    color: ${theme.colors.subText};
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 52px;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 40px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const LargeMock = styled(MockBox)`
  min-height: 420px;
  position: relative;
  padding: 32px;
`;

const MockScreen = styled.div`
  width: 100%;
  min-height: 300px;
  border-radius: 18px;
  background: #edf3ee;
  position: relative;
  overflow: hidden;
`;

const MockChart = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  top: 40px;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(180deg, #66bb6a 0%, #2e7d32 100%);
  opacity: 0.5;
`;

const MockLines = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 28px;
  height: 80px;
  border-radius: 12px;
  background: repeating-linear-gradient(
    to right,
    #d7e6d8,
    #d7e6d8 20px,
    #eef5ef 20px,
    #eef5ef 40px
  );
`;

const MockDevice = styled.div`
  position: absolute;
  right: -20px;
  bottom: 24px;
  width: 100px;
  height: 180px;
  border-radius: 18px;
  background: #dce7de;
  border: 1px solid #bfd4c1;
`;

const Hero = () => {
  // 💡 훅을 호출하여 ref와 클래스명을 받아옵니다.
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <HeroSection id="hero">
      <Container>
        {/* 💡 애니메이션 트리거 기준점이 될 래퍼에 ref 연결 */}
        <HeroInner ref={sectionRef}>
          <HeroText>
            {/* 💡 요소들을 AnimatedBox로 감싸고 딜레이(delay)를 주어 순차적으로 등장하게 합니다 */}
            <AnimatedBox className={animateClass} delay="0s">
              <SectionLabel>HERO SECTION</SectionLabel>
              <h1>AI가 농장을 관리합니다</h1>
            </AnimatedBox>

            <AnimatedBox className={animateClass} delay="0.1s">
              <p>
                Seed Farm은 AI와 스마트팜 기술을 결합해 수확량은 높이고 운영
                비용은 줄이는 농장 관리 솔루션입니다.
              </p>
            </AnimatedBox>

            <AnimatedBox className={animateClass} delay="0.2s">
              <HeroButtons>
                <PrimaryButton>무료 상담 받기</PrimaryButton>
                <SecondaryButton>데모 보기</SecondaryButton>
              </HeroButtons>
            </AnimatedBox>
          </HeroText>

          {/* 💡 우측 Mock 이미지 영역은 제일 마지막에 등장 */}
          <AnimatedBox className={animateClass} delay="0.3s">
            <LargeMock>
              <MockScreen>
                <MockChart />
                <MockLines />
              </MockScreen>
              <MockDevice />
            </LargeMock>
          </AnimatedBox>
        </HeroInner>
      </Container>
    </HeroSection>
  );
};

export default Hero;
