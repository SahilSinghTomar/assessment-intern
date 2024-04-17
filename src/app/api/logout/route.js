import { connect } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

connect();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
    });

    // Set cache-control headers to prevent caching
    response.headers.append('Cache-Control', 'no-store');
    response.headers.append('Pragma', 'no-cache');
    response.headers.append('Expires', '0');

    response.cookies.set('token', '', {
      httpOnly: true,
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
