import Link from "next/link";
import Image from "next/image";
import TableauAdmin from "@/components/tableauAdmnin";
import Nav from "@/components/Nav";

export default function Rapport() {
  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-4">
        <Nav />
        <div className="flex w-full shadow-lg mt-10 max-sm:mt-20">
          <div className="flex w-full bg-white shadow-lg">
            <div className="flex-1 bg-white w-full h-screen">
              {/* Users Table */}
              <div className="rounded-xl">
                <div className="flex justify-between bg-cyan-500 max-sm:h-20 items-center rounded-xl mb-8">
                  <h1 className="text-3xl max-sm:text-xl font-bold text-white p-6">
                    Suivis Hebdomadaires des Mouvements...
                  </h1>
                  <Link className="max-sm:hidden" href="/inscrit">
                    <button className="flex items-center bg-green-500 text-white py-3 px-5 mr-5 rounded-xl hover:bg-blue-600 hover:scale-95 transition duration-150">
                      Autres rapport.
                    </button>
                  </Link>
                  <Link className="md:sm:hidden" href="/inscrit">
                    <Image
                      src="/add.png"
                      alt="add"
                      width={40}
                      height={40}
                      className="md:sm:hidden"
                    />
                  </Link>
                </div>

                <div className="card shadow-md border rounded-lg">
                  <div className="card-header flex justify-between items-center py-3 px-4 bg-gray-100">
                    <h6 className="font-semibold text-blue-600">Libreville</h6>
                    <div className="w-1/4"></div>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left">Nom</th>
                          </tr>
                        </thead>
                        <tbody>, qscj cn</tbody>
                      </table>
                    </div>

                    {/* Je mets uen Pagination ici pour voir les différentes Agences  */}
                    <div className="mt-4 bg-green-400 h-7 w-full">,dc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
