import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api/", // FastAPI 서버
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = localStorage.getItem("refresh_token");

        const res = await client.post("/auth/refresh", {
          refresh_token,
        });

        localStorage.setItem("access_token", res.data.access_token);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization =
          `Bearer ${res.data.access_token}`;

        return client(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default client;