"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  HomeIcon,
  TruckIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  SwatchIcon,
  RectangleGroupIcon,
  ChartPieIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";

export default function TableauAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/accueil", label: "Accueil", icon: HomeIcon },
    { href: "/fournisseurs", label: "Fournisseurs", icon: TruckIcon },
    { href: "/agences", label: "Agence", icon: BuildingOffice2Icon },
    { href: "/utilisateur", label: "Utilisateurs", icon: UserGroupIcon },
    { href: "/distribution", label: "Distribution", icon: SwatchIcon },
    { href: "/produits", label: "Produits", icon: RectangleGroupIcon },
    { href: "/rapports", label: "Rapport", icon: ChartPieIcon },
  ];

  const renderMenu = (items) => (
    <ul className="space-y-4 mt-8 font-bold">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className="flex items-center space-x-3 hover:bg-blue-600 p-3 rounded"
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="relative"
      style={{ backgroundImage: `url(/background.jpg)` }}
    >
      {/* Version Desktop  */}

      <section className="bg-blue-500 text-white h-screen p-6 w-64  max-sm:hidden">
        <Image src="/logo.jfif" alt="logo" width={90} height={50} />
        {renderMenu(menuItems)}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 hover:bg-green-500 mt-10"
        >
          <ArrowDownCircleIcon className="w-6 h-6 text-gray-100" />
          <span className="text-white">Déconnexion</span>
        </Link>
      </section>

      {/* Version Mobile Menu Burggeur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden p-4 text-white fixed  max-sm:mb-32 left-4 bg-blue-500 rounded-full max-sm:mt-3 mb-4 z-30 "
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 z-20">
          <section className="bg-cyan-950 text-white h-full p-6 w-64">
            <Image src="/logoBamboo.jpg" alt="logo" width={200} height={200} />
            {renderMenu(menuItems)}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 hover:bg-green-500 mt-10"
            >
              <ArrowDownCircleIcon className="w-6 h-6 text-gray-100" />
              <span className="text-white">Déconnexion</span>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
}
