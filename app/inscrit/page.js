import Link from "next/link";
import Image from "next/image";
import TableauAdmin from "@/components/tableauAdmnin";
import Nav from "@/components/Nav";
import { BellIcon, StopIcon } from "@heroicons/react/24/outline";
export default function Addfleurs() {
  return (
    <div
      className="flex bg-cover bg-white min-h-screen shadow-lg backdrop-blur-lg"
      style={{ backgroundImage: `url(/abou.gif)` }}
    >
      <TableauAdmin />
      <div className="container bg-transparent mx-auto px-4">
        <Nav />
        <div className="flex flex-col md:flex-row justify-center items-center  h-64 md:h-[600px] px-4 max-sm:mt-52 backdrop-blur-md">
          <Image
            src="/services.jpg"
            width={600}
            height={600}
            alt="Une Gestionnaire "
            className="w-full md:w-1/2 max-md:h-[200px]  rounded-md object-cover h-[500px] mb-16  lg:mt-24 "
          />
          <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-8">
            <form className="flex flex-col gap-6 items-center md:items-start">
              <div className="w-full md:w-2/3">
                <label className="block text-3xl font-bold mb-2">
                  Fournisseur
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Entrez le nom du fournisseur"
                  required
                  className="w-full border border-cyan-500 focus:border-cyan-400 outline-none rounded-md px-3 py-2"
                />
              </div>

              <div className="w-full md:w-2/3">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white rounded-md text-2xl py-2 mt-4 w-full max-sm:mb-8 hover:bg-green-600 hover:scale-95 transition duration:500"
                >
                  Crée
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
