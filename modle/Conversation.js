import mongoose  from "mongoose";

const ConversationSchema = mongoose.Schema({ 
    members: { 
         type:Array
    }, 
    message:{ 
        type : String 
    }
}, 
{
     timestamp:true 
}


)

const Conversation = mongoose.model("conversation" ,ConversationSchema)

export default Conversation ; 