import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    scope: { type: String, enum: ['global', 'team'], required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    entries: { type: [leaderboardEntrySchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
