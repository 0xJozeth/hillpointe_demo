// app/api/mock/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // im simulating an api call by using a delay here
  await new Promise(resolve => setTimeout(resolve, 500)); 

  // should be what we get back from that mock call above
  const mockData = {
    message: "Success! You've reached the mock API.",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(mockData);
}