# API 문서

### 1. User

**1.1 유저 생성 `POST` /user**

- Request

  - URL: /user
  - Method: `POST`
  - Body
    ```json
    {
      "userName": "string",
      "email": "string"
    }
    ```

- Response
  ```json
  {
    "pocketToken": "string",
    "message": "string",
    "userId": "string"
  }
  ```
- 특이사항
  - CreateUser Schema
  - 웹에서 사용

**1.2 유저 인증 `POST` /user/auth**

- Request

  - URL: /user/auth
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "userName": "string",
    "validUser": "boolean"
  }
  ```
- 특이사항
  - VerifyUser Schema
  - 웹에서 사용

### 2. Code

**2.1 코드 삭제 `POST` /code/delete**

- Request

  - URL: /code/delete
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeName": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - DeleteCode Schema
  - cli에서 사용

**2.2 코드 아아디로 삭제 `POST` /code/delete/id**

- Request

  - URL: /code/delete/id
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeId": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - DeleteCodeById Schema
  - 웹에서 사용

**2.3 코드만 가져오기 `GET` /code**

- Request

  - URL: /code
  - Method: `GET`
  - Query
    ```json
    {
      "codeAuthor": "string",
      "codeName": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "code": "string"
  }
  ```
- 특이사항
  - PullCode Schema
  - cli에서 사용

**2.4 코드 저자들 가져오기 `GET` /code/authors**

- Request

  - URL: /code/authors
  - Method: `GET`
  - Query
    ```json
    {
      "codeName": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "codeAuthors": {
      "codeAuthor": "string",
      "isAnonymous": "boolean"
    }[]
  }
  ```
- 특이사항
  - GetCodeAuthors Schema
  - cli에서 사용

**2.5 코드 리스트 가져오기 `GET` /code/list**

- Request

  - URL: /code/list
  - Method: `GET`
  - Query
    ```json
    {
      "codeAuthor": "string",
      "codeName": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "codeInfos": {
      "codeName": "string",
      "codeAuthor": "string",
      "isAnonymous": "boolean"
    }[]
  }
  ```
- 특이사항
  - GetCodeNames Schema
  - cli에서 사용

**2.6 코드 아이디로 코드 가져오기 `GET` /code/id**

- Request

  - URL: /code/id
  - Method: `GET`
  - Query
    ```json
    {
      "codeId": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "codeAuthor": "string",
    "codeName": "string",
    "code": "string",
    "isAnonymous": "string"
  }
  ```
- 특이사항
  - GetCode Schema
  - 웹에서 사용

**2.7 코드들 가져오기(pagination) `GET` /codes**

- Request

  - URL: /codes
  - Method: `GET`
  - Query
    ```json
    {
      "search": "string",
      "offset": "string",
      "limit": "string"
    }
    ```

- Response
  ```json
  {
    "isLast": "boolean",
    "message": "string",
    "codes": {
      "codeId": "string",
      "code": "string",
      "codeAuthor": "string",
      "codeName": "string",
      "userId": "string",
      "createdAt": "date",
      "updatedAt": "date",
      "isAnonymous": "boolean"
    }[]
  }
  ```
- 특이사항
  - GetCodes Schema
  - 웹에서 사용

**2.8 코드 삽입/수정 `POST` /code**

- Request

  - URL: /code
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeName": "string",
      "code": "string",
      "isAnonymous": "boolean"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - PushCode Schema
  - cli에서 사용

**2.9 코드 생성 `POST` /code/create**

- Request

  - URL: /code/create
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeName": "string",
      "code": "string",
      "isAnonymous": "boolean"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - CreateCode Schema
  - 웹에서 사용

**2.10 코드 수정 `PUT` /code/update**

- Request

  - URL: /code/update
  - Method: `PUT`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeName": "string",
      "code": "string",
      "codeId": "string",
      "isAnonymous": "boolean"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - UpdateCode Schema
  - 웹에서 사용

### 3. Story

**3.1 스토리 생성 `POST` /story**

- Request

  - URL: /story
  - Method: `POST`
  - Body
    ```json
    {
      "pocketToken": "string",
      "codeId": "string",
      "storyName": "string",
      "codes": { "type": "object", "properties": "string" }
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "storyId": "string"
  }
  ```
- 특이사항
  - CreateStory Schema
  - 웹에서 사용

**3.2 스토리 삭제 `DELETE` /story**

- Request

  - URL: /story
  - Method: `DELETE`
  - Body
    ```json
    {
      "codeId": "string",
      "storyName": "string",
      "storyAuthor": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - DeleteStory Schema
  - 웹에서 사용

**3.3 스토리 수정 `PUT` /story**

- Request

  - URL: /story
  - Method: `PUT`
  - Body
    ```json
    {
      "storyId": "string",
      "codes": { "type": "object", "properties": "string" }
    }
    ```

- Response
  ```json
  {
    "message": "string"
  }
  ```
- 특이사항
  - UpdateStory Schema
  - 웹에서 사용

**3.4 스토리 코드 가져오기 `GET` /story/code**

- Request

  - URL: /story/code
  - Method: `GET`
  - Body
    ```json
    {
      "storyId": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "codes": { "type": "object", "properties": "string" }
  }
  ```
- 특이사항
  - GetStoryCode Schema
  - 웹에서 사용

**3.5 스토리 이름들 가져오기 `GET` /story/names**

- Request

  - URL: /story/names
  - Method: `GET`
  - Body
    ```json
    {
      "codeId": "string"
    }
    ```

- Response
  ```json
  {
    "message": "string",
    "storyNames": {
      "storyName": "string",
      "storyId": "string",
      "userId": "string",
    }[]
  }
  ```
- 특이사항
  - GetStoryNames Schema
  - 웹에서 사용
