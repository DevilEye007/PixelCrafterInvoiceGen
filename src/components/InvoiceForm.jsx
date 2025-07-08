import React, { useState, useEffect } from 'react';
import Invoice from './Invoice';

const InvoiceForm = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: '',
    customerName: '',
    total: '',
    items: [{ description: '', percentage: '', price: '' }],
    accountInfo: {
      account: '',
      name: '',
      bank: '',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null && field === 'percentage') {
      const updatedItems = [...formData.items];
      const percentage = parseFloat(value) || 0;
      const total = parseFloat(formData.total) || 0;
      const price = ((percentage / 100) * total).toFixed(2);
      updatedItems[index].percentage = value;
      updatedItems[index].price = price;
      setFormData({ ...formData, items: updatedItems });
    } else if (index !== null && field === 'description') {
      const updatedItems = [...formData.items];
      updatedItems[index].description = value;
      setFormData({ ...formData, items: updatedItems });
    } else if (name === 'total') {
      const total = parseFloat(value) || 0;
      const updatedItems = formData.items.map(item => {
        const percentage = parseFloat(item.percentage) || 0;
        const price = ((percentage / 100) * total).toFixed(2);
        return { ...item, price };
      });
      setFormData({ ...formData, total: value, items: updatedItems });
    } else if (name.includes('accountInfo.')) {
      const key = name.split('.')[1];
      setFormData({
        ...formData,
        accountInfo: { ...formData.accountInfo, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', percentage: '', price: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInvoice(true);
  };

  if (showInvoice) return <Invoice invoiceData={formData} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-6 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full mx-auto px-6 py-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-xl transition-all duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#FF6F00] drop-shadow-sm">
          Create Invoice
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="invoiceNumber"
            placeholder="Invoice #"
            className="w-full border border-orange-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F00] dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full border border-orange-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F00] dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="customerName"
            placeholder="Customer Name"
            className="w-full border border-orange-300 p-3 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F00] dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="total"
            type="number"
            placeholder="Total Amount"
            className="w-full border border-orange-300 p-3 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F00] dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
        </div>

        <h3 className="mt-6 font-semibold text-lg text-[#FF6F00]">Items:</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <input
              placeholder="Description"
              className="w-full border border-orange-300 p-3 rounded-md dark:bg-gray-700 dark:border-gray-600"
              value={item.description}
              onChange={(e) => handleChange(e, index, 'description')}
              required
            />
            <input
              type="number"
              placeholder="% Age"
              className="w-full border border-orange-300 p-3 rounded-md dark:bg-gray-700 dark:border-gray-600"
              value={item.percentage}
              onChange={(e) => handleChange(e, index, 'percentage')}
              required
            />
            <input
              placeholder="Auto Price"
              className="w-full border p-3 rounded-md bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-orange-700 font-medium"
              value={item.price}
              readOnly
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="text-sm text-[#FF6F00] hover:text-orange-800 dark:hover:text-orange-400 transition font-medium mt-2 mb-4"
        >
          + Add Another Item
        </button>

        <h3 className="font-semibold text-lg mt-4 text-[#FF6F00]">Payment Info:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <input
            name="accountInfo.account"
            placeholder="Account #"
            className="w-full border border-orange-300 p-3 rounded-md dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="accountInfo.name"
            placeholder="Account Name"
            className="w-full border border-orange-300 p-3 rounded-md dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
          <input
            name="accountInfo.bank"
            placeholder="Bank Name"
            className="w-full border border-orange-300 p-3 rounded-md dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#FF6F00] hover:bg-orange-700 text-white py-3 rounded-lg shadow hover:shadow-lg transform hover:scale-[1.01] transition duration-300 ease-in-out"
        >
          Generate Invoice
        </button>
      </form>

        <footer className="mt-8 text-center text-sm text-gray-300 dark:text-gray-400">
        <div
            className="inline-flex items-center gap-2 justify-center transform transition duration-500 hover:scale-105 hover:rotate-1"
        >
            <span className="text-[#FF6F00] font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} All rights reserved by
            </span>
            <a
            href="https://faizan-posrfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FF6F00] font-bold hover:underline hover:drop-shadow-md transition duration-300"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="w-6 h-6 text-[#FF6F00] hover:scale-110 transition-transform duration-300"
                >
                <rect width="64" height="64" rx="12" fill="#111827" />
                <path
                    d="M20 32L14 26M14 26L20 20M14 26H18C19.1 26 20 26.9 20 28V36C20 37.1 19.1 38 18 38H14M44 32L50 26M50 26L44 20M50 26H46C44.9 26 44 26.9 44 28V36C44 37.1 44.9 38 46 38H50"
                    stroke="#FF6F00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M28 44L36 20"
                    stroke="#FF6F00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
                Faizan Sultan
            </a>
        </div>
        </footer>
    </div>
  );
};

export default InvoiceForm;
