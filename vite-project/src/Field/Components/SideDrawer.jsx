import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// --- 🚨 형님이 만드신 고퀄리티 SVG 아이콘 그대로 이식 ---
const Icons = {
  Leaf: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 4 13C4 7 10 3 16 3c0 6-4 12-10 12" />
      <path d="M11 20v-5" />
    </svg>
  ),
  Dashboard: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Camera: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  Sliders: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Trending: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Logout: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Close: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function SideDrawer({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    navigate('/Login');
  };

  const menus = [
    { label: 'Home', path: '/field', icon: <Icons.Dashboard /> },
    { label: 'Alerts', path: '/field/alerts', icon: <Icons.Trending /> },
    { label: 'Camera', path: '/field/camera', icon: <Icons.Camera /> },
    { label: 'Control', path: '/field/control', icon: <Icons.Sliders /> },
  ];

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        {/* 1. 로고 영역 */}
        <LogoArea>
          <div className="logo-wrap">
            <div className="logo-icon">
              <Icons.Leaf />
            </div>
            <div className="logo-text-wrap">
              <Logo>Seed Farm</Logo>
              <SubText>Field Interface</SubText>
            </div>
          </div>
          <CloseBtn onClick={onClose}>
            <Icons.Close />
          </CloseBtn>
        </LogoArea>

        {/* 2. 메인 메뉴 영역 */}
        <NavList>
          <div className="menu-label">MENU</div>
          {menus.map((menu) => (
            <MenuItem
              key={menu.path}
              as={Link}
              to={menu.path}
              onClick={onClose}
              className={location.pathname === menu.path ? 'active' : ''}
            >
              <div className="nav-icon">{menu.icon}</div>
              <span className="nav-text">{menu.label}</span>
            </MenuItem>
          ))}
        </NavList>

        <Spacer />

        {/* 3. 하단 유저 프로필 & 로그아웃 영역 */}
        <BottomArea>
          <div className="menu-label">GENERAL</div>
          <UserProfile>
            <div className="avatar">
              <Icons.User />
            </div>
            <div className="user-info">
              <div className="name">Field Worker</div>
              <div className="role">Sector 01 Team</div>
            </div>
          </UserProfile>
          <LogoutBtn onClick={handleLogout}>
            <div className="nav-icon">
              <Icons.Logout />
            </div>
            <span className="nav-text">Logout</span>
          </LogoutBtn>
        </BottomArea>
      </Drawer>
    </>
  );
}

// --- 🎨 폰트/아이콘 크기 빵빵하게 키운 하이엔드 CSS ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: 0.3s ease;
  z-index: 99;
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  max-width: 82%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};

  /* 🔥 핵심 수정 */
  box-shadow: ${({ $open }) =>
    $open ? '10px 0 30px rgba(0, 0, 0, 0.14)' : 'none'};

  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};

  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s ease;

  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 1.5em 1em;
  box-sizing: border-box;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
  padding: 0 0.5em;

  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 0.8em;
  }
  .logo-icon {
    width: 2.4em;
    height: 2.4em;
    color: ${({ theme }) => theme.colors.primary}; /* theme.js 연동 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-text-wrap {
    display: flex;
    flex-direction: column;
  }
`;

const Logo = styled.h2`
  font-size: 1.5em; /* 폰트 빵빵하게 */
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;
  margin: 0;
`;

const SubText = styled.p`
  font-size: 0.75em;
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 700;
  margin: 0;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.subText};
  width: 2em;
  height: 2em;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;

  .menu-label {
    font-size: 0.85em;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 0.8em;
    padding-left: 1.2em;
    letter-spacing: 0.05em;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.9em 1.2em;
  border-radius: 12px;
  font-size: 1.05em; /* 폰트 빵빵하게 */
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  .nav-icon {
    width: 1.4em; /* 아이콘 빵빵하게 */
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.soft};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.successBg};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
    .nav-icon {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  .menu-label {
    font-size: 0.85em;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 0.5em;
    padding-left: 1.2em;
    letter-spacing: 0.05em;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
  margin-bottom: 0.5em;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.soft};

  .avatar {
    width: 2.8em;
    height: 2.8em;
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.subText};
    svg {
      width: 1.4em;
      height: 1.4em;
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 1.05em;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.text};
    }
    .role {
      font-size: 0.85em;
      color: ${({ theme }) => theme.colors.subText};
      margin-top: 0.2em;
      font-weight: 600;
    }
  }
`;

const LogoutBtn = styled(MenuItem)`
  margin-top: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerBg};
    color: ${({ theme }) => theme.colors.danger};
    .nav-icon {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;
