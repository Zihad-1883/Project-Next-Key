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
    
    // We will generate stable ObjectIds for our properties
    const propertiesList = [
      {
        _id: new ObjectId(),
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
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
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
        createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
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
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Luxury Duplex Villa with Garden',
        shortDescription: 'Magnificent and isolated duplex villa in elite zone.',
        detailedDescription: 'High-end duplex villa featuring a wide front lawn garden, dynamic roof terrace views, fully automated smart locks security, and master room details. Located in a secure gated housing community.',
        price: 85050,
        location: 'Gulshan 2, Dhaka',
        propertyType: 'House',
        bedrooms: 5,
        bathrooms: 4,
        imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Cozy Studio in Banani',
        shortDescription: 'Charming high-rise studio with stunning skyline view.',
        detailedDescription: 'This high-rise studio in Banani features a modern layout with premium wood laminate flooring, updated appliances, and access to a shared rooftop terrace. Near key commercial zones and restaurants.',
        price: 28000,
        location: 'Road 11, Banani, Dhaka',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Elegant 2-Bed Flat Bashundhara',
        shortDescription: 'Serene family apartment located near Block C gate.',
        detailedDescription: 'Perfect space for a modern family. Secure 24/7 security guard, backup generator, elevator, and split air conditioning. Convenient location with access to supermarkets, schools, and hospitals.',
        price: 22000,
        location: 'Block C, Bashundhara R/A, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Spacious Duplex Lalmatia',
        shortDescription: 'Lalmatia duplex house containing multiple amenities.',
        detailedDescription: 'Beautiful independent duplex unit with personal entrance, garden walkway, custom modular kitchen, split AC, and two spacious living spaces. Perfect for families looking for peaceful privacy in residential blocks.',
        price: 55000,
        location: 'Block D, Lalmatia, Dhaka',
        propertyType: 'House',
        bedrooms: 4,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Student Sublet Room Mohammadpur',
        shortDescription: 'Budget-friendly student room sublet with continuous water feeds.',
        detailedDescription: 'Affordable single room sublet in a friendly shared flat. Fully furnished with study table, cabinet, and single bed. Kitchen, dining area, and washroom are shared. Ideal for students on a budget.',
        price: 10000,
        location: 'Kaderabad Housing, Mohammadpur, Dhaka',
        propertyType: 'Room',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Modern Apartment Gulshan 1',
        shortDescription: 'High-rise 2-bedroom flat with gorgeous Hatirjheel view.',
        detailedDescription: 'Excellent flat with natural sunlight throughout the day. Central heating/cooling options, spacious balconies, master bedroom with bathtub, and modular kitchen layouts. Includes underground car parking slot.',
        price: 32000,
        location: 'Police Plaza side, Gulshan 1, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Luxury Penthouse in Baridhara',
        shortDescription: 'Stunning premium penthouse inside diplomatic enclave zone.',
        detailedDescription: 'Live in ultimate style. This spectacular penthouse details high ceilings, floor-to-ceiling glass windows, huge private terrace deck, smart home controls, and exclusive elevator access directly into the lobby.',
        price: 95000,
        location: 'Baridhara Diplomatic Zone, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 4,
        bathrooms: 4,
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Quiet Room near Dhaka University',
        shortDescription: 'Perfect cozy sublet room suitable for DU/BUET students.',
        detailedDescription: 'A peaceful, bright single bedroom available for sublease in an academic household environment. High-speed internet connection, quiet study zone, and shared laundry washroom. Walking distance to university library.',
        price: 11000,
        location: 'Nilkhet Road, Dhaka Red Zone',
        propertyType: 'Room',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Charming Studio in Old Dhaka (Wari)',
        shortDescription: 'Renovated historic studio apartment in safe community neighborhood.',
        detailedDescription: 'Experience traditional Old Dhaka culture with modern living comforts. Renovated studio flat with continuous water supply, modular kitchen fittings, private bathroom, and safe access control.',
        price: 15000,
        location: 'Lalmini Street, Wari, Dhaka',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Executive 3-Bed Duplex Banani',
        shortDescription: 'High-end duplex featuring luxury fixtures and private deck.',
        detailedDescription: 'A premium executive duplex featuring marble tile floors, designer bathrooms, double-door refrigerator provisions, and security controls. Includes structural backup generator power feed.',
        price: 60000,
        location: 'Road 4, Banani, Dhaka',
        propertyType: 'House',
        bedrooms: 3,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Affordable Family Flat Khilgaon',
        shortDescription: 'Comfy apartment close to local school compounds and restaurants.',
        detailedDescription: 'Nicely laid out two-bedroom residential apartment with wide kitchen grills, backup generator, water storage, and convenient highway access. Safe gated residential space.',
        price: 18000,
        location: 'Taltola, Khilgaon, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Cozy Garden-Facing Studio',
        shortDescription: 'Peaceful studio flat adjacent to golf resort view boundaries.',
        detailedDescription: 'Quiet studio flat containing private kitchen, high speed Wi-Fi option, central gas pipeline, and a lovely private green porch facing the garden layout. Fully secure neighborhood.',
        price: 20000,
        location: 'Matikata Road, Dhaka Cantonment',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Premium Flat with Lake View',
        shortDescription: 'Elegant 3-bedroom apartment facing the Dhanmondi Lake route.',
        detailedDescription: 'Highly desired address in Dhaka. Spectacular lake view apartment with broad dining halls, three large master suites, modern security layouts, and servant quarters. Comes with parking.',
        price: 50000,
        location: 'Road 32, Dhanmondi, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Duplex Shared Space for Women',
        shortDescription: 'Secure hostels-styled room sublet for female students or serviceholders.',
        detailedDescription: 'Fully secure shared room facility featuring student desks, secure storage drawers, bathroom facilities, and backup electricity utilities. Managed by security-minded staff.',
        price: 8500,
        location: 'Mirpur 2, Dhaka',
        propertyType: 'Room',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Spacious House in Nikunja',
        shortDescription: 'Detached independent house adjacent to airport boundary gates.',
        detailedDescription: 'Spacious residential villa house comprising three bedrooms, private garage parking, rooftop access, and independent municipal water connections. Located in Nikunja community blocks.',
        price: 40000,
        location: 'Road 6, Nikunja 2, Dhaka',
        propertyType: 'House',
        bedrooms: 3,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'High-Rise Luxury Flat Gulshan',
        shortDescription: 'Magnificent family residence inside premium secure boundaries.',
        detailedDescription: 'Modern, newly built apartment complex. Central gas grid, fire exits, emergency elevators, fitness gymnasium access, and double-insulated soundproof windows. Elegant interior fittings.',
        price: 70000,
        location: 'Road 68, Gulshan 2, Dhaka',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 3,
        imageUrl: 'https://images.unsplash.com/photo-1545464383-b34bd91e6cfa?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Compact Studio Apartment Farmgate',
        shortDescription: 'Excellent studio flat in key transit hub area for students.',
        detailedDescription: 'Affordable and cozy. This studio is perfect for young students or commuters. Close to farmgate metro station and universities, features kitchen sink counter, exhaust fan, and security access points.',
        price: 13500,
        location: 'Tejkunipara, Farmgate, Dhaka',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1534595038511-9f219fe0c979?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        _id: new ObjectId(),
        title: 'Modern Room in Badda Shared Flat',
        shortDescription: 'Comfortable single room sublet near Badda Hatirjheel ramp.',
        detailedDescription: 'Bright room available in shared duplex apartment. Easy transit access to Gulshan/Badda commercial hubs. Features common dining area, common kitchen with refrigerator, and high-speed fiber internet.',
        price: 9500,
        location: 'East Badda, Dhaka',
        propertyType: 'Room',
        bedrooms: 1,
        bathrooms: 1,
        imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: 'Family Retreat House in Uttara',
        shortDescription: 'Beautiful independent villa with spacious compound and garden.',
        detailedDescription: 'A gorgeous independent residential house inside Uttara residential blocks. 4 bedrooms, 4 bathrooms, 2 parking spaces, deep garden space, private rooftop, secure CCTV cameras surveillance, and gated guard safety.',
        price: 75000,
        location: 'Sector 11, Uttara, Dhaka',
        propertyType: 'House',
        bedrooms: 4,
        bathrooms: 4,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        landlordId,
        createdAt: new Date()
      }
    ];

    await db.collection('properties').insertMany(propertiesList);

    // 5. Create rental requests history
    console.log('Seeding booking rental requests...');
    
    // We link a couple of requests to properties we seeded above
    const prop1 = propertiesList[0];
    const prop2 = propertiesList[1];
    const prop3 = propertiesList[2];

    const rentalList = [
      {
        propertyId: prop1._id,
        tenantId: tenant1Id,
        landlordId,
        status: 'pending' as const,
        startDate: '2026-08-01',
        endDate: '2027-08-01',
        contactNumber: '+880 1711-223344',
        createdAt: new Date()
      },
      {
        propertyId: prop2._id,
        tenantId: tenant1Id,
        landlordId,
        status: 'approved' as const,
        startDate: '2026-09-01',
        endDate: '2027-09-01',
        contactNumber: '+880 1711-223344',
        createdAt: new Date()
      },
      {
        propertyId: prop3._id,
        tenantId: tenant2Id,
        landlordId,
        status: 'pending' as const,
        startDate: '2026-09-10',
        endDate: '2027-09-10',
        contactNumber: '+880 1799-887766',
        createdAt: new Date()
      }
    ];

    await db.collection('rentals').insertMany(rentalList);

    // 6. Create feedback reviews
    console.log('Seeding stars feedback reviews...');
    const reviewsList = [
      {
        propertyId: prop1._id,
        tenantId: tenant1Id,
        tenantName: 'Afif Hossain',
        rating: 4,
        comment: 'Very cozy and well-located for students. Internet is fast, although kitchen gets a bit crowded at times.',
        createdAt: new Date()
      },
      {
        propertyId: prop1._id,
        tenantId: tenant2Id,
        tenantName: 'Tasnim Rahman',
        rating: 5,
        comment: 'Absolutely love the roommates here! Safe environment and landlord resolves plumbing issues immediately.',
        createdAt: new Date()
      },
      {
        propertyId: prop2._id,
        tenantId: tenant2Id,
        tenantName: 'Tasnim Rahman',
        rating: 5,
        comment: 'Outstanding studio. Breathtaking balcony views and premium furnishing. Fully worth the rent.',
        createdAt: new Date()
      }
    ];

    await db.collection('reviews').insertMany(reviewsList);

    console.log('🎉 Seeding successfully completed! Total properties seeded:', propertiesList.length);
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
  } finally {
    await closeDatabaseConnection();
    console.log('Database seeding process finished.');
  }
}

seedDatabase();
