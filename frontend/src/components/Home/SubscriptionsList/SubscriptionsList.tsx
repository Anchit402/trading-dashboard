import { useState } from "react";

export default function SubscriptionsList() {
  const [ticks, setTicks] = useState<string[]>([]);

  const ws = new WebSocket("ws://localhost:8080/ws/ticks");
  ws.onmessage = (event: MessageEvent<string>) => {
    setTicks((prev) => [...prev, event.data]);
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold">Live Tick Data</h2>
      <ul className="mt-2 text-sm font-mono">
        {ticks.map((tick, i) => (
          <li key={i}>{tick}</li>
        ))}
      </ul>
    </div>
  );
}
