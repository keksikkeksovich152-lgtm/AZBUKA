import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X, Sparkles, CheckCircle2, Sliders, ShieldCheck, Award, Layers, Send } from 'lucide-react';

interface DetailedService {
  name: string;
  video: string;
  description: string;
  techSpecs: string[];
  advantages: string[];
  materials: string[];
  suboptions: string[];
  basePrice: number;
}

const DETAILED_SERVICES_DATA: DetailedService[] = [
  {
    name: 'вывески',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203023_87a26602-2898-4acc-a396-c7a2b5ad84fd.mp4',
    description: 'Объемные световые буквы, neo-вывески и крышные установки премиального уровня. Изготовление под ключ с полным юридическим согласованием в Москомархитектуре по Постановлению 902-ПП.',
    techSpecs: [
      'Акрил Plexiglas (Германия) повышенной светопропускаемости 3мм',
      'Суперъяркие светодиоды ELF ULTRA со светоотдачей 120 Лм/Вт',
      'Задняя часть из ударопрочного вспененного ПВХ повышенной плотности',
      'Алюминиевый герметичный профиль с полимерным порошковым напылением'
    ],
    advantages: [
      'Срок службы светодиодных модулей до 50 000 часов непрерывной работы',
      'Полная влагозащита и пыленепроницаемость по строжайшему стандарту IP67',
      'Вывеска окупает свою стоимость за первые недели за счет прилива клиентов'
    ],
    materials: [
      'Жидкий монолитный акрил (без видимых швов)',
      'Классическое акриловое стекло Plexiglas',
      'Нержавеющая сталь AISI 304 (шлифованная / золото)',
      'Гибкий силиконовый неон нового поколения'
    ],
    suboptions: [
      'Лицевое свечение высокой яркости',
      'Контражурная художественная подсветка',
      'Торцевое свечение с инкрустацией',
      'Комбинированная динамическая засветка'
    ],
    basePrice: 15500
  },
  {
    name: 'таблички',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    description: 'Офисные, фасадные, навигационные и мемориальные таблички из статусных материалов. Высокоточная гравировка, инкрустация и УФ-печать прецизионной точности.',
    techSpecs: [
      'Полированная латунь / Матовая премиальная сталь',
      'Многослойный литьевой акрилат с алмазной полировкой торцов',
      'Импортная краска с защитой от выцветания Marabu (Германия)',
      'Дистанционные металлические держатели из анодированного алюминия'
    ],
    advantages: [
      'Абсолютная 100% устойчивость к коррозии и агрессивной городской среде',
      'Антивандальное скрытое крепление для уличного размещения',
      'Ювелирная точность лазерной гравировки с погрешностью до 0.05 мм'
    ],
    materials: [
      'Полированная зеркальная латунь',
      'Шлифованная нержавеющая сталь',
      'Закаленное силикатное стекло Optiwhite',
      'Натуральный шпонированный дуб / орех'
    ],
    suboptions: [
      'Объемные декоративные буквы с инкрустацией',
      'Сквозное лазерное фрезерование',
      'Задняя контражурная подсветка контура',
      'Псевдообъем без подсветки'
    ],
    basePrice: 3200
  },
  {
    name: 'световые панели',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
    description: 'Инновационные сверхтонкие световые короба толщиной от 12мм. Магнитные рамки, клик-профиль и премиум серия Crystalight для ярких витрин и ресторанов.',
    techSpecs: [
      'Акриловая LGP-матрица торцевой засветки с лазерной 3D-гравировкой',
      'Быстроразъемный Click-профиль из анодированного авиационного алюминия',
      'Силиконовый амортизирующий уплотнитель по контуру рамы',
      'Премиальные бескорпусные блоки питания MeanWell (Тайвань)'
    ],
    advantages: [
      'Элегантная толщина изделия — всего от 12 миллиметров',
      'Фантастическое энергосбережение: потребляет до 4х раз меньше',
      'Равномерное свечение всей плоскости панели на 98% без темных зон'
    ],
    materials: [
      'Анодированный алюминий (матовое серебро / темный графит)',
      'Высокопрозрачный оптический поликарбонат',
      'Стальные регулируемые тросовые подвесы',
      'Акриловый монолит с фацетными гранями'
    ],
    suboptions: [
      'Односторонний настенный монтаж',
      'Двусторонний подвесной конструктив',
      'Мобильный сверхтонкий пилон на подиуме',
      'Сенсорное включение при приближении'
    ],
    basePrice: 8900
  },
  {
    name: 'интерьер',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203415_b86e3f19-2aec-46cd-9a86-b64c40118e38.mp4',
    description: 'Комплексное VIP брендирование зон ресепшн, переговорных, торговых залов и шоурумов. Создаем премиальную атмосферу, которая продает за вас.',
    techSpecs: [
      'Экологически чистые композитные материалы класса эмиссии E0/E1',
      'Мягкий неоновый шнур на невизуализируемой акриловой подложке',
      'Металлизированный износоустойчивый пластик с текстурой шлифовки',
      'Усиленный крепеж invis-mount для эффекта парения панели над стеной'
    ],
    advantages: [
      'Полная экологическая безопасность, полное отсутствие химического запаха',
      'Интеграция со смарт-системами управления светом и системой "Умный Дом"',
      'Глубокая проработка мельчайших деталей логотипа на уровне ювелирных изделий'
    ],
    materials: [
      'Благородный массив дуба / ясеня',
      'Негорючий алюминиевый композит',
      'Закаленное стекло триплекс с полированными кромками',
      'Акустические панели с войлочной текстурой'
    ],
    suboptions: [
      'Световой портал с градиентным свечением',
      'Премиальный 3D-логотип на относе',
      'Навигационная система интерьера серии "Матрикс"',
      'Магнитные быстросменные информационные модули'
    ],
    basePrice: 24000
  },
  {
    name: 'стелы и пилоны',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
    description: 'Высокотехнологичные отдельно стоящие конструкции, въездные группы и стелы для АЗС, ТРЦ и автосалонов. Архитектурное проектирование, расчет ветровых нагрузок.',
    techSpecs: [
      'Мощный силовой каркас из сертифицированной профильной трубы по ГОСТ',
      'Облицовка кассетами из композита Alucobond (Германия) 4мм',
      'Устойчивость к ураганным ветрам до 38 м/с по СНиП 2.01.07-85',
      'Анкерно-демпферное крепление с использованием хим-анкеров Hilti'
    ],
    advantages: [
      'Монументальный вид и видимость конструкции на дистанциях до 500 метров',
      'Автоматическое управление яркостью день/ночь для экономии энергии',
      'Полный конструкторский проект КМ/КД с штампом проектировщика'
    ],
    materials: [
      'Стальные толстостенные прокатные профили',
      'Оригинальный композит Alucobond',
      'Светотехнический светорассеивающий полистирол',
      'Интегрированные LED-экраны и бегущие строки'
    ],
    suboptions: [
      'Динамическое электронное табло цен / синоптика',
      'Инкрустация элементов из акрилового стекла 15мм',
      'Радиусная гибка композитных углов конструкции',
      'Двухсекционный ремонтный люк на пневмоупорах'
    ],
    basePrice: 120000
  },
  {
    name: 'фасады',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
    description: 'Инженерное переоформление фасадов зданий композитными кассетами, керамогранитом и медиафасадами. Световой архитектурный дизайн коммерческих объектов.',
    techSpecs: [
      'Алюминиевый вентилируемый каркас с компенсаторами расширения',
      'Пожаробезопасные материалы класса горючести Г1 (слабогорючие) и НГ',
      'Линейные архитектурные прожекторы с защитой IP68 заливающего света',
      'Антикоррозийное гальваническое покрытие всех элементов крепежа'
    ],
    advantages: [
      'Глубокая защита несущих стен здания от сырости, грибка и промерзания',
      'Разработка стильного единого дизайн-кода здания в 3D перед монтажом',
      'Долговечность облицовки фасада — гарантия сохранности цвета 25 лет'
    ],
    materials: [
      'Композит Alucobond / Goldstar 4мм огнеупорный',
      'Сверхплотная каменная вата Rockwool Фасад',
      'Фасадные ламели с текстурой ценных пород дерева',
      'HPL плиты высокого давления повышенной плотности'
    ],
    suboptions: [
      'Световой пиксельный RGB-декор с контроллером DMX',
      'Облицовка пилястр и оконных порталов сложной формы',
      'Светодиодный медиафасад с шагом пикселя от P10',
      'Художественное архитектурное освещение фасада'
    ],
    basePrice: 48000
  },
  {
    name: 'оклейка авто',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203051_85fee398-ea01-4aa0-972b-137a74213be5.mp4',
    description: 'Профессиональное брендирование корпоративного, легкового и грузового транспорта. Превращаем ваш автопарк в бесплатный и эффективный рекламный носитель.',
    techSpecs: [
      'Литая виниловая пленка Oracal 970 / 3M Controltac',
      'Защитная ламинация пленок ультрафиолетовым барьером Oraguard 290',
      'Праймирование сложных углов кузова оригинальным клеем-активатором 3M',
      'Технологичный раскрой пленок нитью Knifeless без риска повреждения ЛКП'
    ],
    advantages: [
      'Надежная барьерная защита оригинального лакокрасочного покрытия кузова',
      'Срок службы без малейших отслоений и изменения оттенка до 7 лет',
      'Легкий демонтаж винила без химических повреждений кузова и следов клея'
    ],
    materials: [
      'Суперлитая автомобильная пленка 3M (США)',
      'Антигравийный полиуретан SunTek PPF премиум класса',
      'Спектральные световозвращающие пленки Oralite (видимость ночью)',
      'Перфорированные пленки One Way Vision на остекление'
    ],
    suboptions: [
      'Полная премиальная закатка кузова (Full Wrapped)',
      'Локальное брендирование бортов и капота',
      'Оклейка задних стекол перфорированной пленкой с печатью',
      'Подетальное бронирование полиуретановой бронепленкой'
    ],
    basePrice: 18000
  },
  {
    name: 'баннеры',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4',
    description: 'Широкоформатная и интерьерная печать высочайшего разрешения. Изготовление брандмауэров, суперсайтов, пресс-волов, декораций и уличных растяжек.',
    techSpecs: [
      'Литой высокопрочный баннер плотностью 510 г/м² (Бельгия / Германия)',
      'Двойная проварка краев горячим воздухом с армирующей стропой',
      'Установка люверсов из оцинкованной нержавеющей стали с шагом 20-30см',
      'Печать экологически безопасными экосольвентными чернилами 1440 DPI'
    ],
    advantages: [
      'Максимальная устойчивость к ветровым разрывам в любых погодных зонах',
      'Профессиональная натяжка с идеальным распределением сил без волн',
      'Полное отсутствие токсичных запахов солей тяжелых металлов'
    ],
    materials: [
      'Сверхплотный литой баннер Ferrari (Франция)',
      'Перфорированная ветроустойчивая баннерная сетка Mesh',
      'Светоблокирующий двусторонний баннер Blockout',
      'Натуральный хлопковый холст арт-серии'
    ],
    suboptions: [
      'Пробивка усиленных люверсов по периметру',
      'Формирование карманов под металлические трубы',
      'Изготовление стального пространственного подрамника',
      'Монтаж промышленными альпинистами на высоте'
    ],
    basePrice: 4500
  }
];

