const express = require('express');

// const pool = require('./config/db')
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users.routes');




const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users',userRoutes)  //register done





app.get('/', (req, res) => {
  res.send('hello harshuuuuuuu 🚀');
});

module.exports = app;
