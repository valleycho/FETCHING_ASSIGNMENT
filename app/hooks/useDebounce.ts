"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, dealy: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, dealy);

    return () => {
      clearTimeout(handler);
    }
  }, [value, dealy]);

  return debouncedValue;
}