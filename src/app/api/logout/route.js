import { connect } from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(req) {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

    console.log(response);

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
