class DatabaseError extends Error {

    // Colocando o modificador de acesso nos parms, as variáveis já são criadas automaticamente implicitamente
    constructor(public message: string, public error?: any /* Opcional */) {
        super(message);
    }
}

export default DatabaseError;