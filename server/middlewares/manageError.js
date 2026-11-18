import CustomError from "../utilities/CustomError.js";

const errorManager = (err, req, res, next) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || "Field";
      return res.status(400).json({ message: `${field} already exists` });
    }
    return res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Something went wrong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default errorManager;
