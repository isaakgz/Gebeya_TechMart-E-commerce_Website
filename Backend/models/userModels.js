import mongoose from "mongoose";
import bcrypt from "bcryptjs"

//craeting userSchema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, //this will add createdAt and updatedAt as an object with date
  }
);

userSchema.methods.matchPassword = async function (eneterdPassword){
  return await bcrypt.compare(eneterdPassword, this.password)
}

const User = mongoose.model("User", userSchema);
export default User;
