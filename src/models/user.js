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
            type: Number
        },
        bMonth: {
            type: Number
        },
        bYear: {
            type: Number
        },
        locationToVisit: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true
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