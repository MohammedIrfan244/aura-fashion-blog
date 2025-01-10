import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: false,
        default:""
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", usersSchema);

export default User;