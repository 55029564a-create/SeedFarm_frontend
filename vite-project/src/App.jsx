import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminPage from './Admin/Pages/AdminPage';
// import FieldPage from './Field/Pages/FieldPage';
import LandingPage from './Landing/Pages/LandingPage';
import GlobalStyle from './GlobalStyle';
import LoginPage from './Admin/Pages/LoginPage';
import DashboardPage from './Admin/Pages/DashBoardPage';
import CctvPage from './Admin/Pages/CctvPage';
import DeviceControlPage from './Admin/Pages/DeviceControlPage';
import DataAnalysisPage from './Admin/Pages/DataAnalysisPage';

// 🚨 경로 주의: App.jsx가 src 폴더에 있다면 아래 경로가 맞습니다.
import AdminLayout from './Admin/Components/AdminLayout';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Admin" element={<AdminPage />} />
          {/* <Route path="/Field" element={<FieldPage />} /> */}

          {/* 🚨 AdminLayout으로 껍데기 씌우기 */}
          <Route element={<AdminLayout />}>
            <Route path="/DashBoard" element={<DashboardPage />} />
            <Route path="/cctv" element={<CctvPage />} />
            <Route path="/Device" element={<DeviceControlPage />} />
            <Route path="/Analysis" element={<DataAnalysisPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
