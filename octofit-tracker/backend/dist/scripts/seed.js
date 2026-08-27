import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            {
                username: 'alex-runner',
                email: 'alex@example.com',
                password: 'octofit-demo',
                profile: { displayName: 'Alex Rivera', fitnessLevel: 'intermediate' },
            },
            {
                username: 'jamie-strong',
                email: 'jamie@example.com',
                password: 'octofit-demo',
                profile: { displayName: 'Jamie Chen', fitnessLevel: 'advanced' },
            },
            {
                username: 'sam-starts',
                email: 'sam@example.com',
                password: 'octofit-demo',
                profile: { displayName: 'Sam Taylor', fitnessLevel: 'beginner' },
            },
        ]);
        await Team.create([
            {
                name: 'Morning Momentum',
                description: 'A friendly team for consistent morning movement.',
                members: [users[0]._id, users[2]._id],
            },
            {
                name: 'Peak Performers',
                description: 'Training together and aiming for new personal bests.',
                members: [users[1]._id],
            },
        ]);
        await Activity.create([
            {
                user: users[0]._id,
                type: 'running',
                durationMinutes: 32,
                points: 64,
                notes: 'Easy pace along the river trail.',
            },
            {
                user: users[1]._id,
                type: 'strength',
                durationMinutes: 45,
                points: 90,
                notes: 'Full-body strength session.',
            },
            {
                user: users[2]._id,
                type: 'walking',
                durationMinutes: 25,
                points: 25,
                notes: 'First tracked walk of the week.',
            },
        ]);
        await Leaderboard.create([
            { user: users[1]._id, points: 420, rank: 1 },
            { user: users[0]._id, points: 310, rank: 2 },
            { user: users[2]._id, points: 180, rank: 3 },
        ]);
        await Workout.create([
            {
                title: 'Foundation Flow',
                description: 'A gentle full-body routine to build a consistent habit.',
                fitnessLevel: 'beginner',
                durationMinutes: 20,
                activities: ['walking', 'mobility', 'bodyweight squats'],
            },
            {
                title: 'Tempo Builder',
                description: 'A focused cardio session with short intervals and recovery.',
                fitnessLevel: 'intermediate',
                durationMinutes: 35,
                activities: ['running', 'intervals', 'cooldown'],
            },
            {
                title: 'Power Circuit',
                description: 'A challenging circuit for strength, stability, and power.',
                fitnessLevel: 'advanced',
                durationMinutes: 50,
                activities: ['strength', 'lunges', 'plank'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
