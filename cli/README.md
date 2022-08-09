# Cli

## 설치

```
npm i -g @codepocket/cli
```

## 시작하기

### 준비사항

> 환경변수로 웹에서 발급받은 토큰정보를 넣어주세요

```
export POCKET_TOKEN=<token>
```

### help

```
pocket --help
```

### push

```
pocket push <파일경로> -n [파일명]
```

| 옵션       | 설명                                    | 예제                                     |
| ---------- | --------------------------------------- | ---------------------------------------- |
| -n, --name | 저장될 파일이름을 직접 지정할 수 있어요 | pocket push pocket.txt -n codepocket.txt |

### pull

```
pocket pull <작성자> <코드명> -p [저장경로]
```

| 옵션       | 설명                                       | 예제                                                |
| ---------- | ------------------------------------------ | --------------------------------------------------- |
| -p, --path | 파일이 저장될 경로를 직접 지정할 수 있어요 | pocket pull author code.txt ./pocket/codepocket.txt |

### list

```
pocket list -a [작성자] -f [파일명]
```

| 옵션           | 설명                                             | 예제                  |
| -------------- | ------------------------------------------------ | --------------------- |
| -a, --author   | 입력된 작성자 이름으로 리스트를 조회할 수 있어요 | pocket list -a author |
| -f, --fileName | 입력된 파일명 이름으로 리스트를 조회할 수 있어요 | pocket list -f code   |

### delete

```
pocket delete <코드명>
```
