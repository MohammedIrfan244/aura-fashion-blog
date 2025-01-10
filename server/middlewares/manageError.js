import CustomError from "../utilities/CustomError";

const errorManager = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    next(err);
};

export default errorManager