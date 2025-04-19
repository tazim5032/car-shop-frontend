export default function Banner() {
  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtp5fwvg9/image/upload/v1744734824/car-bannar_rogbyq.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-xl">
          Drive Bold with <span className="text-red-500">Magestic Motors</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Premium Cars. Unmatched Deals. Limited Time Only!
        </p>
        <a
          href="/all-products"
          className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
        >
          Explore Cars
        </a>
      </div>
    </div>
  );
}
