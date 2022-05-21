const { updateUserSchema } = require('../validationSchema/validation-schema');
const {errorResponse} = require("../../../utils/ApiResponse");
const Users = require("../models/Users");


updateUserValidator = async (req, res, next) => {

    const { id } = req.params;
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    try{

        const value = await updateUserSchema.validate({
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        });


        const user = await Users.findByID(+id);
        if (!user){
            errorResponse(res, 404, `User with id ${id} not found.`);
            return;
        }

        next();

    }catch (error){
        errorResponse(res, 422, error.message);
    }
}


module.exports = updateUserValidator;