const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const botSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    tag: {
        type: Number,
        required: true
    },
    discordId: {
        type: Number,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
        toJson: false
    },
    verified: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('bots', botSchema)