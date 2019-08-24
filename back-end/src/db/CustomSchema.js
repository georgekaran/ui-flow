const mongoose = require('mongoose')

class CustomSchema extends mongoose.Schema {
    constructor(mySchema) {
        super(mySchema)
    }

    getRequiredFields() {
        let requiredFields = []
        for (let field in this.obj) {
            if (this.obj[field].required === true) {
                requiredFields.push(field)
            }
        }
        return requiredFields
    }
}

module.exports = CustomSchema