import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    site: String,
    username: String,
    password: String
  },
  { timestamps: true }
);

export default mongoose.model("Password", passwordSchema);
