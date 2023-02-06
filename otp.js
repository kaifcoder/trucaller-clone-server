const otpGenerator = require('otp-generator');
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, number: true,  lowerCaseAlphabets: false });
  console.log(OTP);
  return OTP;
};



