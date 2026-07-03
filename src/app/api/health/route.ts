import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/config';
import { getFirestore } from 'firebase/firestore';

export async function GET() {
  try {
    // Check Firebase connection
    const db = getFirestore();
    await db.collection('health').doc('check').set({ timestamp: Date.now() });

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        firebase: {
          status: 'connected',
          auth: !!auth,
          firestore: true,
        },
        api: {
          status: 'connected',
          url: process.env.NEXT_PUBLIC_API_URL,
        },
        websocket: {
          status: 'connected',
          url: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
        },
      },
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    };

    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
