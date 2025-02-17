"use client";

import React, { useState, useEffect } from "react";
import TableauAdmin from "@/components/tableauAdmin";
import Nav from "@/components/Nav";
import ProduitList from "@/components/ProduitList";
import DistributionForm from "@/components/DistributionForm";

const API_DISTRIBUTION_URL = "https://gestock-app.onrender.com/Distribution";
const API_AGENCE_URL = "https://gestock-app.onrender.com/Agences";
const API_PRODUIT_URL = "https://gestock-app.onrender.com/Produits";

export default function Home() {
  const [mouvements, setMouvements] = useState([]);
  const [agences, setAgences] = useState({});
  const [produits, setProduits] = useState({});
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  // Charger les agences
  useEffect(() => {
    async function fetchAgences() {
      try {
        const response = await fetch(API_AGENCE_URL);
        if (!response.ok) throw new Error("Erreur lors du chargement des agences");

        const data = await response.json();
        const agenceMap = {};
        data.forEach((agence) => {
          agenceMap[agence._id] = agence.nom;
        });

        setAgences(agenceMap);
      } catch (error) {
        console.error("Erreur lors du chargement des agences:", error);
      }
    }

    fetchAgences();
  }, []);

  // Charger les produits
  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await fetch(API_PRODUIT_URL);
        if (!response.ok) throw new Error("Erreur lors du chargement des produits");

        const data = await response.json();
        const produitMap = {};
        data.forEach((produit) => {
          produitMap[produit._id] = produit.nom;
        });

        setProduits(produitMap);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      }
    }

    fetchProduits();
  }, []);

  // Charger les distributions dès le chargement du composant
  useEffect(() => {
    async function fetchDistributions() {
      try {
        const response = await fetch(API_DISTRIBUTION_URL);
        if (!response.ok) throw new Error("Erreur lors du chargement des distributions");

        const data = await response.json();
        console.log("Données distributions récupérées:", data);

        setMouvements(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    }

    fetchDistributions();
  }, []);

  // Ajouter un mouvement manuellement après une distribution
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

        {/* Afficher un message de chargement */}
        {loading ? (
          <div className="text-center mt-10 text-lg font-semibold">
            Chargement des données...
          </div>
        ) : (
          <>
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
                        <td className="border border-gray-200 px-4 py-2">
                          {agences[mvt.destinataire] || "Agence inconnue"}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {produits[mvt.produit] || "Produit inconnu"}
                        </td>
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
          </>
        )}
      </div>
    </div>
  );
}
