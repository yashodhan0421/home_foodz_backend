import mongoose from 'mongoose';
import { default as mongoCreds } from '../config/mongo';

export default () => {
  mongoose.connect(mongoCreds, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('database connected successfully');
    }
  });
};
