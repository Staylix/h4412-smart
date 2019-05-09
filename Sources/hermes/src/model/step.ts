import mongoose, { Schema, Document } from 'mongoose';
import { IQuizz, QuizzSchema } from './quizz';

export interface IAnswerQuizz{
    idStudent: mongoose.Schema.Types.ObjectId;
    numAnswer: Number;
}

export const AnswerQuizz: mongoose.Schema = new mongoose.Schema({
    idStudent: mongoose.Schema.Types.ObjectId,
    numAnswer: Number
});


export interface IStep extends mongoose.Document {
    idPOI: String;
    // completion?: { TODO
    //     [key: mongoose.Schema.Types.ObjectId]: [mongoose.Schema.Types.ObjectId]
    // };
    validation: [mongoose.Schema.Types.ObjectId];
    quizzAnswer: [IAnswerQuizz];
    idQuizz: mongoose.Schema.Types.ObjectId;
    tags: [String];
    comment : String;
};

export const StepSchema: Schema = new mongoose.Schema({
    idPoi: { type: String, required: true },
    // completion: {
    //     mongoose.Schema.Types.ObjectId: [mongoose.Schema.Types.ObjectId]
    //  },
    quizzAnswer: [AnswerQuizz],
    validation: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    idQuizz: { type: mongoose.Schema.Types.ObjectId, ref: "Quizz" },
    tags: [String],
    comment : String
});

const Step = mongoose.model<IStep>('Step', StepSchema);
export default Step;
