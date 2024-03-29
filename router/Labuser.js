import { Router } from "express";
import Labuser from "../modle/Labuser.js";
import User from "../modle/Labuser.js";
import jwt_decode from "jwt-decode";
import Conversation from "../modle/Conversation.js";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.data.email });
    if (user) {
      return res.json({ msg: "user already exist" });
    }
    const userData = {
      email: req.body.data.email,
      name: req.body.data.name,
      email_verified: req.body.data.email_verified,
      picture: req.body.data.picture,
      sub: req.body.data.sub,
    };
    const newuser = new User(userData);
    await newuser.save();

    return res.status(200).json("user added ");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/data", async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
    return;
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/userdata", async (req, res) => {
  try {
    let jwtdata = jwt_decode(req.body.jwt);

    const userData = await Labuser.findOne({ sub: jwtdata.sub });

    return res.json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

router.post("/recentchat", async (req, res) => {
  try {
    let jwtdata = jwt_decode(req.body.jwt);
    const userData = await Labuser.findOne({ sub: jwtdata.sub });
    const chatconversation = await Conversation.find({
      _id: { $in: userData.recentChat },
    })
      .limit(10)
      .sort({ updatedAt: -1 });

    let recentusers = [];
    chatconversation.map((user) => {
      user.members.map(async (member) => {
        if (member != jwtdata.sub) {
          recentusers.push(member);
        }
      });
    });
    const user = await Labuser.aggregate([
      { $match: { sub: { $in: recentusers } } },
      {
        $addFields: {
          __order: {
            $indexOfArray: [recentusers, "$sub"],
          },
        },
      },
      { $sort: { __order: 1 } },
    ]);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { name, picture, endpoint, p256dh, auth, FCMtoken } = req.body;
    let jwtdata = jwt_decode(req.body.jwt);
    const data = { name, picture, endpoint, p256dh, auth, FCMtoken };
    const userData = await Labuser.findOneAndUpdate(
      { sub: jwtdata.sub },
      data,
      { new: true }
    );
    console.log("fcm", name, ": ", FCMtoken);
    return res.json({ msg: "data is updated " });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
});

export default router;
