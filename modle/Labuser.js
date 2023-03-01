import mongoose from "mongoose";

const LabuserSchema = mongoose.Schema({
    sub:{ 
        type :String
    },
    name: {
        type: String,
       
    },
    email: {
        type: String,
        
    },
    email_verified: {
        type: Boolean,
        
    },
    picture: {
        type: String,
       
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