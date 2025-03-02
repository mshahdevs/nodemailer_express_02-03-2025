const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sendMail = require('./controllers/sendMail');
sendMail('mshahengr82@gmail.com', 'This is SUBJECT', 'this is me. mshahdevs');
// const { verifyUser } = require('./middleware/verifyUser');

// app.post('/submit', (req, res) => {
//   console.log(req.body);
//   res.send(`Hello,${req.body.username}`);
// });
const userRoutes = require('./routes/user');
// const { sendMail } = require('./controllers/sendMail');
app.use('/user', userRoutes);
// app.get('/all-user', verifyUser, (req, res) => {
//   res.json([
//     { id: 1, name: 'User 1' },
//     { id: 2, name: 'User 2' },
//     { id: 3, name: 'User 3' },
//   ]);
// });
// app.get('/sendemail', sendMail);

app.listen(8080, () =>
  console.log(`server connected on http://localhost:8080`)
);
