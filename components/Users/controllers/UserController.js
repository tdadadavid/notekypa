const Users = require('../models/Users');
const { successResponse, errorResponse } = require('../../../utils/ApiResponse');
const { hashUserPassword } = require('../../../utils/helpers');

const UserController = {

    getAllUsers: async (req, res) => {
        try{
            const allUsers = await Users.findAll();

           allUsers && successResponse(res, 200, "All users", allUsers);

        }catch (err){
            errorResponse(res, 500,"Oops! an error occurred");
        }
    },

    getUser: async (req, res) => {

        const { id } = req.params;

        try{
            const user = await Users.findByID(+id);
            successResponse(res, 200, "User found", user.map(value => value.toJson()));
        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred");
        }

    },

    createUser: async (req, res) => {

        const { firstname, lastname, email, password } = req.body;

        let hashedPassword = await hashUserPassword(password);
        const user = {firstname, lastname, email, hashedPassword};

        try{
            const newUser = await Users.save(user);
            if (newUser) {
                successResponse(res, 201, "Successfully created user", newUser.toJson())
            }
        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred");
        }

    },


    // Test this route very well!!!!
    // updateUser: async (req, res) => {
    //
    //     let { firstname, lastname, email, password } = req.body;
    //
    //     if(!password){
    //         password = user[0].password;
    //     }else {
    //         password = await hashUserPassword(password);
    //     }
    //
    //     try{
    //         const status = await user[0].updateAndSave({firstname, lastname, email, password});
    //         if (status)
    //             successMessage(res, 200,"Successfully updated user's fields");
    //
    //     }catch (err){
    //         console.log({ Error: err });
    //         errorResponse(res, 500, "Oops! an error occurred");
    //     }
    //
    // },
}


module.exports = UserController;