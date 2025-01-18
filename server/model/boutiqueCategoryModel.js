import mongoose from 'mongoose'

const boutiqueCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    badge: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const BoutiqueCategory = mongoose.model('BoutiqueCategory', boutiqueCategorySchema);

export default BoutiqueCategory