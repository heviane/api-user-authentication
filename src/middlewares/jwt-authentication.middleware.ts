
import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
// const config = require('config');
import config from 'config';  // só conseguir importar assim depois de add @types/config


// Bearer Token é uma forma de autenticação baseada em um Token.
// JWT (JSON Web Token) 

async function bearerAuthentication(req: Request, res: Response, next: NextFunction){
    try{
        // Recuperar credenciais do header da requisição
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');// NÃO é BOA PRÁTICA add msgs sugestivas, isso dá dicas p/ hackers
        } 

        // Tratar as credenciais (separando os valores)
        const [authorizationType, token] = authorizationHeader?.split(" "); // Bearer YWRtaW46cGFzc3dvcmQ=
            // 1º posição: Bearer (Tipo de Autenticação)
            // 2º posição: Token Base64
        if(authorizationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválida');
        }

        // Validação do Token
        try{
            // Descriptografar o Token
            const privateKey = config.get<any>('authentication.cryptKey');
            const tokenPayload = JWT.verify(token, privateKey); //'my_secret_key'); 
            // Nessa lib o tokenPayload pode ser uma string ou um objeto ***No nosso caso sempre vai ser objeto***
            if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbiddenError('Token inválido');
            }

            // // Obter uuid do usuário que estará no conteúdo (payload) do token, no Subject do token
            // const uuid = tokenPayload.sub;  // Subject do Token
            // // Consultar usuário na base de dados pelo uuid
            // const user = await userRepository.byIdUser(uuid);
            // if(!user){
            //     throw new ForbiddenError('Usuário e/ou senha inválidos');
            // }

            // Eliminamos a consulta do usuário na base de dados, pois o token já tem os dados do usuário, e é CONFIÁVEL
            const user = { uuid: tokenPayload.sub, userName: tokenPayload.userName };

            // colocar user na request para ficar acessível para os demais middlewares
            req.user = user;

            // Chamar o próximo middleware
            next();
        }catch(error){
            throw new ForbiddenError('Token inválido');
        }

    }catch(error){
        // Não adianta somente lançar um erro, porque o Express não vai saber o que fazer com o erro
        // É necessário passá-lo para o próximo middleware que vai tratar o erro
        next(error);
    }finally{
        console.log('Execução do middleware Bearer Authentication finalizada!')
    }
};

export default bearerAuthentication;