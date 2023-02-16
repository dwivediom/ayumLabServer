import { Router } from "express"
import Labuser from "../modle/Labuser.js"
import User from "../modle/Labuser.js"
import jwt_decode from "jwt-decode"

const router = Router()


router.post("/add", async (req, res) => {
  try {
    const  user = await User.findOne({email:req.body.data.email})
    if(user){ 
      return res.json({msg:" user already exist "})
    }
    const  userData = { 
        email :req.body.data.email,
        name :req.body.data.name,
        email_verified :req.body.data.email_verified,
        picture :req.body.data.picture ,
         sub:req.body.data.sub,
        
    }
     const newuser  =  new User(userData)
    await  newuser.save()
    console.log(req.body.data.email)
    res.json("woriing")

  } catch (err) {
    console.log(err.message)
  }
})



router.get("/data", async (req,res)=>{ 
   try{ 
     const user = await User.find({})
     res.json(user)
      return  ; 
   }catch(error){ 
     console.log(error.message)
   }
})

router.post("/userdata" , async (req,res)=>{ 

    try{ 
           let jwtdata= jwt_decode( req.body.jwt)
          
       
        const userData = await Labuser.findOne({sub:jwtdata.sub}); 
      
        
            return res.json(userData)
            
    }catch(error){ 
       
      console.log(error.message)
      res.status(400).json(error.message)
    }
} )

export default router 