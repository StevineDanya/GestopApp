// pages/index.js

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IconMenu from "./MenuIcon";
import {
  ChevronDownIcon,
  CogIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Admin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-32  bg-slate-400">
        {/* Logo and Main Dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-gray-700"
            >
              <Image
                src="/logoBamboo.jpg"
                alt="Tailwind Labs"
                width={2000}
                height={2000}
                className="w-64 h-24 rounded-3xl"
              />
              <span className="font-semibold text-3xl">Menu</span>
              <ChevronDownIcon className="w-10 h-10" />
            </button>
            {menuOpen && (
              //   <div className="absolute mt-2  border border-gray-200 rounded-md shadow-lg w-48 bg-cyan-700 h-screen w-full">
              //     <Link
              //       href="/teams/1/settings"
              //       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              //     >
              //       <CogIcon className="w-5 h-5" />
              //       Paramètres
              //     </Link>
              //     <div className="border-t border-gray-200"></div>
              //     <Link
              //       href="/teams/1"
              //       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              //     >
              //       <Image
              //         src="/logoBamboo.jpg"
              //         alt="Tailwind Labs"
              //         width={2000}
              //         height={2000}
              //         className="w-10 h-10 rounded-full"
              //       />
              //       Tailwind Labs
              //     </Link>
              //     <Link
              //       href="/teams/2"
              //       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              //     >
              //       <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center">
              //         WC
              //       </span>
              //       Workcation
              //     </Link>
              //     <div className="border-t border-gray-200"></div>
              //     <Link
              //       href="/teams/create"
              //       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              //     >
              //       <PlusIcon className="w-5 h-5" />
              //       New team&hellip;
              //     </Link>
              //   </div>
              <IconMenu />
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Events
          </Link>
          <Link
            href="/orders"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Orders
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="text-gray-700 hover:text-gray-900"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </Link>
          <Link
            href="/inbox"
            aria-label="Inbox"
            className="text-gray-700 hover:text-gray-900"
          >
            <InboxIcon className="w-5 h-5" />
          </Link>
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <Image
                src="/profile-photo.jpg"
                alt="Profile"
                width={2000}
                height={2000}
                className="w-8 h-8 rounded-full"
              />
            </button>
            {profileMenuOpen && (
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 right-0">
                <Link
                  href="/my-profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  My profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <CogIcon className="w-5 h-5" />
                  Settings
                </Link>
                <div className="border-t border-gray-200"></div>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                  Privacy policy
                </Link>
                <Link
                  href="/logout"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <div className="lg:hidden flex justify-center mt-2 bg-red-700">
        <Link href="/" className="text-gray-700 hover:text-gray-900 px-4">
          Home
        </Link>
        <Link href="/events" className="text-gray-700 hover:text-gray-900 px-4">
          Events
        </Link>
        <Link href="/orders" className="text-gray-700 hover:text-gray-900 px-4">
          Orders
        </Link>
      </div>
    </nav>
  );
}
