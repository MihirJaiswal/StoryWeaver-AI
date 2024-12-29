// hooks/useStoryboard.ts
import { useState } from "react";
import { Scene, StoryboardHook } from "@/types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useStoryboard(): StoryboardHook {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (summary: string, retryCount = 0): Promise<string> => {
    try {
      await delay(retryCount * 1000);

      const response = await fetch(
        "https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: summary }),
        }
      );

      if (response.status === 429 && retryCount < 3) {
        console.log(`Rate limited, retrying in ${(retryCount + 1) * 1000}ms...`);
        await delay((retryCount + 1) * 1000);
        return generateImage(summary, retryCount + 1);
      }

      if (!response.ok) {
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Image generation error:", error);
      throw error;
    }
  };

  const retryImage = async (index: number) => {
    if (!scenes[index]) return;

    try {
      setScenes(prev => prev.map((scene, i) => 
        i === index ? { ...scene, imageStatus: 'loading' } : scene
      ));

      const imageUrl = await generateImage(scenes[index].summary);
      
      setScenes(prev => prev.map((scene, i) => 
        i === index ? { ...scene, imageUrl, imageStatus: 'success' } : scene
      ));
    } catch (error) {
      setScenes(prev => prev.map((scene, i) => 
        i === index ? { ...scene, imageStatus: 'error' } : scene
      ));
    }
  };

  const parseScenes = (text: string): Scene[] => {
    const patterns = [
      /\*\*Scene \d+:?\s*([^\*]+)\*\*[\s\n]*\*Summary:?\*[\s\n]*(.+?)[\s\n]*\*Sample Dialogue:?\*[\s\n]*(.+?)(?=\*\*Scene|\n*$)/gis,
      /Scene \d+:?\s*(.+?)[\s\n]*Summary:?\s*(.+?)[\s\n]*Sample Dialogue:?\s*(.+?)(?=Scene|\n*$)/gis,
      /\d+\.\s*(.+?)[\s\n]*Summary:?\s*(.+?)[\s\n]*Dialogue:?\s*(.+?)(?=\d+\.|\n*$)/gis
    ];

    const normalizedText = text.replace(/\r\n/g, '\n');

    for (const pattern of patterns) {
      const matches = Array.from(normalizedText.matchAll(pattern));
      if (matches.length > 0) {
        return matches.map(match => ({
          summary: match[2]?.trim().replace(/\n+/g, ' ') || '',
          dialogue: match[3]?.trim().replace(/\n+/g, ' ') || '',
          imageStatus: 'loading'
        }));
      }
    }

    throw new Error('Could not parse scenes from the response text');
  };

  const generateImagesSequentially = async (parsedScenes: Omit<Scene, 'imageUrl' | 'imageStatus'>[]) => {
    const scenesWithImages: Scene[] = [];
    
    for (const scene of parsedScenes) {
      try {
        const imageUrl = await generateImage(scene.summary);
        scenesWithImages.push({
          ...scene,
          imageUrl,
          imageStatus: 'success'
        });
        
        setScenes([...scenesWithImages]);
        await delay(1000);
      } catch (error) {
        scenesWithImages.push({
          ...scene,
          imageUrl: '',
          imageStatus: 'error'
        });
        setScenes([...scenesWithImages]);
      }
    }
    
    return scenesWithImages;
  };

  const segmentScenes = async (plot: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `
        Analyze the following movie plot and segment it into distinct scenes.
        For each scene, provide:
        1. A concise summary of what happens
        2. Sample dialogue that captures the essence of the scene
        3. Style it in an anime/manga way, with vibrant, colorful, and expressive details.
        
        Format each scene as:
        **Scene X**
        *Summary:*
        [Scene summary here]
        *Sample Dialogue:*
        [Sample dialogue here]

        Plot:
        ${plot}
      `.trim(); 

      const response = await fetch(
        'https://api-inference.huggingface.co/models/Qwen/QwQ-32B-Preview',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 1000,
              temperature: 0.7,
              top_p: 0.95,
              do_sample: true,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data) || !data[0]?.generated_text) {
        throw new Error('Invalid API response format');
      }

      const generatedText = data[0].generated_text;
      console.log('Generated text:', generatedText);

      const parsedScenes = parseScenes(generatedText);
      
      if (parsedScenes.length === 0) {
        throw new Error('No scenes were found in the generated text');
      }

      await generateImagesSequentially(parsedScenes);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Scene segmentation error:', err);
      setError(errorMessage);
      setScenes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { scenes, segmentScenes, error, isLoading, retryImage };
}