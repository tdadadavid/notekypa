const express = require('express');
const Notes = require('../models/Notes');
const {ignore} = require("nodemon/lib/rules");
const {successMessage, errorResponse} = require("../utils/ApiResponse");
const server = express();


function verifyOwnership(req, res, next) {
    const { user, note } = req.params;

    try{
        const notes = Notes.findByID(+user);

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
        errorResponse(res, 500, "Oops! an error occurred.");
    }
}


module.exports = {
    verifyOwnership
}