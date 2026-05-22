# Live Ops Helpdesk Frontend

A real-time collaborative support dashboard built using **React.js** and **Socket.io-client**.

This frontend connects to a Node.js + Express + Socket.io backend to provide live ticket synchronization, ticket locking, and real-time collaboration between multiple support agents.

---

# 🚀 Features

* Real-time ticket dashboard
* Live WebSocket communication using Socket.io-client
* Instant ticket locking and unlocking
* Real-time UI synchronization across multiple clients
* Disabled editing for locked tickets
* Visual lock indicators (🔒)
* Automatic UI updates without page refresh
* Connection loss detection with reconnect banner
* Ghost disconnect recovery support

---

# 🏗️ Tech Stack

* React.js
* JavaScript
* Socket.io-client
* CSS / Inline Styling

---

# 📂 Project Structure

```bash id="xqjj4d"
frontend/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── index.js
│   └── socket.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash id="xlgw8u"
git clone <your-repo-url>
```

Move to frontend folder:

```bash id="jlwm4u"
cd frontend
```

Install dependencies:

```bash id="4nl1ur"
npm install
```

---

# ▶️ Run The Frontend

Start development server:

```bash id="jlwmge"
npm start
```

---

# 🌐 Frontend Runs On

```bash id="jlwm22"
http://localhost:3000
```

---

# 🔌 Backend Connection

The frontend connects to the backend Socket.io server using:

```js id="x4svjlwm"
const socket = io("http://localhost:5000");
```

Make sure backend server is running before starting frontend.

---

# 📡 Real-Time Functionality

## Ticket Locking

When an agent clicks the Edit button:

```js id="psuzjlwm"
socket.emit("lock_ticket", ticketId);
```

The backend validates the lock and broadcasts updates to all connected clients.

---

## Ticket Unlocking

When an agent clicks Save / Close:

```js id="1yjlwm"
socket.emit("unlock_ticket", ticketId);
```

The ticket becomes available again for other agents.

---

# 🔒 Locking UI

When a ticket is locked:

* Ticket row turns gray
* 🔒 icon appears
* Edit button becomes disabled
* Lock status updates instantly for all users

---

# 👻 Ghost Disconnect Handling

If a user closes their browser unexpectedly:

* Backend detects socket disconnect
* Ticket lock is automatically released
* Frontend instantly updates for all connected users

---

# 📶 Connection Loss Detection

Frontend listens for:

```js id="jlwmra"
socket.on("disconnect")
```

If connection drops:

* Red warning banner appears
* User is informed about reconnecting state

---

# 🧪 Testing

## Real-Time Lock Test

1. Open two browser windows
2. Lock a ticket in Window 1
3. Window 2 instantly updates

---

## Ghost Disconnect Test

1. Lock a ticket
2. Close browser tab abruptly
3. Ticket automatically unlocks in other windows

---

# 📌 Future Improvements

* Authentication system
* Agent names and avatars
* Ticket creation API
* Persistent database integration
* Responsive UI improvements
* Notification system

---

# 👨‍💻 Author

Nayan Kar
