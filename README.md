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

## Repository Map
```
.
├── Dockerfile
├── Dockerfile.dev
├── LICENSE
├── Makefile
├── README.md
├── build
│   ├── app.js
│   ├── app.js.map
│   ├── config
│   │   ├── app.js
│   │   ├── app.js.map
│   │   ├── index.js
│   │   └── index.js.map
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── auth.controller.js.map
│   │   ├── index.controller.js
│   │   ├── index.controller.js.map
│   │   ├── users.controller.js
│   │   └── users.controller.js.map
│   ├── database
│   │   ├── index.js
│   │   └── index.js.map
│   ├── dtos
│   │   ├── users.dto.js
│   │   └── users.dto.js.map
│   ├── enums
│   │   ├── HttpResponse.js
│   │   └── HttpResponse.js.map
│   ├── exceptions
│   │   ├── HttpException.js
│   │   ├── HttpException.js.map
│   │   ├── HttpResponseException.js
│   │   └── HttpResponseException.js.map
│   ├── interfaces
│   │   ├── auth.interface.js
│   │   ├── auth.interface.js.map
│   │   ├── routes.interface.js
│   │   ├── routes.interface.js.map
│   │   ├── users.interface.js
│   │   └── users.interface.js.map
│   ├── middlewares
│   │   ├── auth.middleware.js
│   │   ├── auth.middleware.js.map
│   │   ├── error.middleware.js
│   │   ├── error.middleware.js.map
│   │   ├── validation.middleware.js
│   │   └── validation.middleware.js.map
│   ├── models
│   │   ├── users.model.js
│   │   └── users.model.js.map
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── auth.route.js.map
│   │   ├── index.route.js
│   │   ├── index.route.js.map
│   │   ├── users.route.js
│   │   └── users.route.js.map
│   ├── server.js
│   ├── server.js.map
│   ├── services
│   │   ├── auth.service.js
│   │   ├── auth.service.js.map
│   │   ├── users.service.js
│   │   └── users.service.js.map
│   ├── tests
│   │   ├── auth.test.js
│   │   ├── auth.test.js.map
│   │   ├── index.test.js
│   │   ├── index.test.js.map
│   │   ├── users.test.js
│   │   └── users.test.js.map
│   └── utils
│       ├── logger.js
│       ├── logger.js.map
│       ├── response.js
│       ├── response.js.map
│       ├── util.js
│       ├── util.js.map
│       ├── validateEnv.js
│       └── validateEnv.js.map
├── changelog.config.js
├── docker-compose.yml
├── docs
│   └── newman
│       ├── LICENSE
│       ├── collection
│       │   ├── Alumni\ API.postman_collection.json
│       │   └── Alumni\ APi.postman_environment.json
│       ├── package.json
│       ├── resultNewman.html
│       ├── server.js
│       └── yarn.lock
├── jest.config.js
├── nginx.conf
├── nodemon.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   ├── app.ts
│   │   └── index.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── index.controller.ts
│   │   ├── roles.controller.ts
│   │   └── users.controller.ts
│   ├── database
│   │   └── index.ts
│   ├── dtos
│   │   ├── date.dto.ts
│   │   ├── roles.dto.ts
│   │   └── users.dto.ts
│   ├── enums
│   │   └── HttpResponse.ts
│   ├── exceptions
│   │   ├── HttpException.ts
│   │   └── HttpResponseException.ts
│   ├── interfaces
│   │   ├── auth.interface.ts
│   │   ├── core.interface.ts
│   │   ├── files.interface.ts
│   │   ├── forums.interface.ts
│   │   ├── message.interface.ts
│   │   ├── roles.interface.ts
│   │   ├── routes.interface.ts
│   │   └── users.interface.ts
│   ├── logs
│   │   ├── error
│   │   │   ├── 2021-04-02.error.log
│   │   │   └── 2021-04-03.error.log
│   │   └── info
│   │       ├── 2021-04-02.log
│   │       └── 2021-04-03.log
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models
│   │   ├── forums.model.ts
│   │   ├── roles.model.ts
│   │   └── users.model.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   ├── frontend
│   │   │   └── index.ts
│   │   ├── index.route.ts
│   │   ├── index.ts
│   │   ├── roles.route.ts
│   │   └── users.route.ts
│   ├── server.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── role.service.ts
│   │   └── users.service.ts
│   ├── tests
│   │   ├── auth.test.ts
│   │   ├── index.test.ts
│   │   └── users.test.ts
│   └── utils
│       ├── logger.ts
│       ├── response.ts
│       ├── util.ts
│       └── validateEnv.ts
├── swagger.yaml
├── tree.txt
├── tsconfig.json
└── yarn.lock
```

*Made with ❤️ by [Risqi Romadhoni](https://risqiromadhoni.com)*