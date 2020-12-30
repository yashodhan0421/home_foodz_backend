import googleLibPhone from 'google-libphonenumber';
const phoneUtil = googleLibPhone.PhoneNumberUtil.getInstance();
import { authService } from '../services';

export const signUp = async (req, res, next) => {
  const body = req.body;
  if (!body?.name) res.json({ status: 'failed', message: 'name is required' });
  else if (!body?.username)
    res.json({ status: 'failed', message: 'username is required' });
  else if (!body?.email)
    res.json({ status: 'failed', message: 'email is required' });
  else if (!body?.password)
    res.json({ status: 'failed', message: 'password is required' });
  else if (!body?.phone)
    res.json({ status: 'failed', message: 'phone is required' });
  else if (!body?.country)
    res.json({ status: 'failed', message: 'country is required' });
  else if (!body?.type)
    res.json({ status: 'failed', message: 'type is required' });

  try {
    const isValidPhone = await phoneUtil.isValidNumberForRegion(
      phoneUtil.parse(body.phone, body.country),
      body.country
    );
    if (!isValidPhone) {
      res.json({ status: 'failed', message: 'invalid phone number' });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: 'failed', message: 'invalid phone number' });
  }

  if (!(await authService.getUser({ username: body.username }))) {
    res.json({ status: 'failed', message: 'username already exists' });
  }
  if (!(await authService.getUser({ email: body.email }))) {
    res.json({ status: 'failed', message: 'email already exists' });
  }
  try {
    const user = await authService.registerUser(body);
    await authService.sendEmailOtp(body);
    res.json({ status: 'success', message: 'successfully Registered', user });
  } catch (e) {
    res.json({ status: 'failed', message: e });
  }
};

export const signIn = async (req, res) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const loginType: any = {};
  const isEmail = regex.test(req.body.username);
  if (isEmail) {
    loginType.email = req.body.username;
  } else {
    loginType.username = req.body.username;
  }
  const password = req.body.password;
  const response = await authService.signIn(loginType, password);
  res.json(response);
};

export const resendOtp = async (req, res) => {
  const userId = req.body.user_id;
  const user = await authService.getUser({ _id: userId });
  try {
    await authService.sendEmailOtp(user);
    res.json({
      status: 'success',
      message: 'Otp has been sent to registered email'
    });
  } catch (e) {
    res.json({
      status: 'failed',
      message: 'failed to resend Otp. Try After Sometime'
    });
  }
};

export const verifyOtp = async (req, res) => {
  const payload = {
    userId: req.body.user_id,
    otp: req.body.otp
  };
  const isVerified = await authService.verifyOtp(payload);
  if (isVerified) {
    res.json({
      status: 'success',
      message: 'Otp verified successfully'
    });
  } else {
    res.json({
      status: 'failed',
      message: 'Incorrect Otp'
    });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await authService.getUsers();
  res.json({ status: 'success', data: users });
};
