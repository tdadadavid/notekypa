const db = require('../database/database');
const {reject} = require("bcrypt/promises");

class Notes{

    constructor(title, note, owner) {
        this.id = null;
        this.title = title;
        this.note = note;
        this.user = owner;
        this.created_at = new Date;
        this.updated_at = null;
        this.deleted_at = null;
    }

    toJson(){
        return {
            id: this.id,
            title: this.title,
            note: this.note,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        }
    }

    static transform(array){
        const note = array.map(result => {
            const newNote = new Notes(result.title, result.note, result.user);
            newNote.id = result.id;
            newNote.created_at = result.created_at;
            newNote.deleted_at = result.deleted_at;
            newNote.updated_at = result.updated_at;
            return newNote.toJson()
        });

        return note;
    }

    static save(jottings){

        const statement = "INSERT INTO notes (title, note, user_id, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [jottings.title, jottings.note, jottings.user, new Date, null, null];

        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static findByTitle(title, id){
        const statement = "SELECT * FROM notes WHERE user_id = ? AND title = ?";
        const values = [id, title];

        return new Promise((resolve, reject) => {
            db.query(statement, values, (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    const note = this.transform(results);
                    resolve(note);
                }
            });
        });
    }

    static findByID(id){
        const statement = "SELECT * FROM notes WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, id, (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static findUsersNotes(userID){
        const statement = "SELECT * FROM notes WHERE user_id = ?";

        return new Promise((resolve, reject) => {
            db.query(statement, userID, (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    const userNotes = this.transform(results);
                    resolve(userNotes);
                }
            })
        });
    }

    

}


module.exports = Notes;