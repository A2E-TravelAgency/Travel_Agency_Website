import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String, 
    },
    sender:{
        type:String,
    },
    text:{
        type:String,
    },
    createdAt: { type: Date, required: true},
},
);

const Message = mongoose.model("Message",MessageSchema);
export default Message;