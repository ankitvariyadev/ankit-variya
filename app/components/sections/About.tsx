"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AboutProps {
  initialSkills?: any[];
}

export function About({ initialSkills }: AboutProps) {
  const [skills, setSkills] = useState(initialSkills || []);
  const [visibleSkills, setVisibleSkills] = useState(3);

  useEffect(() => {
    if (initialSkills) {
      setSkills(initialSkills);
    }
  }, [initialSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const topSkills = skills.slice(0, visibleSkills);
  const hasMoreSkills = skills.length > visibleSkills;

  const loadMoreSkills = () => {
    setVisibleSkills(skills.length);
  };

  const stats = [
    { label: "Years Experience", value: "2.4+" },
    { label: "Projects Completed", value: "6+" },
    { label: "Happy Clients", value: "6+" },
    { label: "Technologies", value: skills.length.toString() },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50">
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
              Get to know me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I&apos;m a passionate Laravel developer with 2.4+ years of experience
                crafting elegant web applications. My journey in web development began
                with a curiosity for how things work on the internet, which evolved
                into a deep expertise in the Laravel ecosystem and modern JavaScript frameworks.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I specialize in building scalable backend systems with Laravel,
                creating responsive frontends with Vue.js and React, and
                implementing real-time features with Livewire and Alpine.js.
                When I&apos;m not coding, you&apos;ll find me exploring new technologies
                or contributing to open-source projects.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in writing clean, maintainable code and following best
                practices to deliver high-quality solutions that exceed expectations.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
                  >
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Cards */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Technical Expertise
              </h3>
              <div className="grid gap-4">
                {topSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id || skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-6 hover:scale-[1.02] transition-transform group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl">
                          <i className={skill.icon || "fas fa-code"} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMoreSkills && (
                <motion.button
                  onClick={loadMoreSkills}
                  className="w-full py-3 rounded-xl glass text-blue-600 dark:text-blue-400 font-semibold hover:bg-white/50 dark:hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Show All Skills
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
