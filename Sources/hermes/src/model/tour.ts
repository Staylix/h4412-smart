import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
    name: String,
    idsStep: [mongoose.Schema.Types.ObjectId],
    description: String,
    idAuthor: mongoose.Schema.Types.ObjectId,
    isPublic: Boolean,
    duration: Number,
    startDate: Date,
    endDate: Date,
    creationDate : Date,
};

export const TourSchema: Schema = new Schema({
    name: { type: String, required: true },
    idsStep: [{ type: mongoose.Schema.Types.ObjectId, ref: "Step"}],
    description: { type: String },
    idAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isPublic: Boolean,
    duration: Number,
    startDate : Date,
    endDate : Date,
    creationDate: Date
});

const Tour = mongoose.model<ITour>('Tour', TourSchema);
export default Tour;
