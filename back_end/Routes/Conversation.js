import express from 'express';
import ConversationModel from '../Models/Conversation.js';
import Utilisateur from '../Models/Utilisateurs.js';

const router = express.Router();
//new conv
router.post("/conversation", async(req, res)=>{
const newConversationModel = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
});
    try{
        const savedConversation = await newConversationModel.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
})
//get user conv
router.get("/conversation/:userId", async(req, res)=>{
    try{
        const conversation = await ConversationModel.find({
            members:{ $in: [req.params.userId]},
        });
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/users", async(req, res)=>{
    const userId = req.query.userId;
    
    try{
        const user = await Utilisateur.findById(userId);

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})



export default router;