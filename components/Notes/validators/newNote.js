const {newNoteSchema, updateNoteSchema} = require("../validationSchema/validation-schema");
const {errorResponse} = require("../../../utils/ApiResponse");

const newNoteValidator = async (req, res, next) => {
    const { title , note } = req.body;

    try{

        const {error} = await newNoteSchema.validate({
            title,
            note
        });

        if (error) {
            errorResponse(res, 422, error.message);
            return;
        }

        next();
    }catch(err){
        console.log({ Error: err });
        errorResponse(res, 500, "Oops! an error occurred.");
    }

}


module.exports = newNoteValidator;