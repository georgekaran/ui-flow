const mongoose = require('../../db')
const bcrypt = require('bcrypt')
const CustomSchema = require('../../db/CustomSchema')

const UserSchema = new CustomSchema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        select: false,
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        default: "no-image",
    },
    passwordResetToken: {
        type: String,
        default: ""
    },
    passwordResetExpires: {
        type: Date,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User