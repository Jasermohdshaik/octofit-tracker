import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model('Activity', activitySchema);

export default ActivityModel;
