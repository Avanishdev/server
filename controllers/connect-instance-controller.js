const express = require("express");
const router = express.Router();
const mongoInstance = require("../models/connect-instance-model");

const addNewInstance = async (req, res) => {
    const { name, hostname, port, username, password } = req.body;

    try {
        await mongoInstance.save();
        res.status(201).json({ message: 'MongoDB instance added successfully' });
    } catch (error) {
        // Error during connection
        console.error('Error adding MongoDB instance:', error.message);
        res.status(500).json({ error: 'Failed to add MongoDB instance' });
    }
};
const getInstances = async (req, res) => {

    try {
        const instances = await mongoInstance.find();
        res.status(200).json({ instances: instances });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get MongoDB instances' });
    }
};

const getInstanceDetails = async (req, res) => {
    try {
        const instances = await mongoInstance.find();
        const instancesWithUsers = await Promise.all(instances.map(async instance => {
            const usersWithAccess = await User.find({ 'accessPermissions.instance': instance._id })
                .populate('accessPermissions.instance')
                .populate('accessPermissions.databases');
            return {
                _id: instance._id,
                name: instance.name,
                hostname: instance.hostname,
                port: instance.port,
                usersWithAccess: usersWithAccess.map(user => ({
                    username: user.username,
                    accessPermissions: user.accessPermissions.filter(access => access.instance.equals(instance._id))
                }))
            };
        }));
        res.status(200).json({ users: instancesWithUsers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addNewInstance, getInstances, getInstanceDetails }