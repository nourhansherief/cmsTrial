// routes/dataDefinitions.js
const express = require('express');
const router = express.Router();
const DataDefinition = require('../models/DataDefinition');

// Create a new data definition
router.post('/', async (req, res) => {
  try {
    const { name, structure } = req.body;
    const dataDefinition = new DataDefinition({ name, structure });
    await dataDefinition.save();
    res.status(201).json(dataDefinition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all data definitions
router.get('/', async (req, res) => {
  try {
    const dataDefinitions = await DataDefinition.find();
    res.status(200).json(dataDefinitions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a data definition by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, structure } = req.body;
    const dataDefinition = await DataDefinition.findByIdAndUpdate(id, { name, structure }, { new: true, runValidators: true });
    if (!dataDefinition) {
      return res.status(404).json({ error: 'Data definition not found' });
    }
    res.status(200).json(dataDefinition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a data definition by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findByIdAndDelete(id);
    if (!dataDefinition) {
      return res.status(404).json({ error: 'Data definition not found' });
    }
    res.status(200).json({ message: 'Data definition deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Find a data list by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataDefinition = await DataDefinition.findById(id);
    if (!dataDefinition) {
      return res.status(404).json({ error: 'Data definition not found' });
    }
    res.status(200).json(dataDefinition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
