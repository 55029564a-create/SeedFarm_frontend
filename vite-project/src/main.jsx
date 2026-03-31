import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import styled from 'styled-components';

const box = styled.div`
  margin: 0;
  padding: 0;
`;
createRoot(document.getElementById('root')).render(<App />);
