const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const botSchema = new Schema({
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
    prefix: {
        type: String
    },
    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('bots', botSchema)