"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";
import { PencilIcon, TrashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Utilisateurs() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin 1", role: "Super Admin", email: "admin1@example.com", agenceId: "001" },
    { id: 2, name: "Admin 2", role: "Admin Agence", email: "admin2@example.com", agenceId: "002" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", role: "Admin Agence", email: "", agenceId: "", password: "" });

  const handleEdit = (id) => {
    const userName = prompt("Modifier le nom de l'utilisateur:", users.find((u) => u.id === id)?.name);
    if (userName) {
      setUsers(users.map((u) => (u.id === id ? { ...u, name: userName } : u)));
    }
  };

  const handleDelete = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.agenceId && newUser.password) {
      setUsers([...users, { id: Date.now(), ...newUser }]);
      alert(`Email de confirmation envoyé à ${newUser.email}`);
      setNewUser({ name: "", role: "Admin Agence", email: "", agenceId: "", password: "" });
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
              placeholder="Nom"
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
            <input
              type="text"
              placeholder="ID Agence"
              value={newUser.agenceId}
              onChange={(e) => setNewUser({ ...newUser, agenceId: e.target.value })}
              className="border px-3 py-2 rounded-md w-1/4"
              required
            />
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
              <option value="Admin Agence">Admin Agence</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Ajouter</button>
          </form>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rôle</th>
                <th className="px-4 py-2 text-left">ID Agence</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">{user.agenceId}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(user.id)}>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user.id)}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800" onClick={() => alert(`Email envoyé à ${user.email}`)}>
                      <EnvelopeIcon className="h-5 w-5" />
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
