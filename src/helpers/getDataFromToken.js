import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get('token')?.value || '';

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
