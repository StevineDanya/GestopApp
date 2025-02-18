"use client";

import { useEffect, useState } from "react";

const API_URL = "https://gestock-app.onrender.com/Produit";
const API_CATEGORIE_URL = "https://gestock-app.onrender.com/Categorie";
const API_FOURNISSEUR_URL = "https://gestock-app.onrender.com/Fournisseur";

export default function ProduitList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom: "",
    fournisseur: "",
    categorie: "",
    prix: "",
    quantite: "",
    Stockminimal: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes, fournisseursRes] = await Promise.all([
          fetch(API_URL),
          fetch(API_CATEGORIE_URL),
          fetch(API_FOURNISSEUR_URL),
        ]);

        const [productsData, categoriesData, fournisseursData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          fournisseursRes.json(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setFournisseurs(fournisseursData);
      } catch (error) {
        console.error("Erreur chargement données:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!newProduct.nom || !newProduct.fournisseur || !newProduct.categorie || !newProduct.prix) {
      alert("Veuillez remplir tous les champs !");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          prix: parseFloat(newProduct.prix),
          quantite: parseInt(newProduct.quantite, 10) || 0,
          Stockminimal: parseInt(newProduct.Stockminimal, 10) || 0,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du produit");

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ nom: "", fournisseur: "", categorie: "", prix: "", quantite: "", Stockminimal: "" });
      alert("Produit ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout du produit");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous supprimer ce produit ?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Erreur suppression produit:", error);
    }
  };

  return (
    <div className="p-8 flex-1">
      <h1 className="text-xl font-bold mb-6">Gestion des Produits</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="nom" placeholder="Nom du produit" value={newProduct.nom} onChange={handleInputChange} className="p-3 border rounded-md" required />

          <select name="fournisseur" value={newProduct.fournisseur} onChange={handleInputChange} className="p-3 border rounded-md bg-white text-black" required>
            <option value="" disabled>Choisir un fournisseur</option>
            {fournisseurs.map((f) => (
              <option key={f._id} value={f._id}>{f.name}</option>
            ))}
          </select>

          <select name="categorie" value={newProduct.categorie} onChange={handleInputChange} className="p-3 border rounded-md bg-white text-black" required>
            <option value="" disabled>Choisir une catégorie</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input type="number" name="prix" placeholder="Prix (€)" value={newProduct.prix} onChange={handleInputChange} className="p-3 border rounded-md" required />
          <input type="number" name="quantite" placeholder="Quantité" value={newProduct.quantite} onChange={handleInputChange} className="p-3 border rounded-md" />
          <input type="number" name="Stockminimal" placeholder="Stock minimal" value={newProduct.Stockminimal} onChange={handleInputChange} className="p-3 border rounded-md" />
        </div>
<button type="submit" className="mt-4 w-full bg-blue-500 text-white p-3 rounded-md" disabled={loading}>{loading ? "Ajout..." : "Ajouter Produit"}</button>
      </form>
       <h1 className="text-xl font-semibold mb-6">Gestion des Produits</h1>
      
      <table className="w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Fournisseur</th>
            <th className="px-4 py-2">Catégorie</th>
            <th className="px-4 py-2">Prix (FCFA)</th>
            <th className="px-4 py-2">Quantité</th>
            <th className="px-4 py-2">Stockminimal</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="px-4 py-3">{product.nom}</td>
              <td className="px-4 py-3">{product.fournisseur?.name || "Non défini"}</td>
              <td className="px-4 py-3">{product.categorie?.name || "Non défini"}</td>
              <td className="px-4 py-3">{product.prix} FCFA</td>
              <td className="px-4 py-3">{product.quantite}</td>
              <td className="px-4 py-3">{product.Stockminimal}</td>
              <td className="px-4 py-3">
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
