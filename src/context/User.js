class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

export const UserState = new User('', '', 0);

export default User;
