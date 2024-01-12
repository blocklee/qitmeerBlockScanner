// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://username:password@hostname:port/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
