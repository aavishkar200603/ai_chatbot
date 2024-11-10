import axios from "axios";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return res;
};

// Update to accept user and token as parameters
export const sendChatRequest = async (message: string, user: any, token: any) => {
  if (!user || !user.email) {
    throw new Error("User email not found");
  }

  const res = await axios.post(
    "/chat/new",
    {
      message,
      token,
      email: user.email, // Send user email in the body
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the headers
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }

  const data = await res.data;
  console.log("on frontend","1",res.data.answer, "2",res.data.text,"3",data.text);
  return res.data.answer;
};

// Update to accept user and token as parameters
export const getUserChats = async (user: any, token: any) => {
  if (!user || !user.email) {
    throw new Error("User email not found");
  }

  const res = await axios.post(
    "/chat/all-chats",
    {
      token,
      email: user.email, // Send user's email in the request body
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    }
  );

  console.log(res.data);

  if (res.status !== 200) {
    throw new Error("Unable to get chats");
  }
  const data = await res.data;

  return data;
};


// Update to accept user and token as parameters
export const deleteUserChats = async (user: any, token: any) => {
  if (!user || !user.email) {
    throw new Error("User email not found");
  }

  const res = await axios.delete("/chat/delete", {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
    },
    data: {
      email: user.email, // Send user's email in the request body
    },
  });

  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
