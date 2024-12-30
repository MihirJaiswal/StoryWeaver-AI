"use client";

import { useState, } from "react";
import { useStoryboard } from "@/hooks/useStoryboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, ImageOff, RefreshCcw, Download} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from 'file-saver';
import SparklesText from "../ui/sparkles-text";
import Image from "next/image";

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

  const handleClear = () => {
    setPlot("");
  }

  

  return (
    <div className='min-h-screen pt-24'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-300 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <SparklesText text="Storyboard Generator" className="text-4xl w-full font-bold text-center my-4" sparklesCount={3} />
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
              className="min-h-96 md:min-h-[200px] text-lg dark:bg-gray-700 dark:text-gray-100"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-4 gap-4">
          <Button
            type="submit"
            disabled={isLoading || !plot.trim()}
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-white dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-700">
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
          {plot && (
            <button 
              onClick={handleClear} 
              className="text-lg px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
                        hover:from-purple-600 hover:to-purple-700 transition-all duration-300 
                        text-white dark:from-purple-600 dark:to-purple-700 
                        dark:hover:from-purple-700 dark:hover:to-purple-800 
                        rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 
                        focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Clear
            </button>
          )}
          </div>
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
              <p className="mt-4 text-lg text-gray-950 dark:text-gray-100">Generating scenes...</p>
              <p className="mt-2 text-sm text-gray-900 dark:text-gray-200">Click &apos;Retry&apos; to attempt generating the image again if it wasn&apos;t successfully created.</p>
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
              <p className="text-xl">No scenes available or the API may be temporarily down. Please try again later.</p>
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
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-800 hover:to-purple-800 text-white"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Storyboard</span>
                </Button>
              </motion.div>
              <motion.div
                className="flex flex-wrap items-center justify-center gap-8"
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
                 <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden h-full rounded-lg">
                   <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-t-lg">
                     <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Scene {index + 1}</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6">
                     <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                       
                       {/* Image Handling */}
                       <div className="relative w-64 h-64 mb-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden shadow-lg">
                         {scene.imageStatus === 'loading' && (
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-50">
                             <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
                             <p className="text-sm text-gray-500 dark:text-gray-400">Generating image...</p>
                           </div>
                         )}
                         {scene.imageStatus === 'error' && (
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-50">
                             <ImageOff className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                             <Button
                               variant="outline"
                               size="sm"
                               onClick={() => retryImage(index)}
                               className="flex items-center gap-2 dark:bg-gray-600 dark:text-gray-200 border-2 border-gray-400 dark:border-gray-600 rounded-md py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                             >
                               <RefreshCcw className="h-4 w-4" />
                               Retry
                             </Button>
                           </div>
                         )}
                         {scene.imageStatus === 'success' && scene.imageUrl && (
                           <Image
                             width={256}
                             height={256}
                             loading="lazy"
                             src={scene.imageUrl}
                             alt={`Scene ${index + 1}`}
                             className="w-full h-full object-center"
                           />
                         )}
                       </div>
               
                       {/* Text Content */}
                       <div className="space-y-6 flex-1">
                         <div>
                           <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Summary:</h4>
                           <p className="text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md shadow-md">{scene.summary}</p>
                         </div>
               
                         <div>
                           <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg">Dialogue:</h4>
                           <div className="space-y-4 md:max-h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg shadow-inner w-full">
                             {scene.dialogue.split('\n').map((line, i) => {
                               const [speaker, ...speech] = line.split(':');
                               return (
                                  <div
                                   key={i}
                                   className={`flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-400 rounded-lg shadow-sm transition-transform transform  ${
                                     i % 2 === 0
                                       ? 'bg-gradient-to-b from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-950 dark:text-white'
                                       : 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
                                   }`}
                                 >
                                   <span className="font-semibold text-pink-700 dark:text-purple-400 flex-shrink-0">{speaker}:</span>
                                   <span className="text-gray-950 dark:text-white leading-relaxed">{speech.join(':').trim()}</span>
                                 </div>
                               );
                             })}
                           </div>
                         </div>
                       </div>
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

