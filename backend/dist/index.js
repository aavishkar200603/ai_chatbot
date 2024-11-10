import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("server is running👍"));
})
    .catch((err) => console.log(err));
// app.get('/',(req,res,next)=>console.log("you are on main rote"));
// app.get('/hello',(req,res,next)=>res.send("hello"));
// app.post('/h1',(req,res,next)=>
// {
//   console.log(req.body.name);
//   return res.send("hello");
// });
// app.put('/h2',(req,res,next)=>
// {
//   console.log(req.body.name);
//   return res.send("hello");
// });
// app.delete('/h3/:id',(req,res,next)=>
// {
//   console.log(req.params.id);
//   return res.send("hello");
// })
//# sourceMappingURL=index.js.map