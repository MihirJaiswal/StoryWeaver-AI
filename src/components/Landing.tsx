import { ArrowRight, Sparkles, MessageSquare, ImageIcon, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Stars } from "lucide-react";
import SparklesText from "./ui/sparkles-text";
import TypingEffect from "./TypingEffect";
import { MotionDiv } from "./MotionDiv";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 pb-12 ">
        <MotionDiv
          className="text-center mb-8 pt-12 relative border-b bg-img1 dark:bg-img3 border-purple-500 dark:border-purple-900 rounded-b-full md:p-8 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stars className="mx-auto w-8 h-8 text-pink-600 mb-6" />
          <SparklesText
            text="Bring Your Stories to Life with AI!"
            className="font-['Gilda'] text-4xl md:text-5xl pb-2 font-bold "
            sparklesCount={3}
          />
          <p className="text-lg text-purple-950 dark:text-purple-200 max-w-2xl mx-auto mb-8 italic font-sans">
            Type your movie plot, and let AI craft scenes with dialogues and visuals in seconds.
          </p>
          <MotionDiv
            className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-6">
              <form>
                <TypingEffect/>
                <Link href="/storyboard">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg dark:bg-purple-700 dark:hover:bg-purple-800"
                >
                  Generate My Story
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </form>
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: Sparkles, title: "AI Analysis", description: "Our advanced AI analyzes your plot and breaks it down into key scenes." },
              { icon: MessageSquare, title: "Dialogue Generation", description: "Engaging and context-aware dialogue is crafted for each scene." },
              { icon: ImageIcon, title: "Visual Creation", description: "AI generates unique images to bring your scenes to life visually." }].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center transform transition-all duration-300 ">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900">
                  <item.icon className="h-10 w-10 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-pink-200">{item.title}</h3>
                <p className="text-purple-600 dark:text-purple-300 md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </MotionDiv>
        <MotionDiv
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
                    <p className="text-purple-800 dark:text-purple-200"><strong>Alice:</strong> <span className='italic font-sans'> &quot;Did you see that peculiar shimmer in the night sky?  &quot;</span></p>
                  </div>
                  <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-lg border border-gray-400 dark:border-gray-600">
                    <p className="text-pink-800 dark:text-pink-200"><strong>Bob:</strong> <span className='italic font-sans'>  &quot; I thought my eyes were playing tricks on me. What could it possibly be?  &quot;</span> </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg border border-gray-400 dark:border-gray-600">
                    <p className="text-purple-800 dark:text-purple-200"><strong>Alice:</strong> <span className='italic font-sans'> &quot; I&apos;m not certain, but I have an inexplicable feeling that our lives are about to take an extraordinary turn.  &quot;</span></p>
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
        </MotionDiv>
        <MotionDiv
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
              <div key={index} className="bg-white dark:bg-gray-900 rounded-md shadow-md p-6 text-center transform transition-all duration-300  ">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900">
                  <item.icon className="h-10 w-10 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-pink-200">{item.title}</h3>
                <p className="text-purple-600 dark:text-purple-300 md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </MotionDiv>
        <div className="text-center">
         <Link href="/storyboard">
         <Button size="lg" className="bg-pink-500 border border-gray-700 hover:bg-purple-600 text-white text-md dark:bg-pink-700 dark:hover:bg-purple-700 dark:border-gray-600">
            Start Your Cinematic Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
         </Link>
        </div>
      </main>
    </div>
  );
}
