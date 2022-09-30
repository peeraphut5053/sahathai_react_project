let APIPath;

if (window.location.host == '172.18.1.194:5000' || window.location.host == 'localhost:3001' || window.location.host == '172.18.1.194' ) {
    APIPath = 'http://172.18.1.194/sts_web_center/module/';
} else {
    APIPath = 'http://61.90.156.165/sts_web_center/module/';
}

export default APIPath;
