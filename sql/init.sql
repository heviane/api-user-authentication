/*
    A utilização de um hash é mais segura do que um id incremental.
        Remove a previsibilidade (sequencial).
        Evita possível mineração em cima da base de dados.           
*/

/* Habilita extensão para executar uma função que gera um hash */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* Habilita extensão para executar uma função que gera um dado criptografado */
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    uuid uuid DEFAULT uuid_generate_v4(),
    userName VARCHAR NOT NULL,
    userEmail VARCHAR NOT NULL,
    userPassword VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

INSERT INTO users (userName, userEmail, userPassword) 
    VALUES ('admin', 'heviane@gmail.com', crypt('admin', 'my_salt'));

/* ----- https://www.elephantsql.com
   - Para executar os scripts ir na opção "Browser".
*/
/*
    CREATE TABLE authors (
        id integer NOT NULL,
        fullName varchar NOT NULL, 
        email varchar NOT NULL,
        dataBirth date,
        PRIMARY KEY (id)
    );
*/