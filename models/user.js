const mongoose = require('mongoose')
const Schema = mongoose.Schema
const{isEmail} = require('validator')

const userSchema = new Schema({
    email:{
        type: String,
        required: [ 'please provide an email address'],
        unique: true,
        validate:[isEmail, 'please provide a valid email adress']
    },
    username:{
        type:String,
        required: [ 'please provide a username'],
        unique:true,
        minlength:[7, ' minimum username length is 5'],
        maxlength:[15, 'maximum length is 15']

    },
    password:{
        type:String,
        required: [true,'please provide a password'],
        minlength:[7,]
    },
    profile:{
        type: String,
        required:true,
        default:'https://static.thenounproject.com/png/6216538-200.png'
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)