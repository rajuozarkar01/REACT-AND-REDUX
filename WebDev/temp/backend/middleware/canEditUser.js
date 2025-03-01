export const canEditUser = (req, res, next) => {
  if (req.user._id.toString() === req.params.id || req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied." });
};
