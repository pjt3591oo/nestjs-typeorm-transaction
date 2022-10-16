# 데이터베이스 

### 컨테이너 생성

```sh
$ docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name=db.mysql.com mysql:5.7 --character-set-server=utf8 --collation-server=utf8_general_ci;
```

### 데이터베이스 생성

```sh
$ docker exec -it db.mysql.com /bin/bash

$ mysql -u root -ppassword

mysql> CREATE DATABASE test;
```

### 환경변수 설정

.env

```
NODE_ENV=test
PORT=3306
HOST=localhost
USERNAME=root
PASSWORD=password
DATABASE=test
SYNCHRONIZE=true
LOGGING=true
```

# App

### User

기본 Repository 이용 -> 개별적으로 트랜잭션 방생

### Post

기본 Repository 이용 -> 개별적으로 트랜잭션 방생

### Order

기본 repository 이용

쿼리러너 이용

dataSource.transaction 이용


