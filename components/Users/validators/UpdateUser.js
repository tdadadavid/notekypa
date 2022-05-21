const { updateUserSchema } = require('../validationSchema/validation-schema');
const {errorResponse} = require("../../../utils/ApiResponse");
const Users = require("../models/Users");


updateUserValidator = async (req, res, next) => {

    const { firstname, lastname, email, password, confirmPassword } = req.body;

    try{

        const { error } = await updateUserSchema.validate({
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        });

        if (error){
            errorResponse(res, 422, error.message);
            return;
        }

        next();

    }catch (error){
        errorResponse(res, 422, error.message);
    }

}


module.exports = updateUserValidator;