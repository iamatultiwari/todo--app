import mongoose from "mongoose";
import {Schema} from "mongoose";
import bcrypt from "bcrypt"

 const UserSchema  = new Schema(
    {
        Username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            requred:[true,"password is required"]
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
    },[timestamp = true]
 );
// check if - not modified then return  next
// Hash password before saving user


UserSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next();
  this.password =   await bcrypt.hash(this.password,10)
    next()
})


UserSchema.methods.isPasswordCorrect =  async function (password) {
   return  await bcrypt.compare(password,this.password)
}

