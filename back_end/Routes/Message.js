import express from 'express';
import MessageModel from '../Models/Message.js';


const router = express.Router();

// add msg
router.post("/message", async(req, res)=>{
    const newMessage = new MessageModel(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})
//get msg
router.get("/message/:conversationId", async(req, res)=>{
    try{
        const savedMessage = await MessageModel.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;