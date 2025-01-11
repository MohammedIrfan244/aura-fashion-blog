import mongoose from 'mongoose'


const idValidation = (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: "Id is required" });
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid Id" });
    }
    next();
}

export default idValidation