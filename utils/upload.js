
import * as dotenv from "dotenv"
dotenv.config()
import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"

import monogourl from "../database/key.js"

const url = process.env.MONGO_URL ;

const storage = new GridFsStorage({
    url:url ,   
    options:{useUnifiedTopology:true , useNewUrlParser:true }, 
    file:(req, file )=>{ 

        const  match = ["image/png" , "image/jpeg" ,"image/jpg" ,"application/pdf"]; 
   
        if(match.indexOf(file.mimetype)=== -1 ){ 

           
            return `${Date.now()}-file-${file.originalname}`
        }

        return {
            //  bucketName : "photos", 
             filename : `${Date.now()}-file-${file.originalname}`
 
        }
    }

})

export default multer({storage})