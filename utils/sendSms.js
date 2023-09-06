const axios = require('axios')
const sendSms = async (text, destinationNumber) => {
  const url = `https://niksms.com/fa/publicapi/groupsms?username=09126970541&password=Endj174622endj&numbers=${destinationNumber}&sendernumber=50004307&message=${text}`
  const res = await axios.get(url);
  debugger
  if (res?.data?.Status === 1) {
    return true
  } else {
    return false
  }
}

module.exports = {sendSms}