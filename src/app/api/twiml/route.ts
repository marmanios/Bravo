import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: { text: () => any; }) {
  // Parse the URL-encoded form data
  const formData = await req.text();
  const params = Object.fromEntries(new URLSearchParams(formData));

  // Create a TwiML response
  const twiml = new twilio.twiml.VoiceResponse();

  // First connection: Stream the audio to the WebSocket endpoint
  twiml.connect().stream({
    url: 'wss://5f17-129-100-255-122.ngrok-free.app/websocket/media-stream',
  });

  // Second connection: Dial a phone number directly
  twiml.dial('+16472679724');  // Dial directly without the 'connect' object

  // Return the TwiML response
  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}
