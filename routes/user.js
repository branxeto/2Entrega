import express from "express" ;
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { tokensValidos } from './tablas.js';
import { verificarToken } from './tablas.js';


const router = express.Router();

router.get("/usuarios/corriente", async (req, res) => {
    const cookie = req.cookies["jwt"];
    if (!cookie) {
        res.json({ success: false, message: "acceso denegado" });
        return;
    }

    try {
        const currentUser = await verificarToken(cookie, 'miFirma');
        console.log("currentUser", currentUser);
        res.render("Usuarios/register", { user: { name: current.name } });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: "acceso denegado" });
    }
});

router.get("/profile/:username", (req, res) => {
    res.render("Usuarios/profile");
});

router.get("/usuarios/crear", (req, res) => {
    res.render("Usuarios/register",{
        style : 'styleregister.css'
    });
});

router.post("/usuarios/crear" , async (req, res) => {
    console.log("data", req.body);
    const veriUsuario = await User.findOne({ Rut: req.body.Rut });
    if(!veriUsuario){
        User.create(req.body);
        return res.json({
        "success": true,
        "message": "ya existe este usuario"
        });
    }
    return res.json({
        "success": false,
        "message": "ya existe este usuario"
    });
});

router.get("/usuarios/ingresar", (req, res) => {
    res.render("usuarios/login",{
        style: 'styleLogin.css'
    });
});

router.post("/usuarios/ingresar", async (req, res) => {
    

  const currentUser = await User.findOne({ Rut: req.body.Rut });
  if(!currentUser || currentUser.password !== req.body.password){
    res.json({success: false, message: "usuario o contraseña incorrecta"});
    return;
  }
  const payload = currentUser["_doc"]
  delete payload.password;

  const signedJWT = jwt.sign(payload, "miFirma", {expiresIn: "1h"});
  tokensValidos.push(signedJWT);
  res.json({success: true, jwt: signedJWT})
  //res.cookie("jwt", signedJWT).redirect("/crearvotacion");
});

export default router;
