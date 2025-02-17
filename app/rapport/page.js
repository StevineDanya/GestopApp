"use client";

import { useEffect, useState } from "react";

const API_PRODUCTS_URL = "https://gestock-app.onrender.com/Produit";
const API_AGENCIES_URL = "https://gestock-app.onrender.com/Agence";
const API_SUPPLIERS_URL = "https://gestock-app.onrender.com/Fournisseur";
const API_REPORT_URL = "https://gestock-app.onrender.com/ConsumptionReport";

export default function ConsumptionReportForm() {
  const [products, setProducts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({
    nom: "",
    agence: "",
    fournisseur: "",
    stockInitial: "",
    entrees: "",
    sorties: "",
    stockFinal: "",
    date: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, agenciesRes, suppliersRes] = await Promise.all([
          fetch(API_PRODUCTS_URL),
          fetch(API_AGENCIES_URL),
          fetch(API_SUPPLIERS_URL),
        ]);

        if (!productsRes.ok || !agenciesRes.ok || !suppliersRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const [productsData, agenciesData, suppliersData] = await Promise.all([
          productsRes.json(),
          agenciesRes.json(),
          suppliersRes.json(),
        ]);

        setProducts(productsData);
        setAgencies(agenciesData);
        setSuppliers(suppliersData);
      } catch (error) {
        console.error("Erreur chargement des données:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!report.nom || !report.agence || !report.fournisseur || !report.stockInitial || !report.entrees || !report.sorties) {
      alert("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_REPORT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...report,
          stockInitial: parseInt(report.stockInitial, 10),
          entrees: parseInt(report.entrees, 10),
          sorties: parseInt(report.sorties, 10),
          stockFinal: parseInt(report.stockInitial, 10) + parseInt(report.entrees, 10) - parseInt(report.sorties, 10),
          date: report.date || new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du rapport");

      setReport({ nom: "", agence: "", fournisseur: "", stockInitial: "", entrees: "", sorties: "", stockFinal: "", date: "" });
      alert("Rapport de consommation ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout du rapport");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Ajouter un rapport de consommation</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <select name="nom" value={report.nom} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled>Choisir un produit</option>
          {products.length > 0 ? (
            products.map((p) => (
              <option key={p._id} value={p._id}>{p.nom}</option>
            ))
          ) : (
            <option disabled>Aucun produit disponible</option>
          )}
        </select>

        <select name="agence" value={report.agence} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled>Choisir une agence</option>
          {agencies.length > 0 ? (
            agencies.map((a) => (
              <option key={a._id} value={a._id}>{a.nom}</option>
            ))
          ) : (
            <option disabled>Aucune agence disponible</option>
          )}
        </select>

        <select name="fournisseur" value={report.fournisseur} onChange={handleInputChange} className="p-3 border rounded-md" required>
          <option value="" disabled>Choisir un fournisseur</option>
          {suppliers.length > 0 ? (
            suppliers.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))
          ) : (
            <option disabled>Aucun fournisseur disponible</option>
          )}
        </select>

        <input type="number" name="stockInitial" placeholder="Stock initial" value={report.stockInitial} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <input type="number" name="entrees" placeholder="Entrées" value={report.entrees} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <input type="number" name="sorties" placeholder="Sorties" value={report.sorties} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <input type="date" name="date" value={report.date} onChange={handleInputChange} className="p-3 border rounded-md" required />

        <button type="submit" className="mt-4 col-span-2 bg-blue-600 text-white p-3 rounded-md" disabled={loading}>
          {loading ? "Ajout..." : "Ajouter Rapport"}
        </button>
      </form>
    </div>
  );
}
