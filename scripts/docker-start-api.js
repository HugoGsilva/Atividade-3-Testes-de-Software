process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.PORT = process.env.PORT || '3000';

const app = require('../src/app');
const { sequelize } = require('../src/models');

(async () => {
  await sequelize.sync({ force: true });

  app.listen(process.env.PORT, () => {
    console.log(`API ready on port ${process.env.PORT}`);
  });
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
