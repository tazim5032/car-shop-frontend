import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <motion.h1
        className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        No Results Found
      </motion.h1>

      <motion.p
        className="text-gray-500 mt-3 max-w-md text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        We couldn't find any items that match your search. Try something else or
        explore our collections.
      </motion.p>

      <motion.a
        href="/"
        className="mt-6 inline-block px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-medium"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Back to Home
      </motion.a>
    </div>
  );
};

export default NotFound;
