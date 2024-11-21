module.exports = (err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) {
    // If headers are already sent, delegate to the default Express error handler
    return next(err);
  }
  res.status(500).json({ message: "An internal server error occurred" });
};
