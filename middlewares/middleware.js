const Notes = require('../models/Notes');
const {successMessage, errorResponse} = require("../utils/ApiResponse");

async function verifyOwnership(req, res, next) {
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


module.exports = {
    verifyOwnership
}