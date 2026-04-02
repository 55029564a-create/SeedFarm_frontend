import styled, { keyframes } from 'styled-components';

export const theme = {
  colors: {
    primary: '#2E7D32',
    secondary: '#66BB6A',
    accent: '#00C2A8',
    dark: '#0F172A',
    light: '#F5F7F6',
    white: '#FFFFFF',
    text: '#0F172A',
    subText: '#475569',
    border: '#DDE7DF',
    softBg: '#F8FBF8',
    dashboardBg: '#111C31',
    dashboardCard: '#1A2740',
  },
};

export const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  background: ${theme.colors.light};
  color: ${theme.colors.text};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1024px) {
    padding: 0 24px;
  }

  @media (max-width: 640px) {
    padding: 0 20px;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 100px 0;
  background: ${({ bg }) => bg || 'transparent'};

  @media (max-width: 640px) {
    padding: 72px 0;
  }
`;

export const SectionLabel = styled.span`
  display: inline-block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ light }) => (light ? '#D7FFF7' : theme.colors.accent)};
`;

export const SectionTitle = styled.h2`
  font-size: 44px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

export const SectionDesc = styled.p`
  max-width: 760px;
  font-size: 18px;
  line-height: 1.7;
  color: ${({ light }) =>
    light ? 'rgba(255,255,255,0.85)' : theme.colors.subText};
  margin-bottom: 40px;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

export const PrimaryButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 16px 28px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
`;

export const SecondaryButton = styled.button`
  border: 1px solid #cbd5e1;
  cursor: pointer;
  padding: 16px 28px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  background: ${theme.colors.white};
  color: ${theme.colors.text};
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: ${({ columns }) =>
    columns === 4
      ? 'repeat(4, 1fr)'
      : columns === 3
        ? 'repeat(3, 1fr)'
        : 'repeat(2, 1fr)'};

  @media (max-width: 1024px) {
    grid-template-columns: ${({ columns }) =>
      columns === 4 ? 'repeat(2, 1fr)' : '1fr'};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BaseCard = styled.div`
  border-radius: 20px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
`;

export const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eaf4eb;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-weight: 800;
  font-size: 20px;
`;

export const MockBox = styled.div`
  border-radius: 24px;
  background: ${theme.colors.white};
  border: 1px solid #dbe4dd;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
`;

export const FooterLink = styled.a`
  display: block;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 💡 새로 추가: 애니메이션 래퍼 (이 컴포넌트로 요소들을 감싸줍니다)
export const AnimatedBox = styled.div`
  opacity: 0; // 초기 상태는 숨김

  &.animate {
    animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    /* delay prop을 받아서 순차적으로 나타나게 할 수 있습니다 */
    animation-delay: ${({ delay }) => delay || '0s'};
  }
`;
