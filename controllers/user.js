const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userData = {
  id: 22,
  name: 'test',
  password: '$2b$12$jRerII5S6d1XcpWiqNEm7O5J4kVwm10SLIw14U88cF9VlyEvAG.eS',
  role: 'admin',
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const comparepassword = await bcrypt.compare(password, userData.password);
  if (!comparepassword) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }
  if (username === userData.name) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3h',
    });

    res.json({
      message: 'Login successfully',
      token: token,
    });
  } else {
    res.json({
      message: 'INvalid credential',
    });
  }
};
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: 'All fields are required' });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    res.status(200).json({
      message: 'User has been successfully registered!',
      user: {
        id: userData.id,
        username,
        hashpassword,
        role: userData.role,
      },
    });
    console.log(userData);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { loginUser, registerUser };
