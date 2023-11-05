import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
      },
      Rut:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    });

export default mongoose.model("login", loginSchema);