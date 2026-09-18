import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ProductDeleteButton(props) {

      const [isModelVisible, setIsmodelVisible] = useState(false);
      const productId = props.productId;
      const refresh = props.refresh;
      return (
            
            <>
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" 
                        onClick={
                              ()=>setIsmodelVisible(true)
                        }
                  />

                  {isModelVisible && (
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

                        <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden">

                              <div className="p-8 flex flex-col items-center">

                              {/* Delete Icon */}
                              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5">
                              <FaTrash className="text-red-600 text-2xl" />
                              </div>

                              {/* Title */}
                              <h1 className="text-2xl font-bold text-gray-800 text-center">
                              Delete Product?
                              </h1>

                              {/* Description */}
                              <p className="text-gray-500 text-center mt-3">
                              Are you sure you want to delete this product?
                              This action cannot be undone.
                              </p>

                              {/* Buttons */}
                              <div className="flex gap-4 mt-8 w-full">

                                    <button
                                          className="
                                          flex-1
                                          h-[45px]
                                          rounded-xl
                                          bg-red-600
                                          hover:bg-red-700
                                          text-white
                                          font-semibold
                                          transition
                                          duration-200
                                          "

                                          onClick={
                                              ()=>{
                                                const token = localStorage.getItem("token");

                                                api.delete("/products/" + productId,{
                                                      headers:{
                                                            Authorization: `Bearer ${token}` 
                                                      }
                                                }).then(()=>{
                                                      refresh();
                                                      setIsmodelVisible(false);
                                                      toast.success("Successfully deleted " )
                                                }).catch(()=>{
                                                      toast.error("Error deleting product")
                                                })
                                              }
                                          }
                                    >
                                          Delete
                                    </button>

                                    <button
                                          className="
                                          flex-1
                                          h-[45px]
                                          rounded-xl
                                          bg-gray-200
                                          hover:bg-gray-300
                                          text-gray-800
                                          font-semibold
                                          transition
                                          duration-200
                                          "
                                          onClick={() => setIsmodelVisible(false)}
                                    >
                                          Cancel
                                    </button>

                              </div>

                              </div>

                        </div>

                        </div>
                        )}
            
            </>
            




            // <button className="w-[100px] h-[30px] bg-red-600 hover:bg-red-700 rounded-xl text-white"
            //           onClick={
            //             ()=> {toast.success(product.name)
            //               const token = localStorage.getItem("token")
                          
            //               api.delete("/products/" + product.productId,{
            //                 headers:{
            //                   Authorization: `Bearer ${token}` 
            //                 }
            //               })
            //               .then(() => {
            //                 toast.success(`${product.name} deleted successfully!`);
            //                 setLoading(!loading)
            //               })
            //               .catch((error) => {
            //                 console.error(error);
            //                 toast.error("Failed to delete the product.");
            //               });
            //             }
                       
            //             //api call the backend with the productId
                        
            //           }
            //         >Delete</button>
      )
}