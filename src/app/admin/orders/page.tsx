import Link from "next/link";
import { Search, Eye, Filter } from "lucide-react";

export default function AdminOrdersPage() {
  // Mock data for orders
  const mockOrders = [
    {
      id: "ORD-8492-X",
      customer: "Aditi Sharma",
      date: "Oct 5, 2026",
      total: 3497,
      items: 3,
      status: "New",
      payment: "WhatsApp/Manual"
    },
    {
      id: "ORD-8491-Y",
      customer: "Rahul Desai",
      date: "Oct 4, 2026",
      total: 1299,
      items: 1,
      status: "Processing",
      payment: "Paid"
    },
    {
      id: "ORD-8490-Z",
      customer: "Megha Patel",
      date: "Oct 3, 2026",
      total: 5450,
      items: 4,
      status: "Shipped",
      payment: "Paid"
    },
    {
      id: "ORD-8489-W",
      customer: "Kiran Singh",
      date: "Oct 1, 2026",
      total: 899,
      items: 1,
      status: "Delivered",
      payment: "Paid"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">New</span>;
      case "Processing":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Processing</span>;
      case "Shipped":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Shipped</span>;
      case "Delivered":
        return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Delivered</span>;
      default:
        return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Orders</h1>
          <p className="text-stone-500 mt-1">Manage and fulfill customer orders.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded-md hover:bg-stone-50 transition-colors font-medium text-sm">
          Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search by order ID, customer name..." 
            className="w-full pl-9 pr-4 py-2 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-700 bg-white hover:bg-stone-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <select className="w-full sm:w-auto border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-700 bg-white">
            <option>All Statuses</option>
            <option>New</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-medium">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-900">{order.customer}</p>
                    <p className="text-xs text-stone-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-900 font-medium">
                    ₹{order.total}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 p-1.5 text-stone-500 hover:text-stone-900 bg-white border border-stone-200 rounded hover:bg-stone-50 transition-colors text-xs font-medium px-3">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between text-sm text-stone-500">
          <p>Showing 1 to {mockOrders.length} of {mockOrders.length} entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-stone-200 rounded text-stone-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-stone-200 rounded text-stone-900 hover:bg-stone-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
