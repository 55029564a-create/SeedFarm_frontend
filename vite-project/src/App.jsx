import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import AdminPage from './Admin/Pages/AdminPage';
import LandingPage from './Landing/Pages/LandingPage';
import GlobalStyle from './GlobalStyle';
import LoginPage from './Admin/Pages/LoginPage';
import DashboardPage from './Admin/Pages/DashBoardPage';
import CctvPage from './Admin/Pages/CctvPage';
import DeviceControlPage from './Admin/Pages/DeviceControlPage';
import DataAnalysisPage from './Admin/Pages/DataAnalysisPage';
import TMHomePage from './Field/Pages/TMHomePage';
import ControlPage from './Field/Pages/ControlPage';
import CameraPage from './Field/Pages/CameraPage';
import AlertsPage from './Field/Pages/AlertsPage';

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
          {/* <Route path="/Admin" element={<AdminPage />} /> */}

          {/* 태블릿, 모바일 전용~ */}
          <Route path="/field" element={<TMHomePage />} />
          <Route path="/field/Camera" element={<CameraPage />} />
          <Route path="/field/Control" element={<ControlPage />} />
          <Route path="/field/Alerts" element={<AlertsPage />} />

          {/* git push  */}

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
