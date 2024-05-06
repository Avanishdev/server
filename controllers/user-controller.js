const express = require("express");
const app = express();
const User = require("../models/user-model");
const Database = require("../models/db-model");

const addNewUser = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const assignUserRole = async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.role = role;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = password;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const assignUserToDatabase = async (req, res) => {
    const { userId, databaseId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const database = await Database.findById(databaseId);
        if (!database) {
            return res.status(404).json({ error: 'Database not found' });
        }
        user.assignedDatabases.push(databaseId);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addNewUser, changePassword, assignUserRole, removeUser, assignUserToDatabase }