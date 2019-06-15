module.exports = role => {
  return async (req, res, next) => {
    if (req.user.roles === role) {
      return next();
    }

    return res.status(403).json({ message: 'Недостаточно прав' });
  };
};
