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

        if (email) {
            const user = await Users.findByEmail(email);

            if (user) {
                errorResponse(res, 422, "Email already used.");
                return;
            }
        }

        next();

    }catch (error){
        errorResponse(res, 422, error.message);
    }

}


module.exports = updateUserValidator;