/* sets up a WebSocket server using ws library
- WebSocket server sets up and manages real-time WebSocket connections  
- defines basic behavior for new client connections and message handling */
const WebSocket = require("ws");

/* setupWebSocket takes an existing HTTP/S server as an argument 
- allows WebSocket and HTTP to share the same TCP port */
function setupWebSocket(server) {
  /* creates a new WebSocket server, wss, that is bound to the given HTTP server 
  - enables upgrading HTTP to WebSocket over the same port 
  - HTTP/REST API requests use standard routes (e.g. GET /api/users) handled by
    Express 
  - WebSocket clients initiate a special Upgrade HTTP request (e.g. GET /chat) with
    headers, Upgrade: websocket, which the WebSocket server intercepts 
  - WebSocket server must not conflict with Express route paths */
  const wss = new WebSocket.Server({ server });

  /* sets up an event listener for new client connections 
  - ws is the socket representing the individual client 
  (socket - endpoint for sending and receiving data across a network
            bridge between two machines */
  wss.on("connection", (ws) => {
    ws.send("Hello from server");
    ws.on("message", (message) => {
      console.log("Received:", message);
      ws.send("Echo: " + message);
    });
  });
}

module.exports = setupWebSocket;
