import { connect } from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/userModel';

connect();

export async function POST(req) {
  try {
    const { username } = await req.json();

    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json({ available: false }, { status: 400 });
    }

    return NextResponse.json({ available: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
