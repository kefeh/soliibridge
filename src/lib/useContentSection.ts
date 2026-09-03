"use client";

import { useEffect, useState } from "react";

export function useContentSection<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(seed);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/content/${encodeURIComponent(key)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && data.value !== null && data.value !== undefined) {
          setValue(data.value as T);
        }
      })
      .catch(() => {
        // Keep the seed value if the fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const save = async () => {
    await fetch(`/api/content/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
  };

  return { value, setValue, save };
}
