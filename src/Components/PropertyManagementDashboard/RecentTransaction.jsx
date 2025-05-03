import React from "react";

const transactions = [
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Rent",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Sale",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Rent",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Sale",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Rent",
    amount: "₹25,000",
    status: "Pending",
  },
  {
    date: "12/02/2025",
    property: "24, Broad Street, TN",
    category: "Sale",
    amount: "₹25,000",
    status: "Paid",
  },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Date</th>
              <th className="text-left p-2 font-medium">Property name</th>
              <th className="text-left p-2 font-medium">Category</th>
              <th className="text-left p-2 font-medium">Amount</th>
              <th className="text-left p-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">{transaction.property}</td>
                <td className="p-2">{transaction.category}</td>
                <td className="p-2">{transaction.amount}</td>
                <td className="p-2">
                  <span
                    className={`font-medium ${
                      transaction.status === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    • {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
