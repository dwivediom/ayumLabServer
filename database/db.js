import mongoose from "mongoose"
import  monogourl  from "./key.js"

 const dbconnection = async()=>{ 
     try {
       await  mongoose.connect( monogourl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
       console.log("data base connection stablished ")
     }catch(err){ 
        console.log("error is data base ")
       console.log(err.message)
     }
   
}

export default dbconnection