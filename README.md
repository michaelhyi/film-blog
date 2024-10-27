<div align="center">
    <h2>Film Blog</h2>
    <a href="https://film.michael-yi.com/">Website</a>
</div>

<hr/>

## About 

This repository contains the source code to a film blog I started last year. It is a platform where I can explore my passion for movies and write for fun. 

Though not my most "impressive" project, it's my favorite one to have worked on thus far. I have put several hundred commits into this project, all while experimenting with different technologies and learning along the way.

Source code has been moved here on October 25th, 2024. It was preivously part of my personal website's respository.

## Development

<details>
    <summary>Getting Started</summary>

### Getting Started

#### Pre-Requisites

- Gradle
- MySQL
- Redis 
- Node

1. Setup environment variables.

```bash
export ADMIN_PW=<your-admin-password>
export JWT_SECRET_KEY=<your-jwt-secret-key>
```

> Set `ADMIN_PW` equal to a secure, hashed password. Generate one using openssl or any password manager, and then hash it using Spring Security's `BCryptPasswordEncoder`.
> To generate a JWT secret key, use openssl rand -base64 512.

2. Create a MySQL database.

> Create a new database called `film_blog`. Make sure that your MySQL master username and password are both set to root.

3. Install dependencies and run projects.

> Open three terminal instances. Follow the below code blocks to run each app.

```bash
cd backend/java
./gradlew bootRun
```

```bash
cd frontend/admin 
npm i
npm start
```

```bash
cd frontend/main
npm i
npm start
```
</details>

## Testing

<details>
        <summary>Unit Tests</summary>

### Unit Tests

<details>
    <summary>Auth Package</summary>

- [x] AuthService.java
    - [x] willThrowLoginWhenWrongPassword
    - [x] canLogin
    - [x] willThrowValidateTokenWhenTokenIsMalformed
    - [x] willThrowValidateTokenWhenTokenIsUnauthorized
    - [x] canValidateToken
- [x] AuthUtil.java
    - [x] willReturnFalseDuringIsAuthHeaderValidWhenHeaderIsNull
    - [x] willReturnFalseDuringIsAuthHeaderValidWhenHeaderIsBlank
    - [x] willReturnFalseDuringIsAuthHeaderValidWhenHeaderIsEmpty
    - [x] willReturnFalseDuringIsAuthHeaderValidWhenHeaderStartsWithWrongPrefix
    - [x] willReturnTrueDuringIsAuthHeaderValidWhenHeaderIsValid
- [x] JwtService.java
    - [x] canGetSigningKey
    - [x] canGenerateToken
    - [x] willThrowValidateTokenWhenTokenIsNotJwt
    - [x] willThrowValidateTokenWhenTokenUsesWrongSigningKey
    - [x] willThrowValidateTokenWhenTokenIsExpired
    - [x] canValidateToken
</details>

<details>
    <summary>Cache Package</summary>

- [x] CacheDao.java
    - [x] canSet
    - [x] canGet
    - [x] canDelete
- [x] CacheService.java
    - [x] willReturnNullDuringGetWhenKeyNotFound
    - [x] canGetValueUsingClazz
    - [x] canGetValueUsingTypeReference
    - [x] willReturnDuringSetWhenDataIsNull
    - [x] canSet
    - [x] canDelete
</details>

<details>
    <summary>Post Package</summary>

- [x] PostService.java
    - [x] canGetAllPostsWhenCacheHit
    - [x] canGetAllPosts
    - [x] willThrowUpdatePostWhenPostNotFound
    - [x] canUpdatePost
    - [x] willThrowDeletePostWhenNotFound
    - [x] canDeletePost
- [x] PostUtil.java
    - [x] willThrowConstructPostWhenTextHasNoTitle
    - [x] willThrowConstructPostWhenTextHasNoContent
    - [x] canConstructPost
    - [x] willThrowGetImageWhenMultipartFileIsNull
    - [x] willThrowGetImageWhenMultipartFileIsEmpty
    - [x] willThrowGetImageWhenMultipartFileHasSizeZero
    - [x] willThrowGetImageWhenMultipartFileHasInvalidFileExtension
    - [x] willThrowGetImageWhenMultipartFileHasInvalidContentType
    - [x] canGetImage
