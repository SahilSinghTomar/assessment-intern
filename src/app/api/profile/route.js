import { connect } from '@/lib/dbConnect';
import User from '@/model/userModel';
import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(req) {
  try {
    const userId = await getDataFromToken(req);

    const { profilePhoto, location } = await req.json();
    // console.log(profilePhoto, location);

    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { profilePhoto, location },
      { new: true }
    );

    console.log(updatedUser);

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
