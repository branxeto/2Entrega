import mongoose from "mongoose";

const CrearSchema = mongoose.Schema({
    Nombre_Tabla: {
        type: String,
    },
    Nombre_Participante1: {
        type: String,
    },
    Nombre_Participante2: {
        type: String,
    },
    Nombre_Participante3: {
        type: String,
    }
});

export default mongoose.model("Crear", CrearSchema);