import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';
import { Property } from '../types/database.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      shortDescription,
      detailedDescription,
      price,
      location,
      propertyType,
      bedrooms,
      bathrooms,
      imageUrl,
    } = req.body;

    // 1. Validation checks
    if (
      !title ||
      !shortDescription ||
      !detailedDescription ||
      price === undefined ||
      !location ||
      !propertyType ||
      bedrooms === undefined ||
      bathrooms === undefined ||
      !imageUrl
    ) {
      res.status(400).json({ success: false, message: 'All listing fields are required.' });
      return;
    }

    const priceNum = Number(price);
    const bedroomsNum = Number(bedrooms);
    const bathroomsNum = Number(bathrooms);

    if (isNaN(priceNum) || priceNum <= 0) {
      res.status(400).json({ success: false, message: 'Price must be a positive number.' });
      return;
    }

    if (isNaN(bedroomsNum) || bedroomsNum < 0 || isNaN(bathroomsNum) || bathroomsNum < 0) {
      res.status(400).json({ success: false, message: 'Bedrooms and bathrooms must be non-negative integers.' });
      return;
    }

    if (!req.user || !req.user.id) {
      res.status(401).json({ success: false, message: 'Unauthorized. Missing account details.' });
      return;
    }

    // 2. Build property object
    const newProperty: Property = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      detailedDescription: detailedDescription.trim(),
      price: priceNum,
      location: location.trim(),
      propertyType: propertyType.trim(),
      bedrooms: Math.floor(bedroomsNum),
      bathrooms: Math.floor(bathroomsNum),
      imageUrl: imageUrl.trim(),
      landlordId: new ObjectId(req.user.id),
      createdAt: new Date(),
    };

    // 3. Save to MongoDB
    const db = await getDb();
    const result = await db.collection<Property>('properties').insertOne(newProperty);

    res.status(201).json({
      success: true,
      property: {
        id: result.insertedId.toString(),
        ...newProperty,
      },
    });
  } catch (error) {
    console.error('Error creating property listing:', error);
    res.status(500).json({ success: false, message: 'Internal server error creating listing.' });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid listing identifier.' });
      return;
    }

    if (!req.user || !req.user.id) {
      res.status(401).json({ success: false, message: 'Unauthorized. Authenticated session required.' });
      return;
    }

    const db = await getDb();
    const propertyId = new ObjectId(id);

    // 1. Check if property exists
    const property = await db.collection<Property>('properties').findOne({ _id: propertyId });

    if (!property) {
      res.status(404).json({ success: false, message: 'Property listing not found.' });
      return;
    }

    // 2. Validate ownership (Only the landlord who created it can delete it)
    if (property.landlordId.toString() !== req.user.id) {
      res.status(403).json({ success: false, message: 'Forbidden. You do not own this property listing.' });
      return;
    }

    // 3. Remove listing
    await db.collection<Property>('properties').deleteOne({ _id: propertyId });

    res.status(200).json({
      success: true,
      message: 'Property listing deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting property listing:', error);
    res.status(500).json({ success: false, message: 'Internal server error deleting listing.' });
  }
};

// Auxiliary route to get all properties owned by landlord
export const getMyProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }

    const db = await getDb();
    const properties = await db
      .collection<Property>('properties')
      .find({ landlordId: new ObjectId(req.user.id) })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      properties: properties.map((p) => ({
        id: p._id!.toString(),
        ...p,
      })),
    });
  } catch (error) {
    console.error('Error getting landlord listings:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching listings.' });
  }
};
