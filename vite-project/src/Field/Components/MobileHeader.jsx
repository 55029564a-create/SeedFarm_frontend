import React, { useState } from 'react';
import styled from 'styled-components';

export default function MobileHeader({ onMenuClick, rightText = 'Alert 2' }) {
  // 🚨 구역(Sector) 선택을 위한 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState('Sector 01');

  const sectors = ['Sector 01', 'Sector 02', 'Sector 03', 'Sector 04'];

  return (
    <Header>
      <Left>
        <MenuButton onClick={onMenuClick}>
          {/* 텍스트 ☰ 대신 깔끔한 SVG 햄버거 아이콘으로 업그레이드 */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </MenuButton>

        {/* 🚨 PC 헤더처럼 모바일에서도 구역을 선택할 수 있는 드롭다운 추가 */}
        <DropdownWrapper>
          <SelectorBtn onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Title>{selectedSector}</Title>
            <span className="arrow">▾</span>
          </SelectorBtn>

          {isDropdownOpen && (
            <>
              <Backdrop onClick={() => setIsDropdownOpen(false)} />
              <DropdownMenu>
                {sectors.map((sector) => (
                  <MenuItem
                    key={sector}
                    $active={selectedSector === sector}
                    onClick={() => {
                      setSelectedSector(sector);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {sector}
                    {selectedSector === sector && (
                      <span className="check">✔</span>
                    )}
                  </MenuItem>
                ))}
              </DropdownMenu>
            </>
          )}
        </DropdownWrapper>
      </Left>

      <Badge>
        <span className="pulse-dot"></span>
        {rightText}
      </Badge>
    </Header>
  );
}

// --- 🎨 스타일링 ---

const Header = styled.header`
  height: 56px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative; /* 드롭다운 기준점 */
  z-index: 90;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// --- 🚨 드롭다운 관련 스타일 ---

const DropdownWrapper = styled.div`
  position: relative;
`;

const SelectorBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  transition: 0.2s;

  .arrow {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.subText};
  }

  &:active {
    background: ${({ theme }) => theme.colors.soft};
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 95;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: ${({ theme }) => theme.colors.white};
  min-width: 160px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 6px;
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.successBg : 'transparent'};

  .check {
    font-size: 12px;
  }

  &:active {
    background: ${({ theme }) => theme.colors.soft};
  }
`;

// --- 🚨 배지(Alert) 스타일 디테일 업 ---

const Badge = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  font-weight: 800;
  border: 1px solid rgba(220, 38, 38, 0.2);

  /* 살아있는 알림 느낌을 주는 맥박(Pulse) 애니메이션 점 */
  .pulse-dot {
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.danger};
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 4px rgba(220, 38, 38, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
    }
  }
`;
