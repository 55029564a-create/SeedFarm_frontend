import React, { useState } from 'react';
import styled from 'styled-components';

export default function MobileHeader({
  onMenuClick,
  rightText = 'Alert 2',
  selectedSector = 'A룸',
  onSectorChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sectors = ['A룸', 'B룸', 'C룸'];

  const handleSelect = (sector) => {
    setIsDropdownOpen(false);
    onSectorChange?.(sector);
  };

  return (
    <Header>
      <Left>
        <MenuButton onClick={onMenuClick}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </MenuButton>

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
                    onClick={() => handleSelect(sector)}
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
        <span className="pulse-dot" />
        {rightText}
      </Badge>
    </Header>
  );
}

// styled 부분은 기존 그대로 사용

// ---------------- styled ----------------

const Header = styled.header`
  height: 56px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
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

  svg {
    width: 20px;
    height: 20px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const SelectorBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;

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

  &:active {
    background: ${({ theme }) => theme.colors.soft};
  }
`;

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

  .pulse-dot {
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.danger};
    border-radius: 50%;
  }
`;
