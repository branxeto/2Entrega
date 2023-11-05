import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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

export default mongoose.model("User", userSchema);