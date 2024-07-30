import colors from "colors";
const errorHandler = (err, req, res, next) => {
  res.status(err.code).json({ msg: err.msg });
};

export default errorHandler;
