# 기여 문서

### Yarn berry 사용하기

yarn의 버전을 아래 명령어를 사용해서 맞춰주세요

```
yarn set version 3.2.1
```

### .env 작성하기

아래와 같이 .env파일을 만들어주세요!(뒤에 !가 들어가있는 부분은 직접 값을 넣어주셔야해요)

```
VITE_BASE_SERVER_URL=http://0.0.0.0:8080
VITE_AUTH0_DOMAIN=AUTO0 도메인!
VITE_AUTH0_CLIENT_ID=AUTH0 클라이언트 아이디!
VITE_EMAIL_DOMAIN_NAME=*

SLACK_BOT_TOKEN_PROD=슬랙 봇 토큰!

CODEPOCKET_CHANNEL_ID=코드 알림이 올라올 슬랙 채널 아이디!

CHAPTER_FRONTED_CHANNEL_ID=코드가 올라올 슬랙 채널 아이디!

MONGO_DB_URI=mongodb://root:example@localhost:27017

MONGO_DB_NAME=codepocket

BASE_SERVER_URL=http://0.0.0.0:8080
```

### Codepocket 구동하기

Codepocket은 docker compose파일을 제공하고 있음으로 쉽게 동작시켜 볼 수 있어요.

Docker Desktop을 설치해주고 아래 명령어를 실행시키면 쉽게 Codepocket을 동작시킬 수 있어요!

```
docker compose up -d
```
