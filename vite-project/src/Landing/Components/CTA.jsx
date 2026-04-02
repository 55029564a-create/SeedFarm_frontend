import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  PrimaryButton,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const CTAWrap = styled(Section)`
  padding: 0;
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
`;

const CTAInner = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 1024px) {
    min-height: 260px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const CTAText = styled.div`
  h2 {
    color: white;
    margin-bottom: 12px;
  }

  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 640px) {
    p {
      font-size: 16px;
    }
  }
`;

const CTAButton = styled(PrimaryButton)`
  background: white;
  color: #2e7d32;
  min-width: 220px;
`;

const CTA = () => {
  // 💡 스크롤 감지 훅 호출
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <CTAWrap id="contact">
      <Container>
        {/* 💡 CTAInner에 ref를 달아 스크롤 트리거 영역으로 설정 */}
        <CTAInner ref={sectionRef}>
          {/* 💡 텍스트 영역이 제일 먼저 나타납니다 (delay 0s) */}
          <AnimatedBox className={animateClass} delay="0s">
            <CTAText>
              <SectionLabel light>CTA SECTION</SectionLabel>
              <SectionTitle>지금 바로 스마트팜을 자동화하세요</SectionTitle>
              <p>AI 기반 농장 관리로 수익은 높이고 비용은 줄이세요.</p>
            </CTAText>
          </AnimatedBox>

          {/* 💡 클릭을 유도하는 버튼이 살짝 늦게 등장합니다 (delay 0.2s) */}
          <AnimatedBox className={animateClass} delay="0.2s">
            <div>
              <CTAButton>무료 상담 신청</CTAButton>
            </div>
          </AnimatedBox>
        </CTAInner>
      </Container>
    </CTAWrap>
  );
};

export default CTA;
