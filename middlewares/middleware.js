const Notes = require('../models/Notes');
const Users = require("../models/Users");
const {successMessage, errorResponse} = require("../utils/ApiResponse");

ensureUniqueEmail = async (req, res, next) => {
    const { email } = req.body;
    try{
        const existingUser = await Users.findByEmail(email);

        if (existingUser) {
            errorResponse(res, 400, "Email already used.");
            return;
        }

        next()
    }catch (err){
        errorResponse(res, 500, "Oops! an error occurred while registering user");
    }
}

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

        next();
    }catch (err){
        console.log({ err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }

}

module.exports = {
    ensureUniqueEmail,
    verifyOwnership,
    validateUser,
}