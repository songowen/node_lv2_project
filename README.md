# 환경변수

JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoxMjM0LCJpYXQiOjE3MDAyMDkyMTd9.63y7pU96VoZG1ZpN_3wOjjGgFCNRoadSogmPQwzAOyM"

DEVELOPMENT_USERNAME="root"
DEVELOPMENT_PASSWORD="root1234"
DEVELOPMENT_DATABASE="expressdb_"
DEVELOPMENT_HOST="express-database.cuwlbtxeri52.ap-northeast-2.rds.amazonaws.com"
DEVELOPMENT_DIALECT="mysql"

TEST_USERNAME="root"
TEST_PASSWORD=null
TEST_DATABASE="database_test"
TEST_HOST="127.0.0.1",
TEST_DIALECT="mysql"

PRODUCTION_USERNAME="root",
PRODUCTION_PASSWORD=null,
PRODUCTION_DATABASE="database_production"
PRODUCTION_HOST="127.0.0.1",
PRODUCTION_DIALECT="mysql"



# API 명세서 URL

- https://docs.google.com/spreadsheets/d/1bYIASSnETf51Df2haTpGBTZ95Dt8Af-9AGWrZN7veJw/edit?usp=sharing

# ERD URL

- https://www.erdcloud.com/d/QfHg8YC2opc7iujLR
# 더 고민해 보기

1. **암호화 방식**
- 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 `단방향 암호화`와 `양방향 암호화` 중 어떤 암호화 방식에 해당할까요?
=>비밀번호를 해싱해서 db에 저장하는 것은 '단방향 암호화'에 해당합니다. 단방향 해시함수는 입력값을 고정된 크기의 출력 값으로 변환하는 데 사용하며 원래 값을 추론하기 어렵습니다. 
- 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
=>해싱하여 저장하면 해시된 값만 저장되므로 원본 비밀번호가 노출되지 않고 데이터 유출시 비밀번호 보안에 유리합니다.

2. **인증 방식**
- JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
=>Access Token이 노출되면 보안에 취약해집니다. 
- 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
=> 토큰의 유효기간을 짧게 설정하고 https를 통해 통신하는 방법 등으로 보안을 강화할 수 있습니다.

3. **인증과 인가**
- 인증과 인가가 무엇인지 각각 설명해 주세요.
=>인증(Authentication)은 사용자가 자신이 주장하는 대로 자신의 신원을 입증하는 것입니다. 예를 들어 로그인하여 사용자가 누구인지 확인하는 것입니다.
인가(Authorization)는 인증된 사용자에게 권한을 부여하는 것입니다. 특정자원이나 기능에 접근할 수 있는 권한을 부여받습니다.

- 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
=>과제에서 구현한 Middleware는 인증에 해당합니다. 신원을 확인받고 로그인을 하는 것이 그 예입니다.

4. **Http Status Code**
- 과제를 진행하면서 `사용한 Http Status Code`를 모두 나열하고, 각각이 `의미하는 것`과 `어떤 상황에 사용`했는지 작성해 주세요.
200 OK: 성공적으로 요청이 처리됨.
404 Not Found: 요청한 리소스를 찾을 수 없음.
500 Internal Server Error: 서버에 오류가 발생함.


5. **리팩토링**
- MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?
=> DB를 변경하면서 데이터베이스 쿼리 및 연결부분에서 주로 변경이 있었습니다. 

- 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.
=> 데이터베이스 종속성을 최소화하는 것이 좋습니다.

6. **서버 장애 복구**
- 현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?
(Hint: PM2에서 제공하는 기능 중 하나입니다.)
=> PM2의 startup hook을 사용해서 서버가 자동으로 시작되도록 설정합니다.

7. **개발 환경**
- nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?
=> nodemon은 코드 변경을 감지하고 자동으로 서버를 다시 시작하게 해줍니다. 개발 중에 코드를 수정하면 서버를 매번 수동으로 일일히 재시작해줄 필요가 없이 자동으로 재시작합니다.

- npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?
=> 글로벌은 시스템 전역에 사용되고, 개발용은 프로젝트 개발 단꼐에서만 필요한 패키지라 개발 의존성으로만 관리됩니다. 즉, nodemon은 개발용으로 설치해야합니다.