"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";

export default function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [newFournisseur, setNewFournisseur] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://gestock-app.onrender.com/Fournisseur";

  // 🔹 Récupérer les fournisseurs
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors du chargement des fournisseurs");
        return response.json();
      })
      .then((data) => {
        console.log("Données récupérées :", data); // Vérifier en console
        setFournisseurs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔹 Ajouter un fournisseur
  const handleAddFournisseur = async (e) => {
    e.preventDefault();
    if (!newFournisseur.name) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFournisseur),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      const addedFournisseur = await response.json();
      setFournisseurs([...fournisseurs, addedFournisseur]);
      setNewFournisseur({ name: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Modifier un fournisseur
  const handleEdit = async (id) => {
    const fournisseur = fournisseurs.find((f) => f._id === id);
    if (!fournisseur) return;

    const newName = prompt("Modifier le nom du fournisseur :", fournisseur.name);
    if (!newName) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification");

      setFournisseurs(fournisseurs.map((f) => (f._id === id ? { ...f, name: newName } : f)));
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Supprimer un fournisseur
  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setFournisseurs(fournisseurs.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-6">
        <Nav />
        <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Gestion des Fournisseurs</h1>

          {/* FORMULAIRE D'AJOUT */}
          <form className="mb-6 flex gap-4" onSubmit={handleAddFournisseur}>
            <input
              type="text"
              placeholder="Nom du fournisseur"
              value={newFournisseur.name}
              onChange={(e) => setNewFournisseur({ name: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/3"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ajouter
            </button>
          </form>

          {/* AFFICHAGE DES FOURNISSEURS */}
          {loading ? (
            <p>Chargement des fournisseurs...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fournisseurs.map((fournisseur, index) => (
                  <tr key={fournisseur._id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <td className="px-4 py-3">{fournisseur.name}</td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(fournisseur._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(fournisseur._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
