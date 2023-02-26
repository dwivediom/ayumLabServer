import  {Router} from "express"
import Messages from "../modle/Messages.js";
import  uploadFile from "../utils/upload.js";
const router  = Router() ; 

var Limit = 10 ; 
var skip = 0 ; 

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
     
     const newmessage = await  new Messages(message)
     await  newmessage.save() 
      return res.status(200).json(newmessage)
    }catch(err){ 
        console.log(err.message )
        return res.status(400).json(err.message)
    }
})



router.get("/get/:conversationId",async(req, res)=>{

    try{ 
      skip = 0 ; 
      const  message =( await Messages.find({conversationId:req.params.conversationId}).sort({ createdAt: -1 }).limit(Limit)).reverse(); 
      console.log("is running ") 
      return res.status(200).json(message)
        
    }catch(err){ 
         console.log(err.message,"in  messager route file ")
         return res.json({"msg":err.message})
    }
   


}) 



router.get("/oldmsg/:conversationId", async (req,res)=>{ 
   
  try{ 
    skip = skip + Limit  
    const  message =   (await Messages.find({conversationId:req.params.conversationId}).sort({ createdAt: -1 }).skip(skip).limit(Limit)).reverse(); 
    console.log("is running " , message) 
    return res.status(200).json(message)
      
  }catch(err){ 
       console.log(err.message,"in  messager route file ")
       return res.json({"msg":err.message})
  }
 



} )



export default router 