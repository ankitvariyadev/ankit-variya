"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SkillsProps {
  initialSkills?: any[];
}

export function Skills({ initialSkills }: SkillsProps) {
  const [skills, setSkills] = useState(initialSkills || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (initialSkills) {
      setSkills(initialSkills);
    }
  }, [initialSkills]);

  const categories = ["All", ...new Set(skills.map((s) => s.category))];
  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const getIconColor = (category: string) => {
    const colors: Record<string, string> = {
      Frontend: "from-green-400 to-blue-500",
      Backend: "from-blue-500 to-indigo-600",
      Database: "from-orange-400 to-red-500",
      Tools: "from-purple-400 to-pink-500",
      Styling: "from-pink-400 to-rose-500",
      JavaScript: "from-yellow-400 to-orange-500",
      Laravel: "from-pink-500 to-rose-600",
    };
    return colors[category] || "from-gray-400 to-gray-600";
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/50">
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
              What I know
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit honed through years of building production-grade applications
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "glass text-gray-700 dark:text-gray-300 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id || skill.name}
                layout
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group glass rounded-2xl p-6 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${getIconColor(
                      skill.category
                    )} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <i className={skill.icon || "fas fa-code"} />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Category */}
                  <span className="text-sm text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50">
                    {skill.category}
                  </span>

                  {/* Proficiency */}
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getIconColor(
                          skill.category
                        )}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">No skills found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
