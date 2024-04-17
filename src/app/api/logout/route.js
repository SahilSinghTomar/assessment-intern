import { connect } from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
    });

    console.log(response.cookies);

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

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
