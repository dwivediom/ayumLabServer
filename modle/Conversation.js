import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema({
    members: {
        type: Array
    },
    members_id: [
        {
            member_id: {
                 type : mongoose.Schema.Types.ObjectId, 
                 ref:"labuser"
            }
        }],
    message: [
        {
            conversationId:{ 
                type: mongoose.Schema.Types.ObjectId,  
                ref:"conversation" 
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
            },
            createdAt:{
                 type:Date, 
                 default :Date.now()
            }
            
        }
       
       
    ]
},
{timestamps:true }


)

const Conversation = mongoose.model("conversation", ConversationSchema)

export default Conversation; 