import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import {
  PageContainer,
  MainWrapper,
  TopHeader,
  HeaderBtn,
} from '../Pages/Styles/AdminShared';

const AdminLayout = () => {
  const location = useLocation();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState('Sector 01 (토마토)');

  const sectors = [
    'Sector 01 (토마토)',
    'Sector 02 (딸기)',
    'Sector 03 (파프리카)',
    'All Sectors (전체)',
  ];
  const alerts = [
    {
      id: 1,
      type: 'warning',
      text: 'Sector 02 내부 온도 28°C 초과',
      time: '10분 전',
    },
    {
      id: 2,
      type: 'action',
      text: 'Mist System 자동 가동됨',
      time: '1시간 전',
    },
    {
      id: 3,
      type: 'normal',
      text: '주간 생육 리포트 생성 완료',
      time: '2시간 전',
    },
  ];

  const getPageInfo = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('analysis'))
      return { menu: 'Analysis', title: 'Data Analysis' };
    if (path.includes('device'))
      return { menu: 'Device', title: 'Device Control Panel' };
    if (path.includes('cctv')) return { menu: 'CCTV', title: 'CCTV & Sectors' };
    return { menu: 'Dashboard', title: 'Live Dashboard' };
  };

  const { menu, title } = getPageInfo();

  return (
    <PageContainer>
      <Sidebar activeMenu={menu} />

      <MainWrapper>
        <TopHeader
          style={{ marginBottom: '0.5em', position: 'relative', zIndex: 100 }}
        >
          <div className="header-title">{title}</div>

          <div
            className="header-actions"
            style={{ display: 'flex', gap: '1em' }}
          >
            {/* 🔔 알림 버튼 (가로 길이 고정 적용) */}
            <DropdownWrapper>
              <FixedHeaderBtn
                className="alert"
                onClick={() => {
                  setIsAlertOpen(!isAlertOpen);
                  setIsSectorOpen(false);
                }}
              >
                <span>🔔 {alerts.length} Alert</span>
              </FixedHeaderBtn>

              {isAlertOpen && (
                <DropdownMenu className="alert-menu">
                  <div className="menu-header">최근 알림</div>
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`alert-item ${alert.type}`}>
                      <p>{alert.text}</p>
                      <span className="time">{alert.time}</span>
                    </div>
                  ))}
                </DropdownMenu>
              )}
            </DropdownWrapper>

            {/* 📍 구역 선택 버튼 (가로 길이 고정 및 양끝 정렬 적용) */}
            <DropdownWrapper>
              <FixedHeaderBtn
                onClick={() => {
                  setIsSectorOpen(!isSectorOpen);
                  setIsAlertOpen(false);
                }}
              >
                <span className="btn-text">{selectedSector}</span>
                <span className="btn-arrow">▾</span>
              </FixedHeaderBtn>

              {isSectorOpen && (
                <DropdownMenu>
                  {sectors.map((sector, idx) => (
                    <div
                      key={idx}
                      className={`sector-item ${selectedSector === sector ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSector(sector);
                        setIsSectorOpen(false);
                      }}
                    >
                      {sector}
                    </div>
                  ))}
                </DropdownMenu>
              )}
            </DropdownWrapper>
          </div>
        </TopHeader>

        <ContentArea>
          <Outlet context={{ selectedSector }} />
        </ContentArea>
      </MainWrapper>
    </PageContainer>
  );
};

export default AdminLayout;

// --- AdminLayout 전용 Styled Components ---

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

// 🚀 새롭게 추가된 '크기 고정형' 버튼 스타일
const FixedHeaderBtn = styled(HeaderBtn)`
  /* 버튼의 최소 너비를 고정해서 글자가 짧아져도 줄어들지 않게 방어 */
  min-width: 180px;
  display: flex;
  justify-content: space-between; /* 양 끝 정렬 (텍스트는 좌측, 화살표는 우측) */
  align-items: center;

  .btn-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 혹시 글자가 너무 길면 ... 처리 */
  }

  .btn-arrow {
    margin-left: 0.5em;
    color: #94a3b8;
  }

  &.alert {
    min-width: 120px;
    justify-content: center; /* 알림 버튼은 글자가 가운데 오도록 */
  }
`;

// 드롭다운 UI 스타일 (기존과 동일)
const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5em);
  right: 0;
  background-color: white;
  min-width: 200px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;

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

  &.alert-menu {
    min-width: 280px;
    .menu-header {
      padding: 1em;
      font-weight: 800;
      color: var(--primary-dark);
      border-bottom: 1px solid #e2e8f0;
      background-color: #f8fafc;
    }
    .alert-item {
      padding: 1em;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
      &:hover {
        background-color: #f8fafc;
      }
      p {
        margin: 0;
        font-size: 0.9em;
        font-weight: 600;
        color: #334155;
        line-height: 1.4;
      }
      .time {
        font-size: 0.75em;
        color: #94a3b8;
        margin-top: 0.4em;
        display: block;
      }
      &.warning p {
        color: #e63946;
      }
      &.action p {
        color: var(--point-green);
      }
    }
  }

  .sector-item {
    padding: 1em 1.5em;
    font-size: 0.95em;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid #f1f5f9;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #f8fafc;
      color: var(--point-green);
    }
    &.active {
      background-color: rgba(76, 175, 80, 0.05);
      color: var(--point-green);
      font-weight: 700;
    }
  }
`;
