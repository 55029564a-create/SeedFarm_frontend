import c1 from '../image/cctv1.png';
import c2 from '../image/cctv2.png';
import c3 from '../image/cctv3.png';
import fallback from '../image/fallback.jpg';

export const FALLBACK_IMAGE = fallback;

export const sectors = [
  { id: 'sec_1', name: '1구역 (토마토 A동)' },
  { id: 'sec_2', name: '2구역 (토마토 B동)' },
  { id: 'sec_3', name: '3구역 (육묘장)' },
];

export const cameras = [
  {
    id: 'c_1',
    sectorId: 'sec_1',
    name: 'A블록 - 상단 (작물 생육부)',
    status: 'Live',
    image: c1,
    updatedAt: '방금 전',
  },
  {
    id: 'c_2',
    sectorId: 'sec_1',
    name: 'A블록 - 하단 (근권부)',
    status: 'Live',
    image: c2,
    updatedAt: '방금 전',
  },
  {
    id: 'c_3',
    sectorId: 'sec_1',
    name: 'B블록 - 중앙 통로',
    status: 'Live',
    image: c3,
    updatedAt: '1분 전',
  },
  {
    id: 'c_4',
    sectorId: 'sec_2',
    name: 'A블록 - 전체 전경',
    status: 'Warning',
    image: fallback,
    updatedAt: '2분 전',
  },
  {
    id: 'c_5',
    sectorId: 'sec_2',
    name: 'B블록 - 측면 관측',
    status: 'Warning',
    image: fallback,
    updatedAt: '3분 전',
  },
  {
    id: 'c_6',
    sectorId: 'sec_3',
    name: '발아실 내부',
    status: 'Warning',
    image: fallback,
    updatedAt: '2분 전',
  },
];

export const branchCameraMap = {
  'A동 (표준 생육실)': 'c_1',
  'B동 (성장 지연실)': 'c_4',
  'C동 (성장 촉진실)': 'c_6',
};

export const getCameraByBranch = (branch) => {
  const targetId = branchCameraMap[branch];
  return cameras.find((cam) => cam.id === targetId) || cameras[0];
};
