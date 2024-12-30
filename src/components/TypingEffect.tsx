'use client'
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function TypingEffect() {
    const [plotInput, setPlotInput] = useState("");
    const [hasMounted, setHasMounted] = useState(false); 

    const lines = [
        "Once upon a time in a galaxy far, far away...",
        "A young hero embarks on a journey of self-discovery.",
        "Villains lurk in the shadows, plotting their schemes.",
        "Friendship and courage light the way in the darkness.",
    ];

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted) {
            let lineCounter = 0;
            let charIndex = 0;
            let isTyping = true;
            let plotText = ""; 

            const typingEffect = setInterval(() => {
                if (isTyping) {
                    if (charIndex < lines[lineCounter].length) {
                        plotText += lines[lineCounter].charAt(charIndex);
                        setPlotInput(plotText); 
                        charIndex++;
                    } else {
                        isTyping = false;
                    }
                } else {
                    if (charIndex > 0) {
                        plotText = plotText.slice(0, -1); 
                        setPlotInput(plotText); 
                        charIndex--;
                    } else {
                        lineCounter++;
                        if (lineCounter >= lines.length) {
                            lineCounter = 0;
                            charIndex = 0;
                        }
                        isTyping = true;
                    }
                }
            }, 100);

            return () => clearInterval(typingEffect);
        }
    }, [hasMounted]); // Only include `hasMounted` here

    if (!hasMounted) return null;

    return (
        <div>
            <Textarea
                value={plotInput}
                onChange={(e) => setPlotInput(e.target.value)}
                placeholder="Once upon a time in a galaxy far, far away..."
                className="mb-4 h-48 resize-none border-purple-300 relative focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-950 dark:border-purple-600 dark:text-white dark:placeholder-gray-400"
            />
        </div>
    );
}
