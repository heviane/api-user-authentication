# API para autenticação de usuários

Node API with Express and TypeScript for user authentication microservice with JWT Token

## Stacks

- JavaScript
- TypeScript
- Express Library
- Routes
- Middlewares
- PostGreSQL Database (pg library)
- JWT (jsonwebtoken library)
- http-status-codes library
- config library

## Run project locally

Initialize new project:

`npm init`

Initialize existing project:

`npm install`

Run the "dev" script, Configured with **"ts-node-dev"**:

`npm run dev`

## Preparing for deployment on Heroku

Heroku acessa o **package.json** do projeto e busca pelo script **“start”**.

`npm start`

Criar o arquivo **Procfile** para especificar as configurações para o Heroku.

`web: npm start`

## References

- [RenanJPaula](https://github.com/RenanJPaula)
- [dio-node-user-authentication-api](https://github.com/RenanJPaula/dio-node-user-authentication-api)
- [deployando-seu-projeto-em-node-js-no-heroku](https://medium.com/code-prestige/deployando-seu-projeto-em-node-js-no-heroku-b49a6ae7dbc3)
