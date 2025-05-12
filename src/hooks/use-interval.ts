import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<(() => void) | null>(null);

  // Guarda la última función de callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura el intervalo
  useEffect(() => {
    if (delay === null) return; // Detiene el intervalo si delay es null

    const tick = () => savedCallback.current?.();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);

  return null;
}

export default useInterval;
