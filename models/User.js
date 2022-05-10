const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tag: {
        type: Int
    }, 
    discordId: {
        type: Int,
        required: true
    },
    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('users', userSchema)