import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  IconCircle,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const InfoCard = styled(BaseCard)`
  padding: 28px;

  /* 💡 카드 크기 통일을 위한 CSS 추가 */
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
    margin: 0; /* 기본 마진 제거 */
    flex-grow: 1; /* 💡 텍스트가 짧아도 공간을 채우도록 설정 */
  }
`;

const data = [
  {
    title: '병해충 대응 지연',
    desc: '이상 징후를 늦게 발견해 피해가 커집니다.',
  },
  {
    title: '수작업 중심 관리',
    desc: '환경 조절과 점검에 많은 인력이 필요합니다.',
  },
  {
    title: '경험 의존 운영',
    desc: '정확한 데이터 없이 감으로 판단하는 경우가 많습니다.',
  },
  { title: '운영 효율 저하', desc: '생산성과 안정성이 떨어질 수 있습니다.' },
];

const Problem = () => {
  // 💡 스크롤 감지 훅 호출
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <Section id="problem" $bg="#FFFFFF">
      {/* 💡 Container에 ref를 달아 이 영역이 보일 때 애니메이션이 시작되도록 합니다 */}
      <Container ref={sectionRef}>
        {/* 💡 텍스트 영역은 제일 먼저 나타나게 delay="0s" 적용 */}
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionTitle>기존 농업의 문제</SectionTitle>
          <SectionDesc>
            스마트한 분석과 자동화가 없으면 생산성과 안정성을 동시에 잡기
            어렵습니다.
          </SectionDesc>
        </AnimatedBox>

        <CardGrid $columns={4}>
          {data.map((item, index) => (
            // 💡 index를 활용해 0.1s, 0.2s, 0.3s, 0.4s 순으로 딜레이를 줍니다.
            <AnimatedBox
              key={item.title}
              className={animateClass}
              $delay={`${0.1 + index * 0.1}s`}
              style={{
                height: '100%',
              }} /* 💡 애니메이션 래퍼도 그리드 셀의 높이를 가득 채우도록 설정 */
            >
              <InfoCard>
                <IconCircle>!</IconCircle>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </InfoCard>
            </AnimatedBox>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Problem;
