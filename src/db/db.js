const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config({ path: '.env' });

const mongoUrl = process.env.MONGODB_URL; // Ensure your .env has MONGODB_URL defined
const reconnectTimeout = 5000; // ms

function connect() {
  // No need to pass deprecated options
  mongoose.connect(mongoUrl)
    .catch(error => {
      console.error('Initial MongoDB connection error:', error);
    });
}

const db = mongoose.connection;

// Event listeners for MongoDB connection states
db.on('connecting', () => {
  console.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
  mongoose.disconnect(); // Disconnect on error to trigger reconnection
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
  console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
  setTimeout(connect, reconnectTimeout); // Reconnect after the timeout
});

// Start the initial connection
connect();

module.exports = db;
