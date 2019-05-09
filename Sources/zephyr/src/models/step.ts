import { PointOfInterest, IPointOfInterest } from './poi';
import { Quizz, IQuizz } from './quizz';

export interface IStep {
    _id: string;
    idPoi: IPointOfInterest;
    idQuizz: IQuizz;
    comment: string;
}

export class Step implements IStep{

    constructor(data?: Partial<IStep>) {
        data = {
            _id: null,
            idPoi: null,
            idQuizz: null,
            comment: "",
            ...(data || {}),
        }

        this._id = data._id;
        this.idPoi = data.idPoi;
        this.idQuizz = data.idQuizz;
        this.comment = data.comment;
    }
    
    public _id: string;
    public idPoi: IPointOfInterest;
    public idQuizz: IQuizz;
    public comment: string;

}