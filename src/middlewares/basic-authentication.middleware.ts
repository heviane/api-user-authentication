import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

// Basic Auth é uma forma de autenticação baseada no Protocolo HTTP. **é a forma mais simples**

async function basicAuthentication(req: Request, res: Response, next: NextFunction){
    try{
        // Recuperar credenciais do header da requisição
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');// NÃO é BOA PRÁTICA add msgs sugestivas, isso dá dicas p/ hackers
        } 

        // Tratar as credenciais (separando os valores)
        const [authorizationType, token] = authorizationHeader?.split(" "); // Basic YWRtaW46cGFzc3dvcmQ=
            // 1º posição: Basic (Tipo de Autenticação)
            // 2º posição: Token Base64
        if(authorizationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválida');
        }

        // Criar buffer a partir do Token que está em Base64 e converter para string codificação UTF-8
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [userName, userPassword] = tokenContent.split(":"); 
        if(!userName || !userPassword){
            throw new ForbiddenError('Credenciais não preenchidas');
        }

        // Consultar usuário na base de dados pelo uuid
        const user = await userRepository.byUserNameAndPassword(userName, userPassword);
        if(!user){
            throw new ForbiddenError('Usuário e/ou senha inválidos');
        }

        // colocar user na request para ficar acessível para os demais middlewares
        req.user = user;

        // Chamar o próximo middleware
        next();

    }catch(error){
        // Não adianta somente lançar um erro, porque o Express não vai saber o que fazer com o erro
        // É necessário passá-lo para o próximo middleware que vai tratar o erro
        next(error);
    }finally{
        console.log('Execução do middleware Basic Authentication finalizada!')
    }
};

export default basicAuthentication;