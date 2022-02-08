import {Router, Request, Response, NextFunction} from 'express';
import basicAuthentication from '../middlewares/basic-authentication.middleware';
import JWT, {SignOptions} from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';
import ForbiddenError from '../models/errors/forbidden.error.model';
import bearerAuthentication from '../middlewares/jwt-authentication.middleware';
// const config = require('config');
import config from 'config';  // só conseguir importar assim depois de add @types/config

// authorizationRouter (Endpoint para autorização e validação de Token)
// *** IMPORTANTE: A ordem das rotas importa ***
// *** BOA PRÁTICA: Colocar as rotas mais especificas antes ***

const authorizationRoute = Router();

// Rota para validação de Token
authorizationRoute.post('/token/validate', bearerAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Se chegar até aqui, então o Token é valido, porque já foi autenticado pelo middleware bearerAuthentication
        res.sendStatus(StatusCodes.OK);
    }catch(error){
        next(error);
    }finally{
        console.log('Execução do endpoint/rota de validação de Token finalizada!')
    }
});

// Rota para autorização de Token
authorizationRoute.post('/token', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Recuperar user do header da requisição
        const user = req.user;
        if(!user){
            throw new ForbiddenError('Usuário não informado!');
        }

        // Gerar um token JWT 
        const jwtPayLoad   = {userName: user.userName};
        const privateKey = config.get<any>('authentication.cryptKey');
        const jwtSecretKey = privateKey;
        const jwtOptions: SignOptions = {subject: user?.uuid, expiresIn: '1m'}; // https://github.com/vercel/ms
        const jwtToken = JWT.sign(jwtPayLoad, jwtSecretKey, jwtOptions);

        // Devolver o Token
        res.status(StatusCodes.OK).json({ token: jwtToken });

    }catch(error){
        // Não adianta somente lançar um erro, porque o Express não vai saber o que fazer com o erro
        // É necessário passá-lo para o próximo middleware que vai tratar o erro
        next(error);
    }finally{
        console.log('Execução do endpoint/rota de autorização de Token finalizada!')
    }
});

export default authorizationRoute;

// ================= Alguns padrões de informações úteis dentro do JWT
// "iss" - Issuer (emissor) do token, domínio da app geradora do token
// "sub" - Subject (assunto) do token, mas é muito usado para guardar o ID do usuário
// "aud" - Audience (público) do token, quem pode usar o token
// "exp" - Expiration (expiração) do token, quando o token expira
// "nbf" - Not Before (não antes) do token, quando o token começa a ser válido (não pode ser aceito antes disso)
// "iat" - Issued At (emissão) do token, quando o token foi gerado
// "jti" - JWT ID (identificador) do token, usado para garantir que o token é único
// "alg" - Algorithm (algoritmo) do token, qual algoritmo foi usado para gerar o token
// "typ" - Type (tipo) do token, informa o tipo do token (JWT)