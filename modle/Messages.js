import mongoose from "mongoose";

const messageSchema  = mongoose.Schema({ 
  
    conversationId:{ 
        type:String , 
    }, 
    senderId:{ 
         type:String
    }, 
    reciverId:{ 
        type : String 
    }, 
    text : { 
        type : String  
    }, 
    type : { 
        type : String 
    }
    
},
{timestamps:true }

)

const Messages = mongoose.model("message", messageSchema); 

export default Messages