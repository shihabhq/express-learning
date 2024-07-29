const errorHandler = (err, req, res, next) => {
  res.status(err.code).json({ msg: err.msg });
};

module.exports = errorHandler
