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
    Estado: {
        type: Boolean,
        require: true,
    },
    Persona1: {
        type: String,
        requiere: true,
    },
    Persona2: {
        type: String,
        requiere: true,
    },
    Persona3: {
        type: String,
        requiere: true,
    },
    voto1: {
        type: Number,
        require: true,
    },
    voto2: {
        type: Number,
        require: true,
    },
    voto3: {
        type: Number,
        require: true,
    },
});

export default mongoose.model("tablas", tablaSchema);