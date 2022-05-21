const db = require('../../../database/database');

class Users {
    constructor(firstname, lastname, email, password) {
        this.id = null;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    toJson(){
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email
        }
    }

    static save(user){
        const newUser = new Users(user.firstname, user.lastname, user.email, user.hashedPassword);

        const statement = "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
        const userValues = [user.firstname, user.lastname, user.email, user.hashedPassword];

        return new Promise((resolve, reject) => {
            db.query(statement, userValues, (err, results) => {
                if (err){
                    reject(err);
                }else{
                    newUser.id = results.insertId;
                    resolve(newUser);
                }
            });
        });
    }

    static findAll(){
        const statement = "SELECT * FROM users";

        return new Promise((resolve, reject) => {
            db.query(statement, (err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0){
                    resolve(null);
                }else{
                    let resources = results.map(result => {
                        const user = new Users(result.firstname, result.lastname, result.email, result.password);
                        user.id = result.id;
                        return user.toJson();
                    })
                    resolve(resources);
                }
            });
        });
    }

    static findByID(id){
        const statement = "SELECT * FROM users WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id,(err, results) => {

                if (err){
                    reject(err);
                }else if (results.length === 0) {
                    resolve(null);
                }else{
                    const resource = results.map(result =>{
                        const user = new Users(result.firstname, result.lastname, result.email, result.password);
                        user.id  = result.id;
                        return user;
                    });
                    resolve(resource);
                }
            });
        });
    }

    static findByEmail(email){
        const statement = "SELECT * FROM users WHERE email = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, email,(err, results) => {
                if (err){
                    reject(err);
                }else if (results.length === 0) {
                    resolve(null);
                }else{
                    resolve(results[0]);
                }
            });
        });
    }

    updateAndSave(inputs){
        const statement = `UPDATE users SET firstname = ?, lastname = ? , email = ?, password = ? WHERE id = ?`;

        const firstname = inputs.firstname || this.firstname;
        const lastname = inputs.lastname || this.lastname;
        const email = inputs.email || this.email;
        const password = inputs.hashedPassword || this.password;
        const id = this.id;

        const values = [firstname, lastname, email, password, id];

        return new Promise((resolve, reject) => {
            db.query(statement, values , (err, results) => {
                if (err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }

    saveNote(note){
        const statement = "INSERT INTO users_notes (user_id, note_id) VALUES (?,?)";

    }
}

module.exports = Users;