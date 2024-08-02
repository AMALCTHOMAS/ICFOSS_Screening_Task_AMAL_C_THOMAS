const Joi = require('joi');

const signupValidation = (req, res, next) => {
    // Joi schema definition
    const schema = Joi.object({
        username: Joi.string().min(5).max(30).required()
            .messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username cannot be empty',
                'string.min': 'Username should have a minimum length of {#limit}',
                'string.max': 'Username should have a maximum length of {#limit}',
                'any.required': 'Username is required'
            }),
        firstname: Joi.string().pattern(/^[A-Za-z]+$/).required()
            .messages({
                'string.pattern.base': 'First Name must only contain alphabetic characters',
                'string.empty': 'First Name cannot be empty',
                'any.required': 'First Name is required'
            }),
        lastname: Joi.string().pattern(/^[A-Za-z]+$/).required()
            .messages({
                'string.pattern.base': 'Last Name must only contain alphabetic characters',
                'string.empty': 'Last Name cannot be empty',
                'any.required': 'Last Name is required'
            }),
        email: Joi.string().email().required()
            .messages({
                'string.email': 'Email must be a valid email format',
                'string.empty': 'Email cannot be empty',
                'any.required': 'Email is required'
            }),
        mobile: Joi.string().pattern(/^\d{10}$/).required()
            .messages({
                'string.pattern.base': 'Phone number must be exactly 10 digits',
                'string.empty': 'Phone number cannot be empty',
                'any.required': 'Phone number is required'
            }),
        password: Joi.string().min(6).max(30)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])'))
            .required()
            .messages({
                'string.min': 'Password should have a minimum length of {#limit}',
                'string.max': 'Password should have a maximum length of {#limit}',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                'string.empty': 'Password cannot be empty',
                'any.required': 'Password is required'
            }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message).join(', ')
        });
    }
    next();
};


const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
            .json({message: "Bad request", error})
    }
    next();
}


module.exports = {
    signupValidation,
    loginValidation,
}