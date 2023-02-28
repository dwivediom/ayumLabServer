import  {Router} from "express"
import Conversation from "../modle/Conversation.js";
import Messages from "../modle/Messages.js";
import  uploadFile from "../utils/upload.js";
const router  = Router() ; 

var Limit = -10 ; 
var skip = -10  ; 
var skipnitial = 10 

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
      skip = -10  ; skipnitial = 10 ; 
      const  message = await Conversation.findOne({_id:req.params.conversationId} , {message: {$slice: Limit } } )
      
      return res.status(200).json(message.message)
        
    }catch(err){ 
         console.log(err.message,"in  messager route file ")
         return res.json({"msg":err.message})
    }
   


}) 



router.get("/oldmsg/:conversationId", async (req,res)=>{ 
   
  try{ 
     if(skip === 0){ return res.status(200).json([]) }
      
    skip = skip - skipnitial;  
   
    const  message = await Conversation.findOne({_id:req.params.conversationId} , {message: {$slice: [skip , 10]} } ); 
     let  val = message.__v +skip 
     if(  message.__v+skip <= 0 ){ 
        skip = 0 ; 
        skipnitial=0 ; 
     }
   
    return res.status(200).json(message.message)
      
  }catch(err){ 
       console.log(err.message,"in  messager route file ")
       return res.json({"msg":err.message})
  }
 



} )



export default router 