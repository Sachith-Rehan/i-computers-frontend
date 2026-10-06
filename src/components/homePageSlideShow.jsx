import { useState, useEffect } from "react";

export default function HomeSlideShow({images =[]}) {
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
            const interval = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 5000);

            return () => clearInterval(interval)
      },[images.length])

      if(images.length == 0){
            return <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">No Images</div>;
      }

}