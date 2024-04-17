import { connect } from '@/lib/dbConnect';
import User from '@/model/userModel';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendThankyouEmail } from '@/helpers/mailer';

connect();

export async function POST(req) {
  try {
    const { name, username, email, password } = await req.json();

    const userByUsername = await User.findOne({ username });

    if (userByUsername) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    await sendThankyouEmail({ email, username });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
