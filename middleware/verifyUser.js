// const jwt = rquire('j')
const jwt = require('jsonwebtoken');
const verifyUser = (req, res, next) => {
  console.log(req.user); // undefined
  try {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
      res.send('token is missing');
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error.message);
  }
};
const verifyUserRole = (req, res, next) => {
  try {
    console.log('user Data', req.user);
    if (req.user.role === 'admin') {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { verifyUser, verifyUserRole };
