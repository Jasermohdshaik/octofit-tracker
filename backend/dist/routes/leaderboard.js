"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const leaderboard = await leaderboard_1.default.find()
            .populate('team', 'name city')
            .populate('entries.user', 'name email totalPoints')
            .sort({ updatedAt: -1 })
            .lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = leaderboardRouter;
//# sourceMappingURL=leaderboard.js.map