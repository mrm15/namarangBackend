const {getCurrentTimeStamp} = require("../../utils/timing");
const User = require("../../models/User");
const {loginCodeGenerator, generateLoginSms} = require("../../utils/number");
const jwt = require('jsonwebtoken');

const handleLoginSMS = async (req, res) => {


  let {phoneNumber: phoneNumber} = req.body;

  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن یافت نشد'});

  try {
    const user = await User.findOne({phoneNumber}).exec();

    // اگه این آدم قبلا ثبت نام کرده بود. باید بگیم داری کلا اشتباه میزنی و گزینه ی آیا تا ب حال ثبت نام شده فعال بود دیگه نباید اجازه بدیم ادامه بده
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "کاربری با این شماره تلفن یافت نشد! ."
      });
    }
    if (!user.isRegister) {
      return res.status(401).json({
        status: false,
        message: "این کاربر هنوز ثبت نام خود را کامل نکرده است"
      });
    }


    const loginCode = loginCodeGenerator()
    const text = generateLoginSms(loginCode)
    // const isSend = await sendSms(text, phoneNumber)
    // if (!isSend) {
    //   res.status(500).json({status: true, message: "ارسال پیام موفقیت آمیز نبود"})
    //   return
    // }


    const currentTimeStamp = getCurrentTimeStamp()


    //user.phoneNumber = phoneNumber
    user.loginCode = loginCode
    user.loginCodeSendDate = currentTimeStamp
    user.updateAt = currentTimeStamp
    await user.save()

    res.status(200).json({'status': true, message: "کد ورود به سایت پیامک شد.", text});


  } catch (err) {
    res.status(500).json({'message': err.message});
  }

}


const verifyLoginSMS = async (req, res) => {
  debugger
  const cookies = req.cookies;
  //console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const {phoneNumber: phoneNumber, loginCode: loginCode} = req.body;
  if (!phoneNumber) return res.status(400).json({'message': 'شماره تلفن را وارد کنید'});
  if (!loginCode) return res.status(400).json({'message': 'کد ورود را وارد کنید'});

  const foundUser = await User.findOne({phoneNumber}).exec();
  if (!foundUser) return res.status(401).json({'message': 'کاربری با این شماره تلفن یافت نشد'}); //Unauthorized

  // اگه یه درصد کاربر توی دیتا بیس بود ولی کلید ثبت نام شده فالس بود
  if (!foundUser.isRegister) {
    return res.status(401).json({'message': 'لطفا ابتدا ثبت نام خود را کامل کنید'})
  }
  //  چون بعد از لاگین کد ورود رو پاک میکنم پس اگه کد ورود خالی بود. ینی کاربر هنوز درخواست کد ورود نداده
  if (foundUser.loginCode === "" && foundUser.isRegister) {
    return res.status(401).json({'message': 'لطفا مجددا درخواست ارسال کد ورود دهید.'})
  }
  // evaluate Login Code


  if (+foundUser.loginCode !== +loginCode) {
    return res.status(401).json({'message': 'کد ورود صحیح نیست'})
  }

  // evaluate password
  const roles = Object.values(foundUser.roles).filter(Boolean);
  // create JWTs
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "username": foundUser.username,
        "roles": roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '10s'}
  );
  const newRefreshToken = jwt.sign(
    {"username": foundUser.username},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '1d'}
  );

  // Changed to let keyword
  let newRefreshTokenArray =
    !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

  if (cookies?.jwt) {

    /*
    Scenario added here:
        1) User logs in but never uses RT and does not logout
        2) RT is stolen
        3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({refreshToken}).exec();

    // Detected refresh token reuse!
    if (!foundToken) {
      console.log('attempted refresh token reuse at login!')
      // clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
  }

  // Saving refreshToken with current user
  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  foundUser.loginCode = "";
  foundUser.updateAt = getCurrentTimeStamp();
  const result = await foundUser.save();
  // console.log(result);
  // console.log(roles);

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', newRefreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});

  // Send authorization roles and access token to user
  res.json({roles, accessToken});
}
module.exports = {handleLoginSMS, verifyLoginSMS}