import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Office from '../src/model/Office.js';

dotenv.config({ path: './.env' });

const offices = [
    {
        name: 'Main Administration Building',
        department: 'Central Admin',
        description: 'Primary administrative hub housing the President and Registrar offices.',
        latitude: 8.5605,
        longitude: 39.2902
    },
    {
        name: 'School of Electrical Engineering',
        department: 'SoEIE',
        description: 'Main building for Electrical engineering and Information technology.',
        latitude: 8.5615,
        longitude: 39.2915
    },
    {
        name: 'Campus Library',
        department: 'Information Services',
        description: 'Central library with study halls and digital resources.',
        latitude: 8.5595,
        longitude: 39.2895
    },
    {
        name: 'Student Services Center',
        department: 'Dean of Students',
        description: 'Support center for student welfare, cafeteria, and clubs.',
        latitude: 8.5620,
        longitude: 39.2885
    }
];

const seedOffices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing offices
        await Office.deleteMany();
        console.log('Cleared existing offices.');

        // Insert seed data
        await Office.insertMany(offices);
        console.log('Successfully seeded 4 office locations.');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedOffices();
