import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // 🚨 라우팅을 위한 훅 추가
import { Container } from '../styles/landingStyled';

const CTASection = styled.section`
  background: linear-gradient(135deg, #2e7d32, #43a047);
  padding: 80px 0;
  color: white;
`;

const CTABox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextWrap = styled.div`
  max-width: 600px;

  h2 {
    font-size: 42px;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 20px;
    line-height: 1.6;
  }
`;

const BenefitList = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 10px;

  span {
    background: rgba(255, 255, 255, 0.15);
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryBtn = styled.button`
  background: white;
  color: #2e7d32;
  font-weight: 800;
  padding: 16px 28px;
  border-radius: 999px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SecondaryBtn = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 14px 24px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const CTA = () => {
  const navigate = useNavigate(); // 🚨 페이지 이동을 위한 함수 호출

  return (
    <CTASection>
      <Container>
        <CTABox>
          <TextWrap>
            <h2>지금 바로 스마트팜을 자동화하세요</h2>
            <p>
              AI가 작물을 대신 관찰하고, 최적의 환경을 자동으로 유지합니다. 지금
              시작하면 초기 세팅까지 무료로 지원합니다.
            </p>

            <BenefitList>
              <span>✔ 초기 설정 무료</span>
              <span>✔ 24시간 AI 관리</span>
              <span>✔ 자동 환경 제어</span>
            </BenefitList>
          </TextWrap>

          <ButtonWrap>
            <PrimaryBtn>무료 상담 시작하기</PrimaryBtn>
            {/* 🚨 문구 변경 및 onClick 이벤트로 /login 페이지 이동 연결 */}
            <SecondaryBtn onClick={() => navigate('/login')}>
              시스템 체험하기 →
            </SecondaryBtn>
          </ButtonWrap>
        </CTABox>
      </Container>
    </CTASection>
  );
};

export default CTA;
