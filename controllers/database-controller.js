const express = require("express")
const router = require("../routers/auth-route")
const Database = require("../models/db-model");

const addNewDatabase = async (req, res) => {
    const { name, instanceId } = req.body;
    try {
        const newDatabase = new Database({ name, instance: instanceId });
        await newDatabase.save();
        res.status(201).json(newDatabase);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getDatabases = async (req, res) => {
    try {
        const databases = await Database.find();
        res.status(200).json(databases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDatabase = async (req, res) => {
    const { id } = req.params;
    try {
        const database = await Database.findById(id);
        if (database == null) {
            return res.status(404).json({ message: 'Database not found' });
        }
        await database.remove();
        res.json({ message: 'Database deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addNewDatabase, getDatabases, deleteDatabase }