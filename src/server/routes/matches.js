import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getMatches,
  removeMatch
} from '../data/DatabasePouchDB.js'; 

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = req.body; 
        const addedUser = await addUser(newUser);
        res.status(201).json(addedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        updatedUserData.id = userId; 
        const updatedUser = await updateUser(updatedUserData);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await deleteUser(userId);
        res.sendStatus(204); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:userId/matches', async (req, res) => {
    try {
        const userId = req.params.userId;
        const matches = await getMatches(userId);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:userId/matches/:matchedUserId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const matchedUserId = req.params.matchedUserId;
        await removeMatch(userId, matchedUserId);
        res.json({ message: 'Match removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;