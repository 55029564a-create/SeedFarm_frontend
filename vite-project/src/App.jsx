import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import AdminPage from './Admin/Pages/AdminPage';
import FieldPage from './Field/Pages/FieldPage';
import LandingPage from './Landing/Pages/LandingPage';

const Base = styled.div`
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <Base>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/field" element={<FieldPage />} />
        </Routes>
      </BrowserRouter>
    </Base>
  );
}

export default App;
