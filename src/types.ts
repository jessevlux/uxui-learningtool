export interface Example {
  type: string;
  id: string;
}

export interface InteractiveExample extends Example {
  question: string;
  explanation: string;
  items: string[];
  categories: {
    name: string;
    description: string;
  }[];
  solution: {
    [category: string]: string[];
  };
  feedback: {
    success: string;
    failure: string;
  };
}

export interface AnalysisExample extends Example {
  // Add required properties for this type
} 