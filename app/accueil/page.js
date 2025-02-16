"use client";

import React, { useState, useEffect } from "react";
import TableauAdmin from "@/components/tableauAdmin";
import Nav from "@/components/Nav";
import ProduitList from "@/components/ProduitList";
import DistributionForm from "@/components/DistributionForm";

export default function Home() {
  const [stock, setStock] = useState([]);
  const [mouvements, setMouvements] = useState([]);

  // Fonction pour ajouter un mouvement après une distribution
  const addMovement = (agence, produit, quantite) => {
    setMouvements((prev) => [
      ...prev,
      { agence, produit, quantite, type: "sortie" },
    ]);
  };

  return (
    <div className="bg-white min-h-screen flex shadow-emerald-950">
      <TableauAdmin />
      <div className="min-h-screen bg-gray-100 flex flex-col w-full">
        <Nav />
        <header className="bg-blue-400 h-20 text-white py-4">
          <div className="container mx-auto text-center text-2xl font-semibold">
            Bienvenu Administrateur
          </div>
        </header>

        {/* Contenu principal */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-5">
          {["Total des Produits", "Alertes Stock Bas", "Distributions du Jour"].map(
            (title, index) => (
              <div
                key={index}
                className="bg-blue-400 rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <h3 className="text-white text-sm font-medium">{title}</h3>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            )
          )}
        </section>

        {/* Suivi hebdomadaire des mouvements */}
        <section className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-gray-800 font-semibold text-lg mb-4">
            Suivi Hebdomadaire des Mouvements
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["Agence", "Produit", "Stock Initial", "Entrées", "Sorties", "Stock Final"].map(
                  (header, index) => (
                    <th key={index} className="border border-gray-200 px-4 py-2 text-left">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {mouvements.length > 0 ? (
                mouvements.map((mvt, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-4 py-2">{mvt.agence}</td>
                    <td className="border border-gray-200 px-4 py-2">{mvt.produit}</td>
                    <td className="border border-gray-200 px-4 py-2">-</td>
                    <td className="border border-gray-200 px-4 py-2">0</td>
                    <td className="border border-gray-200 px-4 py-2">{mvt.quantite}</td>
                    <td className="border border-gray-200 px-4 py-2">-</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-200 px-4 py-2 text-center">
                    Aucune distribution enregistrée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Liste des produits */}
        <ProduitList />

        {/* Formulaire de distribution */}
        <div className="p-8">
          <h1 className="text-xl font-bold mb-6">Gestion de Distribution</h1>
          <DistributionForm addMovement={addMovement} />
        </div>
      </div>
    </div>
  );
}
