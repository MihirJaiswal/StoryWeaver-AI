"use client";
import { Twitter, GithubIcon, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
export default function WavyFooter() {
  return (
    <>
    <motion.div
    className="relative" 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      {/* Wavy SVG */}
      <div className="overflow-hidden">
        <svg
          className="block w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 240"
        >
          <path
            className="fill-white dark:fill-gray-900 border-t border-gray-200 dark:border-gray-200"
            d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,154.7C672,171,768,181,864,165.3C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
        <div className="container mx-auto px-4 py-8 flex justify-between items-center max-w-7xl">
          {/* Left Side - Extra Links */}
          <div className="md:flex flex-col space-y-2 text-left  hidden">
            <a href="#about" className="hover:underline text-gray-600 dark:text-gray-400">
              Home
            </a>
            <a href="#contact" className="hover:underline text-gray-600 dark:text-gray-400">
              StoryBoard
            </a>
            <a href="#contact" className="hover:underline text-gray-600 dark:text-gray-400">
              Stories
            </a>
          </div>

          {/* Center - Website Name, Social Links, and Copyright */}
          <div className="text-center w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Storyweaver AI
            </h1>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Unleashing Creativity Through Technology
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400"
              >
                <GithubIcon size={24} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs mt-6">
              &copy; 2024 Storyweaver AI. All rights reserved.
            </p>
          </div>

          {/* Right Side - Additional Links or Newsletter */}
          <div className="md:flex flex-col space-y-2 text-right hidden">
            <a
              href="#follow-us"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              Follow 
            </a>

            <a
              href="#careers"
              className="hover:underline text-gray-600 dark:text-gray-400"
            >
              Careers
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
    </>
  );
}
