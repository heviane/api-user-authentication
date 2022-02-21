// Express é uma biblioteca pequena e simples para gerenciar rotas HTTP.
// SERVER EXPRESS SEM ROUTER

import express, { Request, Response, NextFunction} from 'express';

// app é a instância do express, a partir dela, configura-se todas as rotas do projeto
// Tudo que vem depois é configuração, app é uma composição das configurações
const app = express();

// End-point status: Qdo chegar uma requisição do tipo "GET", na rota "STATUS" o callback resolve a requisição
app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ message: 'Hello World!' });
});

// Subir o servidor e ficar escutando na porta 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

/* 
    ----- Executar o server de forma manual:
    *** Toda vez que houver uma alteração no código, é necessário executar os comandos para que o servidor seja atualizado.
    npm run build
        node ./dist/index.js
    npm run start

    ----- Executar o server de forma automática:
    - Instalação e configuração do ts-node-dev
    *** Executa o comando uma única vez, e o servidor será executado automaticamente sempre que houver uma alteração no código.
    npm run dev

    ----- Testar o método POST
    - insomnia (free), porque não é possível testar diretamente pelo browser.
*/