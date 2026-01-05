import express from 'express';
import {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
  getBusStats
} from '../controllers/busController.js';

const router = express.Router();

// GET /api/buses/stats - Get bus statistics
router.get('/stats', getBusStats);

// GET /api/buses - Get all buses
router.get('/', getAllBuses);

// GET /api/buses/:id - Get single bus
router.get('/:id', getBusById);

// POST /api/buses - Create new bus
router.post('/', createBus);

// PUT /api/buses/:id - Update bus
router.put('/:id', updateBus);

// DELETE /api/buses/:id - Delete bus
router.delete('/:id', deleteBus);

export default router;
