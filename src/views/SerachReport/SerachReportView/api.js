import axios from 'axios';
export default
    axios.create({
        baseURL: `http://localhost:88/sts_web_center_new/module/API_FREEZONE/`,
        headers: { 'Content-Type': 'multipart/form-data' }
    });