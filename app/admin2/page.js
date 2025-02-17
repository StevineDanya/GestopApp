"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TableauAdmin from "@/components/tableauAdmin";
import Nav from "@/components/Nav";

const API_DISTRIBUTION_URL = "https://gestock-app.onrender.com/Distribution";
const API_PRODUCTS_URL = "https://gestock-app.onrender.com/Produit";
const API_SUPPLIERS_URL = "https://gestock-app.onrender.com/Fournisseur";
const API_AGENCIES_URL = "https://gestock-app.onrender.com/Agence";

const Home = () => {
  const [distributions, setDistributions] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [distRes, prodRes, suppRes, agencyRes] = await Promise.all([
          fetch(API_DISTRIBUTION_URL),
          fetch(API_PRODUCTS_URL),
          fetch(API_SUPPLIERS_URL),
          fetch(API_AGENCIES_URL),
        ]);

        if (!distRes.ok || !prodRes.ok || !suppRes.ok || !agencyRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const [distData, prodData, suppData, agencyData] = await Promise.all([
          distRes.json(),
          prodRes.json(),
          suppRes.json(),
          agencyRes.json(),
        ]);

        setDistributions(distData);
        setProducts(prodData);
        setSuppliers(suppData);
        setAgencies(agencyData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement données:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fonction pour obtenir le nom du produit par son ID
  const getProductName = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.nom : "Inconnu";
  };

  // Fonction pour obtenir le nom du fournisseur par son ID
  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s._id === supplierId);
    return supplier ? supplier.name : "Inconnu";
  };

  // Fonction pour obtenir le nom de l'agence par son ID
  const getAgencyName = (agencyId) => {
    const agency = agencies.find((a) => a._id === agencyId);
    return agency ? agency.nom || agency.name : "Inconnu";
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

        {/* Suivi hebdomadaire des mouvements */}
        <section className="bg-white rounded-lg shadow-md p-4 mb-8 mt-5">
          <h2 className="text-gray-800 font-semibold text-lg mb-4">
            Suivi Hebdomadaire des Mouvements
          </h2>
          {loading ? (
            <p>Chargement des données...</p>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">Agence</th>
                    <th className="border border-gray-200 px-4 py-2">Produit</th>
                    <th className="border border-gray-200 px-4 py-2">Fournisseur</th>
                    <th className="border border-gray-200 px-4 py-2">Quantité</th>
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {distributions.length > 0 ? (
                    distributions.map((dist) => (
                      <tr key={dist._id}>
                        <td className="border border-gray-200 px-4 py-2">{getAgencyName(dist.destinataire)}</td>
                        <td className="border border-gray-200 px-4 py-2">{getProductName(dist.nom)}</td>
                        <td className="border border-gray-200 px-4 py-2">{getSupplierName(dist.fournisseur)}</td>
                        <td className="border border-gray-200 px-4 py-2">{dist.quantite}</td>
                        <td className="border border-gray-200 px-4 py-2">{new Date(dist.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="border border-gray-200 px-4 py-2 text-center">
                        Aucune donnée disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Bouton de redirection vers la page de rapport */}
              <div className="mt-6 flex justify-end">
                <Link href="/rapport">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    📥 Envoyer un rapport
                  </button>
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
