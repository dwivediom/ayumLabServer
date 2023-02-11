import express from 'express'
import dbconnection from './database/db.js';
import cors from "cors"
import bodyParser from "body-parser"
import user from "./router/user.js"
import conversation from "./router/conversation.js"
import  message from "./router/message.js"
import  uploadfiles from "./router/uploadfiles.js"



const app = express() 
const port = 8000; 
//data base connection 
dbconnection()

//api calls 
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true }))

app.use( "/user",user)
app.use("/conversation", conversation)
app.use("/message", message)
app.use("/file", uploadfiles)


app.listen( port , ()=>{ 
     console.log("server is running on " , port )
})