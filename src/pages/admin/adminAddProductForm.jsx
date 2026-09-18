import {useState} from "react";
import { Link } from "react-router-dom";
import UploadMedia from "../../utils/uploadMedia";
import { toast } from "react-hot-toast";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
export default function AdminAddProductForm() {

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [images, setImages] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submitData() {
        setLoading(true);

        const token = localStorage.getItem("token");
        if(!token) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        const imageUploadPromises = [];

        for (let i= 0; i<images.length; i++) {
            imageUploadPromises.push(UploadMedia(images[i]));
        }

        try {
            const imageUrls = await Promise.all(imageUploadPromises);
            const altNamesArray = altNames.split(",");
            
            const productData = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                price : price,
                description : description,
                labelledPrice : labelledPrice,
                images : imageUrls,
                isAvailable : isAvailable,
                category : category,
                stock : stock,
                brand : brand,
                model : model
            }

            await api.post("/products", productData, 
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )

            toast.success("Product added successfully");
            navigate("/admin/products");

            setLoading(false);
        }catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add product");
            setLoading(false);
        }

    }
    return (
        <div className = "w-full h-full flex flex-col items-center">
            
            <div className="w-full h-[80px] bg-white shadow-2xl rounded-lg flex items-center justify-between p-4 gap-4">
                <h1 className="text-2xl font-semibold">Add New Product</h1>
                <div className="h-full gap-4 flex items-center ">
                    <Link to="/admin/products" className="w-[80px] bg-red-600 text-white px-4 py-2 rounded-lg  hover:bg-red-700 transition duration-300 flex items-center justify-center">
                        Cancel
                    </Link>
                    
                    <button disabled={isLoading} onClick={submitData} className="w-[80px] bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2">
                       
                        {
                            isLoading ? "Saving..." : "Save"
                        }

                    </button>

                </div>
            </div>

            <div className="w-full h-full bg-white shadow-2xl rounded-lg mt-4 flex flex-wrap p-[20px] ">

                
                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Product Id</label>    
                    <input value={productId} onChange={(e) => setProductId(e.target.value)} type="text" placeholder=" Enter Product Id"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Product Name</label>    
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder=" Enter Product Name"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-[50%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Alternative Names<span className="italic text-sm text-gray-400">(comma-seperated)</span></label>    
                    <input value={altNames} onChange={(e) => setAltNames(e.target.value)} type="text" placeholder=" VGA, Graphic card, GPU"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Price</label>    
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder=" Enter The Price"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Labeled Price</label>    
                    <input value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} type="text" placeholder=" Enter The Labeled Price"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Images</label>    
                    <input onChange={(e) => setImages(e.target.files)} type="file" multiple={true}  placeholder=" Upload Images"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-full rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Description</label>    
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder=" Enter Product Description"
                    className="h-[100px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>
            
                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Availability</label>    
                    <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)} type="text" placeholder=" VGA, Graphic card, GPU" className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>    
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Category</label>    
                    <select value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder=" Enter The Category"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" >
                        <option value="graphic card">Graphic Card</option>
                        <option value="motherboard">Motherboard</option>
                        <option value="processor">Processor</option>
                        <option value="ram">RAM</option>
                        <option value="storage">Storage</option>
                        <option value="power supply">Power Supply</option>
                        <option value="case">Case</option>
                        <option value="cooling">Cooling</option>
                        <option value="monitor">Monitor</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="mouse">Mouse</option>
                        <option value="headset">Headset</option>
                        <option value="speaker">Speaker</option>
                        <option value="laptops">Laptops</option>
                        <option value="other">Other </option>
                    </select>
                </div>

                <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                    <label className="font-semibold ">Stock</label>    
                    <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" placeholder=" Enter The Stock"
                    className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div className="w-full h-[100px] rounded-lg flex flex-row gap-0.5">  
                    <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                        <label className="font-semibold ">Model<span className="italic text-sm text-gray-400"> (optional)</span></label>    
                        <input value={model} onChange={(e) => setModel(e.target.value)} type="text" placeholder=" RTX 5090"
                        className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div className="w-[25%] h-[100px] rounded-lg p-2 pl-5 pr-5 flex flex-col gap-0.5">
                        <label className="font-semibold ">Category<span className="italic text-sm text-gray-400"> (optional)</span></label>    
                        <select value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder=" Enter The Brand"
                        className="h-[35px] bg-transparent border-2 rounded-lg border-gray-400 focus:outline-none focus:border-blue-500" >
                            <option value="asus">Asus</option>
                            <option value="msi">MSI</option>
                            <option value="gigabyte">Gigabyte</option>
                            <option value="evga">EVGA</option>
                            <option value="zotac">Zotac</option>
                            <option value="pny">PNY</option>
                            <option value="sapphire">Sapphire</option>
                            <option value="xfx">XFX</option>
                            <option value="other">Other </option>
                        </select>
                    </div>

                </div>   
                
            </div>

        </div> 
    )    
        
}

