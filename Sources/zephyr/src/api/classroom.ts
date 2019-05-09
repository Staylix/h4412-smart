import axios from 'axios'
import { IUser } from './user';
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/classroom';

export interface IClassroom {
    idsTour?: string[];
    idsUser?: string[];
    name: string;
    id?: string;
};

export function callCreateClassroom(classroom: IClassroom, token: string): Promise<any> {
    let data = {
        classroom: {
            idsUser: [],
            idsTour: [],
            name: classroom.name
        }
    };
    return axios.post(baseURL, data,
        {
            headers: { 'Authorization': "bearer " + token }
        });
}

export function callAddUserToClassroom(idClassroom: string, user: IUser, token: string): Promise<any> {
    let data = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.email,
        isProf: false,
    };
    return axios.post(baseURL + '/addUsertoClass/' + idClassroom, data,
        {
            headers: { 'Authorization': "bearer " + token }
        });
}

export function callGetClassroom(token: string): Promise<any> {
    return axios.get(baseURL + '/getClassroomOfUser', {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function callDeleteClassroom(token: string, idClassroom: string): Promise<any> {
    return axios.delete(baseURL + '/' + idClassroom, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function callGetUsersOfClassroom(token: string, idClassroom: string): Promise<any> {
    return axios.get(`${baseURL}/getUsersOfClassroom/${idClassroom}`, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function addTourToClass(token: string, idClassroom: string, idTour: string): Promise<any> {
    return axios.post(`${baseURL}/addTourToClass`,
        {
            idTour: idTour,
            idClassroom: idClassroom,
        }, {

            headers: { 'Authorization': "bearer " + token }
        });
}