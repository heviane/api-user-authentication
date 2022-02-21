# api-ms-authentication

API for user authentication with token.

## Server in Node and TypeScript

- Express Library
- Routes
- Middlewares
- PostGreSQL Database (pg library)
- JWT (jsonwebtoken library)
- http-status-codes library
- config library

## Initialize new project

`npm init`

## Initialize existing project

`npm install`

## Run project locally

Configurado no **package.json** o script **dev** para executar com o **ts-node-dev**

`npm dev`

## Deploy in Heroku

O arquivo **Procfile** contém configurações especificas para o Heroku.

`npm build`

Este comando gera o diretório **./dist** com os arquivos compilados para produção.

Configurado no **package.json** o script **start** para executar o build (produção).

`npm start`

## References

- [RenanJPaula](https://github.com/RenanJPaula)
- [dio-node-user-authentication-api](https://github.com/RenanJPaula/dio-node-user-authentication-api)
