import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';

export async function GET() {
  try {
    const response = await apiClient.get('/settings');
    return NextResponse.json({ 
      success: true, 
      data: response.data 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await apiClient.post('/settings', body);
    return NextResponse.json({ 
      success: true, 
      data: response.data 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const response = await apiClient.put('/settings', body);
    return NextResponse.json({ 
      success: true, 
      data: response.data 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
