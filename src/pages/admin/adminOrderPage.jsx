import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../utils/api";
import getFormattedPrice from "../../utils/priceFormatter";
import LoadingScreen from "../../components/loadingScreen";
import { formatDateTime } from "../../utils/timeFormatter";

export default function AdminOrdersPage() {
     
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const [pageNumber, setPageNumber] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [totalOrders, setTotalOrders] = useState(0);
      const [totalPages, setTotalPages] = useState(1);
      //load the date forom backend
      useEffect(() => {
            if(loading) {
                  const token = localStorage.getItem("token");
                  
                  api.get("/orders/"+pageNumber+"/"+pageSize, {
                        headers: { 
                              Authorization : `Bearer ${token}`
                        }
                  }).then((res) => {
                        setOrders(res.data.orders || []);
                        setTotalOrders(res.data.totalOrders)
                        setTotalPages(res.data.totalPages)
                        setLoading(false);
                  })
            }  
      },[loading]
      );
    
      
    return (

      <div className = "w-full min-h-full flex flex-col items-center">

            <div className="w-full min-h-[90px] bg-white shadow-lg rounded-2xl flex items-center justify-between px-6 py-4 border border-gray-100">
            
                  <div>
                        <p className="text-sm text-gray-500 font-medium">Order Overview</p>
                        <h1 className="text-2xl font-bold text-accent mt-1">{orders.length} Orders</h1>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent">{orders.length}</span>
                  </div>

            </div>

            {
            loading && <LoadingScreen />
            }

            <div className="w-full overflow-x-auto mt-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
                  <table className="w-full text-sm text-left">
                        <thead className="bg-accent text-white uppercase text-xs">
                              <tr className="h-14">
                                    <th className="px-4 py-3 text-center">Order Id</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">City </th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Total Amount</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                              </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                              {orders.map((order) => (
                              <tr key={order.orderId} className="bg-white hover:bg-gray-50 transition-colors duration-200">
                                    
                                    <td className="px-4 py-3 text-center font-semibold text-gray-700"> {order.orderId} </td>
                                    <td className="px-4 py-3 font-medium text-gray-700">{order.email}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{order.firstName + " " + order.lastName}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{order.city}</td>
                                    <td className="px-4 py-3 text-gray-600 ">{order.phone}</td>
                                    <td className="px-4 py-3 text-gray-600">{order.status}</td>
                                    <td className="px-4 py-3 text-gray-600">{formatDateTime(order.date)}</td> 
                                    <td className="px-4 py-3 text-center font-semibold text-gray-700">{getFormattedPrice(order.totalAmount)}</td>
                                    <td className="px-4 py-3 text-center">
                                          <Link
                                                to={`/admin/orders/${order.orderId}`}
                                                state={order}
                                                className="text-blue-600 font-semibold hover:text-blue-800"
                                          >
                                                View
                                          </Link>
                                    </td>

                                                                        
                              </tr>
                              ))}
                        </tbody>
                  </table>
            </div>

            <div className="w-[400px] h-[40px] fixed bottom-4 bg-blue-800 flex items-center">
                  <select value={pageSize} onChange={(e)=>{setPageSize(Number(e.target.value))}}>
                        <option value={2}>2 per page</option>
                        <option value={5}>5 per Page</option>
                         <option value={10}>10 per page</option>
                        <option value={20}>20 per Page</option>
                  </select>
            </div>
        

      </div>
        
        
    )
} 