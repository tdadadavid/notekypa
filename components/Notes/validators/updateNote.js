const {updateNoteSchema} = require("../validationSchema/validation-schema");
const {errorResponse} = require("../../../utils/ApiResponse");


const updateNoteValidator = async (req, res, next) => {
    const { title, note} = req.body;

    try{
        const { error, value } = updateNoteSchema.validate({
            title,
            note,
        });

        if (error) {
            errorResponse(res, 422, error.message);
            return;
        }

        console.log(value);

        req.editedPart = value;

        next();
    }catch (err){
        console.log({ Error: err });
        errorResponse(res, 500, "Oops! an error occurred");
    }
}

module.exports = updateNoteValidator;