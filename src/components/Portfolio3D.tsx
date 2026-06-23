import React, { useState, useEffect, useRef } from 'react';

interface CaseDetail {
  title: string;
  client: string;
  video: string;
  category: string;
  year: string;
  desc: string;
  color: string;
}

const CARD_CASES: CaseDetail[] = [
  {
    title: 'Световые буквы',
    client: 'Velorah Studio',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    category: 'Наружная реклама',
    year: '2026',
    desc: 'Объемные световые буквы из жидкого акрила с контражурной диодной подсветкой на металлической подложке.',
    color: '#FF3B30',
  },
  {
    title: 'Брендирование авто',
    client: 'EngineTech',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
    category: 'Транспортная оклейка',
    year: '2025',
    desc: 'Полная виниловая оклейка корпоративного автопарка с использованием износостойкой ламинации и светоотражающих элементов.',
    color: '#007AFF',
  },
  {
    title: 'Интерьерный стенд',
    client: 'RoboTech Exhibition',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
    category: 'Выставочные стенды',
    year: '2026',
    desc: 'Сложный интерактивный выставочный стенд со светодиодными порталами и встроенными мультимедиа-зонами.',
    color: '#34C759',
  },
  {
    title: 'Тонкий Лайтбокс',
    client: 'Bake & Coffee Co.',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
    category: 'Интерьерная реклама',
    year: '2026',
    desc: 'Сверхтонкие световые панели FrameLight с клик-профилем для оперативной смены рекламных плакатов.',
    color: '#FF9500',
  },
  {
    title: 'Рекламная Стела',
    client: 'Сеть АЗС Энергия',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
    category: 'Отдельно стоящие конструкции',
    year: '2025',
    desc: '6-метровая стела со встроенной динамической диодной ценой и антивандальным композитным покрытием.',
    color: '#AF52DE',
  },
  {
    title: 'Медиафасад',
    client: 'NeoPlaza Mall',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    category: 'Цифровой светодиодный фасад',
    year: '2026',
    desc: "Прозрачный светодиодный фасад, интегрированный в панорамное остекление витрин торгового центра.",
    color: '#34C759',
  },
  {
    title: 'Премиум неон',
    client: 'Glow Bar & Lounge',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
    category: 'Интерьерный неон',
    year: '2026',
    desc: "Дизайнерское интерьерное панно из высококачественного силиконового неона на подложке из закаленного акрила.",
    color: '#FF3B30',
  },
  {
    title: 'Пилоны Навигации',
    client: 'БЦ Кристалл',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
    category: 'Внутренняя навигация',
    year: '2026',
    desc: "Навигационные пилоны из нержавеющей шлифованной стали с фрезерованными световыми индексами.",
    color: '#007AFF',
  },
  {
    title: 'Архитектурный Пилон',
    client: 'Premium Residence',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
    category: 'Входные группы',
    year: '2025',
    desc: "Монументальный входной пилон из композита и керамогранита со скрытыми линиями подсветки фасада.",
    color: '#AF52DE',
  },
  {
    title: 'Интерактивная Стена',
    client: 'TechSpace Solutions',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
    category: 'Экспозиционные решения',
    year: '2026',
    desc: "Светодиодная сенсорная стена с динамической заливкой и встроенной системой датчиков присутствия.",
    color: '#FF9500',
  }
];

