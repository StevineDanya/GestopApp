"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([
    { id: 1, name: "Fournisseur 1" },
    { id: 2, name: "Fournisseur 2" },
  ]);

  const [newFournisseur, setNewFournisseur] = useState({ name: "" });

  const handleEdit = (id) => {
    const fournisseurName = prompt("Modifier le nom du fournisseur:", fournisseurs.find((f) => f.id === id)?.name);
    if (fournisseurName) {
      setFournisseurs(fournisseurs.map((f) => (f.id === id ? { ...f, name: fournisseurName } : f)));
    }
  };

  const handleDelete = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      setFournisseurs(fournisseurs.filter((f) => f.id !== id));
    }
  };

  const handleAddFournisseur = (e) => {
    e.preventDefault();
    if (newFournisseur.name) {
      setFournisseurs([...fournisseurs, { id: Date.now(), ...newFournisseur }]);
      setNewFournisseur({ name: "" });
    }
  };

  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-6">
        <Nav />
        <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Fournisseurs</h1>

          <form className="mb-6 flex gap-4" onSubmit={handleAddFournisseur}>
            <input
              type="text"
              placeholder="Nom du fournisseur"
              value={newFournisseur.name}
              onChange={(e) => setNewFournisseur({ name: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/3"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Ajouter</button>
          </form>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurs.map((fournisseur, index) => (
                <tr key={fournisseur.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3">{fournisseur.name}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(fournisseur.id)}>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(fournisseur.id)}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
