import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model('Workout', workoutSchema);

export default WorkoutModel;
