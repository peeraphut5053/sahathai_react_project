import Axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = (values) => {
    const instance = Axios.create({
        baseURL: `http://172.18.1.194:99/STS_web_api/api/`,
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });

    instance.post(`account/register`, values)
        .then(response => {
            const userData = response.data;
            console.log(userData)
        })
}

const UserLoginGetNewToken = async (values) => {
    let token = ""
    token = Axios.post(`http://172.18.1.194:99/STS_Web_API/api/account/login`, values)
        .then(res => {
            token = res.data;
            console.log('token', token)
            localStorage.setItem('token', token.accessToken);
            return token
        }).catch(function (error) {
            localStorage.setItem('username', 'guest');
            localStorage.setItem('token', "");
            localStorage.setItem('userData', "");
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

    return token
}

const UserLoginSetDataFromToken = async (token) => {
    let userData = ""
            Axios.create({
                baseURL: `http://172.18.1.194:99/STS_web_api/api/member/data`,
                timeout: 1000,
                headers: { 'Authorization': 'Bearer ' + token.accessToken }
            }).get(`http://172.18.1.194:99/STS_web_api/api/member/data`)
                .then(response => {
                    userData = response.data;
                    localStorage.setItem('username', userData.email);
                    console.log(userData)
                    console.log(2)
                    return userData
                })
    return userData
}

const UserLoginSetDataFromToken2 = async (token) => {

    let userData = ""
        setTimeout(() => {
            Axios.create({
                baseURL: `http://172.18.1.194:99/STS_web_api/api/member/data`,
                timeout: 1000,
                headers: { 'Authorization': 'Bearer ' + token.accessToken }
            }).get(`http://172.18.1.194:99/STS_web_api/api/member/data`)
                .then(response => {
                    userData = response.data;
                    localStorage.setItem('username', userData.email);
                    console.log(userData)
                    console.log(2)
                    return userData
                })
        }, 2000)
    return userData
}

const UserLogin = async (values) => {
    const token = await UserLoginGetNewToken(values)
    const SetDataFromToken = await UserLoginSetDataFromToken(token)
    
}






export { UserLoginGetNewToken,UserLoginSetDataFromToken,UserLoginSetDataFromToken2,UserRegister, UserLogin }