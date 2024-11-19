const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with PostgreSQL config
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

// Define a model (e.g., User model)
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

async function startApp() {
  try {
    // Automatically sync models to the database (creates tables if they don't exist)
    await sequelize.sync({ force: false }); // Avoids dropping tables
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

startApp();
