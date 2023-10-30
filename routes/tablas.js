//aqui van las rutas de todo lo relacionado a tabla
import express from "express";
import Tablas from "../models/Tablas.js";
import Detalles from "../models/Detalles.js";
import Crear from "../models/Crear.js";

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

router.get("/crear_votacion", async (req,res) =>{
    res.render("Tablas/crearVotacion",{
        style: 'Stylevotacion.css',
    });
});

router.post("/crear_votacion", (req,res) => {
    Crear.create(req.body);
});

router.get("/lugar_votacion",  (req,res)=>{
    res.render("tablas/Lugar_votacion",{
        style: 'CreacionStyle.css'
    });
});

router.get("/detalles/:nombre_evento", async (req,res) => {
    const data = await Detalles.find({Nombre_evento:req.params.nombre_evento});

    res.render("Tablas/detalles_nominacion", {
        style: 'StyleNominacion.css',
        data: data.map((current) => {
            return{
                Nombre_evento: current.Nombre_evento,
                Persona1: current.Persona1,
                Persona1_votos: current.Persona1_votos,
                Persona2: current.Persona2,
                Persona2_votos: current.Persona2_votos,
                Persona3: current.Persona3,
                Persona3_votos: current.Persona3_votos,
                Estado: current.Estado
            }; 
        }),
    });
});

export default router;