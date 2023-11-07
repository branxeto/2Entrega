//aqui van las rutas de todo lo relacionado a tabla
import express from "express";
import Tablas from "../models/Tablas.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


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

export const tokensValidos = [];

function verificarToken(token, secreto) {
    return new Promise((resolve, reject) => {
    
      if (tokensValidos.includes(token)) {
       
        jwt.verify(token, secreto, (err, decoded) => {
          if (err) {
            
            reject(err);
          } else {
          
            resolve(decoded);
          }
        });
      } else {
        
        reject('Token no encontrado en la lista de tokens válidos');
      }
    });
  }

router.get("/crearvotacion", async (req,res) =>{
    const cookie = req.cookies["jwt"];
    if(!cookie){
        res.redirect("/login");
        return;
    }
    try {
        const decoded = await verificarToken(cookie, 'miFirma');
        console.log('Token válido:', decoded);
            const users = await User.find({});
            res.render("Tablas/crearVotacion",{
                style: 'Stylevotacion.css',
                allUsers : users.map((current) => {
                    return {
                        Name: current.Name,
                        Rut: current.Rut,
                        password: current.password,
                    };
                }),
            });
        
      } catch (error) {
        console.error('Error:', error);
        return res.redirect("/login");
      }
});
router.post("/crearvotacion", async (req,res) => {
    const cookie = req.cookies["jwt"];
    if(!cookie){
        res.redirect("/login");
        return;
    }
    try {
        const decoded = await verificarToken(cookie, 'miFirma');
        console.log('Token válido:', decoded);
        const tabla = {
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
        
        
      } catch (error) {
        console.error('Error:', error);
        return res.redirect("/login");
    }

});

router.get("/tabla/voto/:Nombretabla", async (req,res) => {
    const info = await Tablas.findOne({Nombre_evento: req.params.Nombretabla}).exec();
    res.render("Tablas/Lugarvotacion",{
        style: 'CreacionStyle.css',
        data: info,
    });
});
router.post("/tabla/voto/:Nombre_tabla", async (req,res) => {
    const actualizar = await Tablas.findOne({Nombre_evento: req.params.Nombre_tabla}).exec();
    if(req.body.voto1 === true){
        Tablas.updateOne({
            voto1: actualizar.voto1 + 1
        });
    }
    res.render("Tablas/Lugarvotacion",{
        style: 'CreacionStyle.css',
        data: actualizar,
    });
});

router.get("/tabla/:Nombre_tabla" , async (req,res) => {
    const detalles = await Tablas.findOne({Nombre_evento: 'req.params.Nombre_tabla'});
    res.render("Tablas/detalles_nominacion",{
        style: 'StyleNominacion.css',
        data: detalles
    });
}); 


export default router;