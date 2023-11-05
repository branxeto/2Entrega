import express from "express" ;
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/profile/:username", (req, res) => {
    res.render("Usuarios/profile");
});

router.get("/register", (req, res) => {
    res.render("Usuarios/register",{
        style : 'styleregister.css'
    });
});

router.post("/register" , (req, res) => {
    User.create(req.body);

    res.render("Usuarios/register",{
        style : 'styleregister.css'
    });
});

router.get("/login", (req, res) => {
    res.render("Usuarios/login",{
        style: 'styleLogin.css'
    });
});

router.post("/login", async (req, res) => {
  const currentUser = await User.findOne({ Rut: req.body.Rut });
  if(!currentUser || currentUser.password !== req.body.password){
    res.redirect("/login");
    return;
  }

  const payload = currentUser["_doc"]
  delete payload.password;

  const signedJWT = jwt.sign(payload, "miFirma", {expiresIn: "1h"});

  res.cookie("jwt", signedJWT).redirect("/home");
});

router.get("/list_users", async (req, res) => {
  const users = await User.find({});
    res.render("Usuarios/list_users", {
      allUsers: users.map((current) => {
        return {
          Name: current.Name,
          Rut: current.Rut,
          password: current.password,
        };
      }),
    });
  });

export default router;
