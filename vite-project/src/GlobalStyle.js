import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
* {
    box-sizing: border-box;
    font-family: inherit;
  }

  :root {
    --bg-color: #F5F7F6;     /* 연회색 배경 */
    --primary-dark: #0F172A; /* 딥 네이비 */
    --point-green: #2E7D32;  /* 다크 그린 */
    --light-green: #66BB6A;  /* 리프 그린 */
    --teal: #00C2A8;         /* 틸/아쿠아 */
    --white: #FFFFFF;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    font-family: 'Pretendard', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--primary-dark);
  }
  
    

    html {
    scroll-behavior: smooth;
  }
    input, button, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;
