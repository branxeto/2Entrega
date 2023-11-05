import express from "express" ;
import User from "../models/user.js";
import Tablas from "../models/Tablas.js";

const router = express.Router();

router.get("/profile/:username", (req, res) => {
    res.render("Usuarios/profile");
});

router.get("/register", (req, res) => {
    res.render("Usuarios/register",{
        style : 'styleregister.css'
    });
});

router.post("/register" , async (req, res) => {
    const tabla = await Tablas.create({
            Nombre_evento: req.body.Nombre_evento,
            Fecha_creacion: new Date(12/12/12), // Establece la fecha actual aquí
            Estado: true,
            voto1: 0,
            voto2: 0,
            voto3: 0,
        });
    console.log("tabla", tabla);

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

    console.log("data", data);

    res.render("Usuarios/list_users", {
        data: data,
    });
});

export default router;
