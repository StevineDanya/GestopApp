"use client";

import React, { useState } from "react";

import TableauAdmin from "@/components/tableauAdmnin";
import Nav from "@/components/Nav";

const Distribution = () => {
  const [stockDonnées, setStockDonnées] = useState([]);
  const [distributionHistory, setDistributionHistory] = useState([]);
  const [totalProduits, setTotalProduits] = useState(0);
  const [stockAlerts, setStockAlerts] = useState(0);
  const [distributionsProduits, setDistributionsProduits] = useState(0);
  const minimumProduits = 10;

  const gérerSoumissionFormulaireProduit = (e) => {
    e.preventDefault();
    const produitNom = e.target.productName.value;
    const supplier = e.target.supplier.value;
    const quantity = parseInt(e.target.quantity.value, 10);

    const nouveauProduit = {
      name: produitNom,
      supplier,
      quantity,
      threshold: minimumProduits,
    };

    const nouveauStock = [...stockDonnées, nouveauProduit];
    setStockDonnées(nouveauStock);
    e.target.reset();
    updateDashboardStats(nouveauStock, distributionHistory);
  };

  const traiterSoumissionDistribution = (e) => {
    e.preventDefault();
    const agency = e.target.agency.value;
    const productName = e.target.productName.value;
    const quantity = parseInt(e.target.quantity.value, 10);
    const date = e.target.distributionDate.value;

    const productIndex = stockDonnées.findIndex((p) => p.name === productName);

    if (
      productIndex !== -1 &&
      stockDonnées[productIndex].quantity >= quantity
    ) {
      const updatedStock = [...stockDonnées];
      updatedStock[productIndex].quantity -= quantity;

      const nouvelleDistribution = {
        date,
        agency,
        product: productName,
        quantity,
      };

      setStockDonnées(updatedStock);
      setDistributionHistory((prevHistory) => [
        ...prevHistory,
        nouvelleDistribution,
      ]);

      updateDashboardStats(updatedStock, [
        ...distributionHistory,
        nouvelleDistribution,
      ]);
    } else {
      alert("Stock insuffisant !");
    }

    if (!produitNom || !supplier || isNaN(quantity) || quantity <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }
  };

  const updateDashboardStats = (updatedStock, updatedHistory) => {
    setTotalProduits(updatedStock.length);
    setStockAlerts(
      updatedStock.filter((p) => p.quantity <= p.threshold).length
    );

    const today = new Date().toISOString().split("T")[0];
    setDistributionsProduits(
      updatedHistory.filter((d) => d.date === today).length
    );
  };

  return (
    <div className="bg-white min-h-screen flex">
      <TableauAdmin />
      <div className="container mx-auto   w-full px-4">
        <Nav />
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white mt-5 max-sm:mt-24 p-1 gap-6 mb-8">
          <StatCard
            color="blue"
            title="Total des Produits"
            value={totalProduits}
          />
          <StatCard color="red" title="Alertes Stock Bas" value={stockAlerts} />
          <StatCard
            color="green"
            title="Distributions du Jour"
            value={distributionsProduits}
          />
        </div>

        {/* Product Form */}
        {/* <FormSection
          className="border border-cyan-500 focus:outline-none"
          title="Ajouter un produit"
          onSubmit={gérerSoumissionFormulaireProduit}
          fields={[
            {
              name: "productName",
              type: "text",
              placeholder: "cde_pro",
              required: true,
            },

            {
              name: "productName",
              type: "text",
              placeholder: "Nom du produit",
              required: true,
            },

            {
              name: "supplier",
              type: "select",
              options: ["AXA", "SUNU", "SANLAM", "OGAR", "ASSINCO", "NSIA"],
              placeholder: "Sélectionner un fournisseur",
              required: true,
            },
            {
              name: "quantity",
              type: "number",
              placeholder: "Quantité",
              required: true,
            },
            { name: "distributionDate", type: "date", required: true },
          ]}
        /> */}

        {/* Distribution Form */}
        <FormSection
          title="Distribution de Produit"
          onSubmit={gérerSoumissionFormulaireProduit}
          fields={[
            {
              name: "code",
              type: "text",
              placeholder: "cde_pro",
              required: true,
            },

            {
              name: "productName",
              type: "text",
              placeholder: "Nom du produit",
              required: true,
            },

            {
              name: "supplier",
              type: "select",
              options: [
                "Libreville",
                "Portgentil",
                "Akanda",
                "Franceville",
                "Moanda",
                "Lastrourville",
              ],
              placeholder: "Sélectionner une Agence",
              required: true,
            },
            {
              name: "quantity",
              type: "number",
              placeholder: "Quantité",
              required: true,
            },
            {
              name: "today",
              type: "date",

              required: true,
            },
          ]}
        />

        {/* Stock Table */}
        <StockTable stockDonnées={stockDonnées} />
      </div>
    </div>
  );
};

const StatCard = ({ color, title, value }) => (
  <div className={`bg-${color}-500 text-white p-4 rounded-lg shadow`}>
    <h6>{title}</h6>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const FormSection = ({ title, onSubmit, fields }) => (
  <div className="bg-white shadow rounded-lg p-1 mb-8">
    <div className="bg-cyan-500 h-20 rounded p-6 mb-8">
      <h5 className="text-2xl max-sm:text-xl max-sm:text-wrap text-white font-bold mb-4">
        Distribution du produit
      </h5>
    </div>
    {/* <h5 className="text-lg font-bold mb-4">{title}</h5> */}
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {fields.map((field, idx) =>
        field.type === "select" ? (
          <select
            key={idx}
            className="form-select rounded-md p-3 border focus:border-blue-400"
            name={field.name}
            required={field.required}
          >
            <option value="">{field.placeholder}</option>
            {Array.isArray(field.options) &&
              field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
        ) : (
          <input
            key={idx}
            type={field.type}
            className="form-input rounded-md p-3  focus:border-blue-400 border border-cyan-500 focus:outline-none"
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      )}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md border focus:outline-none hover:bg-blue-700 hover:scale-95 transition duration-200"
      >
        Envoyer
      </button>
    </form>
  </div>
);

const StockTable = ({ stockDonnées }) => (
  <div className="bg-white shadow rounded-lg">
    <div className="bg-cyan-500 h-20 max-sm:h-10 rounded p-6 max-sm:p-0 mb-3">
      <h5 className="text-2xl max-sm:text-xl max-sm:ml-12 max-sm:p-1 text-white font-bold mb-4">
        État du Stock
      </h5>
    </div>
    <table className="w-full border-collapse bg-green-900 ">
      <thead>
        <tr className="grid grid-cols-1 md:grid-cols-3">
          <th className="border-b p-2">Cde_pro</th>
          <th className="border-b p-2">Produit</th>
          <th className="border-b p-2">Agence</th>
          <th className="border-b p-2">Quantité</th>
          <th className="border-b p-2">Date</th>
          <th className="border-b p-2">Seuil Minimal</th>
        </tr>
      </thead>
      <tbody className="w-40 bg-slate-900 text-white ">
        {stockDonnées.map((product, idx) => (
          <tr className=" " key={idx}>
            <td className="p-2">{product.code}</td>
            <td className="p-2">{product.number}</td>
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.supplier}</td>
            <td className="p-2">{product.supplier}</td>
            <td className="p-2">{product.supplier}</td>
            <td className="p-2">{product.quantity}</td>
            <td className="p-2">{product.date}</td>

            <td className="p-2">{product.threshold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Distribution;
