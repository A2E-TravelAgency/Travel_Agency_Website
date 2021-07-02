import mongoose from 'mongoose';
const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array, 
    },
    created_at: { type: Date, required: true, default: Date.now },
},
    {timestamps:true});

const Conversation = mongoose.model("Conversation",ConversationSchema);
export default Conversation;