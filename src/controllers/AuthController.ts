// File: src/controllers/AuthController.ts
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { findUser, getUserById, createUser } from '../data/Users';

dotenv.config();

interface AuthRequest extends Request {
  userId?: number;
}

const SECRET_KEY = process.env.JWT_SECRET as string

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUser(username);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤', error });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username);
    if (!user) {
      res.status(401).json({ message: 'User not exists' });
      return;
    }
    if (!user.password) {
      res.status(401).json({ message: 'Password not set for this user' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // 設置 cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 如果是生產環境，使用 https
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 小時
    });

    res.status(200).json({ message: '登入成功' });
  } catch (error) {
    console.error('Login error:', error); // Log the actual error object
    res.status(500).json({ message: '伺服器錯誤', error: error instanceof Error ? error.message : String(error) }); // Send a more informative error message if possible
  }
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User ID not found in token' });
    return;
  }

  try {
    const user = await getUserById(String(userId));
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: '伺服器錯誤', error: error instanceof Error ? error.message : String(error) });
  }
}

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.status(200).json({ message: '登出成功' });
}