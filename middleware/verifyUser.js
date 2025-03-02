const verifyUser = (req, res, next) => {
  res.send('hdh');
  next();
};

module.exports = { verifyUser };
