"use client";

import { useState, useEffect } from "react";
import { useStoryboard } from "@/hooks/useStoryboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Sparkles, ImageOff, RefreshCcw, Download, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from 'file-saver';

export default function Storyboard() {
  const { scenes, segmentScenes, isLoading, error, retryImage } = useStoryboard();
  const [plot, setPlot] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plot.trim()) return;
    await segmentScenes(plot);
  };

  const handleDownload = () => {
    const content = scenes.map((scene, index) => `
Scene ${index + 1}:
Summary: ${scene.summary}
Dialogue: ${scene.dialogue}
Image URL: ${scene.imageUrl}

`).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'storyboard.txt');
  };

  

  return (
    <div className='min-h-screen mt-20'>
      <div className="max-w-6xl mx-auto p-6 space-y-8 transition-colors duration-300 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-4xl w-full font-bold text-center my-4  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 ">
            Storyboard Generator
          </h1>
         
        </motion.div>

        {/* Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-900 backdrop-blur-md rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <label htmlFor="plot" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Enter your plot
            </label>
            <Textarea
              id="plot"
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              placeholder="Once upon a time in a galaxy far, far away..."
              className="min-h-[120px] text-lg dark:bg-gray-700 dark:text-gray-100"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !plot.trim()}
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-white dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Crafting Your Story...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Scenes
              </>
            )}
          </Button>
        </motion.form>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex flex-col justify-center items-center h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400" />
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Generating scenes...</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Images will be created after scene generation</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="p-4 bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-300 rounded-md shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-center">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!isLoading && !error && scenes.length === 0 && (
            <motion.div
              className="text-center text-gray-900 dark:text-gray-50 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xl">No scenes available. Provide a plot to begin your journey!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scenes Grid */}
        <AnimatePresence>
          {!isLoading && !error && scenes.length > 0 && (
            <>
              <motion.div
                className="flex justify-end mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Storyboard</span>
                </Button>
              </motion.div>
              <motion.div
                className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {scenes.map((scene, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50">
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Scene {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        {/* Image Handling */}
                        <div className="relative w-full h-48 mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                          {scene.imageStatus === 'loading' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
                              <p className="text-sm text-gray-500 dark:text-gray-400">Generating image...</p>
                            </div>
                          )}
                          {scene.imageStatus === 'error' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <ImageOff className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => retryImage(index)}
                                className="flex items-center gap-2 dark:bg-gray-600 dark:text-gray-200"
                              >
                                <RefreshCcw className="h-4 w-4" />
                                Retry
                              </Button>
                            </div>
                          )}
                          {scene.imageStatus === 'success' && scene.imageUrl && (
                            <img
                              src={scene.imageUrl}
                              alt={`Scene ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="h-96 overflow-auto">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Summary:</h4>
                          <p className="mb-4 text-gray-700 dark:text-gray-300 italic">{scene.summary}</p>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Dialogue:</h4>
                          <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">{scene.dialogue}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

