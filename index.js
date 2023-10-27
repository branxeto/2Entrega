import { app } from "./app.js";
import userRouter from "./routes/user.js";
const port = 3001


app.use("",userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get("/home",(req, res) => {
  res.render("home",{
    style: 'indexStyle.css'
  }
  );
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
