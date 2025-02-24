import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Create Service
router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ message: 'Error creating service', error: err });
  }
});

// Get All Services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err });
  }
});

// Update Service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ message: 'Error updating service', error: err });
  }
});

// Delete Service
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err });
  }
});

export default router;
