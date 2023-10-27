import express from "express" ;

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("Usuarios/register",{
        style : 'styleregister.css'
    });
});

router.get("/login", (req, res) => {
    res.render("Usuarios/login",{
        style: 'styleLogin.css'
    });
});
export default router;