# Seed Farm

AI 기반 스마트팜 자동 제어 및 관제 시스템입니다.  
환경 센서 데이터와 CCTV 기반 작물 이미지를 활용해 생육 상태를 분석하고, 이상 징후 발생 시 알림 및 장치 제어를 지원하는 관제 시스템입니다.

## 담당 역할
팀장 / 프론트엔드 / 스마트팜 관제 흐름 설계

- 팀 커뮤니케이션 및 일정 관리
- 회의 주도, 발표 자료 제작 및 프로젝트 방향성 정리
- 스마트팜 구조, 토마토 생육 환경, 기업형 스마트팜 사례 조사
- 환경 센서 데이터, CCTV 이미지, AI 분석 결과, 장치 제어 이력이 연결되는 시스템 흐름 정리
- 관리자 관점에서 필요한 대시보드, 데이터 분석, 장치 제어, 알림 페이지 구조 설계
- PC 기반 관리자 관제 화면 설계 및 프론트엔드 개발
- FastAPI 백엔드 API와 프론트엔드 화면 기능 연결
- 환경 데이터, 생육 데이터, 장치 상태, 알림 데이터를 화면에 표시
- 실제 DB 데이터 기반 UI 표시 및 더미 데이터 제거
- 시연용 실제 생육/환경 데이터 수집 및 DB 입력
- 최종 발표 흐름 정리 및 프로젝트 시연 주도

## Tech Stack

- Frontend: React, Vite, JavaScript, styled-components, Axios, Recharts
- Backend: FastAPI, Python
- Database: Oracle, MongoDB
- AI/ML: 이미지 기반 생육 상태 분석 모델 연동 구조 활용
- Tools: Git, GitHub, Figma, Notion, VS Code

## 프로젝트에서 중점적으로 해결한 문제

### 스마트팜 관제 흐름 설계

Seed Farm은 단순히 센서값을 보여주는 화면이 아니라, 환경 데이터 수집, CCTV 기반 생육 분석, AI 판단 결과, 알림, 장치 제어 이력이 하나의 흐름으로 연결되어야 하는 시스템입니다. 스마트팜 구조와 토마토 생육 환경을 조사하고, 관리자가 어떤 정보를 먼저 확인해야 하는지 기준을 잡아 PC 관제 화면의 흐름을 구성했습니다.

### 실제 DB 데이터 기반 화면 구성

초기 화면에는 임시 데이터와 더미 값이 섞여 있어 실제 데이터와 화면 표시값이 맞지 않는 문제가 있었습니다. Oracle DB에 시연용 환경 데이터와 생육 데이터를 직접 구성하고, FastAPI API 응답을 기준으로 프론트엔드 화면에 실제 데이터가 표시되도록 연동했습니다.

### 대시보드와 분석 페이지 데이터 일관성 개선

대시보드와 데이터 분석 페이지에서 생육 진행률, 성장 변화량, 환경 측정값이 서로 다르게 보이면 관리자가 시스템을 신뢰하기 어렵습니다. 같은 DB 데이터를 기준으로 화면이 구성되도록 데이터 흐름을 정리하고, 페이지 간 수치 기준이 일관되도록 개선했습니다.

### 관제 화면 UI/UX 개선

관리자는 많은 데이터를 한 번에 확인해야 하기 때문에 화면 구조가 복잡해지기 쉽습니다. 대시보드, 데이터 분석, 장치 제어, 알림 페이지를 기능별로 분리하고, 카드형 정보 배치와 그래프 구성을 통해 핵심 상태를 빠르게 확인할 수 있도록 화면을 구성했습니다.

## 프로젝트를 통해 배운 점

- 스마트팜 시스템에서는 단순한 데이터 표시보다 환경 데이터, 생육 데이터, AI 분석 결과, 제어 이력이 하나의 흐름으로 연결되는 것이 중요하다는 점을 배웠습니다.
- 프론트엔드 화면은 API 응답을 그대로 보여주는 것이 아니라, 관리자가 판단할 수 있는 형태로 데이터를 정리해야 한다는 것을 경험했습니다.
- 실제 DB 데이터를 기반으로 화면을 구성하면서 더미 데이터와 실제 데이터의 차이가 사용자 신뢰도에 큰 영향을 준다는 점을 체감했습니다.
- 팀장 역할을 수행하며 일정 관리, 기능 우선순위 조율, 팀원 간 커뮤니케이션의 중요성을 배웠습니다.

## Related Repositories

