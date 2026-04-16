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
  color: ${theme.colors.text};
  background:
    radial-gradient(
      circle at 20% 20%,
      rgba(102, 187, 106, 0.035) 0,
      transparent 180px
    ),
    radial-gradient(
      circle at 80% 10%,
      rgba(0, 194, 168, 0.03) 0,
      transparent 220px
    ),
    radial-gradient(
      circle at 50% 80%,
      rgba(46, 125, 50, 0.025) 0,
      transparent 240px
    ),
    ${theme.colors.light};

  user-select: none;

  img {
    -webkit-user-drag: none;
    user-select: none;
  }
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
  padding: 108px 0;
  background: ${({ $bg }) => $bg || 'transparent'};

  @media (max-width: 640px) {
    padding: 76px 0;
  }
`;

export const SectionLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? '#D7FFF7' : theme.colors.accent)};
  background: ${({ $light }) =>
    $light ? 'rgba(255,255,255,0.1)' : 'rgba(0, 194, 168, 0.08)'};
  border: 1px solid
    ${({ $light }) =>
      $light ? 'rgba(255,255,255,0.16)' : 'rgba(0, 194, 168, 0.14)'};
`;

export const SectionTitle = styled.h2`
  font-size: 46px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: ${theme.colors.text};

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

export const SectionDesc = styled.p`
  max-width: 760px;
  font-size: 18px;
  line-height: 1.75;
  color: ${({ $light }) =>
    $light ? 'rgba(255,255,255,0.82)' : theme.colors.subText};
  margin-bottom: 44px;

  @media (max-width: 640px) {
    font-size: 16px;
    margin-bottom: 34px;
  }
`;

export const PrimaryButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 16px 28px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #2e7d32 0%, #3e9b52 100%);
  color: ${theme.colors.white};
  box-shadow: 0 10px 24px rgba(46, 125, 50, 0.18);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    filter 0.28s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(46, 125, 50, 0.24);
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  border: 1px solid rgba(203, 213, 225, 0.9);
  cursor: pointer;
  padding: 16px 28px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.94);
  color: ${theme.colors.text};
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
  transition:
    border-color 0.28s ease,
    color 0.28s ease,
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background 0.28s ease;

  &:hover {
    border-color: rgba(46, 125, 50, 0.4);
    color: ${theme.colors.primary};
    background: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: ${({ $columns }) =>
    $columns === 4
      ? 'repeat(4, 1fr)'
      : $columns === 3
        ? 'repeat(3, 1fr)'
        : 'repeat(2, 1fr)'};

  @media (max-width: 1024px) {
    grid-template-columns: ${({ $columns }) =>
      $columns === 4 ? 'repeat(2, 1fr)' : '1fr'};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BaseCard = styled.div`
  border-radius: 24px;
  background: ${theme.colors.white};
  border: 1px solid rgba(221, 231, 223, 0.9);
  box-shadow:
    0 6px 20px rgba(15, 23, 42, 0.04),
    0 16px 40px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 10px 28px rgba(15, 23, 42, 0.06),
      0 24px 50px rgba(15, 23, 42, 0.08);
    border-color: rgba(160, 190, 164, 0.9);
  }
`;

export const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: linear-gradient(135deg, #eaf4eb 0%, #f1fbf5 100%);
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-weight: 800;
  font-size: 22px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
`;

export const MockBox = styled.div`
  border-radius: 28px;
  background: ${theme.colors.white};
  border: 1px solid rgba(219, 228, 221, 0.95);
  box-shadow:
    0 18px 50px rgba(15, 23, 42, 0.08),
    0 6px 18px rgba(15, 23, 42, 0.04);
`;

export const FooterLink = styled.a`
  display: block;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  transition:
    color 0.22s ease,
    transform 0.22s ease;

  &:hover {
    color: #66bb6a;
    transform: translateX(2px);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedBox = styled.div`
  opacity: 0;

  &.animate {
    animation: ${fadeInUp} 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: ${({ $delay }) => $delay || '0s'};
  }
`;
