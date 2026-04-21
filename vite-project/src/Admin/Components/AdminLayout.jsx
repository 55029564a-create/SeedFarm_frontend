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

  // 🚨 지점 명칭을 같은 건물 내 '동(방)' 개념으로 완벽 동기화
  const branches = [
    'A동 (표준 생육실)',
    'B동 (성장 지연실)',
    'C동 (성장 촉진실)',
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  // 🔔 알림 내용도 동 개념에 맞게 보강
  const alerts = [
    {
      id: 1,
      type: 'warning',
      text: 'B동: 내부 온도 임계치(18°C) 미달 지속. 난방 점검 필요.',
      time: '10분 전',
    },
    {
      id: 2,
      type: 'action',
      text: 'C동: 습도 최적화를 위한 환기 팬 자동 가동',
      time: '1시간 전',
    },
    {
      id: 3,
      type: 'normal',
      text: '전 구역: 주간 생육 리포트 및 AI 편차 분석 완료',
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

          {/* 🚨 버튼들의 수직 중앙 정렬을 위해 alignItems: 'center' 추가 */}
          <div
            className="header-actions"
            style={{ display: 'flex', gap: '1em', alignItems: 'center' }}
          >
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
          {/* 선택된 동(방) 정보를 자식 컴포넌트(DataAnalysisPage)로 전달 */}
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

// 🚀 높이 단차 해결: 42px로 강제 고정 및 패딩 밸런스 조절
const FixedHeaderBtn = styled(HeaderBtn)`
  min-width: 220px;
  height: 42px; /* 🚨 알림 버튼과 드롭다운 높이 칼각 일치 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.2em;
  box-sizing: border-box;
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
    min-width: 320px;
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
