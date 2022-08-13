# @codepocket/core-server

> **@codepocket/server**의 핵심 로직을 담당하고 있어요.

- 디비와 api통신에 관련된 부분들은 완전히 제외하고, 의존성 주입(DI)을 통해 필요한 함수들을 주입받고 있어요.
  - slack api를 사용자의 선택에 따라 제공할 수 있어요.
- 현재 fastify/mongodb로 구성된 server를 다른 기술스택으로 바꿀 때 사용할 수 있어요.
- connector함수는 api들에서 중복이 많은 함수나 설정값들을 받고, core로직들을 반환해주어요.
