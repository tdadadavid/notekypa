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

            // check if this is a valid user
            const user = await Users.findByID(id);

            if (user){

                const { title } = req.query;

                // check if there was a query parameter given
                if (title){
                    try{
                        // find the user's note according to the query
                        const note = await Notes.findByTitle(title, id);
                        if (note){
                            successResponse(res, 200, "Specified note found", note);
                            return;
                        }else{
                            errorResponse(res, 404, `Note with title ${title} was not found.`, {});
                        }
                    }catch(err){
                        errorResponse(res, 500, "Oops! an error occurred.");
                        return;
                    }
                }

                try{
                    // find the user's notes using the user's id
                    const notes = await Notes.findUsersNotes(id);

                    if (notes){
                        successResponse(res, 200, "All user's note", notes);
                        return;
                    }else{
                        successResponse(res, 200, "User has no note", {});
                        return;
                    }

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

    deleteUserNote: async (req, res) => {
        const {note} = req.params;

        try {
            const status = Notes.deleteNote(+note);
            if (status){
                successMessage(res, 200, "Note deleted successfully");
            }else{
                errorResponse(res, 500, "An error occurred while deleting note");
            }
        }catch (err) {
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred.");
        }

    }


}

module.exports = NoteController;