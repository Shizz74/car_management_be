//Validation
const Joi = require('@hapi/joi');


//Registration validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).pattern(new RegExp(/^[A-Za-z0-9]+$/)).required().error(errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "string.empty":
                  err.message = `${err.local.key}_is_empty`;
                  break;
                case "string.min":
                  err.message = `${err.local.key}_too_short`;
                  break;
                case "string.max":
                  err.message = `${err.local.key}_too_long`;
                  break;
                  case "string.pattern.base":
                  err.message = `${err.local.key}_wrong_char`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string().min(6).max(255).required().email().error(errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "string.empty":
                  err.message = `${err.local.key}_is_empty`;
                  break;
                case "string.min":
                  err.message = `${err.local.key}_too_short`;
                  break;
                case "string.max":
                  err.message = `${err.local.key}_too_long`;
                  break;
                  case "string.email":
                  err.message = `${err.local.key}_wrong`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        password: Joi.string().min(8).max(255).required().error(errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "string.empty":
                  err.message = `${err.local.key}_is_empty`;
                  break;
                case "string.min":
                  err.message = `${err.local.key}_too_short`;
                  break;
                case "string.max":
                  err.message = `${err.local.key}_too_long`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        role: Joi.string()
    });
    return schema.validate(data)
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;