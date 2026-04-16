import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  :root {
    --bg-color: #F5F7F6;
    --primary-dark: #0F172A;
    --point-green: #2E7D32;
    --light-green: #66BB6A;
    --teal: #00C2A8;
    --white: #FFFFFF;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    font-family: 'Pretendard', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--primary-dark);
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
  }

  input, button, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;
