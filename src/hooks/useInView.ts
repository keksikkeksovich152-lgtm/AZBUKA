import { useEffect, useState, useRef } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // Сохраняем текущую ссылку на элемент в локальную переменную для безопасной очистки
    const currentRef = ref.current; 
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]); // Перезапускаем только если реально изменился порог чувствительности

  return { ref, isVisible };
}