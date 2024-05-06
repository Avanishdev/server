const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instance'
    }
});

module.exports = mongoose.model('Database', databaseSchema);