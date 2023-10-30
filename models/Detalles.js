import mongoose from "mongoose";

const DetallesSchema = mongoose.Schema({
    Nombre_evento: {
        type: String,
    },
    Persona1: {
        type: String,
    },
    Persona1_votos: {
        type: Number,
    },
    Persona2: {
        type: String,
    },
    Persona2_votos: {
        type: Number,
    },
    Persona3: {
        type: String,
    },
    Persona3_votos: {
        type: Number,
    },
    Estado: {
        type: String,
    }
});

export default mongoose.model("detalles", DetallesSchema);