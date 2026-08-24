"use client";

import { useState } from "react";

function readStored<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  const raw = window.localStorage.getItem(key);
  if (!raw) return seed;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

export function usePersistentState<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(() => readStored(key, seed));

  const save = () => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return { value, setValue, save };
}
