import mongoose from "mongoose";

const tablaSchema = mongoose.Schema({
    Nombre_evento: {
        type: String,
        requiere: true,
    },
    Fecha_creacion: {
        type: Date,
        requiere: true,
    },
    Detalle_votacion: {
        type: String,
        require: true,
    },
    Estado: {
        type: String,
        require: true,
    },
    Votar: {
        type: String,
        require: true,
    }
});

export default mongoose.model("Tablas", tablaSchema);