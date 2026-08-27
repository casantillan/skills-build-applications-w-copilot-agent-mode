import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activities: [{ type: String, trim: true }],
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
