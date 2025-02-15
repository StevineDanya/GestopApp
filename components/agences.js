"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Clients() {
  // États pour gérer les données des agences, le chargement et les erreurs
  const [agences, setAgences] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [nomAgence, setNomAgence] = useState(""); // État pour le champ du formulaire

  // Fonction pour récupérer les données de l'API
  useEffect(() => {
    async function fetchAgences() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }
        const data = await response.json();
        setAgences(data); // Mise à jour de l'état avec les données reçues
      } catch (err) {
        setErreur(err.message); // Capture des erreurs
      } finally {
        setChargement(false); // Fin du chargement
      }
    }

    fetchAgences();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomAgence.trim() === "") {
      alert("Le nom de l'agence est requis !");
      return;
    }

    // Ajout d'une nouvelle agence localement (simulation)
    const nouvelleAgence = {
      id: agences.length + 1, // ID temporaire
      userId: 1,
     
    };

    setAgences([nouvelleAgence, ...agences]); // Ajoute en haut de la liste
    setNomAgence(""); // Réinitialise le champ après ajout
  };

  return (
    <div className="container mx-auto px-4 shadow-lg">
      <Nav />
      <div className="flex w-full max-sm:mt-24 bg-white shadow-lg">
        <div className="flex-1 bg-white w-full h-screen">
          <div className="my-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold max-sm:text-xl ml-4 text-gray-800">
                Agences
              </h1>
              <Link href="/creationagence">
                <button className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:scale-95 transition duration-150 max-sm:hidden">
                  Ajouter une Agence
                </button>
              </Link>
            </div>

            {/* Formulaire pour ajouter une agence */}
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

            {/* Liste des agences */}
            <div className="card shadow-md border rounded-lg">
              <div className="card-header flex justify-between items-center py-3 px-4 bg-gray-100">
                <h6 className="font-semibold text-blue-600">
                  Liste des agences
                </h6>
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
                       
                          <th className="px-4 py-2 text-left">Utilisateur</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {agences.map((agence) => (
                          <tr key={agence.id} className="border-b">
                           
                            <td className="px-4 py-2">{agence.userId}</td>
                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Pagination ou autres actions ici */}
                <div className="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
