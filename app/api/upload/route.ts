import { ImgBBResponse } from '@/lib/types';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageBase64 = formData.get('image') as string;
    const expiration = formData.get('expiration') as string;

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    const API_KEY = process.env.IMGBB_API_KEY;
    if (!API_KEY) {
      console.error('IMGBB_API_KEY is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.append('image', imageBase64);
    if (expiration && expiration !== '0') {
      params.append('expiration', expiration);
    }

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data: ImgBBResponse = await response.json();

    if (!response.ok || !data.success) {
      console.error('ImgBB API Error:', data);
      return NextResponse.json(
        { error: 'Failed to upload to ImgBB via API' },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json(
      { error: 'Internal server error during upload processing' },
      { status: 500 }
    );
  }
}
