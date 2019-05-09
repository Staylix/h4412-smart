import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { ITour, TourSchema } from './tour';

export interface IUser extends mongoose.Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isProf: boolean;
    idsClassroom: [mongoose.Schema.Types.ObjectId];
    idsTour: [mongoose.Schema.Types.ObjectId];
};

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isProf: { type: Boolean, required: true },
    idsClassroom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    idsTour: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }]
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
