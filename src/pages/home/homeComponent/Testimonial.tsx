import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jordan Walker",
    text: "The car I bought exceeded all expectations. Incredible performance and sleek design — it feels like luxury at every turn.",
    role: "Business Executive",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Dawson",
    text: "Exceptional customer service and a fantastic car! I couldn't have asked for a better experience buying online.",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Carlos Mendes",
    text: "Reliable, stylish, and powerful — my car delivers everything I wanted. Definitely recommending this to friends.",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonial = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-red-700 drop-shadow-sm">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-gray-700 text-md sm:text-lg max-w-2xl mx-auto">
          Real experiences from real car lovers who found their dream ride with us.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border border-red-100 hover:shadow-xl transition"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-red-500 mb-4 object-cover"
            />
            <p className="text-gray-700 text-sm sm:text-base italic mb-4 leading-relaxed">
              “{testimonial.text}”
            </p>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-red-600">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
