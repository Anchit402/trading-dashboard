import WatchListProvider from "@/Providers/WatchListProvider/WatchListProvider";
import SubscriptionsList from "./SubscriptionsList/SubscriptionsList";
import WatchList from "./WatchList/WatchList";

function Home() {
  return (
    <div className="flex gap-3 h-full">
      <WatchListProvider>
        <WatchList />
      </WatchListProvider>
      <SubscriptionsList />
    </div>
  );
}

export default Home;
