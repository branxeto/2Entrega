import express from "express" ;
import User from "../models/user.js";

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

router.get("/list_users", async (req, res) => {
    const data = await User.find({});
    res.render("Usuarios/list_users", {
        data: data,
    });
});

export default router;
