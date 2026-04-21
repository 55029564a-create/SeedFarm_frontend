import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // 🚨 1. 페이지 이동을 위한 훅 추가!
import { PageContainer } from './Styles/AdminShared';
import { login } from "../../Api/auth";

const LoginPage = () => {
  const navigate = useNavigate(); // 🚨 2. 네비게이트 함수 초기화!

  // 로그인 폼 상태 관리
  const [loginInputs, setLoginInputs] = useState({ id: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prev) => ({ ...prev, [name]: value }));
  };

  // 🚨 3. 폼 제출 핸들러 (가짜 로그인 & 페이지 이동 로직 추가!)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginInputs.id || !loginInputs.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 🔥 백엔드 로그인 호출
      const token = await login({
        email: loginInputs.id, // 백엔드가 email로 받음
        password: loginInputs.password,
      });

      // 토큰 저장
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);

      if (rememberMe) {
        localStorage.setItem('savedId', loginInputs.id);
      }

      console.log("로그인 성공");

      const isField = window.innerWidth <= 1024;
      navigate(isField ? '/field' : '/dashboard');

    } catch (err) {
      console.error(err);
      alert('로그인 실패: 아이디 또는 비밀번호 확인');
    }
  };

  return (
    <LoginWrapper>
      <LoginBox>
        <div className="logo-area">
          <div className="icon-wrapper">
            <span className="icon">🌱</span>
          </div>
          <h1 className="brand">Seed Farm</h1>
          <p className="subtitle">AI Smart Farm Control Center</p>
        </div>

        <FormArea onSubmit={handleSubmit}>
          <InputGroup>
            <label>ADMIN ID</label>
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="id"
                value={loginInputs.id}
                onChange={handleInputChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
          </InputGroup>

          <InputGroup>
            <label>PASSWORD</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                value={loginInputs.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
          </InputGroup>

          <div className="options">
            <label className="remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span>아이디 저장</span>
            </label>
          </div>

          <LoginButton type="submit">
            Access Control Panel
            <span className="arrow">→</span>
          </LoginButton>
        </FormArea>

        <SystemStatus>
          <span className="status-dot"></span>
          All systems online and operational
        </SystemStatus>
      </LoginBox>
    </LoginWrapper>
  );
};

export default LoginPage;

// --- 스타일 컴포넌트 ---

const LoginWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f1f5f9;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;

  padding: 24px;

  @media (max-width: 640px) {
    padding: 16px;
    align-items: center;
  }
`;

const LoginBox = styled.div`
  background: #ffffff;
  padding: 48px;
  border-radius: 24px;
  box-shadow:
    0 20px 40px -10px rgba(15, 23, 42, 0.1),
    0 0 0 1px rgba(226, 232, 240, 0.8);
  width: min(440px, 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 40px 32px;
    border-radius: 22px;
  }

  @media (max-width: 640px) {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.25em;

    .icon-wrapper {
      width: 4em;
      height: 4em;
      background: #f0fdf4;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1em;
      border: 1px solid #bbf7d0;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.1);

      .icon {
        font-size: 2em;
      }
    }

    .brand {
      font-size: 1.8em;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 0.2em 0;
      letter-spacing: -0.03em;

      @media (max-width: 640px) {
        font-size: 1.55em;
      }
    }

    .subtitle {
      font-size: 0.9em;
      font-weight: 700;
      color: #64748b;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: center;

      @media (max-width: 640px) {
        font-size: 0.78em;
        line-height: 1.5;
      }
    }
  }
`;
const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2em;

  .options {
    display: flex;
    align-items: center;
    margin-top: -0.5em;
    margin-bottom: 1em;
    .remember {
      display: flex;
      align-items: center;
      gap: 0.5em;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 700;
      color: #64748b;
      input {
        display: none;
      }
      .checkmark {
        width: 16px;
        height: 16px;
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        position: relative;
        transition: 0.2s;
      }
      input:checked + .checkmark {
        background: #10b981;
        border-color: #10b981;
      }
      input:checked + .checkmark::after {
        content: '✔';
        position: absolute;
        color: white;
        font-size: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  label {
    font-size: 0.75em;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;

    .input-icon {
      position: absolute;
      left: 1em;
      font-size: 1.1em;
      color: #64748b;
      filter: grayscale(100%);
      z-index: 1;
    }

    input {
      width: 100%;
      padding: 1em 1em 1em 3em;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      font-size: 0.95em;
      font-weight: 700;
      color: #0f172a;
      transition: all 0.2s;

      &::placeholder {
        color: #94a3b8;
        font-weight: 600;
      }

      &:focus {
        background: #ffffff;
        border-color: #10b981;
        outline: none;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
      }

      @media (max-width: 640px) {
        font-size: 16px;
        padding: 0.95em 1em 0.95em 2.9em;
      }
    }
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: none;
  padding: 1.2em;
  border-radius: 12px;
  font-size: 1em;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  .arrow {
    font-size: 1.2em;
    transition: transform 0.2s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -5px rgba(16, 185, 129, 0.4);

    .arrow {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  @media (max-width: 640px) {
    padding: 1em;
    font-size: 0.95em;
  }
`;

const SystemStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-top: 2.5em;
  font-size: 0.75em;
  font-weight: 700;
  color: #94a3b8;

  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
`;
