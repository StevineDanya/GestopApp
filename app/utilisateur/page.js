"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";
import { PencilIcon, TrashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [agences, setAgences] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "Admin Agence", email: "", agenceId: "", password: "" });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Exemple de récupération du token
      const response = await fetch("https://gestock-app.onrender.com/User", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
      
      const data = await response.json();
      console.log("Data received:", data); // Log pour déboguer
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert("Erreur de chargement des utilisateurs");
      setUsers([]);
    }
  };

  const fetchAgences = async () => {
    try {
      const response = await fetch("https://gestock-app.onrender.com/Agence");
      if (!response.ok) throw new Error("Erreur lors de la récupération des agences");

      const data = await response.json();
      setAgences(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert("Erreur de chargement des agences");
      setAgences([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAgences();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.agenceId || !newUser.password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("https://gestock-app.onrender.com/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");

      alert(`Utilisateur ajouté avec succès ! Email de confirmation envoyé à ${newUser.email}`);
      setNewUser({ name: "", role: "", email: "", agenceId: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  return (
    <div className="flex">
      <TableauAdmin />
      <div className="container bg-slate-50 mx-auto p-6">
        <Nav />
        <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Utilisateurs</h1>

          <form className="mb-6 flex flex-wrap gap-4" onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="username"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
              required
            />
            <select
              value={newUser.agenceId}
              onChange={(e) => setNewUser({ ...newUser, agenceId: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
              required
            >
              <option value="">Sélectionner une agence</option>
              {agences.map((agence) => (
                <option key={agence.id} value={agence.id}>
                  {agence.nom}
                </option>
              ))}
            </select>

            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
            >
              <option value="root">root</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Ajouter</button>
          </form>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">username</th>
                <th className="px-4 py-2 text-left">email</th>
                <th className="px-4 py-2 text-left">role</th>
                <th className="px-4 py-2 text-left">agence</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{user.agenceId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">Aucun utilisateur trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}