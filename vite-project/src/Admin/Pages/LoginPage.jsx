import React from 'react';
import styled from 'styled-components';
import { PageContainer } from './Styles/AdminShared'; // 우리가 만든 67% 스케일링 껍데기

const LoginPage = () => {
  return (
    // 🚨 PageContainer를 쓰되, 가운데 정렬을 덮어씌운 LoginWrapper를 사용합니다.
    <LoginWrapper>
      <LoginBox>
        <div className="logo">🌱 Seed Farm</div>
        <h2 className="title">Admin Login</h2>

        <InputGroup>
          <label>ID</label>
          <input type="text" placeholder="아이디를 입력하세요" />
        </InputGroup>

        <InputGroup>
          <label>Password</label>
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </InputGroup>

        <LoginButton>로그인</LoginButton>
      </LoginBox>
    </LoginWrapper>
  );
};

export default LoginPage;

// --- Styled Components ---

// 💡 핵심: 기존 PageContainer의 속성을 그대로 물려받으면서 가운데 정렬만 추가!
const LoginWrapper = styled(PageContainer)`
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const LoginBox = styled.div`
  background: var(--white);
  padding: 3em 2.5em; /* 🚨 rem 대신 em을 써서 1280 화면에선 같이 줄어들게! */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  width: 400px;
  max-width: 90%; /* 화면이 너무 좁아질 때 방어 */
  display: flex;
  flex-direction: column;

  /* 1280 모니터(67% 축소)에 대응하는 반응형 크기 조절 */
  @media (max-width: 1280px) {
    width: 266px; /* 400px의 67% */
  }

  .logo {
    text-align: center;
    font-size: 1.8em;
    font-weight: 800;
    color: var(--point-green);
    margin-bottom: 0.5em;
  }

  .title {
    text-align: center;
    font-size: 1.2em;
    color: var(--primary-dark);
    margin-bottom: 2em;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;

  label {
    font-size: 0.9em;
    font-weight: 600;
    color: var(--primary-dark);
    margin-bottom: 0.4em;
  }

  input {
    padding: 0.8em 1em;
    border: 1px solid #dde7df;
    border-radius: 10px;
    font-size: 1em;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: var(--point-green);
    }
  }
`;

const LoginButton = styled.button`
  margin-top: 1em;
  padding: 1em;
  background-color: var(--point-green);
  color: var(--white);
  font-size: 1.1em;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #236026;
    transform: translateY(-2px);
  }
`;
