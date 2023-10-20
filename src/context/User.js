class User {
    constructor(username, password, eloPoints) {
        this.username = username;
        this.password = password;
        this.eloPoints = eloPoints;
    }
}

export const UserState = new User('', '', 0);

export default User;
