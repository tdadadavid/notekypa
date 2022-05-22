const Joi = require('joi');

const newNoteSchema = Joi.object({
   title: Joi.string().required(),
   note: Joi.string().max(255),
});

const updateNoteSchema = Joi.object({
   title: Joi.string(),
   note: Joi.string().max(255),
});

module.exports = {
    newNoteSchema,
    updateNoteSchema
};