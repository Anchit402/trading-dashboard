import { ScrollArea } from "@/components/ui/scroll-area";

import AddToWatchList from "./AddToWatchList";

function WatchList() {
  return (
    <div className="w-1/4">
      <h2>WatchList</h2>
      <AddToWatchList />
      <ScrollArea />
    </div>
  );
}

export default WatchList;
