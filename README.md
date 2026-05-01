# Seed Farm

AI 기반 스마트팜 자동 제어 및 관제 시스템입니다.  
환경 센서 데이터와 CCTV 기반 작물 이미지를 활용해 생육 상태를 분석하고, 이상 징후 발생 시 알림 및 장치 제어를 지원하는 관제 시스템입니다.

## My Role

팀장 / 프론트엔드 / 기획 및 시스템 구조 설계

- 팀 커뮤니케이션 및 일정 관리
- 회의 주도, 발표 자료 제작 및 프로젝트 방향성 정리
- 스마트팜 구조, 토마토 생육 환경, 기업형 스마트팜 사례 조사
- PC 기반 관리자 관제 화면 설계 및 프론트엔드 개발
- 백엔드 API와 프론트엔드 화면 기능 연결
- 실제 DB 데이터 기반 UI 표시 및 더미 데이터 제거
- 시연용 실제 데이터 수집 및 DB 입력

## Tech Stack

- Frontend: React, Vite, JavaScript, styled-components, Axios, Recharts
- Backend: FastAPI, Python
- Database: Oracle, MongoDB
- AI/ML: 이미지 기반 생육 상태 분석 모델 연동 구조 활용
- Tools: Git, GitHub, Figma, Notion, VS Code

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
