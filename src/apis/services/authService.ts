import { User, Auth, Session, Otp } from '../../models';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtEnum from '../../constants/jsonWebToken';
import { otpGenerator, mail } from '../../utils.ts';
import mailConfig from '../../config/mailConfig';

export const getUser = async (whereObj: any) => {
  const user = await User.findOne(whereObj);
  if (user) {
    return user;
  } else {
    return false;
  }
};

export const registerUser = async (user: any) => {
  try {
    const UserData = new User({
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username,
      type: user.type
    });
    const savedUser = await UserData.save();
    const authObj = new Auth({
      password: await Bcrypt.hash(user.password, 10),
      user_id: savedUser._id
    });
    return authObj.save();
  } catch (e) {
    throw e;
  }
};

export const signIn = async (loginType: any, password: string) => {
  const userData: any = await User.findOne(loginType);
  if (userData) {
    const isVerifiedUser: any = await Otp.findOne({ user_id: userData._id });
    if (!isVerifiedUser?.verified) {
      await sendEmailOtp(userData);
      return {
        status: 'failed',
        message: `account not verified. Email With Otp sent`
      };
    }
    const passwordData: any = await Auth.findOne({ user_id: userData._id });
    const isAuthenticated = await Bcrypt.compare(
      password,
      passwordData.password
    );
    if (!isAuthenticated) {
      return { status: 'failed', message: `incorrect password` };
    } else {
      const jwtToken = await jwt.sign(
        { data: userData._id, exp: jwtEnum.expires_in },
        jwtEnum.secret
      );
      await Session.findOneAndUpdate(
        {
          user_id: userData._id
        },
        {
          user_id: userData._id,
          $push: { session_token: jwtToken }
        },
        {
          upsert: true
        }
      );
      return {
        status: 'success',
        message: 'logged in successfully',
        session_token: jwtToken,
        user: userData
      };
    }
  } else {
    return {
      status: 'failed',
      message: `invalid ${loginType.email ? 'Email' : 'Username'}`
    };
  }
};

export const sendEmailOtp = async (user: any) => {
  const otp = otpGenerator();
  await Otp.findOneAndUpdate(
    {
      user_id: user._id
    },
    {
      user_id: user._id,
      otp,
      verified: false
    },
    {
      upsert: true
    }
  );
  const mailData = {
    from: mailConfig.user,
    to: user.email,
    subject: 'Home Foodz Verification Mail',
    html: `<h3>Hi ${user.name}<br>Your One Time Password for confirmation of your Home Foodz Account is <b>${otp}</b></h3>`
  };
  try {
    await mail(mailData);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const verifyOtp = async (payload: any) => {
  const otpData = await Otp.findOne({
    $and: [
      {
        user_id: payload.userId
      },
      {
        otp: payload.otp
      }
    ]
  });
  if (otpData) {
    await Otp.updateOne(
      {
        user_id: payload.userId
      },
      {
        $set: { verified: true }
      }
    );
    return true;
  } else {
    return false;
  }
};

export const getUsers = async () => {
  const whereObj = {};
  return User.find(whereObj);
};
