const Queue = require('bull');

const dripQueue = new Queue('drip-email-queue', {
  redis: { host: '127.0.0.1', port: 6379 } // Change for production Redis
});

module.exports = dripQueue;
