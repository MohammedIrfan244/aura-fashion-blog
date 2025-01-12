import mongoose from "mongoose";

const styleLikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style',
        required: true,
    },
}, {
    timestamps: true,
});

const StyleLike = mongoose.model('StyleLike', styleLikeSchema);

export default StyleLike