import { Router } from 'express';
import { createProperty, deleteProperty, getMyProperties } from '../controllers/propertyController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { requireLandlord } from '../middleware/roleMiddleware.js';

const router = Router();

// Protect all routes in this router since they are specific to Landlord Listing Management
router.use(authenticateJWT);
router.use(requireLandlord);

// POST /api/properties -> Add a listing
router.post('/', createProperty);

// GET /api/properties/my-listings -> Fetch logged-in landlord's listings
router.get('/my-listings', getMyProperties);

// DELETE /api/properties/:id -> Remove owned property listing
router.delete('/:id', deleteProperty);

export default router;
