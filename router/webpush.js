import webpush from "web-push"
import{ Router}  from "express"
// const { publicKey, privateKey } = webpush.generateVAPIDKeys();
const publicKey="BHlZrVcFbtwwcskZb_GsoI_24awXaocN8t4u97h8V0P5-qJICH2OABCDzoXLy4cHDMVe4WToZ333-lco3awQk8U"
const  privateKey="rrH160nnEr_YtjXYj3Wa5-qeDbtY830laP_9pnEsWNE"

const router = Router() 


router.post("/notify", async (req,res)=>{ 
   
try{


const publicVapidKey = publicKey; // Replace with your own public key
const privateVapidKey =  privateKey; // Replace with your own private key

webpush.setVapidDetails('mailto:dwivediom00@gmail.com', publicVapidKey, privateVapidKey);

const sendNotification = (subscription, data) => {
  webpush.sendNotification(subscription, JSON.stringify(data))
    .then(() => {
      console.log('Push notification sent');
    })
    .catch(error => {
      console.error('Error sending push notification:', error);
    });
};

// Example usage
const subscription = {
  endpoint: req.body.endpoint
  
  ,
  keys: {
    p256dh: req.body.p256dh,
    auth: req.body.auth
  }
};

const data = {
  title: ` new message from ${req.body.sender} `,
  body:  req.body.message,
   actions: [
        { action: 'explore', title: 'Explore' },
        { action: 'close', title: 'Close' }
      ]
};
c
sendNotification(subscription, data);
 
  return res.status(200).json({subscription})
}catch(error){ 
  return    res.status(400).json(error.message)
}
})

export default router 