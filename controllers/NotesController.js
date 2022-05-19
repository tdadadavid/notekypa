const Users = require("../models/Users");
const {errorResponse, successMessage, successResponse} = require("../utils/ApiResponse");
const Notes = require("../models/Notes");


const NoteController =  {

    createNote: async (req, res) => {

        const { id } = req.params;
        const { title, note } = req.body;
        let user;

        try {
            user = await Users.findByID(id);
            if (!user) {
                errorResponse(res, 404, `No user found with this id ${id}`);
                return;
            }
        }catch (err){
            console.log({ err });
            errorResponse(res,500, "Oops! an error occurred");
        }

        try{

            const newNote = new Notes(title, note, id);
            const result = await Notes.save(newNote);

            result && successMessage(res, 201, "Successfully create note.");

        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred");
        }
    },

    getUserNotes: async (req, res) => {
        const { id } = req.params;

        try{

            const user = await Users.findByID(id);

            if (user){

                const { title } = req.query;

                if (title){
                    try{
                        const note = await Notes.findByTitle(title, id);
                        if (note)
                            successResponse(res, 200, "Specified note found", note);
                        else
                            errorResponse(res, 404, `Note with title ${title} was not found.`, {});
                    }catch(err){
                        errorResponse(res, 500, "Oops! an error occurred.");
                    }
                }

                try{
                    const notes = await Notes.findUsersNotes(id);

                    if (notes)
                        successResponse(res, 200, "All user's note", notes);
                    else
                        successResponse(res, 200, "User has no note", {});
                }catch (err){
                    console.log({ err });
                    errorResponse(res, 500, "Oops! an error occurred");
                }

            } else {
                errorResponse(res, 404, `No user found with this id ${id}`);
            }

        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred.");
        }
    },



}

module.exports = NoteController;