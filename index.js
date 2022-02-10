const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./models');
const router = require('./routes');

const app = express();
const corsSetting = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsSetting));
app.use(express.json());
app.use('', (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
app.use(express.static(path.resolve(__dirname, 'images')));
app.use('/api', router);

db.sequelize.sync();
app.listen(5000, () => {
  console.log('Server has been started on port 5000');
});
