import styled from 'styled-components';
import { Container, PrimaryButton, theme } from '../styles/landingStyled';

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  background: rgba(245, 247, 246, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #dbe4dd;

  @media (max-width: 1024px) {
    height: 72px;
  }

  @media (max-width: 640px) {
    height: 56px;
  }
`;

const HeaderInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${theme.colors.primary};

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 28px;
  color: #334155;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 600; /* 💡 폰트 살짝 두껍게 */
    transition: color 0.2s ease; /* 💡 색상 변경 애니메이션 */

    &:hover {
      color: ${theme.colors
        .primary}; /* 💡 마우스 올리면 브랜드 컬러(녹색)로 변경 */
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HeaderButton = styled.a`
  text-decoration: none;

  button {
    padding: 12px 20px;
  }

  @media (max-width: 640px) {
    button {
      padding: 10px 14px;
      font-size: 14px;
    }
  }
`;

const HeaderContainer = styled(Container)`
  height: 100%;
`;

const Header = () => {
  return (
    <HeaderWrap>
      <HeaderContainer>
        <HeaderInner>
          <Logo>Seed Farm</Logo>

          <Nav>
            <a href="#hero">Hero</a>
            <a href="#features">Features</a>
            <a href="#usecase">UseCase</a>
            <a href="#contact">문의하기</a>
          </Nav>

          <HeaderButton href="#contact">
            <PrimaryButton>무료 상담</PrimaryButton>
          </HeaderButton>
        </HeaderInner>
      </HeaderContainer>
    </HeaderWrap>
  );
};

export default Header;
