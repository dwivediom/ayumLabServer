import mongoose from "mongoose"
import  monogourl  from "./key.js"
import * as dotenv from 'dotenv'
dotenv.config()

 const dbconnection = async()=>{ 
     try {
       await  mongoose.connect( process.env.MONGO_URL,{
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