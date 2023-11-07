import { app } from "./app.js";
import userRouter from "./routes/user.js";
import TablasRouter from "./routes/tablas.js";

<<<<<<< HEAD
const port = 3001;
=======
const port = 3000;
>>>>>>> 9e8cd3fb77fa7658e507746243c061bb18802926

app.use("", userRouter);
app.use("", TablasRouter);

app.get('/', (req, res) => {
  res.render("home",{
    style: 'indexStyle.css'
<<<<<<< HEAD
  });
=======
  }
  );
>>>>>>> 9e8cd3fb77fa7658e507746243c061bb18802926
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
