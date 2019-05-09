import axios from 'axios'
import { globalURL } from '../constants/themes';

const baseURL = globalURL + '/user';

export interface IUser {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isProf: boolean;
    idsClassroom: string[];
    idsTour: string[];
    token?: string; // Only for front?
};

export function callSignUp(user: IUser): Promise<any> {
    return axios.post(baseURL, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isProf: "true",
    });
}

export function callSignIn(user: IUser): Promise<any> {
    return axios.post(baseURL + '/login', {
        email: user.email,
        password: user.password,
    });
}

export function callFindUserById(token: string, id: string): Promise<any> {
    return axios.post(baseURL + '/' + id, {
        headers: { 'Authorization': "bearer " + token }
    });
}

export function getData(token: string): Promise<any> {
    return axios.get(baseURL + '/studentStats', {
        headers: { 'Authorization': "bearer " + token }
    });
}

// export function callAddUserToClassroom(student : IUser, token : string) : Promise<any> {
//     return axios.post(baseURL + '/addUserToClass/:id', {
//         headers: {'Authorization': "bearer "+ token}, 
//         email: student.email,
//         firstName: student.firstName,
//         lastName : student.lastName,
//         password : "techaiii",
//         isProf : false
//     });
// }

