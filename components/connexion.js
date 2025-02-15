"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import du router pour la redirection
import Link from "next/link";

export default function Connexion() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialisation du router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://backend-soutenance-1.onrender.com/users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion. Veuillez vérifier vos identifiants.");
      }

      const data = await response.json();
      console.log("Connexion réussie :", data);

      // Stockage du token dans localStorage
      localStorage.setItem('token', data.token);

      // Redirection vers la page d'accueil
      router.push('/accueil');  // Assure-toi que la page /accueil existe dans ton projet

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-400 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">
        Bienvenue sur votre Dashboard
      </h1>
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Connexion
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Identifiant</label>
            <input
              type="text"
              name="username"
              placeholder="Entrez votre identifiant"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700 font-medium">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              Se souvenir de moi
            </label>
            <Link href="/" className="text-blue-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}