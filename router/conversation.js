import Conversation from "../modle/Conversation.js";
import { Router } from "express";
import Labuser from "../modle/Labuser.js";

const router = Router() ; 

router.post("/set",async(req,res)=>{ 
    try{ 
        const senderId = req.body.data.SenderId  
        const reciverId = req.body.data.ReciverId 
         console.log( "set",req.body)
     const conversation = await Conversation.findOne({members:{$all:[senderId , reciverId]}})
       if(conversation){ 
        console.log(" set converstaion is running 1")
         return res.json({"msg":"conversation is already exist "});
       }

    const   newconversation = new Conversation( { 
           members:[senderId,reciverId]
    }) 
     console.log(" set converstaion is running ")
     await  newconversation.save()
      
      const  senderData = await Labuser.findOne({sub:senderId})
      const   reciverData = await Labuser.findOne({sub:reciverId})
      

      senderData.recentChat.push(reciverData)
      reciverData.recentChat.push(senderData)

      await senderData.save() 
      await reciverData.save()
      
       

     res.status(200).json(conversation)

    }catch(err){ 
        console.log("/setconverstaion api backend ",err.message)
        res.status(400).json(err.message)
    }
})
router.post("/get" , async(req, res)=>{ 
      try{ 
        
        const senderId = req.body.data.SenderId  
        const reciverId = req.body.data.ReciverId 
        const conversation = await Conversation.findOne({members:{$all:[senderId , reciverId]}})
        

        return res.status(200).json(conversation)
      }catch(err){ 
         console.log(err.message); 
         return res.status(400).json(err.message)

      }
})






export default router 