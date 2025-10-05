import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Review from '../models/Review.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const users = await User.create([
      { name: 'John Doe', email: 'john@example.com', password: hashedPassword },
      { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword },
      { name: 'Ahmed Ali', email: 'ahmed@example.com', password: hashedPassword }
    ]);
    console.log('Created users');

    const books = await Book.create([
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.',
        genre: 'Novel',
        year: 1925,
        addedBy: users[0]._id
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
        genre: 'Novel',
        year: 1960,
        addedBy: users[0]._id
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        description: 'A landmark volume in science writing by one of the great minds of our time.',
        genre: 'Scientific',
        year: 1988,
        addedBy: users[1]._id
      },
      {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
        genre: 'Novel',
        year: 1949,
        addedBy: users[1]._id
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        description: 'A brief history of humankind exploring how Homo sapiens came to dominate the world.',
        genre: 'History',
        year: 2011,
        addedBy: users[2]._id
      },
      {
        title: 'The Republic',
        author: 'Plato',
        description: 'A Socratic dialogue concerning justice, the order and character of the just city-state.',
        genre: 'Philosophy',
        year: 375,
        addedBy: users[2]._id
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'A handbook of agile software craftsmanship teaching the principles of writing clean code.',
        genre: 'Technical',
        year: 2008,
        addedBy: users[0]._id
      },
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        description: 'A young wizard begins his magical education at Hogwarts School of Witchcraft and Wizardry.',
        genre: 'Children',
        year: 1997,
        addedBy: users[1]._id
      }
    ]);
    console.log('Created books');

    await Review.create([
      {
        bookId: books[0]._id,
        userId: users[1]._id,
        rating: 5,
        reviewText: 'An absolute masterpiece! Fitzgerald\'s prose is stunning and the story is timeless.'
      },
      {
        bookId: books[0]._id,
        userId: users[2]._id,
        rating: 4,
        reviewText: 'Great book with beautiful writing. The characters are complex and memorable.'
      },
      {
        bookId: books[1]._id,
        userId: users[0]._id,
        rating: 5,
        reviewText: 'One of the best books I\'ve ever read. Powerful and moving.'
      },
      {
        bookId: books[2]._id,
        userId: users[0]._id,
        rating: 5,
        reviewText: 'Mind-blowing! Hawking makes complex physics accessible to everyone.'
      },
      {
        bookId: books[3]._id,
        userId: users[2]._id,
        rating: 5,
        reviewText: 'Terrifyingly relevant today. A must-read for everyone.'
      },
      {
        bookId: books[4]._id,
        userId: users[1]._id,
        rating: 5,
        reviewText: 'Fascinating perspective on human history. Changed how I see the world.'
      },
      {
        bookId: books[5]._id,
        userId: users[0]._id,
        rating: 4,
        reviewText: 'Dense but rewarding. Plato\'s ideas are still relevant today.'
      },
      {
        bookId: books[6]._id,
        userId: users[2]._id,
        rating: 5,
        reviewText: 'Every developer should read this! Transformed my coding practices.'
      },
      {
        bookId: books[7]._id,
        userId: users[0]._id,
        rating: 5,
        reviewText: 'Magical! Perfect for all ages. Started my love for reading.'
      }
    ]);
    console.log('Created reviews');

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Email: john@example.com | Password: 123456');
    console.log('Email: jane@example.com | Password: 123456');
    console.log('Email: ahmed@example.com | Password: 123456');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();