</details>

<details>
    <summary>Health Package</summary>

- [x] HealthService.java
    - [x] canGetHealthWithDatabasesUp
    - [ ] canGetHealthWithDatabasesDown
    - [x] canGetHealthWithMysqlUpAndRedisDown
    - [ ] canGetHealthWithMysqlDownAndRedisUp
- [x] HealthUtil.java
    - [x] canGetUptime
    - [x] canGetMysqlUpStatus
    - [x] canGetMysqlDownStatus
    - [x] canGetRedisUpStatus
    - [x] canGetRedisDownStatus

</details>

<details>
    <summary>Util Package</summary>

- [x] StringUtil.java
    - [x] willReturnFalseDuringIsStringValidWhenStringIsNull
    - [x] willReturnFalseDuringIsStringValidWhenStringIsBlank
    - [x] willReturnFalseDuringIsStringValidWhenStringIsEmpty
    - [x] willReturnTrueDuringIsStringValidWhenStringIsValid
- [x] DateUtil.java
    - [x] canGetTotalHours
    - [x] canGetRemainingMinutes
    - [x] canGetRemainingSeconds
    - [x] canGetRemainingMillis
</details>

<hr/>

</details>

<details>
    <summary>Integration Tests</summary>

### Integration Tests
</details>

## Deployment

Deployed using DigitalOcean + Vercel.

<details>
    <summary>MySQL on Ubuntu</summary>

1. Install MySQL: https://ubuntu.com/server/docs/install-and-configure-a-mysql-server

2. Login to MySQL and create a new user, database, and grant privileges.

```sql
sudo mysql
CREATE USER '<USERNAME>'@'%' IDENTIFIED BY '<PASSWORD>';
CREATE DATABASE film_blog;
GRANT ALL PRIVILEGES ON film_blog.* TO '<USERNAME>'@'%';
FLUSH PRIVILEGES;
```

3. Initialize the database with tables.

```sql
USE film_blog;
# source all migration code from ./backend/java/src/main/resources/db/migration
```
</details>

<details>
<summary>Redis on Ubuntu</summary>

1. Install Redis: https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/

2. Generate a new Redis password.

```bash
openssl rand -base64 512
```

3. Edit the Redis config change the password.
```bash
redis-cli
CONFIG SET requirepass <password>
```
</details>

<details>
    <summary>Backend Deployment</summary>

1. Install Nginx: https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview

2. Install Certbot and follow its instructions for Nginx: https://certbot.eff.org/ 

3. Configure Nginx.
```bash
sudo vi /etc/nginx/sites-enabled/<domain>
```
> Paste the following:

```
server {
    listen 80;
    server_name <domain>;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name <domain>;

    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/<domain>/chain.pem;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

4. Ensure DNS settings are configured properly.

</details>

<details>
    <summary>Github Actions CI/CD Secrets</summary>

1. Navigate to the GitHub repository, click Settings. Under Security, click Secrets and variables and Actions.

2. Set the following secrets:

> Set `ADMIN_PW` to your secure, hashed password for logging into the admin platform.

> Set `JWT_SECRET_KEY` to your JWT signing key.

> Set `SPRING_DATASOURCE_PASSWORD` to the MySQL user password. 

> Set `SPRING_DATASOURCE_USERNAME` to the MySQL user username.

> Set `SPRING_DATA_REDIS_PASSWORD` to the Redis server authentication password. 

> Set `SSH_HOST` to the IP address of the EC2 instance hosting the Spring Boot app.

> Set `SSH_KEY` to the content in the keypair that authorizes SSH connections to the EC2 instance hosting the Spring Boot app.

> Set `TEST_ADMIN_PW` to a secure, hashed password for logging into the admin platform for integration tests only.

</details>