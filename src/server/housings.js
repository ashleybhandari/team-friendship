import express from 'express';
import {
  getAllHousings,
  getHousingById,
  addHousing,
  updateHousing,
  deleteHousing
} from '../controllers/housings.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const housings = await getAllHousings();
        res.json(housings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newHousing = req.body; 
        const addedHousing = await addHousing(newHousing);
        res.status(201).json(addedHousing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const housingId = req.params.id;
        const updatedHousingData = req.body;
        updatedHousingData.id = housingId; 
        const updatedHousing = await updateHousing(updatedHousingData);
        res.json(updatedHousing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const housingId = req.params.id;
        await deleteHousing(housingId);
        res.sendStatus(204); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
