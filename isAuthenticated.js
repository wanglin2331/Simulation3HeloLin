module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(404).send("user not authenticated");
    }
  };
  