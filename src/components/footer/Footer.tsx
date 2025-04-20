import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import logo from "../../assets/carLogo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <img src={logo} alt="Magestic Motors Logo" className="w-12 " />
            <h2 className="text-3xl font-bold tracking-tight">
              Magestic<span className="text-red-500">Motors</span>
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Discover your next ride with elegance and power. Drive the
            extraordinary.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4  pb-2">Explore</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <a href="/" className="hover:text-red-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/all-products" className="hover:text-red-400 transition">
                Cars
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-red-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4  pb-2">Connect With Us</h3>
          <div className="flex  mt-2 flex-wrap items-center justify-start gap-5">
            <a
              href="#"
              className="text-gray-700 hover:text-red-500 transition text-6xl"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-500 transition text-6xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-500 transition text-6xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-500 transition text-6xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4  pb-2">Stay in the Loop</h3>
          <p className="text-gray-700 mb-4">
            Get the latest news and offers straight to your inbox.
          </p>
          <div className="flex bg-white rounded-full overflow-hidden shadow-md">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full text-black outline-none"
            />
            <button className="bg-red-600 hover:bg-red-500 text-white px-4 flex items-center gap-2 transition">
              <FaPaperPlane />
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 <span className=" font-semibold">Magestic Motors</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
