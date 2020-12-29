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

  if (!(await authService.getUser({ username: body.username }))) {
    res.json({ status: 'failed', message: 'username already exists' });
  }
  if (!(await authService.getUser({ email: body.email }))) {
    res.json({ status: 'failed', message: 'email already exists' });
  }
  try {
    await authService.registerUser(body);
  } catch (e) {
    res.json({ status: 'failed', message: e });
  }
  await authService.sendEmailOtp(body.email);
  res.json({ status: 'success', message: 'successfully Registered' });
};

export const signIn = async (req, res) => {};

export const getAllUsers = async (req, res) => {
  const users = await authService.getUsers();
  res.json({ status: 'success', data: users });
};
