import mongoose from "mongoose";

const tablaSchema = mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Nombre_evento: {
        type: String,
        required: true,
    },
    Fecha_creacion: {
        type: Date,
        required: true,
    },
    Estado: {
        type: Boolean,
        required: true,
    },
    Persona1: {
        type: String,
        required: true,
    },
    Persona2: {
        type: String,
        required: true,
    },
    Persona3: {
        type: String,
        required: true,
    },
    voto1: {
        type: Number,
        required: true,
    },
    voto2: {
        type: Number,
        required: true,
    },
    voto3: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("tablas", tablaSchema);