// Express é uma biblioteca pequena e simples para gerenciar rotas HTTP. 
// SERVER EXPRESS COM ROUTER

import express from 'express';
import statusRoute from './routes/status.route';
import authorizationRoute from './routes/authorization.route';
import usersRoute from './routes/users.route';
import errorHandler from './middlewares/error-handler.middleware';
import bearerAuthentication from './middlewares/jwt-authentication.middleware';

// Instanciando o express
const app = express();

// *** IMPORTANTE: A ordem de registro importa ***

// ======================== Configurações Globais
// app.use(basicAuthentication);  // Não queremos globalmente, somente para a rota de autenticação
// Add middleware GLOBAL para aceitar e lidar com o Content-Type: application/json
// Node não trabalha com JSON (que é uma string, um texto), mas sim com Objetos, então é necessário converter o JSON em um objeto.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// ======================== Configuração das Rotas (Criadas separadamente, normalmente por domínio)
app.use(statusRoute);
app.use(authorizationRoute);
app.use(bearerAuthentication); // Middleware => Todas as rotas abaixo serão autenticadas
app.use(usersRoute);

// app.use(bearerAuthentication), usersRoute);

// ======================== Configurações dos Handlers
app.use(errorHandler);  // Middleware Error Handler (src/middlewares/error-handler.ts)

// ======================== Inicialização do servidor (Subir e ficar escutando na porta 3000)
app.listen(3000, () => {
    console.log('Server running on port 3000');
});