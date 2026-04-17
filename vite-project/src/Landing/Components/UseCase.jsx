import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  AnimatedBox,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const UseCaseCard = styled(BaseCard)`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UseCaseImage = styled.div`
  height: 220px;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(15, 23, 42, 0.42),
      rgba(15, 23, 42, 0.08)
    );
  }
`;

const ImageLabel = styled.div`
  position: absolute;
  left: 18px;
  bottom: 16px;
  z-index: 1;
  color: white;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.2px;
`;

const UseCaseBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #0f172a;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
    flex-grow: 1;
  }
`;

const data = [
  {
    title: '온실 농장',
    imageLabel: 'Greenhouse',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    desc: '온도, 습도, CO₂를 정밀하게 관리하는 환경에 적합하며 작물 상태를 안정적으로 모니터링할 수 있습니다.',
  },
  {
    title: '묘목 재배',
    imageLabel: 'Seedling',
    image:
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    desc: '초기 생육 상태를 세밀하게 분석하고 잎 상태, 성장 편차, 이상 징후를 빠르게 감지하는 데 효과적입니다.',
  },
  {
    title: '스마트 재배 시설',
    imageLabel: 'Smart Facility',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    desc: '자동화 설비와 연동해 관수, 환기, 생육 분석까지 하나의 흐름으로 연결하는 운영 체계를 구축할 수 있습니다.',
  },
];

const UseCase = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <Section id="usecase" $bg="#FFFFFF">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionTitle>이런 곳에 적용됩니다</SectionTitle>
          <SectionDesc>
            다양한 재배 환경에 맞춰 유연하게 적용할 수 있는 스마트팜
            솔루션입니다.
          </SectionDesc>
        </AnimatedBox>

        <CardGrid $columns={3}>
          {data.map((item, index) => (
            <AnimatedBox
              key={item.title}
              className={animateClass}
              $delay={`${0.1 + index * 0.1}s`}
              style={{ height: '100%' }}
            >
              <UseCaseCard>
                <UseCaseImage $image={item.image}>
                  <ImageLabel>{item.imageLabel}</ImageLabel>
                </UseCaseImage>

                <UseCaseBody>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </UseCaseBody>
              </UseCaseCard>
            </AnimatedBox>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default UseCase;
