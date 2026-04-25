import client from "./client";

/**
 * 📦 디바이스 상태 조회
 */
export const getDeviceState = async (batchId) => {
  const res = await client.get(`/control/device-state/${batchId}`);
  return res.data;
};

/**
 * 🔁 모드 변경 (auto / manual)
 */
export const setDeviceMode = async (batchId, device, mode) => {
  const res = await client.post(`/control/device/mode/${batchId}`, {
    device,
    mode,
  });
  return res.data;
};

/**
 * 🎛 목표값 설정 (manual 전용)
 */
export const setDeviceTarget = async (batchId, device, value) => {
  const res = await client.post(`/control/device/target/${batchId}`, {
    device,
    value,
  });
  return res.data;
};

/**
 * 🚨 긴급 정지 ON
 */
export const stopDevice = async (batchId, device) => {
  const res = await client.post(
    `/control/emergency/${batchId}/${device}`,
    null,
    { params: { is_stop: true } }
  );
  return res.data;
};


/**
 * 🔄 긴급 정지 해제
 */
export const releaseDevice = async (batchId, device) => {
  const res = await client.post(
    `/control/emergency/${batchId}/${device}`,
    null,
    { params: { is_stop: false } }
  );
  return res.data;
};


/**
 * 📜 액션 로그 조회
 */
export const getControlLogs = async (batchId) => {
  const res = await client.get(`/control/logs/${batchId}`);
  return res.data;
};