import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

import {generate} from "../controllers/chats.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post("/new",generate);
chatRoutes.post("/all-chats", sendChatsToUser);
chatRoutes.delete("/delete",  deleteChats);

export default chatRoutes;
