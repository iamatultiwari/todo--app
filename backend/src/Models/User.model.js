import mongoose from "mongoose";
import {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

 const UserSchema  = new Schema(
    {
        Username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        email:{
            type:String,
            required:[true,"please enter the email"]
        },
        fullname:{
            type:String,
            trim:true,
            index:true,
            required:true
        }
    },{ timestamps: true }
 );
// check if - not modified then return  next
// Hash password before saving user


UserSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next();
  this.password =   await bcrypt.hash(this.password,10)
    next()
})

//COMAPRE PASSWORD
UserSchema.methods.isPasswordCorrect =  async function (password) {
   return  await bcrypt.compare(password,this.password)
}

//ACCESS TOKEN
UserSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        Username:this.Username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

//REFRESH TOKEN
UserSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",UserSchema)