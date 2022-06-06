import axios from 'axios';
export default
    axios.create({
        baseURL: `http://localhost:5432/`,
        headers: { "Content-Type": "application/json; charset=UTF-8" },
    });