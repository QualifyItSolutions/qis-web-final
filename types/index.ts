// Shared type definitions for the application

export interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Program {
  title: string;
  description: string;
  category: string;
  duration: string;
  format: string;
  level: string;
  topics: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  topics: string[];
  icon: React.ComponentType<{ className?: string }>;
  videoSrc?: string;
  previewImage?: string;
}

export interface ValidationPhase {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}
