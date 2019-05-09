import axios from 'axios'
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/tour';


export function callGetTours(token: string): Promise<any> {
    return axios.get(baseURL, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function callGetMyTours(token: string, idUser: string): Promise<any> {
    return axios.get(baseURL + '/byAuthorId/' + idUser, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function callGetMyToursAndSteps(token: string): Promise<any> {
    return axios.get(baseURL + '/getFullToursForAuthor', {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function createTour(token: string, tour) {
    console.log(tour)
    return axios.post(baseURL, {
        tour: {
            ...tour,
        }
    }, {
            headers: { 'Authorization': "bearer " + token }
        })
}

export function getTourById(token: string, tourId) {
    return axios.get(`${baseURL}/withSteps/${tourId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}

export function callDeleteTourById(token: string, tourId) {
    return axios.delete(`${baseURL}/${tourId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}