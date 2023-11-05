const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const boardRoutes = require('./api/routes/board');
const authRoutes = require('./api/routes/auth');

const app = express();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('Database connected successfully'))
  .catch(e => console.log(e));

app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/api/board', boardRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
