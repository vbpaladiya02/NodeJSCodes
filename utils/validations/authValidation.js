const joi = require("joi");

exports.registerKeys = joi
    .object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().required().label("Email"),
        password: joi.string().required().label("Password"),
        mobNo: joi.string().required().label("Mobile Number"),
    })
    .unknown(true);