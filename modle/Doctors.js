import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({ 

 name : { 
    type : String,
    required : true
 }, 
 email : {
    type : String,
    
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
    default:Date.now}, 

})
const  Doctor= mongoose.model('doctor', DoctorSchema); 
export default Doctor