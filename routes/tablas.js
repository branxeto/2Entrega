//aqui van las rutas de todo lo relacionado a tabla
import express from "express";

const router = express.Router();

//construccion de los links
router.get("/tabla", (req,res) => {
    res.render("tablas/tabla", {
        style: 'StyleTabla.css'
    });
})

export default router;
