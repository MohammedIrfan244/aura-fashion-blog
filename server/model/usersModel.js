import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    isCreator: {
        type: Boolean,
        required: true,
        default: false
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