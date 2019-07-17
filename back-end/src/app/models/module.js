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
    modules: [this],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Module = mongoose.model('Module', ModuleSchema)

module.exports = Module