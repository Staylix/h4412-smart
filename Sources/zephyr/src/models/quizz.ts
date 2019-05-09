

export interface IQuizz {
    type : String;
    content : String;
    responses : String[];
    goodAnswer : Number;
};

export class Quizz implements IQuizz{

    constructor(data? : Partial<IQuizz>) {
        data = {
            type: null,
            content: "",
            responses: ["", "", "", ""],
            goodAnswer: 0, // TODO: Manage it randomly
            ...(data || {}),
        }

        this.type = data.type;
        this.content = data.content;
        this.responses = data.responses;
        this.goodAnswer = data.goodAnswer;
    }

    public type : String;
    public content : String;
    public responses : String[];
    public goodAnswer : Number;
}