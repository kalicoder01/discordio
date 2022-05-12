const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    discriminator: {
        type: Number,
        required: true
    }, 
    discordId: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema)