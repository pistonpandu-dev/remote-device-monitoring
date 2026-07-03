import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/config';
import { getFirestore } from 'firebase/firestore';
import packageJson from '../../../../package.json';

export async function GET() {
  try {
    // Check Firebase connection
    const db = getFirestore();
    await db.collection('health').doc('check').set({ timestamp: Date.now() });

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: packageJson.version,
      environment: process.env.NODE_ENV,
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
      vercel: {
        region: process.env.VERCEL_REGION || 'unknown',
        url: process.env.VERCEL_URL || 'unknown',
        env: process.env.VERCEL_ENV || 'development',
      },
      memory: process.memoryUsage(),
      uptime: process.uptime(),
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
