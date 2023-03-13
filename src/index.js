const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
    if (process.env.DB_SYNC === 'true') {
      db.sequelize.sync({ alter: true });
    }
  });
};

prepareAndStartServer();
