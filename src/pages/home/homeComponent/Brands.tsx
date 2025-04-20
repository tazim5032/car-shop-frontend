import { motion } from "framer-motion";

const brands = [
  "../../../../src/assets/toyota.jpg",
  "src/assets/audi.jpg",
  "src/assets/bmw.jpg",
  "src/assets/ford.jpg",
  "src/assets/honda.webp",
  "src/assets/mercedes.webp",
  "src/assets/tesla.jpg",
];

const BrandScroller = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center text-red-700 mb-10">
        Trusted by Leading Brands
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-12 min-w-max"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          
          {[...brands, ...brands].map((logo, idx) => (
            <div
              key={idx}
              className="w-32 h-16 flex items-center justify-center shrink-0"
            >
              <img
                src={logo}
                alt={`Brand ${idx}`}
                className="object-contain  h-full grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandScroller;
