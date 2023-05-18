function URLPartSelect() {
    let response
    if (window.location.host == '172.18.1.194:5000' || window.location.host == 'localhost:3001' || window.location.host == 'localhost:3000' || window.location.host == 'localhost:5000') {
        response = await fetch('http://172.18.1.194/sts_web_center/module/RPT_JOBPACKING/data.php?load=workcenter');
    } else {
        response = await fetch('http://61.90.156.165/sts_web_center/module/RPT_JOBPACKING/data.php?load=workcenter');
    }
    return response;
  }
  
  export { URLPartSelect };
  