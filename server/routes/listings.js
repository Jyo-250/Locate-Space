const express = require('express');
const Listing = require('../models/Listing');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  const { type } = req.query;
  try {
    const filter = type ? { type } : {};
    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/mine', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ postedBy: req.userId }).sort({ createdAt: -1 });
    res.json(listings);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, postedBy: req.userId });
    res.status(201).json(listing);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.userId },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ message: 'Not found or unauthorized' });
    res.json(listing);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, postedBy: req.userId });
    if (!listing) return res.status(404).json({ message: 'Not found or unauthorized' });
    res.json({ message: 'Listing deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
