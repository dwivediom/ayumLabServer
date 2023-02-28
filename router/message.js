import  {Router} from "express"
import Conversation from "../modle/Conversation.js";
import Messages from "../modle/Messages.js";
import  uploadFile from "../utils/upload.js";
const router  = Router() ; 

var Limit = -10 ; 
var skip = -3 ; 

router.post("/add" ,async(req,res)=>{ 
     try{ 

       console.log("messange route ", req.body.senderId)
     const  message = { 
          conversationId : req.body.conversationId,
          senderId : req.body.senderId, 
          reciverId: req.body.reciverId , 
          text: req.body.text , 
          type: req.body.type , 

     }

     
    //  const newmessage = await  new Messages(message)
     const conversation = await Conversation.findOne({_id: req.body.conversationId})
       await conversation.message.push(message)
     await conversation.save() 
      return res.status(200).json(message)
    }catch(err){ 
        console.log(err.message )
        return res.status(400).json(err.message)
    }
})



router.get("/get/:conversationId",async(req, res)=>{

    try{ 
      skip = -10 ; 
      const  message = await Conversation.findOne({_id:req.params.conversationId} , {message: {$slice: Limit } } )
      console.log("is running ", message.message) 
      return res.status(200).json(message.message)
        
    }catch(err){ 
         console.log(err.message,"in  messager route file ")
         return res.json({"msg":err.message})
    }
   


}) 



router.get("/oldmsg/:conversationId", async (req,res)=>{ 
   
  try{ 
    skip = skip -10;  
    const  message = await Conversation.findOne({_id:req.params.conversationId} , {message: {$slice: [skip , 10]} } ); 
    console.log("is old running " , message) 
    return res.status(200).json(message.message)
      
  }catch(err){ 
       console.log(err.message,"in  messager route file ")
       return res.json({"msg":err.message})
  }
 



} )



export default router 