import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Tour, {ITour} from './tour';
import User, {IUser} from './user';

type ObjectId = mongoose.Schema.Types.ObjectId

export interface IClassroom extends mongoose.Document {
    idsTour: [mongoose.Schema.Types.ObjectId];
    idsUser: [mongoose.Schema.Types.ObjectId];
    name: String;
    level: String;
    
};

export const ClassroomSchema = new mongoose.Schema({
    idsTour: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour'}],
    idsUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    name: {type : String, required : true, unique : true},
    level: String
});

ClassroomSchema.plugin(uniqueValidator);

const Classroom = mongoose.model<IClassroom>('Classroom', ClassroomSchema);
export default Classroom;
