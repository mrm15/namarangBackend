const express = require('express');
const axios = require("axios");
const {sendTestMessage} = require("./preRequsit");
const router = express.Router();

// const data = {
//   'username': "09384642159",
//   'password': "Rr4870094924",
//   'message': "hi how r u ",
//   'numbers': "09384642159",
//   'senderNumber': "",
//   'sendOn': "",
//   'yourMessageIds': "1002",
//   'sendType': 1,
// }
const data = {
  // "username": "09384642159",
  // "password": "Rr4870094924",
  "username": "09126970541",
  "password": "Endj174622endj",
  "message": "متن پیامک",
  "numbers": "09384642159",
  "sendernumber": "",
  "sendon": "",
  "sendtype": "1"
}
const sendSMS1 = (req, res) => {


  try{
    sendTestMessage()
    res.send({mohammad:"ok ok ok ok "})
  }catch (err){
    res.send(err)
  }
  /*
  axios.post("https://niksms.com/fa/publicapi/ptpsms", data).then(response => {
    debugger
    res.send(response?.data)

  }).catch(err => {
    res.send(err)
  })

   */

}

const sendSMS2 = (req, res) => {



  axios.post("https://niksms.com/fa/publicapi/ptpsms", data).then(response => {
    debugger
    res.send(response?.data)

  }).catch(err => {
    res.send(err)
  })


}

//new product
// router.post('/', );
router.get('/', sendSMS2);
module.exports = router