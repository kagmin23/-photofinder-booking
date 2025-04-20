import {
  IoAddCircleOutline,
  IoArrowForwardOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline
} from "react-icons/io5";

const Wallet = () => {
  const transactions = [
    { id: 1, description: "Payment from Client A", amount: 250.00, date: "28/02/2025", status: "completed" },
    { id: 2, description: "Photo Session Package", amount: -120.00, date: "25/02/2025", status: "completed" },
    { id: 3, description: "Premium Subscription", amount: -19.99, date: "20/02/2025", status: "completed" },
    { id: 4, description: "Payment from Client B", amount: 350.00, date: "15/02/2025", status: "completed" },
    { id: 5, description: "Equipment Purchase", amount: -499.99, date: "10/02/2025", status: "completed" },
    { id: 6, description: "Refund - Cancelled Session", amount: 75.00, date: "05/02/2025", status: "pending" }
  ];

  const paymentMethods = [
    { id: 1, type: "Credit Card", lastFour: "4582", expiryDate: "09/27", isDefault: true },
    { id: 2, type: "Debit Card", lastFour: "1234", expiryDate: "05/26", isDefault: false }
  ];

  return (
    <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-green-50 to-blue-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Wallet</h1>
        <p className="text-gray-600">Manage your finances and transactions</p>
      </div>

      {/* Balance and Actions Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600 mb-1">Current Balance</p>
            <h2 className="text-4xl font-bold text-gray-800">$1,245.00</h2>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <IoAddCircleOutline className="mr-2" size={20} />
              <span>Deposit</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
              <IoArrowForwardOutline className="mr-2" size={20} />
              <span>Transfer</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Monthly Income</h3>
            <p className="text-2xl font-bold text-green-600">$850.00</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Monthly Expenses</h3>
            <p className="text-2xl font-bold text-red-600">$639.98</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Net Balance</h3>
            <p className="text-2xl font-bold text-blue-600">$210.02</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
              <button type="button" title="IoAddCircleOutline" className="text-blue-500 hover:text-blue-600">
                <IoAddCircleOutline size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <IoCardOutline size={32} className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{method.type}</h3>
                      {method.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">**** **** **** {method.lastFour}</p>
                    <p className="text-gray-500 text-xs">Expires: {method.expiryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
              <button className="text-blue-500 hover:text-blue-600 text-sm">View All</button>
            </div>
            
            <div className="overflow-auto max-h-96">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-3 text-sm text-gray-800">{transaction.description}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                        <span className="text-xs ml-1">{transaction.amount >= 0 ? 'CR' : 'DR'}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{transaction.date}</td>
                      <td className="px-4 py-3 text-sm">
                        {transaction.status === 'completed' ? (
                          <span className="flex items-center text-green-600">
                            <IoCheckmarkCircleOutline className="mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-600">
                            <IoTimeOutline className="mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;