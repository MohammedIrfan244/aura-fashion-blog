import mongoose from "mongoose";

const boutiqueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    firstImage: {
        type: String,
        required: true,
    },
    secondImage: {
        type: String,
        required: true,
    },
    thirdImage: {
        type: String,
        required: true,
    },
    fourthImage: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})

const Boutique = mongoose.model('Boutique', boutiqueSchema);

export default Boutique