| 구분 | 저장소 |
|---|---|
| Frontend | 현재 저장소 |
| Backend | [SeedFarm_backend](https://github.com/55029564a-create/SeedFarm_backend) |
| AI / ML | [SeedFarm_ML](https://github.com/55029564a-create/SeedFarm_ML) |

---

# 🚀 프로젝트 로컬 환경 세팅 가이드

> **진행 환경**: VS Code 터미널 (Command Prompt 기준)

<br>

## 🎨 1. 프론트엔드 (Frontend)

1. **레포지토리 클론**

```bash
git clone https://github.com/55029564a-create/SeedFarm_frontend.git
```

2. **패키지 설치**  
   VS Code 터미널에서 설치 경로로 이동 후 아래 명령어를 실행합니다.

```bash
npm install
```

3. **작업 폴더로 이동**

```bash
cd frontend
```

4. **프로젝트 실행**

```bash
npm start
```

> 💡 **Tip:** 실행이 안 될 경우, `npm start`를 입력했던 경로에서 `npm install`을 다시 실행해 보세요.

<br>

## ⚙️ 2. 백엔드 (Backend)

1. **레포지토리 클론**

```bash
git clone https://github.com/55029564a-create/SeedFarm_backend.git
```

2. **가상환경 생성 및 실행**  
   VS Code 터미널에서 백엔드 설치 경로로 이동 후 가상환경을 세팅합니다.

```bash
python -m venv .venv
.venv\scripts\activate.bat
```

3. **요구 패키지 설치**

```bash
pip install -r requirements.txt
```

4. **FastAPI 서버 실행**

```bash
uvicorn app.main:app --reload
```

- 🔗 **Swagger UI 주소**: [http://localhost:8000/docs](http://localhost:8000/docs)

<br>

## 🗄️ 3. 데이터베이스 (Oracle DB)

### 📥 오라클 설치

- **버전**: Oracle Database 21c Express Edition for Windows (64-bit)
- **다운로드 링크**: [Oracle 공식 홈페이지](https://www.oracle.com/kr/database/technologies/xe-downloads.html)

### 👤 계정 및 권한 설정

CMD 창을 열고 아래 순서대로 명령어를 실행합니다.

1. **설치 및 접속 확인** *(1234는 설치 시 설정한 비밀번호)*

```bash
sqlplus system/1234@localhost:1521/XEPDB1
```

2. **계정 생성 및 권한 부여**  
   SQL 쉘 내부에서 실행합니다.

```sql
-- 계정 생성
CREATE USER smart1234 IDENTIFIED BY farm1234;

-- 기본 권한 부여
GRANT CONNECT, RESOURCE TO smart1234;

-- 테이블스페이스 사용 권한 부여
ALTER USER smart1234 QUOTA UNLIMITED ON USERS;

-- 생성 확인
SELECT username FROM dba_users;
```

### 🛠️ DB 테이블 초기화

프로젝트 루트 경로에서 아래 스크립트를 실행하여 테이블을 세팅합니다.

```bash
# 테이블 초기 생성
sqlplus smart1234/farm1234@localhost:1521/XEPDB1 @app/db_init_.sql

# 문제 발생 시 테이블 리셋
sqlplus smart1234/farm1234@localhost:1521/XEPDB1 @app/db_reset.sql
```

<br>

## 🤖 4. 머신러닝 (ML / AI)

### 🧠 AI 모델 1

1. **레포지토리 클론**

```bash
git clone https://github.com/55029564a-create/SeedFarm_ML.git
```

2. **가상환경 종료**  
   터미널 경로 앞에 `.venv`가 표시된 경우 실행합니다.

```bash
deactivate
```

3. **요구 패키지 설치 및 실행**

```bash
pip install -r requirements-api.txt
python -m serving
```

> 💡 **Tip:** 실행이 안 될 경우, `requirements-ml.txt`, `requirements-dev.txt` 등 다른 requirements 파일도 모두 설치한 후 다시 실행해 보세요.

### 🧠 AI 모델 2

1. **레포지토리 클론 및 브랜치 전환**

```bash
git clone https://github.com/55029564a-create/SeedFarm_ML.git
git checkout other
```

2. **가상환경 종료**  
   터미널 경로 앞에 `.venv`가 표시된 경우 실행합니다.

```bash
deactivate
```

3. **요구 패키지 설치 및 실행**

```bash
pip install -r requirements.txt
python run.py
```

<br>

## 🕹️ 5. 시뮬레이터 실행 (Simulator)

각 시뮬레이터는 백엔드 파일 내부의 해당 폴더로 이동(`cd`)한 후 실행합니다.

### 일반 시뮬레이터 실행

```bash
cd simulator
python simulator1.py
```

### 이미지(CCTV) 시뮬레이터 실행

```bash
cd cctv_simulator
python cctv_simulator.py
```
