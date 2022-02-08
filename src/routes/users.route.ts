/*
    - GET
        Há duas formas de passar parâmetros em uma requisição HTTP
            - URL
                http://localhost:3000/users/123
            - Query String
                http://localhost:3000/users?uuid=123
                http://localhost:3000/users?name='Maria'

            ----- No Express para dizer que parm será dinâmico, usamos dois pontos (:)
                http://localhost:3000/users/:uuid
                http://localhost:3000/users/123

            ----- Por estarmos usando o TypeScript, podemos informar o tipo do parâmetro que será recebido.
                req: Request<{ uuid: string }>
                Adicionamos o tipo ao request, para que o TypeScript possa validar o parâmetro.
*/
import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

// Listar todos os usuários
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await userRepository.allUsers();
        res.status(StatusCodes.OK).json(users); 
    }catch(error){
        next(error); 
        // Middleware Error Handler (src/middlewares/error-handler.ts) registrado no server (src/index.ts) 
    }finally{
        
    }
});

// Listar um usuário
usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const user = await userRepository.byIdUser(req.params.uuid);
        res.status(StatusCodes.OK).json(user); 
    }catch(error){
        next(error);  
    }
});

// Cadastrar um usuário
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newUser = req.body;
        const uuid = await userRepository.createUser(newUser);
        res.status(StatusCodes.CREATED).send(uuid);
    }catch(error){
        next(error);  
    }
});

// Atualizar um usuário
usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
        await userRepository.updateUser(modifiedUser);
        res.status(StatusCodes.OK).send();
    }catch(error){
        next(error);  
    }
});

// Excluir um usuário
usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        await userRepository.deleteUser(uuid);
        res.status(StatusCodes.OK).send();
    }catch(error){
        next(error);  
    }
});

export default usersRoute;