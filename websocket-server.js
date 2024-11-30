const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { SpeechClient } = require('@google-cloud/speech');

// Initialize Google Speech-to-Text client
const speechClient = new SpeechClient({ keyFilename: './macswin-7167960a1a01.json' });

// Create an express app
const app = express();

// Create an HTTP server from the express app
const server = http.createServer(app);

// Create a WebSocket server for handling connections
const wss = new WebSocket.Server({ noServer: true });

// To keep track of active frontend clients for transcription delivery
let frontendClients = [];

// WebSocket connection handler for both Twilio audio stream and frontend transcriptions
wss.on('connection', (ws, req) => {
  if (req.url === '/websocket/media-stream') {
    // Handle the incoming audio stream from Twilio
    console.log('New WebSocket connection for Twilio media stream');

    // Create a Google Speech-to-Text stream
    const recognizeStream = speechClient
      .streamingRecognize({
        config: {
          encoding: 'MULAW', // Twilio uses MULAW encoding
          sampleRateHertz: 8000,
          languageCode: 'en-US',
        },
        interimResults: true,
      })
      .on('data', (data) => {
        const transcription =
          data.results[0]?.alternatives[0]?.transcript || '';
        console.log('Transcription:', transcription);

        // Send transcription to all connected frontend clients
        frontendClients.forEach((client) => {
          client.send(JSON.stringify({ transcription }));
        });
      })
      .on('error', (err) => {
        console.error('Error with Google Speech-to-Text:', err);
      });

    // Handle incoming audio data from Twilio via WebSocket
    ws.on('message', (message) => {
      try {
        const msg = JSON.parse(message.toString());
        console.log('Received audio message from Twilio:', msg);

        // Expect audio data under 'media' event
        if (msg.event === 'media' && msg.media && msg.media.payload) {
          const audioBuffer = Buffer.from(msg.media.payload, 'base64');
          recognizeStream.write(audioBuffer);
        } else {
          console.log('Invalid message or missing media payload');
        }
      } catch (err) {
        console.error('Error processing Twilio audio data:', err);
      }
    });

    // WebSocket close handler
    ws.on('close', () => {
      console.log('Twilio WebSocket connection closed');
      recognizeStream.end();  // Close the Speech-to-Text stream properly
    });
  } else if (req.url === '/websocket/transcriptions') {
    // Handle frontend connections for receiving transcriptions
    console.log('New WebSocket connection for transcriptions');
    frontendClients.push(ws);

    // WebSocket close handler for frontend
    ws.on('close', () => {
      console.log('Frontend WebSocket connection closed');
      frontendClients = frontendClients.filter(client => client !== ws);
    });
  }
});

// Handle the WebSocket upgrade request for '/websocket' paths
server.on('upgrade', (request, socket, head) => {
  if (request.url === '/websocket/media-stream' || request.url === '/websocket/transcriptions') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('WebSocket server is listening on ws://localhost:3000/websocket');
});
