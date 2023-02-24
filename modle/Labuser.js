import mongoose from "mongoose";

const LabuserSchema = mongoose.Schema({
    sub:{ 
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
    },
    userType:{
         type:String, 
         default:"Lab" 
    },
    endpoint:{
         type:String
    }, 
    p256dh:{
        type:String
    }, 
    auth:{ 
         type:String
    },
    recentChat:[ ]
         
    

})

const Labuser = mongoose.model("labuser",LabuserSchema)
export default Labuser