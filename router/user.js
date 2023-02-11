import { Router } from "express"
import User from "../modle/Labuser.js"

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
         sub:req.body.data.sub
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


export default router 