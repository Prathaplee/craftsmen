module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Pass control to Express if headers already sent
  }
  res.status(err.status || 500).json({ error: err.message });
};
