import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// Ограничиваем доступные теги только теми, которые официально поддерживает framer-motion
type MotionTags = 'div' | 'section' | 'article' | 'header' | 'footer' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'nav';

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: MotionTags; // Строгая типизация вместо сырой строки
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = 'div',
}) => {
  // Безопасно извлекаем нужный motion-компонент
  const MotionComponent = (motion[as] || motion.div) as React.ComponentType<MotionProps & { className?: string; style?: React.CSSProperties; children?: React.ReactNode }>;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px 0px", amount: 0.1 }}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1], // Плавный luxury-кубик Безье
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};