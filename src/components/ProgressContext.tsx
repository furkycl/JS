"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ProgressContextType = {
  completedTopics: Set<string>;
  toggleComplete: (topicId: string) => void;
  isComplete: (topicId: string) => boolean;
  getProgress: (level: string, moduleSlug?: string) => { completed: number; total: number; percentage: number };
};

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "js-modules-progress";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCompletedTopics(new Set(parsed));
      } catch {
        // ignore
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedTopics]));
    }
  }, [completedTopics, mounted]);

  const toggleComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const isComplete = (topicId: string) => completedTopics.has(topicId);

  const getProgress = (level: string, moduleSlug?: string) => {
    const prefix = moduleSlug ? `${level}:${moduleSlug}:` : `${level}:`;
    const matchingTopics = [...completedTopics].filter((id) => id.startsWith(prefix));

    // Get total topics from levels data
    const totalMap: Record<string, Record<string, number>> = {
      junior: {
        "variables-and-types": 3,
        "scope-and-closures": 3,
        "this-and-binding": 3,
        "array-methods-advanced": 3,
        "functions-and-parameters": 3,
        "arrays-and-objects": 3,
        "control-flow": 3,
        "strings-and-numbers": 3,
        "dom-basics": 3,
      },
      mid: {
        "promises": 4,
        "fetch-and-http": 3,
        "async-iterators": 2,
        "async-await": 3,
        "es-modules": 3,
        "classes-and-prototypes": 3,
        "error-handling": 3,
        "event-loop": 2,
      },
      senior: {
        "performance": 4,
        "concurrency-workers": 2,
        "observability": 2,
        "design-patterns": 3,
        "immutability": 3,
        "robustness-testing": 3,
        "bundling-and-tree-shaking": 3,
      },
    };

    let total = 0;
    if (moduleSlug && totalMap[level]) {
      total = totalMap[level][moduleSlug] || 0;
    } else if (totalMap[level]) {
      total = Object.values(totalMap[level]).reduce((a, b) => a + b, 0);
    }

    const completed = matchingTopics.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ProgressContext.Provider value={{ completedTopics, toggleComplete, isComplete, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

const defaultProgress: ProgressContextType = {
  completedTopics: new Set(),
  toggleComplete: () => {},
  isComplete: () => false,
  getProgress: () => ({ completed: 0, total: 0, percentage: 0 }),
};

export function useProgress() {
  const ctx = useContext(ProgressContext);
  // Return default during SSR or when not wrapped in provider
  return ctx ?? defaultProgress;
}
