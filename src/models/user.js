const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "Password"')
            }
        }
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profileInfo: {
        bDay: {
            type: Number,
            default: null,
            required: true
        },
        bMonth: {
            type: Number,
            default: null,
            required: true
        },
        bYear: {
            type: Number,
            default: null,
            required: true
        },
        locationToVisit: {
            country: {
                type: String,
                trim: true,
                default: null
            },
            state: {
                type: String,
                trim: true,
                default: null
            },
            county: {
                type: String,
                trim: true,
                default: null
            }
        },
        bio: {
            type: String,
            trim: true,
            default: null
        }
    },
    matches: [{
        matchedUser: {
            type: String
        }
    }],
    bookmarks: [{
        markedUser: {
            type: String
        }
    }]
}, {
    timestamps: true
})

//Removes certain items from returning
userSchema.methods.toJSON = function () {
    const user  = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User