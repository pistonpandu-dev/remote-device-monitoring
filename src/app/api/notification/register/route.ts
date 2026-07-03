import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fcmToken } = body;

    if (!fcmToken) {
      return NextResponse.json(
        { success: false, error: 'FCM token is required' },
        { status: 400 }
      );
    }

    // Register token with backend
    await apiClient.post('/notifications/register', { token: fcmToken });

    return NextResponse.json({ 
      success: true,
      message: 'Notification token registered successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
