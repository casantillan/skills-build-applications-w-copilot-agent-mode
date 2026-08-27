import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, default: 'all-time', trim: true },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
