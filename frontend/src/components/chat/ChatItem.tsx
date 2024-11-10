// // import React from "react";
// import { Box, Avatar, Typography } from "@mui/material";
// // import { useAuth } from "../../context/AuthContext";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// function extractCodeFromString(message: string) {
//   if (message.includes("```")) {
//     const blocks = message.split("```");
//     return blocks;
//   }
// }

// function isCodeBlock(str: string) {
//   if (
//     str.includes("=") ||
//     str.includes(";") ||
//     str.includes("[") ||
//     str.includes("]") ||
//     str.includes("{") ||
//     str.includes("}") ||
//     str.includes("#") ||
//     str.includes("//")
//   ) {
//     return true;
//   }
//   return false;
// }
// const ChatItem = ({
//   content,
//   role,
// }: {
//   content: string;
//   role: "user" | "assistant";
// }) => {
//   const messageBlocks = extractCodeFromString(content);
//   // const auth = useAuth();
//   return role == "assistant" ? (
//     <Box
//       sx={{
//         display: "flex",
//         p: 2,
//         bgcolor: "#004d5612",
//         gap: 2,
//         borderRadius: 2,
//         my: 1,
//       }}
//     >
//       <Avatar sx={{ ml: "0" }}>
//         <img src="openai.png" alt="openai" width={"30px"} />
//       </Avatar>
//       <Box>
//         {!messageBlocks && (
//           <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
//         )}
//         {messageBlocks &&
//           messageBlocks.length &&
//           messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//               <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//               </SyntaxHighlighter>
//             ) : (
//               <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
//             )
//           )}
//       </Box>
//     </Box>
//   ) : (
//     <Box
//       sx={{
//         display: "flex",
//         p: 2,
//         bgcolor: "#004d56",
//         gap: 2,
//         borderRadius: 2,
//       }}
//     >
//       {/* <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
//         {auth?.user?.name[0]}
//         {auth?.user?.name.split(" ")[1][0]}
//       </Avatar> */}
//       <Box>
//         {!messageBlocks && (
//           <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
//         )}
//         {messageBlocks &&
//           messageBlocks.length &&
//           messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//               <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//               </SyntaxHighlighter>
//             ) : (
//               <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
//             )
//           )}
//       </Box>
//     </Box>
//   );
// };

// export default ChatItem;


import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.map((block, index) => 
            isCodeBlock(block) ? (
              <SyntaxHighlighter 
                key={`assistant-code-${index}`} // Unique key for each code block
                style={coldarkDark} 
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography 
                key={`assistant-text-${index}`} // Unique key for each text block
                sx={{ fontSize: "20px" }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.map((block, index) => 
            isCodeBlock(block) ? (
              <SyntaxHighlighter 
                key={`user-code-${index}`} // Unique key for each code block
                style={coldarkDark} 
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography 
                key={`user-text-${index}`} // Unique key for each text block
                sx={{ fontSize: "20px" }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
