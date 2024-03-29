import  {Router} from "express"
import Messages from "../modle/Messages.js";
import  uploadFile from "../utils/upload.js";

import grid from "gridfs-stream"
import { GridFsStorage } from "multer-gridfs-storage";
import  mongoose from "mongoose";

const conn = mongoose.connection; 
let gfs, gridfsbuket ; 
conn.once('open' ,()=>{
  gridfsbuket= new mongoose.mongo.GridFSBucket(conn.db , { 
     bucketName:"fs"
  })
  gfs = grid(conn.db , mongoose.mongo); 
  gfs.collection('fs')
})








const router = Router()
router.post("/upload" , uploadFile.single("file"), async (req, res)=> { 
    try{ 
     let url = "https://www.chatserver.ayum.in"
     if(!req.file){ 
       return res.status(400).json("file not found")
     }
    
     const imageurl = `${url}/file/get/${req.file.filename}`
       res.status(200).json(imageurl)
    }catch(err){ 
      res.status(400).json({"msg":err})
      console.log(err)
    }
       
})
router.get("/get/:filename", async(req, res)=>{ 
   try{ 
     const file = await gfs.files.findOne({filename:req.params.filename}); 
  
     const readStream = gridfsbuket.openDownloadStream(file._id); 
     readStream.pipe(res);  

   }catch(err){ 
     res.status(400).json(err)
    console.log(err) ; 


   }
})  







export default router 