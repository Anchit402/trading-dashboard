import { DollarSign, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="block w-full mx-auto bg-white shadow-md rounded-md p-3 mb-2">
      <div className="container flex flex-wrap items-center text-slate-800 gap-[3rem]">
        <Link
          to="/"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
        >
          <div className="flex items-center">
            <DollarSign />
            Trade View
          </div>
        </Link>

        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link to="orders" className="flex items-center">
                <ListOrdered />
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        ></button>
      </div>
    </nav>
  );
}

export default Navbar;
