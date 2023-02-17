
import { Router } from "express"
import Labuser from "../modle/Labuser.js"
import User from "../modle/Labuser.js"
import jwt_decode from "jwt-decode"

const router = Router()

router.get('/chatusers', async (req, res) => {
    const query = req.query.q;
  
    try {
      const chatusers = await Labuser.find({
        $or: [
          { email: { $regex: query, $options: 'i' } },
          {  phone: { $regex: query, $options: 'i' } },
        ],
      }).select("-recentChat").limit(4);
  
     return  res.json(chatusers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });




export default router 