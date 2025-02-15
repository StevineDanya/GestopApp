import Link from "next/link";
import Image from "next/image";
import { BellIcon, StopIcon } from "@heroicons/react/24/outline";

export default function Nav() {
  return (
    <div className="flex">
      <nav className="bg-white h-28 w-full shadow-md px-6 py-4 flex justify-between items-center max-sm:hidden">
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-1/2 p-2 rounded border border-cyan-500 focus:outline-none"
        />

        <div className="flex items-center space-x-6">
          <div className="relative h-10 w-16">
            <BellIcon className="fas fa-bell text-blue-600 text-xl h-8 w-8 bg-bue-"></BellIcon>
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
              8
            </span>
          </div>
          <div className="relative">
            <i className="fas fa-user-circle text-gray-500 text-2xl"></i>
          </div>
        </div>
      </nav>
    </div>
  );
}
