"use client";

import { useEffect, useState } from "react";

const API_DISTRIBUTION_URL = "https://gestock-app.onrender.com/Distribution";
const API_PRODUCTS_URL = "https://gestock-app.onrender.com/Produit";
const API_SUPPLIERS_URL = "https://gestock-app.onrender.com/Fournisseur";
const API_AGENCIES_URL = "https://gestock-app.onrender.com/Agence";

export default function DistributionForm() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDistribution, setNewDistribution] = useState({
    nom: "",
    quantite: "",
    fournisseur: "",
    destinataire: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, suppliersRes, agenciesRes] = await Promise.all([
          fetch(API_PRODUCTS_URL),
          fetch(API_SUPPLIERS_URL),
          fetch(API_AGENCIES_URL),
        ]);

        if (!productsRes.ok || !suppliersRes.ok || !agenciesRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const [productsData, suppliersData, agenciesData] = await Promise.all([
          productsRes.json(),
          suppliersRes.json(),
          agenciesRes.json(),
        ]);

        console.log("Produits récupérés:", productsData);
        console.log("Fournisseurs récupérés:", suppliersData);
        console.log("Agences récupérées:", agenciesData);

        setProducts(productsData);
        setSuppliers(suppliersData);
        setAgencies(Array.isArray(agenciesData) ? agenciesData : agenciesData.agences || []);

      } catch (error) {
        console.error("Erreur chargement données:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewDistribution({ ...newDistribution, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newDistribution.nom || !newDistribution.quantite || !newDistribution.fournisseur || !newDistribution.destinataire) {
      alert("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_DISTRIBUTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newDistribution,
          quantite: parseInt(newDistribution.quantite, 10),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la distribution");

      setNewDistribution({ nom: "", quantite: "", fournisseur: "", destinataire: "" });
      alert("Distribution ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout de la distribution");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <select name="nom" value={newDistribution.nom} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled >Choisir un produit</option>
          {products.length > 0 ? (
            products.map((p) => (
              <option key={p._id} value={p._id}>{p.nom}</option>
            ))
          ) : (
            <option disabled>Aucun produit disponible</option>
          )}
        </select>

        <input type="number" name="quantite" placeholder="Quantité" value={newDistribution.quantite} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <select name="fournisseur" value={newDistribution.fournisseur} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled>Choisir un fournisseur</option>
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))
          ) : (
            <option disabled>Aucun fournisseur disponible</option>
          )}
        </select>

        <select name="destinataire" value={newDistribution.destinataire} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled>Choisir une agence</option>
          {agencies.length > 0 ? (
            agencies.map((a) => (
              <option key={a._id} value={a._id}>{a.name || a.nom}</option>
            ))
          ) : (
            <option disabled>Aucune agence disponible</option>
          )}
        </select>
        <input type="date" name="date" value={newDistribution.date} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <button type="submit" className="mt-4 col-span-2 bg-blue-600 text-white p-3 rounded-md" disabled={loading}>
          {loading ? "Ajout..." : "Ajouter Distribution"}
        </button>
      </form>

      
      
    </div>
  );
}
