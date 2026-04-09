import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- 아이콘 (기존 유지) ---
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

const Sidebar = ({ activeMenu, isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (closeSidebar) closeSidebar();
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      {/* 1. 로고 영역 */}
      <LogoArea>
        <div className="logo-wrap">
          <div className="logo-icon">
            <Icons.Leaf />
          </div>
          <span className="logo-text">Seed Farm</span>
        </div>
        <CloseBtn onClick={closeSidebar}>
          <Icons.Close />
        </CloseBtn>
      </LogoArea>

      {/* 2. 메인 메뉴 영역 */}
      <NavList>
        <div className="menu-label">MENU</div>
        <NavItem
          className={activeMenu === 'Dashboard' ? 'active' : ''}
          onClick={() => handleNavigate('/DashBoard')}
        >
          <div className="nav-icon">
            <Icons.Dashboard />
          </div>
          <span className="nav-text">Dashboard</span>
        </NavItem>
        <NavItem
          className={activeMenu === 'CCTV' ? 'active' : ''}
          onClick={() => handleNavigate('/cctv')}
        >
          <div className="nav-icon">
            <Icons.Camera />
          </div>
          <span className="nav-text">CCTV & Sectors</span>
        </NavItem>
        <NavItem
          className={activeMenu === 'Device' ? 'active' : ''}
          onClick={() => handleNavigate('/Device')}
        >
          <div className="nav-icon">
            <Icons.Sliders />
          </div>
          <span className="nav-text">Device Control</span>
        </NavItem>
        <NavItem
          className={activeMenu === 'Analysis' ? 'active' : ''}
          onClick={() => handleNavigate('/Analysis')}
        >
          <div className="nav-icon">
            <Icons.Trending />
          </div>
          <span className="nav-text">Data Analysis</span>
        </NavItem>
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
            <div className="name">Admin Manager</div>
            <div className="role">System Operator</div>
          </div>
        </UserProfile>
        <LogoutBtn onClick={() => handleNavigate('/Login')}>
          <div className="nav-icon">
            <Icons.Logout />
          </div>
          <span className="nav-text">Logout</span>
        </LogoutBtn>
      </BottomArea>
    </SidebarContainer>
  );
};

export default Sidebar;

// --- 🎨 폰트/아이콘 크기 빵빵하게 키운 CSS ---

const SidebarContainer = styled.nav`
  width: 260px; /* 글씨가 커졌으니 사이드바 넓이도 살짝 넓혔습니다 (250px -> 260px) */
  height: calc(100vh - 3em);
  margin: 1.5em 0 1.5em 1.5em;
  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);

  display: flex;
  flex-direction: column;
  padding: 2em 1.5em;
  box-sizing: border-box;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) {
    width: 260px;
    height: 100vh;
    margin: 0;
    border-radius: 0;
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${({ $isOpen }) =>
      $isOpen ? '4px 0 24px rgba(0,0,0,0.1)' : 'none'};
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5em;
  padding: 0 0.5em;

  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 0.8em;
  }
  .logo-icon {
    width: 2.6em; /* 2.2em -> 2.6em 확대 */
    height: 2.6em;
    color: var(--point-green, #4caf50);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-text {
    font-size: 1.6em; /* 1.4em -> 1.6em 확대 */
    font-weight: 800;
    color: var(--primary-dark);
    letter-spacing: -0.03em;
  }
`;

const CloseBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #94a3b8;
  width: 2.4em;
  height: 2.4em;
  cursor: pointer;
  @media (max-width: 1024px) {
    display: block;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em; /* 메뉴 사이 간격도 살짝 넓혔습니다 */

  .menu-label {
    font-size: 0.85em; /* 0.7em -> 0.85em 확대 (이제 잘 보일 겁니다) */
    font-weight: 800;
    color: #94a3b8;
    margin-bottom: 1em;
    padding-left: 1.2em;
    letter-spacing: 0.05em;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.9em 1.2em;
  border-radius: 12px;
  font-size: 1.05em; /* 0.95em -> 1.05em 확대 (시원시원함) */
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  .nav-icon {
    width: 1.4em; /* 아이콘도 커진 글씨에 맞춰 1.2em -> 1.4em 확대 */
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  &:hover {
    background-color: #f1f5f9;
    color: var(--primary-dark);
  }

  &.active {
    background-color: rgba(46, 125, 50, 0.08);
    color: var(--point-green);
    font-weight: 700;
    .nav-icon {
      color: var(--point-green);
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
    font-size: 0.85em; /* 0.7em -> 0.85em 확대 */
    font-weight: 800;
    color: #94a3b8;
    margin-bottom: 0.5em;
    padding-left: 1.2em;
    letter-spacing: 0.05em;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2em;
  padding: 1em 1.2em;
  margin-bottom: 0.5em;
  border-radius: 12px;
  background-color: #f8fafc;

  .avatar {
    width: 2.8em; /* 2.5em -> 2.8em 확대 */
    height: 2.8em;
    background-color: #e2e8f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #94a3b8;
    svg {
      width: 1.4em;
      height: 1.4em;
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 1.05em; /* 0.9em -> 1.05em 확대 */
      font-weight: 700;
      color: var(--primary-dark);
    }
    .role {
      font-size: 0.85em; /* 0.75em -> 0.85em 확대 */
      color: #94a3b8;
      margin-top: 0.2em;
    }
  }
`;

const LogoutBtn = styled(NavItem)`
  &:hover {
    background-color: rgba(230, 57, 70, 0.08);
    color: #e63946;
    .nav-icon {
      color: #e63946;
    }
  }
`;
