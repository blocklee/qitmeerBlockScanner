// db.js
const mongoose = require('mongoose');

mongoose.connect('your-mongodb-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
