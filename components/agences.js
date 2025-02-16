"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";

export default function Clients() {
  const [agences, setAgences] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [nomAgence, setNomAgence] = useState("");

  useEffect(() => {
    async function fetchAgences() {
      try {
        const response = await fetch("https://gestock-app.onrender.com/Agence");
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);

        const data = await response.json();
        console.log("Données récupérées :", data);
        setAgences(data);
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    }
    fetchAgences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomAgence.trim() === "") {
      alert("Le nom de l'agence est requis !");
      return;
    }

    const nouvelleAgence = { nom: nomAgence };

    try {
      const response = await fetch("https://gestock-app.onrender.com/Agence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelleAgence),
        mode: "cors",
      });

      const agenceAjoutee = await response.json();
      console.log("Agence ajoutée :", agenceAjoutee);

      setAgences([agenceAjoutee, ...agences]);
      setNomAgence("");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Ajout impossible");
    }
  };

  const handleModifier = async (id) => {
    const nouveauNom = prompt("Entrez le nouveau nom de l'agence:");
    if (!nouveauNom) return;

    try {
      const response = await fetch(`https://gestock-app.onrender.com/Agence/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nouveauNom }),
        mode: "cors",
      });

      const updatedAgence = await response.json();
      console.log("Agence modifiée :", updatedAgence);

      setAgences(
        agences.map((agence) =>
          agence._id === id ? { ...agence, nom: nouveauNom } : agence
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
      alert("Modification impossible");
    }
  };

  const handleSupprimer = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cette agence ?")) return;

    try {
      const response = await fetch(`https://gestock-app.onrender.com/Agence/${id}`, {
        method: "DELETE",
        mode: "cors",
      });

      console.log("Réponse suppression :", response);

      setAgences(agences.filter((agence) => agence._id !== id));
    } catch (error) {
      console.error("Erreur:", error);
      alert("Suppression impossible");
    }
  };

  return (
    <div className="container mx-auto px-4 shadow-lg">
      <Nav />
      <div className="flex w-full max-sm:mt-24 bg-white shadow-lg">
        <div className="flex-1 bg-white w-full h-screen">
          <div className="my-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold max-sm:text-xl ml-4 text-gray-800">Agences</h1>
              <Link href="/creationagence">
                <button className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:scale-95 transition duration-150 max-sm:hidden">
                  Ajouter une Agence
                </button>
              </Link>
            </div>

            <div className="card shadow-md border rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Ajouter une agence</h2>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nom de l'agence"
                  value={nomAgence}
                  onChange={(e) => setNomAgence(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Ajouter
                </button>
              </form>
            </div>

            <div className="card shadow-md border rounded-lg">
              <div className="card-header flex justify-between items-center py-3 px-4 bg-gray-100">
                <h6 className="font-semibold text-blue-600">Liste des agences</h6>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  {chargement ? (
                    <p>Chargement des agences...</p>
                  ) : erreur ? (
                    <p className="text-red-500">Erreur: {erreur}</p>
                  ) : (
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Nom de l'agence</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agences.map((agence) => (
                          <tr key={agence._id} className="border-b">
                            <td className="px-4 py-2">{agence.nom || "Nom introuvable"}</td>
                            <td className="px-4 py-2 flex gap-2">
                              <button
                                onClick={() => handleModifier(agence._id)}
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                              >
                                Modifier
                              </button>
                              <button
                                onClick={() => handleSupprimer(agence._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
                <div className="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
