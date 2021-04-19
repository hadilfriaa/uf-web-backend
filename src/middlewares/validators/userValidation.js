const Joi = require('joi');

const userValidation = (req,res,next) =>{
    const userValidationSchema = Joi.object({
        firstName: Joi.string().uppercase().required(),
        lastName: Joi.string().uppercase().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required(),
        isAdmin: Joi.boolean(),
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