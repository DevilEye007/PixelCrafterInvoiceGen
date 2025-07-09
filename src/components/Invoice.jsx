import React from 'react';
import SIGN from '../assets/Signature/SIGN.png';

const Invoice = ({ invoiceData }) => {
  const {
    invoiceNumber,
    date,
    customerName,
    total,
    items,
    accountInfo,
  } = invoiceData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Styling */}
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .print\\:bg-white {
              background-color: #ffffff !important;
            }

            .print\\:text-black {
              color: #000000 !important;
            }

            .print\\:bg-gray-800 {
              background-color: #1f2937 !important;
            }

            .print\\:text-white {
              color: #ffffff !important;
            }

            .avoid-break {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .print\\:hidden {
              display: none !important;
            }

            .print\\:block {
              display: block !important;
            }
          }
        `}
      </style>

      <div className="max-w-3xl mx-auto border p-6 bg-white text-gray-900 font-sans print:bg-white print:text-black print:border-none avoid-break">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 rounded-t-md print:bg-gray-800 print:text-white">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-4xl uppercase font-bold hover:scale-105 hover:rotate-1 transform transition-transform duration-500">
                <span className="text-[#FF6F00]">Pixel</span>Crafter
              </h4>
              <p className="text-lg">Crafting Pixels, Creating Impact</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl text-[#FF6F00] font-bold">INVOICE</h2>
              <p className="mt-2">
                <span className='font-bold'>Invoice #:</span> {invoiceNumber}
              </p>
              <p>
                <span className='font-bold'>Date:</span> {date}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-100 py-4 px-6 text-sm mt-4 rounded print:bg-gray-100">
          <p className="font-bold">Invoice to:</p>
          <p>{customerName}</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border text-sm print:text-xs print:border-gray-700">
            <thead className="bg-gray-200 print:bg-gray-200">
              <tr>
                <th className="text-left p-2">SL.</th>
                <th className="text-left p-2">Description</th>
                <th className="text-left p-2">% Age</th>
                <th className="text-left p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-t print:border-gray-300">
                  <td className="p-2 font-bold">{idx + 1}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.percentage} %</td>
                  <td className="p-2">{item.price} PKR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Summary */}
        <div className="text-right mt-6 pr-6">
          <p className="text-lg font-semibold">Sub Total: {total} PKR</p>
          <p className="text-xl font-bold mt-2">Total: {total} PKR</p>
        </div>

        {/* Payment Info */}
        <div className="mt-6 text-sm avoid-break">
          <h2 className="font-bold">Payment Info:</h2>
          <p><span className="font-bold">Account #:</span> {accountInfo.account}</p>
          <p><span className="font-bold">A/C Name:</span> {accountInfo.name}</p>
          <p><span className="font-bold">Bank Name:</span> {accountInfo.bank}</p>
        </div>

        {/* Terms */}
        <div className="mt-4 text-xs text-gray-600 print:text-gray-800 avoid-break">
          <h4 className="font-semibold">Terms & Conditions</h4>
          <p>
            By proceeding with online payment, you agree to our terms and conditions. Payments are secure,
            non-refundable, and processed via trusted gateways. Ensure accurate details to avoid transaction issues.
            Any discrepancies must be reported within 24 hours. We are not liable for unauthorized transactions or
            third-party errors.
          </p>
        </div>

        {/* Signature & Button */}
        <div className="mt-8 flex justify-between items-center print:mt-6 avoid-break">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition print:hidden"
          >
            Download / Print Invoice
          </button>

          <div className="text-right">
            <img
              src={SIGN}
              alt="Signature"
              className="h-16 object-contain mb-1 print:h-16 print:mb-1 print:block"
              style={{
                maxWidth: '200px',
                display: 'block',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
              }}
            />
            <p className="text-sm font-semibold">Authorised Sign</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
