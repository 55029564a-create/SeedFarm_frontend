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
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  // 📍 지점 명칭을 실제 운영 센터 느낌으로 변경
  const branches = [
    '천안 본점 (종합관제센터)',
    '천안 제2센터 (육묘 전용)',
    '천안 제3센터 (연구/R&D)',
    '천안 제4센터 (지하 생산단지)',
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  // 🔔 알림 내용을 실무형 텍스트로 보강
  const alerts = [
    {
      id: 1,
      type: 'warning',
      text: '천안 제1센터: 지하 2층 내부 온도 임계치(28°C) 초과',
      time: '10분 전',
    },
    {
      id: 2,
      type: 'action',
      text: '천안 제3센터: 습도 최적화를 위한 제습 시스템 자동 가동',
      time: '1시간 전',
    },
    {
      id: 3,
      type: 'normal',
      text: '전 지점: 주간 생육 리포트 및 전력 분석 보고서 생성 완료',
      time: '2시간 전',
    },
  ];

  const getPageInfo = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('analysis'))
      return { menu: 'Analysis', title: '데이터 분석 및 통계 리포트' };
    if (path.includes('device'))
      return { menu: 'Device', title: '지능형 목표 수치 설정 (Override)' };
    if (path.includes('cctv'))
      return { menu: 'CCTV', title: '다중 지점 실시간 관제 (CCTV)' };
    return { menu: 'Dashboard', title: '종합 관제 대시보드' };
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
            {/* 🔔 관제 알림 드롭다운 */}
            <DropdownWrapper>
              <FixedHeaderBtn
                className="alert"
                onClick={() => {
                  setIsAlertOpen(!isAlertOpen);
                  setIsBranchOpen(false);
                }}
              >
                <span>🔔 알림 ({alerts.length})</span>
              </FixedHeaderBtn>

              {isAlertOpen && (
                <DropdownMenu className="alert-menu">
                  <div className="menu-header">최근 관제 알림</div>
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`alert-item ${alert.type}`}>
                      <p>{alert.text}</p>
                      <span className="time">{alert.time}</span>
                    </div>
                  ))}
                </DropdownMenu>
              )}
            </DropdownWrapper>

            {/* 📍 관리 지점 선택 드롭다운 */}
            <DropdownWrapper>
              <FixedHeaderBtn
                onClick={() => {
                  setIsBranchOpen(!isBranchOpen);
                  setIsAlertOpen(false);
                }}
              >
                <span className="btn-text">{selectedBranch}</span>
                <span className="btn-arrow">▾</span>
              </FixedHeaderBtn>

              {isBranchOpen && (
                <DropdownMenu>
                  {branches.map((branch, idx) => (
                    <div
                      key={idx}
                      className={`sector-item ${selectedBranch === branch ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedBranch(branch);
                        setIsBranchOpen(false);
                      }}
                    >
                      {branch}
                    </div>
                  ))}
                </DropdownMenu>
              )}
            </DropdownWrapper>
          </div>
        </TopHeader>

        <ContentArea>
          <Outlet context={{ selectedBranch }} />
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
  min-width: 220px; /* 지점명이 길어질 수 있으니 너비를 좀 더 확보 */
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
  }

  .btn-arrow {
    margin-left: 0.5em;
    color: #94a3b8;
  }

  &.alert {
    min-width: 120px;
    justify-content: center;
  }
`;

// 드롭다운 UI 스타일
const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5em);
  right: 0;
  background-color: white;
  min-width: 220px;
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
    min-width: 320px; /* 알림 텍스트가 길어질 수 있으니 넓게 확보 */
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
      background-color: rgba(16, 185, 129, 0.05);
      color: var(--point-green);
      font-weight: 800;
    }
  }
`;
