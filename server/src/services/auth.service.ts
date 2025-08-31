

import jwt from "jsonwebtoken";
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

export interface IUserdata extends Document{
  name: string,
  email: string,
  password: string
}

export const getAllUsersServices = async () => {
    const users = await User.find().select('-password');
    
    return users;
}

export const registerUserService = async (userData: IUserdata) => {

    // ...hashing password and saving user logic goes here...
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save user
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    // Token creation 
    const token = jwt.sign(
      {id: newUser._id, email: newUser.email},
      process.env.JWT_SECRET!,
      { expiresIn: '1d'}
    );


    // Return user data (without password)
    const userObject = newUser.toObject();
    delete (userObject as any).password;
    return {userObject, token};

};

export const loginUserService = async (loginData: IUserdata) => {
    const {email, password} = loginData;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
      {id: user._id, email: user.email},    // Payload
      process.env.JWT_SECRET!,              // Secret key from ..env
      {expiresIn: '1D'}                     // Tokken encryption
    )

    // Return the token 
    return { token }
}

