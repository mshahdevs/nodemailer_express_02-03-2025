const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { route } = require('../routes/user');
const userData = {
  id: 22,
  name: 'test',
  password: '$2b$12$yhKbjotSZuWWuKeffIsXs.dpC40nlOTTQIjFvAbgUtLporlsniID2',
  role: 'admin',
};

// const registerUser = async(req,res)=>{
//   try {
//     const {username ,password} = req.body;
//     //validate input
//     if(!username || !password){
//       return res.status(404).json({message:"All fields are required"})
//     }
//     //Check if user already exists
//     const existUsers = users.find(user => user.name === username)
//   } catch (error) {

//   }
// }
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
  } catch (error) {
    console.log(error.message);
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const comparepassword = await bcrypt.compare(password, userData.password);
  if (!comparepassword) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }
  if (username === userData.name) {
    const token = jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3h',
    });

    res.json({
      message: 'Login successfully',
      token: token,
    });
  } else {
    res.status(401).json({
      message: 'Invalid credential',
    });
  }
};

module.exports = { loginUser, registerUser };
