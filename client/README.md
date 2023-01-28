## Client app

1. [Long Polling](/src/LongPolling.jsx)
2. [Event Sourcing](/src/EventSourcing.jsx)
3. [WebSocket](/src/WebSocketComponent.jsx)

---

#### How to run locally

1. Uncomment one of components in index.js
2. Execute `npm run start` in client folder.
3. Execute one of scripts in server folder:
   * `npm run dev:lp` to start server with long polling.
   * `npm run dev:es` to start server with event sourcing.
   * `npm run dev:ws` to start server with websockets.
