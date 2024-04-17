import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import e from 'express';
const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avtar: {
        type: String, // cloudnary url
        required: true
    },
    coverimage: {
        type: String, // cloudnary url
        required: true,
    },
    watchhistory: [
        { type: Schema.Types.ObjectId, ref: 'Video' }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    }

}, { timestamps: true });

user_schema.pre('save', async function (next) {
    if (!this.isModified('password')) { return next() };
    this.password = await bcrypt.hash(this.password, 10);
})
user_schema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

user_schema.methods.genrateAccessToken = function () {

    jwt.sign(
        {
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

user_schema.methods.genrateRefreshToken = function () {
   jwt.sign(
       {
           _id: this._id,
          
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn: process.env.RERESH_TOKEN_EXPIRES
       }
   )

}
export const User = mongoose.model('User', user_schema);
