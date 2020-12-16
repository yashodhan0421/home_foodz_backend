import googleLibPhone from 'google-libphonenumber';
const phoneUtil = googleLibPhone.PhoneNumberUtil.getInstance();
import { authService } from '../services';

type authController = {
  signUp: any;
  signIn: any;
};

const controller: authController = { signIn: null, signUp: null };

controller.signUp = async (req, res, next) => {
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

  try {
    const isValidPhone = phoneUtil.isValidNumberForRegion(
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

  if (!(await authService.getUser(body.username))) {
    res.json({ status: 'failed', message: 'username already exists' });
  }
  if (!(await authService.getUser(body.email))) {
    res.json({ status: 'failed', message: 'email already exists' });
  }
  await authService.registerUser(body);
  await authService.sendEmailOtp(body.email);
  res.json({ status: 'success', message: 'successfully Registered' });
};

controller.signIn = async (req, res) => {};

export default controller;
