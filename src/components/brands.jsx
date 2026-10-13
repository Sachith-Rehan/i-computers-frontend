
import React from "react";

import dell from "../assets/brands/dell.jpg";
import amd from "../assets/brands/amd.jpg";
import hp from "../assets/brands/hp.jpg";
import lenovo from "../assets/brands/lenovo.jpg";
import asus from "../assets/brands/asus.jpg";
import kingston from "../assets/brands/kingston.jpg";
import msi from "../assets/brands/msi.jpg";
import intel from "../assets/brands/intel.jpg";
import nvidia from "../assets/brands/nvidia.jpg";
import logitech from "../assets/brands/logitec.jpg";


const brands = [
  { name: "Dell", image: dell },
  { name: "HP", image: hp },
  { name: "Lenovo", image: lenovo },
  { name: "Asus", image: asus },
  { name: "Kingston", image: kingston },
  { name: "MSI", image: msi },
  { name: "Intel", image: intel },
  { name: "AMD", image: amd },
  { name: "NVIDIA", image: nvidia },
  { name: "Logitech", image: logitech}
];

const Brands = () => {
  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#00D3F3]">
          Our Trusted Brands
        </h2>
        <p className="text-gray-500 mt-2">
          Explore the world's leading technology brands
        </p>
      </div>

      <div
        className="w-full overflow-hidden
        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        group"
      >
        <div className="flex w-max animate-brand-scroll group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-10 pr-10"
            >
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-24 w-40 shrink-0
                  items-center justify-center
                  rounded-2xl bg-white
                  p-5 shadow-sm
                  transition-all duration-300
                  hover:shadow-lg hover:scale-105"
                >
                  <img
                    src={brand.image}
                    alt={copy === 0 ? brand.name : ""}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
