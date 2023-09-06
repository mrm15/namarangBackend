let soap = require('soap');
let parseString = require('xml2js').parseString;
module.exports.sendTestMessage = function () {
  let username = "09384642159";
  let password = "Rr4870094924";
  let groupSmsMobile ="09384642159";
  let ptpTestMobile ="09384642159";
  let authenticate={"security":{"Username":username, "Password":password}};
  let url = "http://niksms.com:1370/NiksmsWebservice.svc?wsdl";


  soap.createClient(url, function (err, client) {
    //Ptp Sms
    var ptpModel={"security":{
        "Username":username,
        "Password":password
      },
      "model": {
        "Message": [{"string":"جهت تست نظیر به نظیر"}],
        "SenderNumber": "9830006179",
        "Numbers": [{"string":ptpTestMobile}],
        "SendType": "Normal",
        "YourMessageId": [{"long":"1"}],
        //"SendOn": "2016-06-22T15:01:00.000Z" in parameter optional ast
      }};


    client.PtpSms(ptpModel, function (err, result,body) {
      console.log("PtpSms : " + result.PtpSmsResult.Status);
    });


  });



};

module.exports.sendTestMessage();
