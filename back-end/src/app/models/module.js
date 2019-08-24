const mongoose = require('../../db')
const CustomSchema = require('../../db/CustomSchema')

const ModuleSchema = new CustomSchema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        default: "#",
    },
    icon: {
        type: String,
        required: false,
    },
    modules: [this],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Module = mongoose.model('Module', ModuleSchema)

module.exports = Module