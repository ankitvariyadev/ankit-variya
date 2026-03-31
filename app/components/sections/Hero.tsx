"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const roles = ["Laravel Developer", "Full Stack Developer", "PHP Artisan", "Open Source Contributor"];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 50 : 2000;

    if (!isDeleting && displayedText === currentRole) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentRole.substring(0, displayedText.length - 1)
          : currentRole.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/ankitvariyadev",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ankit-nadiyapara/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:ankitvariyadev@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Optimized background image with blur and gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/70 dark:from-gray-900/80 dark:via-purple-900/80 dark:to-blue-900/80 z-10" />
        <Image
          src="/images/Gemini_Generated_Image_q1ow2dq1ow2dq1ow.png"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover -z-10"
          quality={80}
          sizes="100vw"
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}

          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for hire
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Hi, I'm{" "}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ankit Variya
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="h-10 md:h-12 mb-6 flex items-center justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-200">
                <span className="hidden sm:inline">I'm a</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold min-w-[180px] md:min-w-[280px] text-left">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              Crafting elegant solutions with Laravel and modern JavaScript frameworks.
              Passionate about clean code, performance, and building exceptional user experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <a
                href="#contact"
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Get in Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="/resume.pdf"
                download
                className="group w-full sm:w-auto px-8 py-4 rounded-full glass text-gray-700 dark:text-gray-200 font-semibold border border-gray-300 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Download Resume
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-3 rounded-full glass hover:scale-110"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Profile Image with glassmorphism card */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 0.5, -0.5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative p-4 rounded-3xl glass bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 shadow-2xl">
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-80 blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full opacity-60 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Main profile image */}
                <motion.div
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 dark:border-gray-700/50 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/images/Corporate_Headshot_Suit_Office (1).png"
                    alt="Ankit Variya - Laravel Developer"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 400px"
                  />
                </motion.div>

                {/* Additional glass card with stats */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:bottom-auto md:-top-4 md:-right-8 glass rounded-2xl p-4 border border-white/30 dark:border-gray-700/50 shadow-lg bg-white/40 dark:bg-gray-900/60 backdrop-blur-md"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">2.4+</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Years Experience</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -left-4 md:top-auto md:-bottom-4 md:-left-8 glass rounded-2xl p-4 border border-white/30 dark:border-gray-700/50 shadow-lg bg-white/40 dark:bg-gray-900/60 backdrop-blur-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">6+</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Projects</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Close grid */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        <a href="#about" className="text-gray-500 hover:text-blue-500 transition-colors group">
          <svg className="w-6 h-6 animate-bounce group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
