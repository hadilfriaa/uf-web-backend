const Joi = require('joi');

const userValidation = (req,res,next) =>{
    const userValidationSchema = Joi.object({
        firstName: Joi.string().uppercase().required(),
        lastName: Joi.string().uppercase().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required(),
        isAdmin: Joi.boolean(),
        phone: Joi.string().required()
    });

    const validation = userValidationSchema.validate(req.body);

    console.log(validation);

    if (validation.error) {
        return res.status(400).send({
            error: validation.error.details
        })

    };
    next();
}

module.exports = userValidation;