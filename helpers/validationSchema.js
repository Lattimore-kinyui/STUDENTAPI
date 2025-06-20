const Joi = require('joi');

const authschema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

  module.exports ={
    authSchema: authschema
  }