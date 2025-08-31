import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="w-full flex justify-center mt-4">
        <div className="w-95/100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
