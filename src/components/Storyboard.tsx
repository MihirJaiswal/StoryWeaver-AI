"use client";

import { useState } from "react";
import { useStoryboard } from "@/hooks/useStoryboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, ImageOff, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function Storyboard() {
  const { scenes, segmentScenes, isLoading, error, retryImage } = useStoryboard();
  const [plot, setPlot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plot.trim()) return;
    await segmentScenes(plot);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Storyboard Generator</h1>
      </motion.div>

      {/* Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/50 backdrop-blur-md rounded-lg p-6 shadow-lg border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2">
          <label htmlFor="plot" className="text-lg font-medium text-gray-700">
            Enter your plot
          </label>
          <Textarea
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            placeholder="Once upon a time in a galaxy far, far away..."
            className="min-h-[120px] text-lg"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !plot.trim()}
          className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
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
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-4 text-lg text-gray-600">Bringing your story to life...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="p-4 bg-red-50 text-red-500 rounded-md shadow-md"
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
            className="text-center text-gray-500 py-12"
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
                <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <CardTitle className="text-xl font-bold text-gray-800">Scene {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Image Handling */}
                    <div className="relative w-full h-48 mb-4">
                      {scene.imageStatus === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                      )}
                      {scene.imageStatus === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                          <ImageOff className="h-8 w-8 text-gray-400 mb-2" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => retryImage(index)}
                            className="flex items-center gap-2"
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
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                    </div>

                    {/* Text Content */}
                    <h4 className="font-semibold text-gray-800 mb-2">Summary:</h4>
                    <p className="mb-4 text-gray-700 italic">{scene.summary}</p>
                    <h4 className="font-semibold text-gray-800 mb-2">Dialogue:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md h-44 overflow-scroll">{scene.dialogue}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
