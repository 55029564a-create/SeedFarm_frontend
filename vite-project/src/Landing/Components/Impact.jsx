import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  theme,
  AnimatedBox,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import CountUp from '../Components/CountUp';

const ImpactCard = styled(BaseCard)`
  padding: 36px 20px;
  text-align: center;

  h3 {
    font-size: 52px;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
    line-height: 1.1;
  }

  p {
    font-size: 20px;
    color: #334155;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    h3 {
      font-size: 40px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const data = [
  { end: 30, prefix: '+', suffix: '%', label: '수확량 증가' },
  { end: 50, prefix: '-', suffix: '%', label: '노동 시간 감소' },
  { end: 70, prefix: '-', suffix: '%', label: '병해 피해 감소' },
];

const Impact = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  const isAnimated = animateClass === 'animate';

  return (
    <Section id="impact" $bg="#FFFFFF">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionTitle>설치 농장의 성과</SectionTitle>
          <SectionDesc>
            스마트팜 AI 도입 후 기대할 수 있는 대표적인 운영 개선 지표입니다.
          </SectionDesc>
        </AnimatedBox>

        <CardGrid $columns={3}>
          {data.map((item, index) => (
            <AnimatedBox
              key={item.label}
              className={animateClass}
              $delay={`${0.1 + index * 0.1}s`}
            >
              <ImpactCard>
                <h3>
                  <CountUp
                    end={item.end}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={1500 + index * 200}
                    trigger={isAnimated}
                  />
                </h3>
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
