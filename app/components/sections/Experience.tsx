"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ExperienceProps {
  initialExperiences?: any[];
}

export function Experience({ initialExperiences }: ExperienceProps) {
  const [experiences, setExperiences] = useState(initialExperiences || []);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (initialExperiences) {
      setExperiences(initialExperiences);
    }
  }, [initialExperiences]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getCompanyIcon = (company: string) => {
    const firstLetter = company.charAt(0).toUpperCase();
    return firstLetter;
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              My journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A timeline of my professional experience and career growth
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-blue-500 bg-white dark:bg-gray-900 shadow-lg z-10" />

                  {/* Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="glass rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg ${
                            index % 2 === 0 ? "md:order-2" : ""
                          }`}
                        >
                          {getCompanyIcon(exp.company)}
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? "md:order-1" : ""}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 dark:text-gray-400">&bull;</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.endDate ? formatDate(exp.endDate) : "Present"}
                              </span>
                            </div>
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                            {exp.company} • {exp.location}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                            {exp.description}
                          </p>
                          <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                            {expandedId === exp.id ? "Show less" : "Learn more"}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Description */}
                      <AnimatePresence>
                        {expandedId === exp.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {experiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">No experience entries yet.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
