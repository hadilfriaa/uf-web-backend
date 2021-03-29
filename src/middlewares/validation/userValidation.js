const Joi = require('joi');

const userValidation = (req,res,next) =>{
    const userValidationSchema = Joi.object({
        firstName: Joi.string().uppercase().required(),
        lastName: Joi.string().uppercase().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        IsAdmin: Joi.boolean(),
    });

    const validation = userValidationSchema.validate(req.body);

    console.log(validation);

    if (validation.error) {
        return res.send({
            error: validation.error
        })

    };
    next();
}

module.exports = userValidation;