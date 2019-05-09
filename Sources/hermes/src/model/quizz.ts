import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface IQuizz extends mongoose.Document {
    type: String;
    content: String;
    responses: [String];
    goodAnswer: Number;
};

export const QuizzSchema = new mongoose.Schema({
    type: String,
    content: String,
    responses: [String],
    goodAnswer: Number
});

QuizzSchema.plugin(uniqueValidator);

const Quizz = mongoose.model<IQuizz>('Quizz', QuizzSchema);
export default Quizz;
