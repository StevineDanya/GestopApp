import Link from "next/link";
import Image from "next/image";

export default function StockStable() {
  return (
    <>
      const StockTable = ({stockDonnées}) = (
      <div className="bg-cyan-300 shadow rounded-lg p-6">
        <h5 className="text-lg font-bold mb-4">État du Stock</h5>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Produit</th>
              <th className="border-b p-2">Fournisseur</th>
              <th className="border-b p-2">Quantité</th>
              <th className="border-b p-2">Seuil Minimal</th>
            </tr>
          </thead>
          <tbody>
            {stockDonnées.map((product, idx) => (
              <tr key={idx}>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.supplier}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
    </>
  );
}
