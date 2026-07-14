import { Request, Response } from 'express';
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

export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      propertyType,
      bedrooms,
      bathrooms,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const query: any = {};

    // 1. Text search matching title or location or shortDescription case-insensitive
    if (search && typeof search === 'string') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    // 2. Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 3. Property Type
    if (propertyType && typeof propertyType === 'string' && propertyType !== 'All') {
      query.propertyType = propertyType;
    }

    // 4. Bedrooms
    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    // 5. Bathrooms
    if (bathrooms) {
      query.bathrooms = { $gte: Number(bathrooms) };
    }

    // Pagination
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 12);
    const skipNum = (pageNum - 1) * limitNum;

    // Sorting
    const sortField = typeof sortBy === 'string' ? sortBy : 'createdAt';
    const sortDir = sortOrder === 'asc' ? 1 : -1;

    const db = await getDb();
    const total = await db.collection<Property>('properties').countDocuments(query);
    const properties = await db
      .collection<Property>('properties')
      .find(query)
      .sort({ [sortField]: sortDir })
      .skip(skipNum)
      .limit(limitNum)
      .toArray();

    res.status(200).json({
      success: true,
      properties: properties.map((p) => ({
        id: p._id!.toString(),
        ...p,
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching public properties:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching listings.' });
  }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string' || !ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid listing identifier.' });
      return;
    }

    const db = await getDb();
    const property = await db.collection<Property>('properties').findOne({ _id: new ObjectId(id) });

    if (!property) {
      res.status(404).json({ success: false, message: 'Property listing not found.' });
      return;
    }

    // Fetch landlord details to show on details view
    const landlord = await db.collection('users').findOne(
      { _id: property.landlordId },
      { projection: { name: 1, email: 1, role: 1 } }
    );

    res.status(200).json({
      success: true,
      property: {
        id: property._id!.toString(),
        ...property,
        landlord: landlord
          ? {
              id: landlord._id.toString(),
              name: landlord.name,
              email: landlord.email,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Error fetching single property:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching property.' });
  }
};
