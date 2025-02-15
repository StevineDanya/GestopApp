// import Link from "next/link";

// const gérerSoumissionFormulaireProduit = (e) => {
//   e.preventDefault();
//   const produitNom = e.target.produitNom.value;
//   const supplier = e.target.supplier.value;
//   const quantité = parseInt(e.target.quantité.value, 10);

//   const NewProduit = {
//     name: produitNom,
//     supplier,
//     quantité,
//     threshold: minimumThreshold,
//   };

//   setStockDonnées((prevStock) => [...prevStock, NewProduit]);
//   e.target.reset();
//   updateDashboardStats([...stockDonnées, NewProduit], distributionHistory);
// };

// export default function Produits() {
//   return (
//     <>
//       <div className="bg-white shadow rounded-lg p-6 mb-8">
//         <h5 className="text-lg font-bold mb-4">Distribution des Produits</h5>
//         <form
//           onSubmit={gérerSoumissionFormulaireProduit}
//           className="grid grid-cols-1 md:grid-cols-4 gap-4"
//         >
//           <input
//             type="text"
//             className="form-input p-3 rounded-md border border-cyan-500 focus:border-cyan-400 outline-none"
//             name="productName"
//             placeholder="Nom du produit"
//             required
//           />
//           <select
//             className="form-select rounded-md border border-cyan-500 focus:border-cyan-400 outline-none"
//             name="supplier"
//             required
//           >
//             <option value="">Sélectionner un fournisseur</option>
//             <option value="AXA">AXA</option>
//             <option value="SUNU">SUNU</option>
//             <option value="SANLAM">SANLAM</option>
//             <option value="OGAR">OGAR</option>
//             <option value="ASSINCO">ASSINCO</option>
//             <option value="NSIA">NSIA</option>
//           </select>
//           <input
//             type="number"
//             className="form-input rounded-md p-3 border border-cyan-500 focus:border-cyan-400 outline-none"
//             name="quantity"
//             placeholder="Quantité"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             <i className="bi bi-plus-lg text-xl">Ajouter</i>
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
import Nav from "@/components/Nav";
import TableauAdmin from "@/components/tableauAdmin";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Nav />

      {/* Contenu Principal */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Dashboard - Gestion des Stocks</h1>

        {/* Section : Suivi Hebdomadaire des Mouvements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-lg font-semibold">📅 Suivi Hebdomadaire des Mouvements</h2>
            <div className="flex gap-2">
              <button className="p-2 border rounded">◀</button>
              <span>Semaine 2025-W7</span>
              <button className="p-2 border rounded">▶</button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            <input type="text" placeholder="Sélectionner un produit" className="border p-2 rounded w-full" />
            <input type="number" placeholder="Quantité" className="border p-2 rounded w-full" />
            <input type="date" className="border p-2 rounded w-full" />
            <button className="bg-green-600 text-white p-2 rounded flex items-center justify-center">
              ➕ Ajouter Entrée
            </button>
          </div>

          {/* TableauAdmin */}
          <TableauAdmin />
        </div>

        {/* Section : Saisie des Produits */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">Saisie des Produits</h2>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Nom du produit" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Sélectionner un fournisseur" className="border p-2 rounded w-full" />
            <input type="number" placeholder="Quantité" className="border p-2 rounded w-full" />
          </div>
        </div>

        {/* Section : Distribution des Produits */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">Distribution des Produits</h2>
          <div className="grid grid-cols-4 gap-4">
            <input type="text" placeholder="Sélectionner une agence" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Sélectionner un produit" className="border p-2 rounded w-full" />
            <input type="number" placeholder="Quantité" className="border p-2 rounded w-full" />
            <input type="date" className="border p-2 rounded w-full" />
          </div>
        </div>

        {/* Section : État du Stock */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">État du Stock</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Produit</th>
                <th className="p-2 border">Fournisseur</th>
                <th className="p-2 border">Quantité</th>
                <th className="p-2 border">Seuil Minimal</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
