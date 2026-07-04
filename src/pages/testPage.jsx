import { useState } from "react";
import toast from "react-hot-toast";
import { FaYoutube } from "react-icons/fa";

export default function TestPage() {
    const [score, setScore] = useState(50);
    const [mode, setMode] = useState("😊");
    const [isFollowed, setIsFollowed] = useState(false);
    
    return(
        <div className="w-full h-full bg-green-600 flex items-center justify-center ">

            <div className="h-[500px] aspect-square bg-indigo-300 py-[100px] flex flex-col items-center justify-center gap-[30px]">
                <h1>Score: {score}</h1>
                <div className=" bg-red-500 w-full h-[50px] flex items-center justify-center gap-[20px]">
                    
                    <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
                        onClick={
                                () =>{
                                    setScore(score+1);
                                    toast.success("value incresed")
                                }
                            }>
                        Increase
                    </button>

                    <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
                        onClick={
                                () =>{
                                    setScore(score-1);
                                    toast('Good Job!', {
                                        icon:  <FaYoutube className="text-[100px]"/>,
                                    });
                                    
                                }
                        }>
                        Decrease
                    </button>

                </div>

                <h1 className="text-[4rem]">{mode}</h1>
                
                <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
                    onClick={
                        () =>{
                            setMode("😒")
                        }
                    }
                >
                    Sad
                </button>

                <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
                    onClick={
                        () =>{
                            setMode("😊")
                            
                        }
                    }
                >
                    Happy
                </button>

                <button className="bg-blue-950 text-white px-[20px]  py-[10px] mr-[10px] rounded-lg"
                    onClick={
                        () =>{
                            setMode("😍")
                        }
                    }
                >
                    Lovely
                </button>

                <div calssName="flex flex-col icons-center justify-center">
                    <FaYoutube  onClick={
                            () =>{
                                setIsFollowed(!isFollowed)
                            }
                        }
                    
                    className={isFollowed ? "text-amber-300 text-[100px]" : "text-blue-500 text-[100px]" } />
                </div>   
            </div>

                  
           
        </div>


        
    );
}