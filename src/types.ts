// types.ts
export interface Scene {
    summary: string;
    dialogue: string;
    imageUrl?: string;
    imageStatus: 'loading' | 'success' | 'error';
  }
  
  export interface StoryboardHook {
    scenes: Scene[];
    segmentScenes: (plot: string) => Promise<void>;
    isLoading: boolean;
    retryImage: (index: number) => Promise<void>;
  }