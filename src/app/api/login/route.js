import { connect } from '@/lib/dbConnect';
import User from '@/model/userModel';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid Credentials' },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    const response = NextResponse.json(
      {
        message: 'Login successful',
      },
      {
        status: 200,
      }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
