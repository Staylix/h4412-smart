import axios from 'axios'
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/step';


export function createStep(token: string, step): Promise<any> {
    return axios.post(baseURL, {
        step: {
            idPoi: step.idPoi,
            // idQuizz: step.idQuizz,
            tags: [],
            comment: step.comment,
            // validation: [],
            // quizzAnswer: [],
        }
    }, {
            headers: { 'Authorization': "bearer " + token }
        });
}

export function callEditStep(token: string, step): Promise<any> {
    return axios.put(
        baseURL + '/' + step._id,
        {
            step: step
        }, {
            headers: { 'Authorization': "bearer " + token }
        });
}
