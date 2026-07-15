import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getDb, closeDatabaseConnection } from '../config/db.js';

async function seedDatabase() {
  try {
    console.log('Seeder starting...');
    const db = await getDb();

    // 1. Clear existing database collections
    console.log('Dropping existing data records...');
    await db.collection('users').deleteMany({});
    await db.collection('properties').deleteMany({});
    await db.collection('rentals').deleteMany({});
    await db.collection('reviews').deleteMany({});

    // 2. Encrypt candidate passwords
    console.log('Encrypting passwords...');
    const passwordHash = await bcrypt.hash('password123', 10);

    // 3. Create test users
    console.log('Seeding user profiles...');
    const landlordId = new ObjectId();
    const tenant1Id = new ObjectId();
    const tenant2Id = new ObjectId();

    const usersList = [
      {
        _id: landlordId,
        name: 'Zihad Chowdhury',
        email: 'landlord@nextkey.xyz',
        passwordHash,
        role: 'landlord' as const,
        createdAt: new Date()
      },
      {
        _id: tenant1Id,
        name: 'Afif Hossain',
        email: 'tenant@nextkey.xyz',
        passwordHash,
        role: 'tenant' as const,
        createdAt: new Date()
      },
      {
        _id: tenant2Id,
        name: 'Tasnim Rahman',
        email: 'tasnim@nextkey.xyz',
        passwordHash,
        role: 'tenant' as const,
        createdAt: new Date()
      }
    ];

    await db.collection('users').insertMany(usersList);

    // 4. Create property listings
    console.log('Seeding property listings...');
    const prop1Id = new ObjectId();
    const prop2Id = new ObjectId();
    const prop3Id = new ObjectId();
    const prop4Id = new ObjectId();

    const propertiesList = [
      {
        _id: prop1Id,
        title: 'Cozy Shared Student Room',
        shortDescription: 'Affordable sublet single room close to university suburbs.',
        detailedDescription: 'A quiet, fully furnished room suitable for university students or interns. High speed internet connection and utilities are included in the price. The house features a shared kitchen and shared lounge area.',
        price: 12000,
        location: 'Mirpur 10, Dhaka',
        propertyType: 'Room',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      },
      {
        _id: prop2Id,
        title: 'Modern Dhanmondi Studio Flat',
        shortDescription: 'Stunning premium studio located at the heart of Dhanmondi.',
        detailedDescription: 'Comfortable studio apartment with styling kitchen fittings, private shower room, and small balcony. Convenient walking proximity to shopping malls, parks, and dining options. Perfect choice for young couples or single professionals.',
        price: 24000,
        location: 'Road 8A, Dhanmondi, Dhaka',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      },
      {
        _id: prop3Id,
        title: 'Premium 3-Bedroom Family Apt',
        shortDescription: 'Spacious flat with secure security gate guards.',
        detailedDescription: 'A premium apartment designed for families. Includes a spacious living room, separate master bedroom, modern kitchen layouts, and three wide balconies. Comes with dedicated parking spaces and round-the-clock safety security.',
        price: 45000,
        location: 'Sector 4, Uttara, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      },
      {
        _id: prop4Id,
        title: 'Luxury Duplex Villa with Garden',
        shortDescription: 'Magnificent and isolated duplex villa in elite zone.',
        detailedDescription: 'High-end duplex villa featuring a wide front lawn garden, dynamic roof terrace views, fully automated smart locks security, and master room details. Located in a secure gated housing community.',
        price: 85000,
        location: 'Gulshan 2, Dhaka',
        propertyType: 'Villa',
        bedrooms: 5,
        bathrooms: 4,
        imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      }
    ];

    await db.collection('properties').insertMany(propertiesList);

    // 5. Create rental requests history
    console.log('Seeding booking rental requests...');
    const rentalList = [
      {
        propertyId: prop1Id,
        tenantId: tenant1Id,
        landlordId,
        status: 'pending' as const,
        startDate: '2026-08-01',
        endDate: '2027-08-01',
        contactNumber: '+880 1711-223344',
        createdAt: new Date()
      },
      {
        propertyId: prop2Id,
        tenantId: tenant1Id,
        landlordId,
        status: 'approved' as const,
        startDate: '2026-09-01',
        endDate: '2027-09-01',
        contactNumber: '+880 1711-223344',
        createdAt: new Date()
      }
    ];

    await db.collection('rentals').insertMany(rentalList);

    // 6. Create feedback reviews
    console.log('Seeding stars feedback reviews...');
    const reviewsList = [
      {
        propertyId: prop1Id,
        tenantId: tenant1Id,
        tenantName: 'Afif Hossain',
        rating: 4,
        comment: 'Very cozy and well-located for students. Internet is fast, although kitchen gets a bit crowded at times.',
        createdAt: new Date()
      },
      {
        propertyId: prop1Id,
        tenantId: tenant2Id,
        tenantName: 'Tasnim Rahman',
        rating: 5,
        comment: 'Absolutely love the roommates here! Safe environment and landlord resolves plumbing issues immediately.',
        createdAt: new Date()
      },
      {
        propertyId: prop2Id,
        tenantId: tenant2Id,
        tenantName: 'Tasnim Rahman',
        rating: 5,
        comment: 'Outstanding studio. Breathtaking balcony views and premium furnishing. Fully worth the rent.',
        createdAt: new Date()
      }
    ];

    await db.collection('reviews').insertMany(reviewsList);

    console.log('🎉 Seeding successfully completed!');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
  } finally {
    await closeDatabaseConnection();
    console.log('Database seeding process finished.');
  }
}

seedDatabase();
