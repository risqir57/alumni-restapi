## 💎 Welcome to REST API Alumni Apps ❤️
This repo for handle REST API for Alumni Apps

![](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=fff)
![](https://img.shields.io/badge/-NPM-CB3837?style=for-the-badge&logo=NPM&logoColor=fff)
![](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=TypeScript&logoColor=fff)
![](https://img.shields.io/badge/-Express-F8F8F5?style=for-the-badge)
![](https://img.shields.io/badge/-Nodemon-76D04B?style=for-the-badge&logo=Nodemon&logoColor=fff)
![](https://img.shields.io/badge/-ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=fff)
![](https://img.shields.io/badge/-Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=000)
![](https://img.shields.io/badge/-Jest-C21325?style=for-the-badge&logo=Jest&logoColor=fff)
![](https://img.shields.io/badge/-Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=000)
![](https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=fff)
![](https://img.shields.io/badge/-NGINX-269539?style=for-the-badge&logo=NGINX&logoColor=fff)
![](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=fff)
![](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=fff)

### 🥇 (MAC) First setup project requirement
- Make sure you have install `xcode-select --install` and [Homebrew](https://brew.sh/#install)
- Latest NVM 
  ```
  brew install nvm
  ```
- Node `>= 12.x`
- Latest Docker 
  ```
  brew install --cask docker
  ```
- Latest Docker Compose 
  ```
  brew install docker-compose
  ```
- Latest MongoDB 
  ```
  brew tap mongodb/brew && brew install mongodb-community
  ```
- Copy enviroment file 
  ```
  cp .env.example .env
  ```

### 🥈 (MAC) Running Apps
- If your local PC is allready run web service (ex: Apache, Nginx, etc), check with command
  ```
  sudo lsof -i -n -P | grep ':80\|LISTEN'
  ```
- If port 80 in LISTENING turn off first
  ```
  sudo pkill httpd|nginx
  ```
- By default you can run this app under Docker
  ```
  docker-compose up -d
  ```


*Made with ❤️ by [Risqi Romadhoni](https://risqiromadhoni.com)*