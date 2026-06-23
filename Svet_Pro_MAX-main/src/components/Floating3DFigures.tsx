import React from 'react';
import { motion } from 'framer-motion';

// Хелпер для общих 3D настроек
const perspectiveStyles: React.CSSProperties = {
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'visible',
};

// Real 3D Wireframe Cube
export const Cube3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-28 h-28 sm:w-36 sm:h-36 relative select-none pointer-events-none ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Сдвиг translateZ настроен через CSS-переменную половины размера контейнера */}
        {[
          { transform: 'rotateY(0deg) translateZ(clamp(56px, 4.5vw, 72px))' },
          { transform: 'rotateY(180deg) translateZ(clamp(56px, 4.5vw, 72px))' },
          { transform: 'rotateY(90deg) translateZ(clamp(56px, 4.5vw, 72px))' },
          { transform: 'rotateY(-90deg) translateZ(clamp(56px, 4.5vw, 72px))' },
          { transform: 'rotateX(90deg) translateZ(clamp(56px, 4.5vw, 72px))' },
          { transform: 'rotateX(-90deg) translateZ(clamp(56px, 4.5vw, 72px))' },
        ].map((face, index) => (
          <div
            key={index}
            className="absolute inset-0 border border-[#B39F85] rounded-xl bg-[#B39F85]/5 flex items-center justify-center text-[10px] font-mono text-[#B39F85]/40"
            style={{ 
              ...face, 
              ...perspectiveStyles,
              WebkitBackfaceVisibility: 'visible',
              boxShadow: '0 0 20px rgba(179,159,133,0.12), inset 0 0 10px rgba(179,159,133,0.05)'
            }}
          >
            АР-3D
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Layered glowing rings
export const TorusRing3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-28 h-28 sm:w-36 sm:h-36 relative select-none pointer-events-none ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateX: [35, 35], rotateY: [0, 360], rotateZ: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[-30, 0, 30].map((zVal, idx) => (
          <div
            key={idx}
            className="absolute inset-2 rounded-full border-2 border-[#007AFF] bg-[#007AFF]/5"
            style={{ 
              transform: `translateZ(${zVal}px)`, 
              ...perspectiveStyles,
              WebkitBackfaceVisibility: 'visible',
              boxShadow: '0 0 16px rgba(0, 122, 255, 0.25), inset 0 0 8px rgba(0, 122, 255, 0.1)' 
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Real 3D glowing triangular prism
export const Prism3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-28 h-28 sm:w-36 sm:h-36 relative select-none pointer-events-none ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateY: [0, 360], rotateZ: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[
          { transform: 'rotateY(0deg) translateZ(clamp(36px, 3vw, 46px))' },
          { transform: 'rotateY(120deg) translateZ(clamp(36px, 3vw, 46px))' },
          { transform: 'rotateY(240deg) translateZ(clamp(36px, 3vw, 46px))' },
        ].map((face, index) => (
          <div
            key={index}
            className="absolute inset-y-0 inset-x-3 border border-[#FF3B30] rounded bg-[#FF3B30]/5"
            style={{ 
              ...face, 
              ...perspectiveStyles,
              WebkitBackfaceVisibility: 'visible',
              boxShadow: '0 0 18px rgba(255, 59, 48, 0.25), inset 0 0 10px rgba(255, 59, 48, 0.08)' 
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Wireframe 3D pyramid (Без использования ломающего 3D clip-path)
export const Pyramid3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-28 h-28 sm:w-36 sm:h-36 relative select-none pointer-events-none ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateX: [25, 25], rotateY: [0, 360] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Base */}
        <div 
          className="absolute inset-6 border border-[#34C759] bg-[#34C759]/5" 
          style={{ 
            transform: 'rotateX(90deg) translateZ(-35px)', 
            boxShadow: '0 0 15px rgba(52, 199, 89, 0.25)' 
          }} 
        />
        {/* Sides - Построены через чистые 3D-границы без clip-path */}
        {[0, 90, 180, 270].map((rotY, index) => (
          <div
            key={index}
            className="absolute inset-x-6 h-0"
            style={{
              top: '12px',
              borderLeft: 'clamp(32px, 2.5vw, 46px) solid transparent',
              borderRight: 'clamp(32px, 2.5vw, 46px) solid transparent',
              borderBottom: 'clamp(64px, 5vw, 86px) solid rgba(52, 199, 89, 0.1)',
              transformOrigin: 'bottom center',
              transform: `rotateY(${rotY}deg) rotateX(30deg) translateZ(0px)`,
              WebkitBackfaceVisibility: 'visible',
              backfaceVisibility: 'visible',
            }}
          >
            {/* Линии ребер грани пирамиды */}
            <div className="absolute left-[-32px] right-[-32px] bottom-0 h-[64px] border-l border-r border-[#34C759] opacity-70" style={{ transform: 'skewX(15deg)' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};