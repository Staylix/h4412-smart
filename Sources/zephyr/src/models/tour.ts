import { Step } from './step';

export interface ITour {
    _id: string,
    name: string,
    description: string,
    idAuthor: string,
    isPublic: boolean,
    duration: number,
    idsStep: string[],
    steps: Step[],
};


export class Tour implements ITour {
    
    constructor(data?: Partial<ITour>) {
        data = {
            name: '',
            idsStep: [],
            description: null,
            idAuthor: null,
            isPublic: true,
            duration: 0,
            steps: [],
            ...(data || {})
        }

        this._id = data._id;
        this.name = data.name;
        this.idsStep = data.idsStep;
        this.description = data.description;
        this.idAuthor =  data.idAuthor;
        this.isPublic = data.isPublic;
        this.duration = data.duration;
        this.steps = data.steps.map((step) => new Step(step));

    }

    public _id: string;
    public name: string;
    public idsStep: string[];
    public description: string;
    public idAuthor: string;
    public isPublic: boolean;
    public duration: number;
    public steps: Step[];
}