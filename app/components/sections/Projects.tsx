"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ProjectsProps {
  initialProjects?: any[];
}

export function Projects({ initialProjects }: ProjectsProps) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const filteredProjects =
    filter === "featured"
      ? projects.filter((p) => p.featured && !p.hidden)
      : projects.filter((p) => !p.hidden);

  const selectedProject = projects.find((p) => p.id === selectedId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const getTechBadgeColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
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
              My work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A selection of projects that showcase my expertise in Laravel, Vue.js, React, and modern web development
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "glass text-gray-700 dark:text-gray-300 hover:scale-105"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "featured"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "glass text-gray-700 dark:text-gray-300 hover:scale-105"
              }`}
            >
              Featured
            </button>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                className="group glass rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedId(project.id)}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                  {project.imageUrl ? (
                    // eslint-disable-next @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl">
                        <i className="fas fa-code" />
                      </div>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(project.techStack || "[]").slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={tech}
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getTechBadgeColor(i)}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {JSON.parse(project.techStack || "[]").length > 3 && (
                      <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        +{JSON.parse(project.techStack).length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-2">
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !project.liveUrl && e.preventDefault()}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !project.githubUrl && e.preventDefault()}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">No projects to display.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedId);
                if (!project) return null;

                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => setSelectedId(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {project.imageUrl && (
                      // eslint-disable-next @next/next/no-img-element
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                      />
                    )}

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(project.techStack || "[]").map((tech: string, i: number) => (
                          <span
                            key={tech}
                            className={`text-sm px-4 py-2 rounded-full font-medium ${getTechBadgeColor(i)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live
                      </a>
                      <a
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full glass text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Source Code
                      </a>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
