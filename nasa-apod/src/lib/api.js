import axios from "axios";

export function getAPOD(date = '') {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=oIWU1fqwCWmadZY96DUk64pWQAntQOyg9jTUt4BX`);
}