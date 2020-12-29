import { User, Auth } from '../../models';
import Bcrypt from 'bcrypt';

export const getUser = async (whereObj: any) => {
  const user = await User.findOne(whereObj);
  if (user) {
    return false;
  } else {
    return true;
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
    await authObj.save();
  } catch (e) {
    throw e;
  }
};

export const sendEmailOtp = async (email: string) => {};

export const getUsers = async () => {
  const whereObj = {};
  return User.find(whereObj);
};
