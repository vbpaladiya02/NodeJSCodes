const joi = require("joi");
exports.createKeys = joi
    .object({
        name: joi.string().required().label("Task name"),
        desc: joi.string().required().label("Task description")
    })
    .unknown(false);
exports.updateKeys = joi
    .object({
        name: joi.string().label("Task name"),
        desc: joi.string().label("Task description"),
        isActive: joi.boolean()
    })
.unknown(false);