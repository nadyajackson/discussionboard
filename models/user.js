const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    /*  email: {
        type: email,
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true
    }, */
    phoneNumber: {
        type: Number, 
        required: false,
        unique: true
    },
    username:{
        type:String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    datePosted: {
        type: Date,
        required: true, 
        default: Date.now
    },
    dateEdited: {
        type: Date,
        required: false,
        default: Date.now
    }
})

userSchema.pre('save', function(next){
    const user =this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 8, (err, hash) => {
        if(err) return next(err)
        user.password= hash
        next()
    })
})

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    // console.log(this.password, "check")
    // console.log(passwordAttempt, "written")
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>{
        //console.log(isMatch, "match")
       if(err) return callback(err)
       return callback(null, isMatch)
    })
}

userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)