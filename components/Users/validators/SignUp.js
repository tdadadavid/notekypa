const { newUserSchema } = require('../validationSchema/validation-schema');
const {errorResponse} = require("../../../utils/ApiResponse");
const Users = require("../models/Users");


const signUpValidator = async (req, res, next) => {

    const { firstname, lastname, email, password, confirmPassword } = req.body;

    try{

        const { error, value } = await newUserSchema.validate({
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

        const existingUser = await Users.findByEmail(email);

        if (existingUser) {
            errorResponse(res, 400, "Email already used.");
            return;
        }

        next();
    }catch (error) {
        errorResponse(res, 422, error.message);
    }

}

module.exports = signUpValidator;