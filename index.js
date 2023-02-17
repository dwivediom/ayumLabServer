import express from 'express'
import dbconnection from './database/db.js';
import cors from "cors"
import bodyParser from "body-parser"
import labuser from "./router/Labuser.js"
import conversation from "./router/conversation.js"
import  message from "./router/message.js"
import  uploadfiles from "./router/uploadfiles.js"
import  search from "./router/search.js"



const app = express() 
const port = 8000; 
//data base connection 
dbconnection()

//api calls 
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true }))

app.use("/search" , search)
app.use( "/user",labuser)
app.use("/conversation", conversation)
app.use("/message", message)
app.use("/file", uploadfiles)


app.listen( port , ()=>{ 
     console.log("server is running on " , port )
})