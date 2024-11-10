import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'assistant'], // Restrict values to 'user' or 'assistant'
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically sets the timestamp
    },
});
// Export the Chat model
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
//# sourceMappingURL=chat.js.map