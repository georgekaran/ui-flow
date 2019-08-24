class Validation {
    
    constructor(model) {
        this.model = model;    
    }

    isEverythingValid(body) {
        return (!this.isBodyEmpty(body) && this.isSchemaValid(body))
    }

    isSchemaValid(body) {
        const requiredFields = this.model.schema.getRequiredFields();
        for (let bodyArg in body) {
            if (!requiredFields.includes(bodyArg)) {
                return false;
            }
        }
        return true;
    }

    isBodyEmpty(body) {
        if (body === undefined || body === null) return true;
        return (Object.entries(body).length === 0 && body.constructor === Object) ? true : false;
    }
}

module.exports = Validation