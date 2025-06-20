import { useMemo } from "react";

export const useGeneratePlanes = () => {
  const generatePlanes = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 80),
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 85 + Math.random() * 40,
    }));
  const planes = useMemo(() => generatePlanes(6), []);
  return { planes };
};
