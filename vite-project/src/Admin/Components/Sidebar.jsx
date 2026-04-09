import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// (기존 아이콘 코드는 그대로 유지. 생략 없이 다 넣으시면 됩니다)
const Icons = {
  Leaf: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 7 10 3 16 3c0 6-4 12-10 12" /><path d="M11 20v-5" /></svg>,
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>,
  Camera: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
  Sliders: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>,
  Trending: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Logout: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  Close: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
};

// 🚨 isOpen과 closeSidebar props 추가!
const Sidebar = ({ activeMenu, isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (closeSidebar) closeSidebar(); // 모바일에서 메뉴 누르면 사이드바 닫히게!
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <LogoArea>
        <div className="logo-wrap">
          <div className="logo-icon"><Icons.Leaf /></div>
          <span className="logo-text">Seed Farm</span>
        </div>
        {/* 모바일 닫기 버튼 */}
        <CloseBtn onClick={closeSidebar}><Icons.Close /></CloseBtn>
      </LogoArea>

      <NavList>
        <NavItem className={activeMenu === 'Dashboard' ? 'active' : ''} onClick={() => handleNavigate('/DashBoard')}>
          <div className="nav-icon"><Icons.Dashboard /></div><span className="nav-text">Dashboard</span>
        </NavItem>
        <NavItem className={activeMenu === 'CCTV' ? 'active' : ''} onClick={() => handleNavigate('/cctv')}>
          <div className="nav-icon"><Icons.Camera /></div><span className="nav-text">CCTV & Sectors</span>
        </NavItem>
        <NavItem className={activeMenu === 'Device' ? 'active' : ''} onClick={() => handleNavigate('/Device')}>
          <div className="nav-icon"><Icons.Sliders /></div><span className="nav-text">Device Control</span>
        </NavItem>
        <NavItem className={activeMenu === 'Analysis' ? 'active' : ''} onClick={() => handleNavigate('/Analysis')}>
          <div className="nav-icon"><Icons.Trending /></div><span className="nav-text">Data Analysis</span>
        </NavItem>
      </NavList>

      <Spacer />

      <BottomArea>
        <UserProfile>
          <div className="avatar"><Icons.User /></div>
          <div className="user-info">
            <div className="name">Admin Manager</div>
            <div className="role">System Operator</div>
          </div>
        </UserProfile>
        <LogoutBtn onClick={() => handleNavigate('/Login')}>
          <div className="nav-icon"><Icons.Logout /></div><span className="nav-text">Logout</span>
        </LogoutBtn>
      </BottomArea>
    </SidebarContainer>
  );
};

export default Sidebar;

// --- Styled Components ---

const SidebarContainer = styled.nav`
  width: 220px;
  height: 100vh;
  background-color: var(--primary-dark, #1E293B);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2em 1.2em;
  box-sizing: border-box;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* 💊 태블릿 (1024px 이하) */
  @media (max-width: 1024px) {
    width: 240px; /* 조장님 지시: 태블릿은 240px */
    position: fixed;
    top: 0;
    left: 0;
    /* isOpen 상태에 따라 화면 안으로 들어오거나 숨거나 */
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }

  /* 📱 모바일 (768px 이하) */
  @media (max-width: 768px) {
    width: 260px; /* 조장님 지시: 모바일은 다시 260px */
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3em;
  padding: 0 0.5em;

  .logo-wrap { display: flex; align-items: center; gap: 0.8em; }
  .logo-icon { width: 2em; height: 2em; color: var(--point-green, #4CAF50); display: flex; align-items: center; justify-content: center; }
  .logo-text { font-size: 1.5em; font-weight: 800; color: var(--white, #ffffff); }
`;

const CloseBtn = styled.button`
  display: none;
  background: none; border: none; color: #94A3B8; width: 2em; height: 2em; cursor: pointer;
  @media (max-width: 1024px) { display: block; }
  svg { width: 100%; height: 100%; }
`;

const NavList = styled.div` display: flex; flex-direction: column; gap: 0.5em; `;
const NavItem = styled.div`
  display: flex; align-items: center; gap: 1em; padding: 1em 1.2em; border-radius: 0.8em; font-size: 1.05em; font-weight: 600; color: #94A3B8; cursor: pointer; transition: all 0.2s; border-left: 4px solid transparent;
  .nav-icon { width: 1.2em; height: 1.2em; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
  &:hover { color: white; background-color: rgba(255, 255, 255, 0.05); transform: translateX(4px); }
  &.active { color: white; background-color: rgba(76, 175, 80, 0.15); border-left: 4px solid var(--point-green, #4CAF50); .nav-icon { color: var(--point-green, #4CAF50); transform: scale(1.1); } }
`;
const Spacer = styled.div` flex: 1; `;
const BottomArea = styled.div` display: flex; flex-direction: column; gap: 1em; padding-top: 1.5em; border-top: 1px solid rgba(255, 255, 255, 0.1); `;
const UserProfile = styled.div` display: flex; align-items: center; gap: 1em; padding: 0.5em; .avatar { width: 2.5em; height: 2.5em; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: #CBD5E1; svg { width: 1.2em; height: 1.2em; } } .user-info { display: flex; flex-direction: column; .name { font-size: 0.95em; font-weight: 700; color: white; } .role { font-size: 0.8em; color: #94A3B8; margin-top: 0.2em; } } `;
const LogoutBtn = styled(NavItem)` &:hover { background-color: rgba(230, 57, 70, 0.1); color: #E63946; border-left: 4px solid transparent; } `;