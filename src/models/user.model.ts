type User = {
    uuid?: string;         // ? = Opcional
    userName: string;
    userEmail: string;
    userPassword?: string; // ? = Opcional
}

export default User;