//aqui van las rutas de todo lo relacionado a tabla
import express from "express";
import Tablas from "../models/Tablas.js";

const router = express.Router();

//construccion de los links
router.get("/tabla", async (req,res) => {    
    const tablas = await Tablas.find({});

    res.render("Tablas/tabla", {
        //style: 'StyleTabla.css',
        Alltablas: tablas.map((current) => {
            return {
                Nombre_evento: current.Nombre_evento,
                Fecha_creacion: current.Fecha_creacion,
                Detalle_creacion: current.Detalle_creacion,
                Estado: current.Estado,
                Votar: current.Votar
            };
        }),
    });
});

router.get("/crearvotacion", async (req,res) =>{
    res.render("Tablas/crearVotacion",{
        style: 'Stylevotacion.css',
    });
});
router.post("/crearvotacion", (req,res) => {
    console.log("body", data);    
    try{

        const tabla = Tablas.create(req.body, {
            Fecha_creacion: new Date(12,12,12),
            Estado: true,
            voto1: 0,
            voto2: 0,
            voto3: 0,
        });
        
        res.render("Tablas/crearVotacion",{
            style: 'Stylevotacion.css',
        });
    } catch (error) {
        // Manejar el error adecuadamente y devolver una respuesta de error
        res.status(500).send("Error al crear una nueva votación.");
    }
});
/*
router.get("/lugar_votacion",  (req,res)=>{
    res.render("tablas/Lugar_votacion",{
        style: 'CreacionStyle.css'
    });
});
*/

export default router;