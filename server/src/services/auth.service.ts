import jwt from "jsonwebtoken";
import { User, IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

export const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export const registerUserService = async (userData: IUser) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    const token = jwt.sign(
      {id: newUser._id, email: newUser.email},
      process.env.JWT_SECRET!,
      { expiresIn: '1d'}
    );

    const userObject = newUser.toObject();
    const {password: _, ...userWithoutPassword} = userObject
    // The previous code had a bug here. This is the correct way to return.
    return { user: userWithoutPassword, token };
};

export const loginUserService = async (loginData: IUser) => {
    const {email, password} = loginData;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {id: user._id, email: user.email},
      process.env.JWT_SECRET!,
      {expiresIn: '1d'}
    );
 
    return { token };
}