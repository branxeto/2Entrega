//aqui van las rutas de todo lo relacionado a tabla
import express from "express";
import Tablas from "../models/Tablas.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const router = express.Router();

//construccion de los links
router.get("/eventos", async (req,res) => {    
    const tablas = await Tablas.find({});

    res.json({ 
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
 

export function verificarToken(token, secreto) {
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



router.get("/eventos/crear", async (req,res) =>{
    
    const jwtAuth = req.headers.authorization;
    if(!jwtAuth){
        res.json({success: false, message: "acceso denegado"});
        return;
    }
    try {
        const decoded = await verificarToken(jwtAuth, 'miFirma');
        console.log('Token válido:', decoded);
            const users = await User.find({});
            res.json({
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

        res.json({ success: false, message: "acceso denegado"});
      }
});
router.post("/eventos/crear", async (req,res) => {
    
    const jwtAuth = req.headers.authorization;
    if(!jwtAuth){
        res.json({ success: false, message: "acceso denegado"});
        return;
    }
    try {
        const decoded = await verificarToken(jwtAuth, 'miFirma');
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
        res.json({success: true});
        
        
      } catch (error) {
        console.error('Error:', error);
        return res.json({ success: false, message: "acceso denegado"});
    }

});

router.post("/eventos/:Nombretabla/votar", async (req, res) => {
    try {
        const actualizar = await Tablas.findOne({ Nombre_evento: req.params.Nombretabla });
        const filter = { Nombre_evento: actualizar.Nombre_evento };

        if (req.body.votoCandidato === 1) {
            actualizar.voto1 += 1;
        } else if (req.body.votoCandidato === 2) {
            actualizar.voto2 += 1;
        } else if (req.body.votoCandidato === 3) {
            actualizar.voto3 += 1;
        } else {
            res.json({ success: false, message: "Voto no válido" });
            return;
        }

        await actualizar.save();

        res.json({
            success: true,
            message: "Voto registrado exitosamente",
            data: {
                Nombre_evento: actualizar.Nombre_evento,
                Persona1: actualizar.Persona1,
                Persona2: actualizar.Persona2,
                Persona3: actualizar.Persona3,
                voto3: actualizar.voto3,
                voto2: actualizar.voto2,
                voto1: actualizar.voto1
            }
        });
    } catch (err) {
        console.log("Error", err);
        res.json({ success: false, message: "Error al procesar el voto" });
    }
});


router.get("/eventos/:Nombre_tabla/" , async (req,res) => {
    const detalles = await Tablas.findOne({Nombre_evento: req.params.Nombre_tabla});
    res.json({
        data: {
            Nombre_evento: detalles.Nombre_evento,
            Persona1: detalles.Persona1,
            Persona2: detalles.Persona2,
            Persona3: detalles.Persona3,
            voto1: detalles.voto1,
            voto2: detalles.voto2,
            voto3: detalles.voto3,
        }
    });
}); 

export default router;

