import { nodemailer } from 'nodemailer';
import crypto from "crypto";
import { config } from "../../config/config";
import Mailgen from "mailgen";
import { email } from 'zod';
import { Service } from 'react-native-ble-plx';


// generate OTP
export const generateOTP = () => {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};

// hash the otp
export const hashOTP = (data: string) => {
  if (!config.hashingSecret) {
    throw new Error("hashing secret is not defined");
  }
  return crypto
    .createHmac("sha256", config.hashingSecret)
    .update(data)
    .digest("hex");
};

// verify OTp
export const verifyOTP = (hashedOTP: string, data: string) => {
  const newHashedOTP = hashOTP(data);
  return newHashedOTP === newHashedOTP;
};

// sed otp to user via email

const _config = {
   service:"gmail",
   auth:{
      user:process.env.EMAIL_USERNAME,
      pass:process.env.EMAIL_PASSWORD
   }
}

export const sendOTPEmail = async(email:string,otp:number)=>{

}
