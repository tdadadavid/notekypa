const Joi = require('joi');

const newUserSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required(),
    password: Joi.string().alphanum().min(8).max(12).required(),
    confirmPassword: Joi.ref('password'),
});


const updateUserSchema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: [ "com", "net" ]
    }),
    password: Joi.string().alphanum().min(8).max(12),
    confirmPassword: Joi.ref('password')
});


module.exports = {
    newUserSchema,
    updateUserSchema
}