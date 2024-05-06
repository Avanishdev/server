const { mongoose, model, Schema } = require("mongoose");

const instanceSchema = new Schema({
    name: { type: String, required: true },
    hostname: { type: String, required: true },
    port: { type: Number, required: true },
    databases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Database' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Instance = new model('Instance', instanceSchema);

module.exports = Instance;