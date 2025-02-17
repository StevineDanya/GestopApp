"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TableauAdmin from "@/components/tableauAdmin";
import Nav from "@/components/Nav";

const API_RAPPORT_URL = "https://gestock-app.onrender.com/Rapport";

export default function Rapport() {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRapports() {
      try {
        const response = await fetch(API_RAPPORT_URL);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des rapports");
        }
        const data = await response.json();
        setRapports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRapports();
  }, []);

  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-4">
        <Nav />
        <div className="flex w-full shadow-lg mt-10 max-sm:mt-20">
          <div className="flex w-full bg-white shadow-lg">
            <div className="flex-1 bg-white w-full h-screen">
              {/* Table des rapports */}
              <div className="rounded-xl">
                <div className="flex justify-between bg-cyan-500 max-sm:h-20 items-center rounded-xl mb-8">
                  <h1 className="text-3xl max-sm:text-xl font-bold text-white p-6">
                    Suivis Hebdomadaires des Mouvements...
                  </h1>
                  <Link className="max-sm:hidden" href="/inscrit">
                    <button className="flex items-center bg-green-500 text-white py-3 px-5 mr-5 rounded-xl hover:bg-blue-600 hover:scale-95 transition duration-150">
                      Autres rapports
                    </button>
                  </Link>
                </div>
                
                {loading ? (
                  <p>Chargement des rapports...</p>
                ) : (
                  <div className="card shadow-md border rounded-lg">
                    <div className="card-header flex justify-between items-center py-3 px-4 bg-gray-100">
                      <h6 className="font-semibold text-blue-600">Liste des Rapports</h6>
                    </div>
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-100 border-b">
                              <th className="border border-gray-200 px-4 py-2">Nom</th>
                              <th className="border border-gray-200 px-4 py-2">Agence</th>
                              <th className="border border-gray-200 px-4 py-2">Quantité</th>
                              <th className="border border-gray-200 px-4 py-2">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rapports.length > 0 ? (
                              rapports.map((rapport) => (
                                <tr key={rapport._id} className="border-b">
                                  <td className="border border-gray-200 px-4 py-2">{rapport.nom}</td>
                                  <td className="border border-gray-200 px-4 py-2">{rapport.agence}</td>
                                  <td className="border border-gray-200 px-4 py-2">{rapport.quantite}</td>
                                  <td className="border border-gray-200 px-4 py-2">{new Date(rapport.date).toLocaleDateString()}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="border border-gray-200 px-4 py-2 text-center">
                                  Aucun rapport disponible
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