export const Portfolio3D: React.FC = () => {
  const cardCount = CARD_CASES.length;
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  
  const progress = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [metrics, setMetrics] = useState({ cardW: 336, cardH: 211 });

  const cardRotations = useRef(CARD_CASES.map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 })));
  const activeCardIdx = useRef<number | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDraggingCard = useRef(false);
  const clickDistance = useRef(0);

  const isDraggingBg = useRef(false);
  const bgDragStart = useRef(0);
  const velocity = useRef<number>(0);
  const isHovered = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      let cardW = Math.round(w * 0.16 + 130);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      
      cardW = Math.min(336, Math.max(220, cardW));
      const cardH = Math.round(cardW / 1.5925);

      setMetrics({ cardW, cardH });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDraggingBg.current = false;
      isDraggingCard.current = false;
      activeCardIdx.current = null;
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, []);

  useEffect(() => {
    const renderLoop = () => {
      if (!isDraggingCard.current && !isDraggingBg.current) {
        if (Math.abs(velocity.current) > 0.0001) {
          progress.current += velocity.current;
          velocity.current *= 0.95;
        } else {
          if (!isHovered.current) {
            progress.current += 0.0008; 
          }
        }
      }

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      const cards = cardsRefs.current;
      const h = window.innerHeight;
      const { cardH } = metrics;

      const continuousProgress = progress.current;
      const roundedIndex = Math.round(continuousProgress);
      const diffFromRound = continuousProgress - roundedIndex;
      
      const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
      const virtualActiveIndex = roundedIndex + easedDiff;

      for (let i = 0; i < cardCount; i++) {
        const card = cards[i];
        if (!card) continue;

        let offset = i - virtualActiveIndex;
        const halfCount = cardCount / 2;
        while (offset > halfCount) offset -= cardCount;
        while (offset < -halfCount) offset += cardCount;

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        if (absOffset > 4.2) {
          card.style.visibility = 'hidden';
          continue;
        } else {
          card.style.visibility = 'visible';
        }

        const gap = 36;
        const peekAmount = -60; 
        const D = 1350; 

        let y = 0;
        let z = 0;
        let rot = 0;

        if (absOffset <= 1) {
          const t = absOffset;
          const easedT = t * t * (3 - 2 * t);
          const targetY = cardH + gap;
          y = -sign * (easedT * targetY);
          z = 400 + easedT * (220 - 400);
          rot = easedT * 132;
        } else if (absOffset <= 2) {
          const t = absOffset - 1;
          const easedT = t * t * (3 - 2 * t);
          const yStart = cardH + gap;
          const zStart = 220;
          const rotStart = 132;
          const zEnd = -60;
          const rotEnd = 175;
          const sEnd = D / (D - zEnd);
          const yEnd = (h / 2 - peekAmount) / sEnd - (cardH / 2);
          
          y = -sign * (yStart + easedT * (yEnd - yStart));
          z = zStart + easedT * (zEnd - zStart);
          rot = rotStart + easedT * (rotEnd - rotStart);
        } else {
          const t = Math.min(absOffset - 2, 1);
          const easedT = t * t * (3 - 2 * t);
          const zStart = -60;
          const rotStart = 175;
          const zEnd3 = -250;
          const rotEnd3 = 195;
          const sEnd2 = D / (D - zStart);
          const yEnd2 = (h / 2 - peekAmount) / sEnd2 - (cardH / 2);
          const sEnd3 = D / (D - zEnd3);
          const yEnd3 = (h / 2 + 100) / sEnd3 + (cardH / 2);

          y = -sign * (yEnd2 + easedT * (yEnd3 - yEnd2));
          z = zStart + easedT * (zEnd3 - zStart);
          rot = rotStart + easedT * (rotEnd3 - rotStart);
        }

        const rotState = cardRotations.current[i];
        if (rotState) {
          rotState.x += (rotState.targetX - rotState.x) * 0.12;
          rotState.y += (rotState.targetY - rotState.y) * 0.12;
        }

        const localCardRotation = -sign * rot;
        const centerFactor = Math.max(0, 1 - absOffset);

        const maxTiltY = 15;
        const maxTiltX = 12;

        const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
        const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

        const totalRotX = localCardRotation + activeTiltX + (rotState?.x || 0);
        const totalRotY = activeTiltY + (rotState?.y || 0);

        card.style.zIndex = Math.round(z).toString();
        card.style.opacity = '1';
        card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
      }
    };

    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics, cardCount]);

  const handleBgPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDraggingBg.current = true;
    bgDragStart.current = e.clientY;
    velocity.current = 0;
    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);
  };

  const handleBgPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingBg.current) return;
    const dy = e.clientY - bgDragStart.current;
    bgDragStart.current = e.clientY;
    
    const delta = dy * 0.0045;
    progress.current += delta;
    velocity.current = velocity.current * 0.35 + delta * 0.65;
  };

  const handleBgPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingBg.current) {
      isDraggingBg.current = false;
      const target = e.currentTarget as HTMLDivElement;
      target.releasePointerCapture(e.pointerId);
    }
  };

  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div 
      className="relative w-full h-[620px] sm:h-[780px] flex items-center justify-center overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }} // Намертво глушим дефолтный скролл телефона поверх блока
      onPointerDown={handleBgPointerDown}
      onPointerMove={handleBgPointerMove}
      onPointerUp={handleBgPointerUp}
      onPointerCancel={handleBgPointerUp}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1350px' }}>
        <div className="absolute" style={{ width: `${metrics.cardW}px`, height: `${metrics.cardH}px`, transformStyle: 'preserve-3d' }}>
          {CARD_CASES.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing group select-none touch-none"
              style={{ width: `${metrics.cardW}px`, height: `${metrics.cardH}px`, transformStyle: 'preserve-3d', touchAction: 'none' }}
              onPointerEnter={() => { isHovered.current = true; }}
              onPointerLeave={() => { isHovered.current = false; }}
              onPointerDown={(e) => {
                e.stopPropagation();
                activeCardIdx.current = i;
                isDraggingCard.current = true;
                velocity.current = 0;
                dragStart.current = { x: e.clientX, y: e.clientY };
                clickDistance.current = 0;
                const target = e.currentTarget as HTMLDivElement;
                target.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!isDraggingCard.current || activeCardIdx.current !== i) return;
                const dx = e.clientX - dragStart.current.x;
                const dy = e.clientY - dragStart.current.y;
                clickDistance.current += Math.sqrt(dx * dx + dy * dy);
                dragStart.current = { x: e.clientX, y: e.clientY };

                const currentRot = cardRotations.current[i];
                if (currentRot) {
                  currentRot.targetY += dx * 0.75;
                }
                
                const delta = dy * 0.0045;
                progress.current += delta;
                velocity.current = velocity.current * 0.35 + delta * 0.65;
              }}
              onPointerUp={(e) => {
                if (activeCardIdx.current === i) {
                  isDraggingCard.current = false;
                  const target = e.currentTarget as HTMLDivElement;
                  target.releasePointerCapture(e.pointerId);
                  
                  if (clickDistance.current < 6) {
                    const currentRot = cardRotations.current[i];
                    if (currentRot) {
                      const currentY = currentRot.targetY;
                      const normalizedY = Math.round(currentY / 180) * 180;
                      if (Math.abs(currentY - normalizedY) < 45) {
                        currentRot.targetY = normalizedY + 180;
                      } else {
                        currentRot.targetY = normalizedY;
                      }
                    }
                  }
                }
              }}
              onPointerCancel={(e) => {
                if (activeCardIdx.current === i) {
                  isDraggingCard.current = false;
                  const target = e.currentTarget as HTMLDivElement;
                  target.releasePointerCapture(e.pointerId);
                }
              }}
            >
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;
                const baseBgColor = '#0E0D0C';

                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] border border-[#3E3830]/40 pointer-events-none overflow-hidden"
                      style={{ backgroundColor: '#2E2721', transform: `translateZ(${zOffset}px)` }}
                    />
                  );
                }

                if (isFrontFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] border border-white/10 pointer-events-none overflow-hidden transition-colors duration-500"
                      style={{ 
                        backgroundColor: baseBgColor, 
                        transform: `translateZ(${zOffset}px)`, 
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden', 
                        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 12px 30px rgba(0,0,0,0.5), 0 0 16px ${project.color}15` 
                      }}
                    >
                      <video src={project.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
                      <div className="absolute inset-0 p-3 xs:p-4 sm:p-6 text-white h-full w-full font-sans z-10 bg-black/40 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-1">
                          <div className="min-w-0">
                            <span className="text-[8px] xs:text-[9px] uppercase tracking-widest text-white/50 block">Проект</span>
                            <h4 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold tracking-tight mt-0.5 leading-tight truncate">{project.title}</h4>
                          </div>
                          <span 
                            className="text-[9px] sm:text-xs font-mono px-1.5 py-0.5 rounded-md border flex-shrink-0"
                            style={{ borderColor: `${project.color}40`, color: project.color, backgroundColor: `${project.color}10` }}
                          >
                            {project.year}
                          </span>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/10 pt-2">
                          <div className="min-w-0">
                            <span className="text-[8px] xs:text-[9px] uppercase tracking-widest text-white/50 block">Заказчик</span>
                            <span className="text-xs sm:text-sm font-medium tracking-tight truncate block">{project.client}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[16px] border border-white/10 pointer-events-none overflow-hidden transition-colors duration-500"
                      style={{ 
                        backgroundColor: baseBgColor, 
                        transform: `translateZ(${zOffset}px) rotateY(180deg)`, 
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden', 
                        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 12px 30px rgba(0,0,0,0.5), 0 0 16px ${project.color}15` 
                      }}
                    >
                      {/* Оптимизация: убрали дубликат тяжелого видео, заменили на сочный неоновый бэкграунд */}
                      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`, filter: 'blur(10px)' }} />
                      <div className="absolute left-0 right-0 top-3 h-5 sm:h-7 bg-black/60 backdrop-blur-md z-10 border-y border-white/5" />
                      <div className="absolute inset-x-3 bottom-3 xs:inset-x-4 xs:bottom-4 sm:inset-x-5 sm:bottom-5 z-20 flex flex-col gap-0.5 sm:gap-1 text-left text-white" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                        <div className="text-[8px] xs:text-[9px] sm:text-[11px] font-bold uppercase tracking-wider" style={{ color: project.color }}>ТЕХНИЧЕСКИЕ ДЕТАЛИ</div>
                        <div className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11.5px] text-white/90 leading-normal sm:leading-relaxed mt-0.5 sm:mt-1 font-mono">
                          <span className="text-white/40">КАТЕГОРИЯ:</span> {project.category.toUpperCase()}<br />
                          <span className="text-white/40">ЗАКАЗЧИК:</span> {project.client.toUpperCase()}<br />
                          <span className="text-white/40">ОПИСАНИЕ:</span> {project.desc}
                        </div>
                        <div className="text-[7px] xs:text-[8px] sm:text-[9px] mt-1 sm:mt-2 font-mono flex justify-between" style={{ color: `${project.color}90` }}>
                          <span>ID: AR-0{i+1}</span>
                          <span>STATUS: COMPLETED</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};