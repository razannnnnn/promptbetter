const mongoose = require('mongoose');

mongoose.connect('')
  .then(() => {
    console.log('CONNECTED OK');
    process.exit(0);
  })
  .catch(err => {
    console.log('ERROR:', err.message);
    process.exit(1);
  });