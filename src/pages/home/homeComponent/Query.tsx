"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of cars do you offer?",
    answer:
      "We offer a wide variety of cars, including sedans, SUVs, trucks, and electric vehicles from top brands.",
  },
  {
    question: "Do you provide financing options?",
    answer:
      "Yes, we partner with leading financial institutions to offer flexible car financing options with low-interest rates.",
  },
  {
    question: "Can I return a car if I’m not satisfied?",
    answer:
      "Absolutely! We offer a 7-day return policy if the car doesn’t meet your expectations.",
  },
  {
    question: "Is there a warranty included?",
    answer:
      "All our cars come with a minimum 6-month warranty. Extended warranty options are also available.",
  },
];

const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

const Query = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-700 mb-10">
          Frequently Asked Queries
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-red-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-red-50 hover:bg-red-100 transition"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-red-600 w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={accordionVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 py-4 bg-white text-gray-600 text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Query;
