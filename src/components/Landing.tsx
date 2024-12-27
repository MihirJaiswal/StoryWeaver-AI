"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, ImageIcon, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Landing() {
  const [plotInput, setPlotInput] = useState("");
  const [hasMounted, setHasMounted] = useState(false); // Ensure the effect runs only after client mount

  useEffect(() => {
    // Set the flag to true after the component has mounted on the client
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const defaultText = "Once upon a time in a galaxy far, far away...";
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < defaultText.length) {
          setPlotInput((prev) => prev + defaultText.charAt(i));
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 100);

      return () => clearInterval(typingEffect); // Clean up interval when component unmounts
    }
  }, [hasMounted]);

  // If the component has not yet mounted on the client, return null to prevent any SSR mismatch
  if (!hasMounted) return null;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl pb-2 font-bold text-transparent bg-clip-text font-['Gilda'] bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400">
            Bring Your Stories to Life with AI!
          </h1>
          <p className="text-lg text-purple-950 dark:text-purple-200 max-w-2xl mx-auto mb-8 italic font-sans">
            Type your movie plot, and let AI craft scenes with dialogues and visuals in seconds.
          </p>
          <motion.div
            className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-6">
              <form>
                <Textarea
                  value={plotInput}
                  onChange={(e) => setPlotInput(e.target.value)}
                  placeholder="Once upon a time in a galaxy far, far away..."
                  className="mb-4 h-32 resize-none border-purple-300 focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-950 dark:border-purple-600 dark:text-white dark:placeholder-gray-400"
                />
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg dark:bg-purple-700 dark:hover:bg-purple-800"
                >
                  Generate My Story
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-center text-purple-800 dark:text-pink-200 mb-8 font-['Gilda']">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: Sparkles, title: "AI Analysis", description: "Our advanced AI analyzes your plot and breaks it down into key scenes." },
              { icon: MessageSquare, title: "Dialogue Generation", description: "Engaging and context-aware dialogue is crafted for each scene." },
              { icon: ImageIcon, title: "Visual Creation", description: "AI generates unique images to bring your scenes to life visually." }].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900">
                  <item.icon className="h-10 w-10 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-pink-200">{item.title}</h3>
                <p className="text-purple-600 dark:text-purple-300 md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-center text-purple-800 dark:text-pink-200 mb-8 font-['Gilda']">Sample Output</h2>
          <div className="bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-pink-200">Scene 1: The Enigmatic Encounter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg border border-gray-400 dark:border-gray-600">
                    <p className="text-purple-800 dark:text-purple-200"><strong>Alice:</strong> <span className='italic font-sans'>"Did you see that peculiar shimmer in the night sky?"</span></p>
                  </div>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-lg border border-gray-400 dark:border-gray-600">
                    <p className="text-pink-800 dark:text-pink-200"><strong>Bob:</strong> <span className='italic font-sans'> "I thought my eyes were playing tricks on me. What could it possibly be?"</span> </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg border border-gray-400 dark:border-gray-600">
                    <p className="text-purple-800 dark:text-purple-200"><strong>Alice:</strong> <span className='italic font-sans'>"I'm not certain, but I have an inexplicable feeling that our lives are about to take an extraordinary turn."</span></p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/storyy.jpg"
                    alt="AI-generated image of a mysterious light in the night sky"
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md w-full h-full object-cover border border-gray-400 dark:border-gray-600"
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-center text-purple-800 dark:text-pink-50 mb-8 font-['Gilda']">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ icon: MessageSquare, title: "AI-generated dialogues", description: "Engaging and context-aware dialogue for each scene." },
              { icon: ImageIcon, title: "AI-generated visuals", description: "Unique images to bring your scenes to life." },
              { icon: Download, title: "Downloadable storyboards", description: "Save and export your generated stories." },
              { icon: Share2, title: "Shareable content", description: "Easily share your creations with others." }].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-md shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900">
                  <item.icon className="h-10 w-10 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-pink-200">{item.title}</h3>
                <p className="text-purple-600 dark:text-purple-300 md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Button size="lg" className="bg-pink-600 border border-gray-700 hover:bg-purple-600 text-white text-md dark:bg-pink-700 dark:hover:bg-purple-700 dark:border-gray-600">
            Start Your Cinematic Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
