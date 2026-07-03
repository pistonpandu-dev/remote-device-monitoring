import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === 'login') {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return NextResponse.json({ 
        success: true, 
        user: userCredential.user 
      });
    }

    if (action === 'register') {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return NextResponse.json({ 
        success: true, 
        user: userCredential.user 
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
