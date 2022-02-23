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

// ======================== Inicializando servidor (Subir e ficar escutando na porta)
// ----- Run project locally
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

/* ----- Run project Heroku
    A porta é provida pelo Heroku e não tem como saber de antemão.
    Heroku usa a variável de ambiente chamada process.env.PORT para armazenar a porta. 
*/ 
app.listen(process.env.PORT || 8080);

// app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
  