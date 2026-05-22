import { useEffect, useState } from "react";
import socket from "./socket";

const initialTickets = [
  { id: "101", title: "Truck Delay" },
  { id: "102", title: "Broken Shipment" },
  { id: "103", title: "Late Delivery" },
];

function App() {

  const [tickets] = useState(initialTickets);

  const [lockedTickets, setLockedTickets] = useState({});

  const [connected, setConnected] = useState(true);

  useEffect(() => {

    socket.emit("join_dashboard");

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("current_locks", (locks) => {

      const lockMap = {};

      locks.forEach(([ticketId, socketId]) => {
        lockMap[ticketId] = socketId;
      });

      setLockedTickets(lockMap);
    });

    socket.on("ticket_locked", ({ ticketId, lockedBy }) => {

      setLockedTickets((prev) => ({
        ...prev,
        [ticketId]: lockedBy,
      }));
    });

    socket.on("ticket_unlocked", ({ ticketId }) => {

      setLockedTickets((prev) => {

        const updated = { ...prev };

        delete updated[ticketId];

        return updated;
      });
    });

    return () => {
      socket.off();
    };

  }, []);

  const lockTicket = (ticketId) => {
    socket.emit("lock_ticket", ticketId);
  };

  const unlockTicket = (ticketId) => {
    socket.emit("unlock_ticket", ticketId);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Live Ops Helpdesk</h1>

      {!connected && (
        <div
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          Connection Lost: Reconnecting...
        </div>
      )}

      {tickets.map((ticket) => {

        const isLocked = lockedTickets[ticket.id];

        return (
          <div
            key={ticket.id}
            style={{
              padding: "15px",
              marginBottom: "10px",
              border: "1px solid black",
              background: isLocked ? "#ccc" : "#fff",
            }}
          >

            <h3>
              Ticket #{ticket.id}
            </h3>

            <p>{ticket.title}</p>

            {isLocked ? (
              <p>
                🔒 Locked
              </p>
            ) : (
              <p>
                Available
              </p>
            )}

            <button
              disabled={isLocked}
              onClick={() => lockTicket(ticket.id)}
            >
              Edit
            </button>

            <button
              onClick={() => unlockTicket(ticket.id)}
            >
              Save / Close
            </button>

          </div>
        );
      })}
    </div>
  );
}

export default App;