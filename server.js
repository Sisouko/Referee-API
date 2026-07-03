require('dotenv').config();
const express = require('express');
const cors = require('cors'); // optional
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(logger);

const arbitreRoutes = require('./routes/arbitre.routes');
const matchRoutes = require('./routes/match.routes');
const affectationRoutes = require('./routes/affectation.routes');

app.use('/api/arbitres', arbitreRoutes);
app.use('/api/matchs', matchRoutes);
app.use('/api/affectations', affectationRoutes);

app.use(errorHandler);

const { sequelize } = require('./models/index');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });