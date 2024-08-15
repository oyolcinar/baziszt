import { NextResponse } from 'next/server';

export async function POST() {
  try {
    return NextResponse.json(
      { message: 'Signed out successfully' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
