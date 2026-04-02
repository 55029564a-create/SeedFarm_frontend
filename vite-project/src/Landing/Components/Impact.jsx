import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  theme,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const ImpactCard = styled(BaseCard)`
  padding: 36px 20px;
  text-align: center;

  h3 {
    font-size: 52px;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    color: #334155;
    font-weight: 600;
  }
`;

const data = [
  { value: '+30%', label: '수확량 증가' },
  { value: '-50%', label: '노동 시간 감소' },
  { value: '-70%', label: '병해 피해 감소' },
];

const Impact = () => {
  // 💡 스크롤 감지 훅 호출
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <Section id="impact" bg="#FFFFFF">
      {/* 💡 Container에 ref를 달아 스크롤 트리거 영역으로 설정 */}
      <Container ref={sectionRef}>
        {/* 💡 텍스트 영역이 먼저 나타납니다 (delay 0s) */}
        <AnimatedBox className={animateClass} delay="0s">
          <SectionLabel>IMPACT SECTION</SectionLabel>
          <SectionTitle>설치 농장의 성과</SectionTitle>
          <SectionDesc>
            스마트팜 AI 도입 후 기대할 수 있는 대표적인 운영 개선 지표입니다.
          </SectionDesc>
        </AnimatedBox>

        <CardGrid columns={3}>
          {data.map((item, index) => (
            // 💡 index를 활용해 0.1s, 0.2s, 0.3s 순으로 카드가 등장하게 합니다.
            <AnimatedBox
              key={item.label}
              className={animateClass}
              delay={`${0.1 + index * 0.1}s`}
            >
              <ImpactCard>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </ImpactCard>
            </AnimatedBox>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Impact;
