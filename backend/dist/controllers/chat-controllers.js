import User from "../models/Users.js";
// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message,email } = req.body;
//   try {
//     const user = await User.findOne({email});
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });
//     // grab chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });
//     // send all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };
export const sendChatsToUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        // Check if the user exists by email
        const user = await User.findOne({ email });
        console.log(user);
        // If the user does not exist, return an error response
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        // Return the user's chats if everything is fine
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        // Return a 500 Internal Server Error with the error message
        return res.status(500).json({ message: "Something went wrong", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map