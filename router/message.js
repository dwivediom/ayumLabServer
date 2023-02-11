import  {Router} from "express"
import Messages from "../modle/Messages.js";
import  uploadFile from "../utils/upload.js";
const router  = Router() ; 

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
      const  message =  await  Messages.find({conversationId:req.params.conversationId}); 
            
      return res.status(200).json(message)

    }catch(err){ 
         console.log(err.message,"in  messager route file ")
         return res.json({"msg":err.message})
    }
   


}) 







export default router 