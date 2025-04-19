import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers, FaStar, FaTools } from "react-icons/fa";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-100 py-12 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-12"
      >
        <Title
          level={2}
          className="text-4xl md:text-5xl font-bold text-gray-800"
        >
          Discover the Power of{" "}
          <span className="text-red-600">Magestic Motors</span>
        </Title>
        <Paragraph className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Step into a world of premium vehicles where innovation meets luxury.
          We redefine the art of driving.
        </Paragraph>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaCheckCircle className="text-3xl text-red-500" />
            <Title level={3} className="text-xl text-gray-800">
              Our Mission
            </Title>
          </div>
          <Paragraph className="text-gray-600">
            To deliver excellence on every road. Our passion lies in crafting
            top-tier vehicles with performance, elegance, and safety at the
            core.
          </Paragraph>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaStar className="text-3xl text-yellow-500" />
            <Title level={3} className="text-xl text-gray-800">
              Why Choose Us?
            </Title>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Hand-picked luxury and performance vehicles</li>
            <li>Unmatched User service experience</li>
            <li>Flexible finance and premium maintenance packages</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaTools className="text-3xl text-green-500" />
            <Title level={3} className="text-xl text-gray-800">
              Our Quality Promise
            </Title>
          </div>
          <Paragraph className="text-gray-600">
            Every vehicle we offer undergoes detailed inspections, safety
            checks, and certification — ensuring flawless performance and peace
            of mind.
          </Paragraph>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-4 mb-4">
            <FaUsers className="text-3xl text-blue-500" />
            <Title level={3} className="text-xl text-gray-800">
              Join the Magestic Family
            </Title>
          </div>
          <Paragraph className="text-gray-600">
            Be part of an exclusive club of car lovers. Receive invites to
            private launches, drive events, and owner-exclusive perks.
          </Paragraph>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
