const {errorResponse, successMessage, successResponse} = require("../../../utils/ApiResponse");
const Notes = require("../models/Notes");


const NoteController =  {

    createNote: async (req, res) => {

        const { id } = req.params;
        const { title, note } = req.body;

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

        // find by title if specified
        const { title } = req.query;
        if (title){
            try{
                // find the user's note according to the query
                const note = await Notes.findByTitle(title, id);
                if (note){
                    successResponse(res, 200, "Specified note found", note);
                    return;
                }else{
                    errorResponse(res, 404, `Note with title ${title} was not found.`, {});
                    return
                }
            }catch(err){
                errorResponse(res, 500, "Oops! an error occurred.");
                return;
            }
        }


        // find the user's notes using the user's id
        try{

            const notes = await Notes.findUsersNotes(+id);

            if (notes){
                successResponse(res, 200, "All user's note", notes);
            }else{
                successResponse(res, 200, "You have no note", {});
            }

        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred");
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

    },

    getTrashedNotes: async (req, res) => {
        const { id } = req.params;

        try{
            const notes = await Notes.getDeleted(id);

            if (notes === null){
                errorResponse(res, 404, "You have no deleted note");
            }else{
                successResponse(res, 200, "All deleted notes.", notes);
            }
        }catch (err) {
            console.log({ err });
            errorResponse(res, 404, "Oops! an error occurred");
        }
    }

}

module.exports = NoteController;