import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../data/DatabasePouchDB.js'; 

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        const preferences = users.map(user => user.preferences);
        res.json(preferences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user.preferences);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newPreferences = req.body; 
        const userId = newPreferences.userId;
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            user.preferences = newPreferences;
            await updateUser(user);
            res.status(201).json(newPreferences);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedPreferences = req.body;
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            user.preferences = updatedPreferences;
            await updateUser(user);
            res.json(updatedPreferences);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await deleteUser(userId);
        res.sendStatus(204); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
