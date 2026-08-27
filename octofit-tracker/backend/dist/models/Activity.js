import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
