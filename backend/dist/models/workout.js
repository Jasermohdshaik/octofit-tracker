"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    recommendedFor: {
        type: [String],
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    createdBy: { type: String, default: 'system' },
}, { timestamps: true });
const WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
//# sourceMappingURL=workout.js.map