import axios from 'axios';
export default
    axios.create({
        baseURL: `http://localhost:5432/report/`,
        headers: { 'Content-Type': 'multipart/form-data' }
    });