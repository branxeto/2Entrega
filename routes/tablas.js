//aqui van las rutas de todo lo relacionado a tabla
import express from "express";
import Tablas from "../models/Tablas.js";

const router = express.Router();

//construccion de los links
router.get("/tabla", async (req,res) => {    
    const tablas = await Tablas.find({});

    res.render("Tablas/tabla", {
        style: 'StyleTabla.css',
        Alltablas: tablas.map((current) => {
            return {
                ID: current.ID,
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
    const tabla ={
        ID: Math.floor(Math.random()*1000) + 1,
        Nombre_evento: req.body.Nombre_evento,
        Fecha_creacion: new Date(), // Establece la fecha actual aquí
        Estado: true,
        Persona1: req.body.Persona1,
        Persona2: req.body.Persona2,
        Persona3: req.body.Persona3,
        voto1: 0,
        voto2: 0,
        voto3: 0,
    };
    Tablas.create(tabla);
    console.log("data", tabla);     
    res.render("Tablas/crearVotacion",{
        style: 'Stylevotacion.css',
    });

});

router.get("/tabla/:Nombre_tabla", async (req,res) => {
    const info = await Tablas.findOne({Nombre_evento: req.params.Nombre_tabla});
    res.render("Tablas/Lugarvotacion",{
        style: 'CreacionStyle.css',
        data: info,
    });
});
router.post("/tabla/:Nombre_tabla", async (req,res) => {
    const actualizar = await Tablas.findOne({Nombre_evento: req.params.Nombre_tabla});
    if(req.body.voto1 === true){
        Tablas.updateOne({
            voto1: actualizar.voto1 + 1
        });
    }
    res.render("Tablas/Lugarvotacion",{
        style: 'CreacionStyle.css',
        data: info,
    });
});


export default router;