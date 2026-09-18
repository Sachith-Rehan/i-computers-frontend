import { useState } from "react";
import toast from "react-hot-toast";
import { FaYoutube } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import UploadMedia from "../utils/uploadMedia";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indram5sbG1ucmRhd2t2YnZyYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODkxNjAsImV4cCI6MjA5ODc2NTE2MH0.8xrOfmzl1Gb0CBXHKDcjKGKnuxKiAvv_3oO93NSpQcQ"
const supabaseUrl = "https://wkjnllmnrdawkvbvrbnb.supabase.co"

const supabase = createClient(supabaseUrl, key);

export default function TestPage(){
    const [file, setFile] = useState(null);
    
    async function uploadFile(){
        
        const res = await uploadMedia(file);

    }

    return(

        <div className = "w-full h-full bg-green-600 flex items-center justify-center ">
           <input type = "file" onChange={
                (e) => {
                    setFile(e.target.files[0]);
                }       
           } ></input>
           <button className = "w-[100px] h-[50px] bg-blue-500 text-white" 
                onClick = {
                    uploadFile 
                }>Upload
            </button>
           
        </div>
       
    )
}












// export default function TestPage() {
//     const [score, setScore] = useState(50);
//     const [mode, setMode] = useState("😊");
//     const [isFollowed, setIsFollowed] = useState(false);
    
//     return(
//         <div className="w-full h-full bg-green-600 flex items-center justify-center ">

//             <div className="h-[500px] aspect-square bg-indigo-300 py-[100px] flex flex-col items-center justify-center gap-[30px]">
//                 <h1>Score: {score}</h1>
//                 <div className=" bg-red-500 w-full h-[50px] flex items-center justify-center gap-[20px]">
                    
//                     <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
//                         onClick={
//                                 () =>{
//                                     setScore(score+1);
//                                     toast.success("value incresed")
//                                 }
//                             }>
//                         Increase
//                     </button>

//                     <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
//                         onClick={
//                                 () =>{
//                                     setScore(score-1);
//                                     toast('Good Job!', {
//                                         icon:  <FaYoutube className="text-[100px]"/>,
//                                     });
                                    
//                                 }
//                         }>
//                         Decrease
//                     </button>

//                 </div>

//                 <h1 className="text-[4rem]">{mode}</h1>
                
//                 <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
//                     onClick={
//                         () =>{
//                             setMode("😒")
//                         }
//                     }
//                 >
//                     Sad
//                 </button>

//                 <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
//                     onClick={
//                         () =>{
//                             setMode("😊")
                            
//                         }
//                     }
//                 >
//                     Happy
//                 </button>

//                 <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
//                     onClick={
//                         () =>{
//                             setMode("😍")
//                         }
//                     }
//                 >
//                     Lovely
//                 </button>

//                 <div calssName="flex flex-col icons-center justify-center">
//                     <FaYoutube  onClick={
//                             () =>{
//                                 setIsFollowed(!isFollowed)
//                             }
//                         }
                    
//                     className={isFollowed ? "text-amber-300 text-[100px]" : "text-blue-500 text-[100px]" } />
//                 </div>   
//             </div>

                  
           
//         </div>


        
//     );
// }