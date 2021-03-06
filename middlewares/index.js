const Notes = require('../components/Notes/models/Notes');
const Users = require("../components/Users/models/Users");
const {successMessage, errorResponse} = require("../utils/ApiResponse");

verifyOwnership = async (req, res, next) => {
    const { user, note } = req.params;

    try{
        const notes = await Notes.findByID(+note);

        if (notes === null){
            successMessage(res, 404, `Note with id ${note} not found.`);
        }else{
            const userID = notes[0].user_id;

            if (userID !== +user){
                errorResponse(res, 401, `Action can't be performed, this is not you're note`);
                return;
            }
            next();
        }

    }catch (err){
        console.log({ err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }
}

validateUser = async (req, res, next) => {
    const { id } = req.params;

    try{
        const user = await Users.findByID(+id);
        if (!user){
            errorResponse(res, 404, `User with id ${id} not found.`);
            return;
        }
        req.user = user;
        next();
    }catch (err){
        console.log({ err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }

}

validateNote = async (req, res, next) => {
    const noteID  = req.params.note;

    try{
        const note = await Notes.findByID(+noteID);
        if (!note){
            errorResponse(res, 404, `Note with id ${noteID} not found.`);
            return;
        }
        req.note = note;
        next();
    }catch (err){
        console.log({ err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }
}

validateDeletedNote = async (req, res, next) => {
    const noteID  = req.params.deletedNoteID;

    try{
        const note = await Notes.findDeletedNoteByID(+noteID);
        if (!note){
            errorResponse(res, 404, `Note with id ${noteID} not found.`);
            return;
        }

        req.deletedNote = note;
        next();
    }catch (err){
        console.log({ err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }
}

module.exports = {
    verifyOwnership,
    validateUser,
    validateNote,
    validateDeletedNote,
}