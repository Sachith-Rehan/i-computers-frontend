import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductImageSlideShow({ images = [] }) {

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [imageVisible, setImageVisible] = useState(true);

    const thumbnailWidth = 80;
    const gap = 8;

    const changeImage = (index) => {

        if (index === activeImageIndex) return;

        setImageVisible(false);

        setTimeout(() => {
            setActiveImageIndex(index);
            setImageVisible(true);
        }, 150);
    };

    const previousImages = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const nextImages = () => {
        if (startIndex + 4 < images.length) {
            setStartIndex(startIndex + 1);
        }
    };

    if (images.length === 0) {
        return (
            <div className="w-[500px] h-[450px] bg-gray-100 flex items-center justify-center rounded-xl">
                <p className="text-gray-400">
                    No Images Available
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[500px]">

            {/* Main Image */}
            <div className="w-full h-[450px] bg-white flex items-center justify-center overflow-hidden">

                <img
                    src={images[activeImageIndex]}
                    alt="Product"
                    className={`w-full h-full object-contain transition-all duration-300
                    ${
                        imageVisible
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                    }`}
                />

            </div>


            {/* Thumbnail Slider */}
            <div className="mt-4 flex items-center justify-center gap-2">

                {/* Previous Arrow */}
                <button
                    onClick={previousImages}
                    disabled={startIndex === 0}
                    className={`w-[35px] h-[80px] flex items-center justify-center transition-all duration-300
                    ${
                        startIndex === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:text-accent hover:scale-110"
                    }`}
                >
                    <FiChevronLeft size={30} />
                </button>


                {/* Thumbnail View Area */}
                <div className="w-[344px] overflow-hidden">

                    {/* Moving Thumbnail Row */}
                    <div
                        className="flex gap-2 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${
                                startIndex * (thumbnailWidth + gap)
                            }px)`
                        }}
                    >

                        {images.map((image, index) => (

                            <button
                                key={index}
                                onClick={() => changeImage(index)}
                                className={`w-[80px] h-[80px] shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300
                                ${
                                    activeImageIndex === index
                                        ? "border-accent scale-95"
                                        : "border-gray-200 hover:border-gray-400"
                                }`}
                            >

                                <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-contain p-1"
                                />

                            </button>

                        ))}

                    </div>

                </div>


                {/* Next Arrow */}
                <button
                    onClick={nextImages}
                    disabled={startIndex + 4 >= images.length}
                    className={`w-[35px] h-[80px] flex items-center justify-center transition-all duration-300
                    ${
                        startIndex + 4 >= images.length
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:text-accent hover:scale-110"
                    }`}
                >
                    <FiChevronRight size={30} />
                </button>

            </div>

        </div>
    );
}