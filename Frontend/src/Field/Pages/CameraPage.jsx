import styled from "styled-components";
import FieldPageShell from "../Components/FieldPageShell";
import { FIELD_CAMERA_STREAM_URL } from "../fieldConfig";

export default function CameraPage() {
  return (
    <FieldPageShell title="Camera" rightText="LIVE">
      <PageGrid>
        <CameraSection>
          <CameraBox>
            <div className="live">🔴 LIVE</div>
            <div className="screen">
              {FIELD_CAMERA_STREAM_URL ? (
                <iframe src={FIELD_CAMERA_STREAM_URL} title="field-camera" />
              ) : (
                <span>카메라 스트림 URL이 설정되지 않았습니다.</span>
              )}
            </div>
          </CameraBox>

          <ControlRow>
            <CamButton>좌측 이동</CamButton>
            <CamButton>우측 이동</CamButton>
            <CamButton>줌인</CamButton>
            <CamButton>줌아웃</CamButton>
          </ControlRow>
        </CameraSection>
        <Caption>
          카메라 페이지는 PTZ 조작 중심으로 구성했습니다. (AI summary/백엔드 연동 없음)
        </Caption>
      </PageGrid>
    </FieldPageShell>
  );
}

const PageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const CameraSection = styled.section``;

const CameraBox = styled.div`
  position: relative;
  height: 220px;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;

  .screen {
    width: 100%;
    height: 100%;
    background: #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    font-weight: 800;
    font-size: 16px;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .live {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(17, 24, 39, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    z-index: 2;
  }

  @media (min-width: 768px) {
    height: 360px;
  }
`;

const ControlRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CamButton = styled.button`
  height: 46px;
  border-radius: 14px;
  background: #ffffff;
  color: #111827;
  font-weight: 800;
`;

const Caption = styled.p`
  font-size: 13px;
  color: #6b7280;
`;
