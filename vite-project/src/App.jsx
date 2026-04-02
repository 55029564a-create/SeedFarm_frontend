import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import AdminPage from './Admin/Pages/AdminPage';
import FieldPage from './Field/Pages/FieldPage';
import LandingPage from './Landing/Pages/LandingPage';
import GlobalStyle from './GlobalStyle';
import LoginPage from './Admin/Pages/LoginPage';

// 접속한 디바이스의 화면 크기를 기반으로 페이지 이동됨. 1024 이상 PC 이하 태블릿, 모바일 페이지로 이동
// 페이지 다 만들고 주석 풀기.
// import { useDevice } from './hooks/useDevice';
// const DashboardRouter = () => {
//   const { isDesktop } = useDevice();

//   return isDesktop ? <AdminPage /> : <FieldPage />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Field" element={<FieldPage />} />
        {/* 위에 동일. */}
        {/* <Route path="/dashboard" element={<DashboardRouter />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
