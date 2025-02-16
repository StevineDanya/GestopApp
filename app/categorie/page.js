"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://gestock-app.onrender.com/Categorie";

  // 🔹 Récupérer les catégories
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
        return response.json();
      })
      .then((data) => {
        console.log("Données récupérées :", data);
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔹 Ajouter une catégorie
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory({ name: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Modifier une catégorie
  const handleEdit = async (id) => {
    const category = categories.find((c) => c._id === id);
    if (!category) return;

    const newName = prompt("Modifier le nom de la catégorie :", category.name);
    if (!newName) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification");

      setCategories(categories.map((c) => (c._id === id ? { ...c, name: newName } : c)));
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setCategories(categories.filter((c) => c._id !== id));
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Catégories</h1>

          {/* FORMULAIRE D'AJOUT */}
          <form className="mb-6 flex gap-4" onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="Nom de la catégorie"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/3"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Ajouter
            </button>
          </form>

          {/* AFFICHAGE DES CATÉGORIES */}
          {loading ? (
            <p>Chargement des catégories...</p>
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
                {categories.map((category, index) => (
                  <tr key={category._id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleEdit(category._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(category._id)}
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
