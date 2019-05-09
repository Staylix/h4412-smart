import axios from 'axios'
import URL from '../conf'


export function getTours(token) {
    return axios.get(URL + 'tour/getToursOfAStudent',
        {headers: {'Authorization': 'bearer '+ token}}
    )
}

export function isValidatedStep(token, id) {
    return axios.get(URL + 'step/studentHasValidated/' + id.toString(),
        {headers: {'Authorization': 'bearer ' + token}}
    )
}

export function answerQuizz(token, id, response) {
    return axios.post(URL + 'step/answerAQuizz',
        {
            idStep : id.toString(),
            idAnswer: response.toString()
        },
        {
            headers: {'Authorization': 'bearer ' + token},
        }
    )
}
