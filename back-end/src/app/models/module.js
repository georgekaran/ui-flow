const mongoose = require('../../db')

const ModuleSchema = new mongoose.Schema({
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
        required: true
    },
    modules: [this],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Module = mongoose.model('Module', ModuleSchema)

module.exports = Module