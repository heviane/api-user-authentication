import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";  //"pg-protocol"; 

// Promise é uma interface para resolver assíncronismo (Forma centralizada de unificar as interfaces para criar um padrão de resposta)

// db é uma injeção de dependência estática, porque é uma instância

class userRepository {

    // ================= Forma 1 - com o uso do .then() 
    // allUsers(): User[] {
    //     const query = `SELECT uuid, userName FROM users`;
    //     db.query(query);                                                    // Retorna Promise de QueryResult do tipo any
    //     db.query<User[]>(query);                                            // Retorna Promise de QueryResult do tipo Lista de Users
    //     db.query<User>(query).then((result) => {result.rows[0].userName;}); // Retorna Promise de QueryResult do tipo User
    //     return [];
    // }

    // ================= Forma 2 - com o uso do async/await
    // ----- Retorna todos os usuários
    async allUsers(): Promise<User[]> {
        try{
            const query = `SELECT uuid, userName FROM users`;
            const { rows } = await db.query<User>(query); // Desestruturação do objeto QueryResult para obter somente o atributo rows
            return rows || [];
        } catch (error) {
            console.log('ERRO: ', error);
            throw error; 
        }      
    }

    // ----- Retorna o usuário correspondente ao ID informado
    async byIdUser(uuid: string): Promise<User> {
        try{
            // const query = `SELECT uuid, userName FROM users WHERE uuid = ${uuid}`; // Não recomendado, isso permitiria SQL Injection
            const query = `SELECT uuid, userName FROM users WHERE uuid = $1`; // $1
            const values = [uuid];  // Array de parms = 1º parâmetro do query porque é $1, se fosse, $2, $3...Seria 2º, 3º parms.
            const { rows } = await db.query<User>(query, values); // Desestruturação de objeto QueryResult
            const [user] = rows;  // Desestruturação de Array rows (Sem index porque o primeiro elemento pega automático)
            return user; // return rows[0];
        } catch (error) {
            console.log('ERRO: ', error);
            throw new DatabaseError('Erro na consulta por ID', error);
        }  
    }

    async byUserNameAndPassword(userName: string, userPassword: string): Promise<User | null> {
        // Return será um usuário ou null (quando usuário não encontrado)
        try{
            const query = `SELECT uuid, userName FROM users WHERE userName = $1 and userPassword = crypt($2, 'my_salt')`;
            const values = [userName, userPassword];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            // return !user ? null : user; // Ternário = Se não achar user, retorna null, se achar, retorna user
            return user || null; // Outra opção de retorno
        }catch (error) {
            console.log('ERRO: ', error);
            throw new DatabaseError('Erro na consulta por userName e userPassword', error);
        }  
    }

    // ----- Retorna o ID do usuário criado - Status Code: 201 (Created)
    async createUser(user: User): Promise<string> { 
        try{
            // Transformar 'my_salt' em uma variável de ambiente (Boa Prática)
            const script = `INSERT INTO users (userName, userEmail, userPassword) VALUES ($1, $2, crypt($3, 'my_salt')) RETURNING uuid`;
            const values = [user.userName, user.userEmail, user.userPassword];  
            const { rows } = await db.query<{ uuid: string }>(script, values); 
            const [newUser] = rows; 
            return newUser.uuid;
        } catch (error) {
            console.log('ERRO: ', error);
            throw new DatabaseError('Erro na consulta por ID', error);
        } finally{
            db.query('COMMIT');
            // Poderia também fechar a conexão com o database, se não estivessemos trabalhando com Pool de Conexões
        }
    }

    // ----- Atualiza o usuário, sem retorno
    async updateUser(user: User): Promise<void> {
        try{
            const script = `UPDATE users SET userName = $1, userEmail = $2, userPassword = crypt($3, 'my_salt') WHERE uuid = $4`;
            const values = [user.userName, user.userEmail, user.userPassword, user.uuid]; 
            await db.query(script, values); // No body returned for response
        } catch (error) {
            console.log('ERRO: ', error);
            throw new DatabaseError('Erro na consulta por ID', error);
        } finally{
            db.query('COMMIT');
        }
    }

    // ----- Deleta o usuário, sem retorno
    async deleteUser(uuid: string): Promise<void> {
        try{
            const script = `DELETE FROM users WHERE uuid = $1`;
            const values = [uuid];
            await db.query(script, values); // No body returned for response
        } catch (error) {
            console.log('ERRO: ', error);
            throw new DatabaseError('Erro na consulta por ID', error);
        } finally{
            db.query('COMMIT');
        }
    }
}

export default new userRepository();