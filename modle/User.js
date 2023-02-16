import mongoose from "mongoose";
const Schema = mongoose.Schema;
 
const UserSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        
    },
    email: {
        type: String,
        required:true 

    },
    password: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
    },
    sub:{ 
        type :String,
        required:true 
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    picture: {
        type: String,
       
    },
    recentChat:[
        {  sub:{ 
            type :String
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        email_verified: {
            type: Boolean,
            required: true
        },
        picture: {
            type: String,
            required: true
        },}
    ],
date: { 
    type: Date, 
     default: Date.now, 
} 


});

const User= mongoose.model('Users' , UserSchema);
export default User