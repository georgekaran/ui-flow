const Joi = require('@hapi/joi')

class Validate {
    constructor(schema) {
        this.schema = schema
    }

    validate(body) {
        Joi.validate(body, this.schema)
    }
}