export const Services3DSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const velX = useRef(0);
  const lastX = useRef(0);
  const frameId = useRef(0);

  const [selectedService, setSelectedService] = useState<DetailedService | null>(null);
  const [chosenMaterialIdx, setChosenMaterialIdx] = useState<number>(0);
  const [chosenSuboptionIdx, setChosenSuboptionIdx] = useState<number>(0);
  const [orderName, setOrderName] = useState<string>('');
  const [orderPhone, setOrderPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const cardHoverTilts = useRef(DETAILED_SERVICES_DATA.map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 })));

  // Безопасный PointerDown фикс (работает идеально и для мыши, и для тач-скринов)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging.current = true;
    const container = containerRef.current;
    if (container) {
      startX.current = e.clientX - container.offsetLeft;
      scrollLeftStart.current = container.scrollLeft;
      lastX.current = e.clientX;
    }
    velX.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const x = e.clientX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
    velX.current = e.clientX - lastX.current;
    lastX.current = e.clientX;
  };

  const handlePointerUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>, idx: number) => {
    if (isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    if (cardHoverTilts.current[idx]) {
      cardHoverTilts.current[idx].targetX = normX;
      cardHoverTilts.current[idx].targetY = normY;
    }
  };

  const handleCardPointerLeave = (idx: number) => {
    if (cardHoverTilts.current[idx]) {
      cardHoverTilts.current[idx].targetX = 0;
      cardHoverTilts.current[idx].targetY = 0;
    }
  };

  const updateTransforms = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isDragging.current && Math.abs(velX.current) > 0.1) {
      container.scrollLeft -= velX.current;
      velX.current *= 0.95;
    }

    const tilts = cardHoverTilts.current;
    tilts.forEach((tilt) => {
      if (tilt) {
        tilt.x += (tilt.targetX - tilt.x) * 0.12;
        tilt.y += (tilt.targetY - tilt.y) * 0.12;
      }
    });

    const cards = cardsRefs.current;
    const containerWidth = container.offsetWidth;
    const containerCenter = container.scrollLeft + containerWidth / 2;

    cards.forEach((card, idx) => {
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const cardCenter = card.offsetLeft + cardWidth / 2;
      const delta = cardCenter - containerCenter;
      
      const maxDelta = containerWidth / 1.5;
      const ratio = Math.max(-1.5, Math.min(1.5, delta / maxDelta));

      const rotateY = -ratio * 25; 
      const translateZ = -Math.abs(ratio) * 100; 
      const scale = 1 - Math.abs(ratio) * 0.08;
      const opacity = 1 - Math.abs(ratio) * 0.35;

      const tilt = tilts[idx] || { x: 0, y: 0 };
      const tiltX = -tilt.y * 14; 
      const tiltY = tilt.x * 14; 

      const combinedRotateY = rotateY + tiltY;
      const combinedRotateX = tiltX;

      card.style.transform = `perspective(1000px) rotateX(${combinedRotateX.toFixed(2)}deg) rotateY(${combinedRotateY.toFixed(2)}deg) translateZ(${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
    });
  };

  useEffect(() => {
    const loop = () => {
      updateTransforms();
      frameId.current = requestAnimationFrame(loop);
    };
    frameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId.current);
  }, []);

  // Управление блокировкой оверфлоу скролла через правильный хук жизненного цикла модалки
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedService]);

  const handleArrowScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = 320 + 24;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - cardWidth 
      : container.scrollLeft + cardWidth;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const openDetailModal = (service: DetailedService) => {
    setSelectedService(service);
    setChosenMaterialIdx(0);
    setChosenSuboptionIdx(0);
    setOrderName('');
    setOrderPhone('');
    setFormSubmitted(false);
  };

  const closeDetailModal = () => {
    setSelectedService(null);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderPhone.trim()) return;
    setFormSubmitted(true);
  };

  const calculateCurrentPrice = () => {
    if (!selectedService) return 0;
    const materialMultiplier = 1 + (chosenMaterialIdx * 0.15);
    const suboptionMultiplier = 1 + (chosenSuboptionIdx * 0.12);
    return Math.round(selectedService.basePrice * materialMultiplier * suboptionMultiplier);
  };

  return (
    <div className="w-full relative py-2 select-none pointer-events-auto">
      {/* Кнопки навигации */}
      <div className="flex justify-center gap-4 mb-8 relative z-30">
        <button
          onClick={() => handleArrowScroll('left')}
          className="w-12 h-12 rounded-full border border-foreground/10 bg-black/40 dark:bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background text-foreground transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
          aria-label="Предыдущая услуга"
        >
          <ArrowLeft className="w-5 h-5 pointer-events-none" />
        </button>
        <button
          onClick={() => handleArrowScroll('right')}
          className="w-12 h-12 rounded-full border border-foreground/10 bg-black/40 dark:bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background text-foreground transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
          aria-label="Следующая услуга"
        >
          <ArrowRight className="w-5 h-5 pointer-events-none" />
        </button>
      </div>

      {/* Контейнер слайдера с Pointer-событиями */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        className="w-full flex items-center gap-6 overflow-x-auto py-8 scrollbar-none cursor-default snap-x snap-mandatory sm:snap-none services-slider-container touch-pan-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {DETAILED_SERVICES_DATA.map((service, idx) => (
          <div
            key={idx}
            ref={(el) => { cardsRefs.current[idx] = el; }}
            onPointerMove={(e) => handleCardPointerMove(e, idx)}
            onPointerLeave={() => handleCardPointerLeave(idx)}
            onClick={() => openDetailModal(service)}
            className="flex-shrink-0 relative flex flex-col justify-between items-start p-6 sm:p-8 min-h-[440px] sm:min-h-[480px] w-[270px] sm:w-[320px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/10 cursor-pointer hover:border-white/20 snap-center"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', backgroundColor: '#0E0D0C' }}
          >
            <video src={service.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-black/40 z-0" />
            <h3
              className="relative z-10 text-4xl sm:text-5xl font-normal lowercase select-none text-white/95"
              style={{ fontFamily: "'Instrument Serif', serif", writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
            >
              {service.name}
            </h3>
            <button
              className="luxury-shimmer liquid-glass btn-primary relative z-10 mt-auto w-full py-3 sm:py-3.5 text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                openDetailModal(service);
              }}
            >
              Заказать {service.name}
            </button>
          </div>
        ))}
      </div>

      {/* Модальное окно калькулятора */}
      {selectedService && createPortal(
        <div 
          onClick={closeDetailModal}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fade-in select-text cursor-pointer overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl bg-neutral-900 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row h-auto max-h-[92vh] sm:max-h-[calc(100vh-32px)] lg:h-[88vh] lg:max-h-[840px] my-auto animate-scale-up cursor-default"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <button
              onClick={closeDetailModal}
              className="absolute top-4 right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Левая колонка */}
            <div className="w-full lg:w-[42%] lg:h-full relative bg-black flex flex-col justify-between h-36 xs:h-44 sm:h-52 lg:h-auto border-b lg:border-b-0 lg:border-r border-white/10 flex-shrink-0 overflow-hidden">
              <video src={selectedService.video} autoPlay loop muted playsInline className="absolute inset-x-0 top-0 bottom-0 h-full w-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/40" />
              
              <div className="relative p-4 lg:p-6 z-10 hidden sm:block">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white uppercase tracking-widest backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Premium Custom Workmanship
                </div>
              </div>

              <div className="relative p-4 xs:p-5 lg:p-8 z-10 mt-auto">
                <h2 className="text-white text-2xl xs:text-3xl lg:text-5xl font-light lowercase mb-1 lg:mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {selectedService.name}
                </h2>
                <p className="text-white/70 text-xs lg:text-sm leading-relaxed max-w-sm hidden sm:block">
                  {selectedService.description}
                </p>
              </div>
            </div>

            {/* Правая колонка с калькулятором */}
            <div className="w-full lg:w-[58%] lg:h-full bg-[#0f0e0d] p-4 xs:p-6 sm:p-10 flex flex-col justify-between overflow-y-auto custom-modal-scroll text-white transition-all">
              <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/95">ГОСТ и влагозащита IP67</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/95">Премиум статус материалов</span>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#9C948B] mb-3 px-1 flex items-center gap-2">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#B39F85]" />
                      1. Выберите несущий материал
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedService.materials.map((mat, i) => (
                        <button
                          key={i}
                          onClick={() => setChosenMaterialIdx(i)}
                          className={`py-2.5 px-4 sm:py-3.5 sm:px-5 text-left rounded-2xl border text-xs sm:text-sm leading-normal transition-all duration-300 ${
                            chosenMaterialIdx === i
                              ? 'bg-white text-black border-white font-extrabold shadow-md scale-[1.01]'
                              : 'bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.04] hover:border-white/20'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#9C948B] mb-3 px-1 flex items-center gap-2">
                      <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-[#B39F85]" />
                      2. Технология подсветки / монтажа
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedService.suboptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setChosenSuboptionIdx(i)}
                          className={`py-2.5 px-4 sm:py-3.5 sm:px-5 text-left rounded-2xl border text-xs sm:text-sm leading-normal transition-all duration-300 ${
                            chosenSuboptionIdx === i
                              ? 'bg-white text-black border-white font-extrabold shadow-md scale-[1.01]'
                              : 'bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.04] hover:border-white/20'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9C948B] mb-3 px-1">
                      Базовые технические параметры:
                    </h4>
                    <ul className="space-y-2 sm:space-y-2.5 pl-1.5">
                      {selectedService.techSpecs.map((spec, i) => (
                        <li key={i} className="text-xs sm:text-sm text-white/85 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex-shrink-0">
                {!formSubmitted ? (
                  <form onSubmit={handleModalSubmit} className="space-y-4 sm:space-y-5">
                    <div className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                      <div>
                        <span className="text-[10px] sm:text-xs font-semibold text-white/55 uppercase tracking-widest block">Ориентировочная цена</span>
                        <span className="text-[10px] text-white/40">(с учётом опций)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl sm:text-4xl font-extrabold text-amber-500" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                          от {calculateCurrentPrice().toLocaleString()} ₽
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Ваше Имя"
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-full text-xs sm:text-sm bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Ваш Телефон*"
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-full text-xs sm:text-sm bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="luxury-shimmer w-full bg-white text-black py-3.5 sm:py-4 px-6 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      Оформить заказ со скидкой 10%
                    </button>
                    <p className="text-[10px] text-white/40 text-center leading-normal px-2">
                      Нажимая кнопку, Вы соглашаетесь на обработку персональных данных и мгновенный расчет технологом фабрики.
                    </p>
                  </form>
                ) : (
                  <div className="py-4 text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-2 sm:mb-3">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1 font-sans">Заявка успешно создана!</h3>
                    <p className="text-[11px] sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                      Инженер-технолог по направлению <span className="text-amber-400 font-semibold lowercase">"{selectedService.name}"</span> уже производит окончательный расчет по вашим спецификациям ({selectedService.materials[chosenMaterialIdx]}, {selectedService.suboptions[chosenSuboptionIdx]}). Свяжемся с вами в течение 10 минут!
                    </p>
                    <button
                      onClick={closeDetailModal}
                      className="mt-4 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs text-white font-medium transition-colors"
                    >
                      Закрыть окно
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};