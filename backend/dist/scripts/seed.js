"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const mongoUri = 'mongodb://localhost:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        user_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const teams = await team_1.default.insertMany([
        {
            name: 'Summit Sprinters',
            city: 'Austin',
            motto: 'Climb stronger every week.',
            members: [],
        },
        {
            name: 'Iron Harbor Crew',
            city: 'Seattle',
            motto: 'Consistency beats intensity.',
            members: [],
        },
    ]);
    const users = await user_1.default.insertMany([
        {
            name: 'Maya Chen',
            email: 'maya.chen@octofit.dev',
            age: 29,
            fitnessLevel: 'intermediate',
            weeklyGoalMinutes: 220,
            totalPoints: 1280,
            team: teams[0]._id,
        },
        {
            name: 'Liam Patel',
            email: 'liam.patel@octofit.dev',
            age: 34,
            fitnessLevel: 'advanced',
            weeklyGoalMinutes: 300,
            totalPoints: 1560,
            team: teams[1]._id,
        },
        {
            name: 'Sofia Rivera',
            email: 'sofia.rivera@octofit.dev',
            age: 26,
            fitnessLevel: 'beginner',
            weeklyGoalMinutes: 150,
            totalPoints: 840,
            team: teams[0]._id,
        },
        {
            name: 'Noah Williams',
            email: 'noah.williams@octofit.dev',
            age: 31,
            fitnessLevel: 'intermediate',
            weeklyGoalMinutes: 210,
            totalPoints: 1090,
            team: teams[1]._id,
        },
    ]);
    await Promise.all([
        team_1.default.updateOne({ _id: teams[0]._id }, { $set: { members: [users[0]._id, users[2]._id] } }),
        team_1.default.updateOne({ _id: teams[1]._id }, { $set: { members: [users[1]._id, users[3]._id] } }),
    ]);
    const now = new Date();
    await activity_1.default.insertMany([
        {
            user: users[0]._id,
            team: teams[0]._id,
            type: 'run',
            durationMinutes: 45,
            caloriesBurned: 410,
            performedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        },
        {
            user: users[1]._id,
            team: teams[1]._id,
            type: 'strength',
            durationMinutes: 60,
            caloriesBurned: 520,
            performedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        },
        {
            user: users[2]._id,
            team: teams[0]._id,
            type: 'yoga',
            durationMinutes: 35,
            caloriesBurned: 190,
            performedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            type: 'cycle',
            durationMinutes: 50,
            caloriesBurned: 460,
            performedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        },
    ]);
    await leaderboard_1.default.insertMany([
        {
            scope: 'global',
            entries: [
                { user: users[1]._id, points: 1560, rank: 1, streakDays: 18 },
                { user: users[0]._id, points: 1280, rank: 2, streakDays: 14 },
                { user: users[3]._id, points: 1090, rank: 3, streakDays: 10 },
                { user: users[2]._id, points: 840, rank: 4, streakDays: 6 },
            ],
            updatedAt: now,
        },
        {
            scope: 'team',
            team: teams[0]._id,
            entries: [
                { user: users[0]._id, points: 1280, rank: 1, streakDays: 14 },
                { user: users[2]._id, points: 840, rank: 2, streakDays: 6 },
            ],
            updatedAt: now,
        },
        {
            scope: 'team',
            team: teams[1]._id,
            entries: [
                { user: users[1]._id, points: 1560, rank: 1, streakDays: 18 },
                { user: users[3]._id, points: 1090, rank: 2, streakDays: 10 },
            ],
            updatedAt: now,
        },
    ]);
    await workout_1.default.insertMany([
        {
            title: 'Sunrise Cardio Blast',
            focus: 'Cardio Endurance',
            difficulty: 'beginner',
            durationMinutes: 25,
            equipment: ['jump rope'],
            tags: ['fat-loss', 'morning'],
            recommendedFor: ['beginner', 'intermediate'],
        },
        {
            title: 'Strength Pyramid 45',
            focus: 'Full Body Strength',
            difficulty: 'intermediate',
            durationMinutes: 45,
            equipment: ['dumbbells', 'bench'],
            tags: ['strength', 'muscle-gain'],
            recommendedFor: ['intermediate', 'advanced'],
        },
        {
            title: 'Mobility Reset Flow',
            focus: 'Mobility and Recovery',
            difficulty: 'beginner',
            durationMinutes: 30,
            equipment: ['yoga mat'],
            tags: ['recovery', 'flexibility'],
            recommendedFor: ['beginner', 'intermediate', 'advanced'],
        },
        {
            title: 'VO2 Max Intervals',
            focus: 'High-Intensity Conditioning',
            difficulty: 'advanced',
            durationMinutes: 40,
            equipment: ['treadmill'],
            tags: ['hiit', 'performance'],
            recommendedFor: ['advanced'],
        },
    ]);
    const counts = await Promise.all([
        user_1.default.countDocuments(),
        team_1.default.countDocuments(),
        activity_1.default.countDocuments(),
        leaderboard_1.default.countDocuments(),
        workout_1.default.countDocuments(),
    ]);
    console.log(`Seed complete: users=${counts[0]}, teams=${counts[1]}, activities=${counts[2]}, leaderboard=${counts[3]}, workouts=${counts[4]}`);
    await mongoose_1.default.disconnect();
}
void seed().catch(async (error) => {
    console.error('Seed failed', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map