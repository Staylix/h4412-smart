import axios from 'axios'
import URL_BASE from '../conf'

const URL = URL_BASE + 'user';

export function callSignIn(user) {
    return axios.post(URL + '/login', {
        email: user.email,
        password: user.password,
    });
}

