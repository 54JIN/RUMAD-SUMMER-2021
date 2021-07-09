const mongoose = require('mongoose');

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
            default: null
        },
        bMonth: {
            type: Number,
            default: null
        },
        bYear: {
            type: Number,
            default: null
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
    }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User