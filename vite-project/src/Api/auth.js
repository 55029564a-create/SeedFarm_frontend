// src/api/auth.js
import client from "./client";

// 회원가입
export const signup = async (data) => {
  const res = await client.post("auth/signup", data);
  return res.data;
};

// 로그인
export const login = async (data) => {
  const res = await client.post("auth/login", data);
  return res.data;
};

// 토큰 재발급
export const refreshToken = async (refresh_token) => {
  const res = await client.post("auth/refresh", {
    refresh_token,
  });
  return res.data;
};