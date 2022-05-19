const Users = require('../models/Users');
const Notes = require('../models/Notes');
const { successResponse, successMessage, errorResponse } = require('../utils/ApiResponse');
const { hashUserPassword } = require('../utils/helpers');

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
            const user = await Users.findByID(id);

           if(user)
               successResponse(res, 200, "User found", user.map(value => value.toJson()));
           else
               errorResponse(res, 404,`User not found with id ${id}`);

        }catch (err){
            console.log({ err });
            errorResponse(res, 500, "Oops! an error occurred");
        }

    },

    createUser: async (req, res) => {
        const { firstname, lastname, email, password } = req.body;

        try{
            const existingUser = await Users.findByEmail(email);

            if (existingUser) {
                errorResponse(res, 400, "Email already used.");
                return;
            }
        }catch (err){
            errorResponse(res, 500, "Oops! an error occurred while registering user");
            return;
        }

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

    updateUser: async (req, res) => {

        const { id } = req.params;
        const { firstname, lastname, email, password } = req.body;
        let user;

        try{
            user =  await Users.findByID(id);
            if (!user){
               errorResponse(res, 404, `User with id ${id} not found`);
               return;
            }
        }catch(err){
            console.log({ Error: err });
            errorResponse(res, 500, "Oops! an error occurred.");
        }

        let hashedPassword;

        if (password)
            hashedPassword = await hashUserPassword(password);
        else
            hashedPassword = user[0].password;


        try{
            const status = await user[0].updateAndSave({firstname, lastname, email, hashedPassword});
            if (status)
                successMessage(res, 200,"Successfully updated user's fields");

        }catch (err){
            console.log({ Error: err });
            errorResponse(res, 500, "Oops! an error occurred");
        }

    },
}


module.exports = UserController;