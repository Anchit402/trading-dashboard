import { useWatchListContext } from "@/Providers/WatchListProvider/WatchListProvider";

export default function SubscriptionsList() {
  const { ticks } = useWatchListContext();

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
