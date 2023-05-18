import axios from "axios";

let url = "";
if (window.location.host == '172.18.1.194:5000') {
  url = '172.18.1.194'
} else if (window.location.host == 'localhost:5000') {
  url = '172.18.1.194'
} else if (window.location.host == 'localhost:3000') {
  url = '172.18.1.194'
} else {
  url = '61.90.156.165'
}

console.log("window.location.host", window.location.host)

export default axios.create({
  // baseURL : "http://localhost:88/sts_web_center_new/module/",
  baseURL: `http://${url}/sts_web_center/module/`,
  responseType: "json",
  // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
});



