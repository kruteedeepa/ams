"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AssetResult() {
  const { asset_id } = useParams();
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:5000/api/qr/scan/${asset_id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, [asset_id]);

  if (!data) return (
    <p className="text-center mt-10 text-gray-500">
      🔍 Loading asset details...
    </p>
  );

  const statusColor = {
    "Available": "text-green-600",
    "In Use": "text-blue-600",
    "Under Repair": "text-orange-500",
    "Disposed": "text-red-600",
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 font-sans">
      <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">
        📋 Asset Details
      </h2>

      {/* Asset Info Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <tbody>
          <tr className="border border-gray-300">
            <td className="p-3 font-bold bg-gray-50">Asset Name</td>
            <td className="p-3">{data.asset.asset_name}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-bold bg-gray-50">Serial Number</td>
            <td className="p-3">{data.asset.serial_number}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-bold bg-gray-50">Category</td>
            <td className="p-3">{data.asset.category}</td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-bold bg-gray-50">Status</td>
            <td className={`p-3 font-bold ${statusColor[data.asset.status]}`}>
              {data.asset.status}
            </td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-bold bg-gray-50">Assigned To</td>
            <td className="p-3">
              {data.asset.assigned_to?.name || "Nobody"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <h3 className="text-lg font-bold text-[#1E3A5F] mb-3">
        ⚡ Available Actions
      </h3>
      {data.available_actions.map((action, index) => (
        <button
          key={index}
          className="block w-full mb-2 py-3 bg-[#1E3A5F] text-white rounded-lg font-bold hover:bg-blue-900"
        >
          {action}
        </button>
      ))}

      {/* Back Button */}
      <button
        onClick={() => router.push("/qr-scanner")}
        className="mt-4 w-full py-3 bg-gray-400 text-white rounded-lg"
      >
        ← Scan Another Asset
      </button>
    </div>
  );
}