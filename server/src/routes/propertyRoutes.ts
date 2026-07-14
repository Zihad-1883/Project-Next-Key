import { Router } from 'express';
import { 
  createProperty, 
  deleteProperty, 
  getMyProperties, 
  getProperties, 
  getPropertyById 
} from '../controllers/propertyController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { requireLandlord } from '../middleware/roleMiddleware.js';

const router = Router();

// 1. Static Protected endpoints (placed first to avoid wildcard conflicts)
router.get('/my-listings', authenticateJWT, requireLandlord, getMyProperties);

// 2. Public endpoints
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// 3. Dynamic / Write Action Protected endpoints
router.post('/', authenticateJWT, requireLandlord, createProperty);
router.delete('/:id', authenticateJWT, requireLandlord, deleteProperty);

export default router;
