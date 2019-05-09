import axios from 'axios'
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/quizz';

export function getQuizz(token: string, quizzId): Promise<any> {
    return axios.get(baseURL + '/' + quizzId, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function editQuizz(token: string, quizz): Promise<any> {
    return axios.put(baseURL + '/' + quizz._id, {
        quizz: quizz,
    }, {
            headers: { 'Authorization': "bearer " + token }
        });
}