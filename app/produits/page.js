"use client";

import Link from "next/link";
import Image from "next/image";
import TableauAdmin from "@/components/tableauAdmnin";
import Nav from "@/components/Nav";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Produit() {
  const [products, setProducts] = useState([
    { id: 1, name: "Produit 1" },
    { id: 2, name: "Produit 2" },
    { id: 3, name: "Produit 3" },
  ]);

  const handleEdit = (id) => {
    const productName = prompt(
      "Modifier le nom du produit:",
      products.find((p) => p.id === id)?.name
    );
    if (productName) {
      setProducts(
        products.map((p) => (p.id === id ? { ...p, name: productName } : p))
      );
    }
  };

  const handleDelete = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-4">
        <Nav />
        <div className="flex w-full shadow-lg mt-10 max-sm:mt-24">
          <div className="flex w-full bg-white shadow-lg">
            <div className="flex-1 w-full h-screen">
              <div className="my-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl max-sm:text-xl font-bold text-gray-800 p-6">
                    Listes de produits
                  </h1>
                  <Link href="/inscrit">
                    <button className="flex items-center bg-green-500 text-white py-3 px-5 mr-5 max-sm:w-18 rounded hover:bg-blue-600 hover:scale-95 transition duration-150">
                      Ajouter un produit
                    </button>
                  </Link>
                </div>

                <div className="card shadow-md border rounded-lg max-sm:mt-5">
                  <div className="card-header flex justify-between items-center py-3 px-4 bg-gray-100">
                    <h6 className="font-semibold text-blue-600">Produits</h6>
                  </div>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left">Nom</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr
                              key={product.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="px-4 py-2">{product.name}</td>
                              <td className="px-4 py-2">
                                <button
                                  className="text-blue-600 hover:text-blue-800 mr-2"
                                  onClick={() => handleEdit(product.id)}
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <span className="text-sm text-gray-500">
                        {products.length} produit(s)
                      </span>
                    </div>
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
