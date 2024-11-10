"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const cohere_ai_1 = require("cohere-ai");
const User = require("../models/Users");
const Chat = require("../models/chat");
const cohere = new cohere_ai_1.CohereClientV2({
    token: 'VXnjkMLSVebOwrSwKzfFdKVA1miKN1840MHHrTxd',
});
async function generate(req, res) {
    try {
        const { email, message } = req.body;
        console.log("Received request with email:", email, "and message:", message);
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Call the Cohere API to get the assistant's response
        const response = await cohere.chat({
            model: 'command-r-plus',
            messages: [
                {
                    role: 'user',
                    content: message,
                },
            ],
        });
        // Extract the assistant's response
        const answer = response.message.content[0];
        console.log('Assistant answer:', answer);
        // Prepare chat objects for user and assistant
        const userChat = { role: 'user', content: message };
        const assistantChat = { role: 'assistant', content: answer };
        // Update the user's chat history
        const updateResult = await User.updateOne({ email }, { $push: { chats: { $each: [userChat, assistantChat] } } });
        // Log the update result
        console.log("Update result:", updateResult);
        // Send the assistant's response to the frontend
        res.json({ answer });
    }
    catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}
// export async function generate(req, res) {
//     try {
//       const {message} = req.body; // Get the incoming message from the request body
//       // Call the Cohere API
//       const response = await cohere.chat({
//         model: 'command-r-plus',
//         messages: [
//           {
//             role: 'user',
//             content: message, // Use the incoming message
//           },
//         ],
//       });
//       // Extract the response content
//       const answer = response.message.content[0];
//       console.log(answer);
//       // Send the answer back as a response to the frontend
//       res.json({ answer });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Something went wrong!' });
//     }
//   }
//# sourceMappingURL=chats.cjs.map