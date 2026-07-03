import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase/config';

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('firebaseToken')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Verify token with Firebase
    // This is a simplified version, actual implementation would use admin SDK
    // on server-side
    const user = await auth.getUser(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Add user to request context
    const response = NextResponse.next();
    response.headers.set('x-user-id', user.uid);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}
