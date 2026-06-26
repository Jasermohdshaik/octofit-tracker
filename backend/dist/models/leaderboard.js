"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    scope: { type: String, enum: ['global', 'team'], required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    entries: { type: [leaderboardEntrySchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = LeaderboardModel;
//# sourceMappingURL=leaderboard.js.map