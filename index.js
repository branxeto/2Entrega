import { app } from "./app.js";
import userRouter from "./routes/user.js";
import TablasRouter from "./routes/tablas.js";

const port = 3001;

app.use("", userRouter);
app.use("", TablasRouter);

app.get('/', (req, res) => {
  res.render("home",{
    style: 'indexStyle.css'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
