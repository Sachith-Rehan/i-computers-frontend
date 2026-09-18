import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indram5sbG1ucmRhd2t2YnZyYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODkxNjAsImV4cCI6MjA5ODc2NTE2MH0.8xrOfmzl1Gb0CBXHKDcjKGKnuxKiAvv_3oO93NSpQcQ"
const supabaseUrl = "https://wkjnllmnrdawkvbvrbnb.supabase.co"

const supabase = createClient(supabaseUrl, key);

export default function UploadMedia(file){
    
    return new Promise((resolve, reject) => {
        if(!file){
            reject("No file Provided")
        }else{
            
            const timestamp = new Date().getTime();
            const fileName = timestamp + "_" + file.name;

            supabase.storage
                .from("images")
                .upload(fileName, file)
                .then(
                    ()=>{
                        const url = supabase.storage
                            .from("images")
                            .getPublicUrl(fileName).data.publicUrl;
                        toast.success("File uploaded successfully!");
                        resolve(url);
                    }
                ).catch((error)=>{
                    toast.error("Error uploading file: " + error.message);
                    reject(error);
                })
        }
    })
}
