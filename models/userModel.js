const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // outros campos, se necessário
});

const User = mongoose.model('User', userSchema);

module.exports = User;



