import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  Send 
} from 'lucide-react';
import { Portfolio3D } from './components/Portfolio3D';
import { Services3DSlider } from './components/Services3DSlider';
import { Cube3D, TorusRing3D, Prism3D, Pyramid3D } from './components/Floating3DFigures';
import { FadeIn } from './components/FadeIn';
import { useInView } from './hooks/useInView';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Синхронизация темы оформления с тегом html через контролируемый эффект
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // Подсветка активных пунктов меню при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'calculator', 'services', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Состояния интерактивного калькулятора рекламы
  const [calcType, setCalcType] = useState<'letters' | 'lightbox' | 'neon' | 'panel'>('letters');
  const [calcSize, setCalcSize] = useState<number>(30);
  const [calcWidth, setCalcWidth] = useState<number>(100);
  const [needMounting, setNeedMounting] = useState<boolean>(true);
  const [needRegistration, setNeedRegistration] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  // Динамический расчет сметы в реальном времени
  useEffect(() => {
    let basePrice = 0;
    if (calcType === 'letters') {
      basePrice = calcSize * 85;
    } else if (calcType === 'lightbox') {
      const sqMeters = (calcSize * calcWidth) / 10000;
      basePrice = Math.max(3500, Math.round(sqMeters * 7500));
    } else if (calcType === 'neon') {
      basePrice = calcSize * 125;
    } else if (calcType === 'panel') {
      basePrice = 9800;
    }

    if (needMounting) basePrice += Math.round(basePrice * 0.2) + 3000;
    if (needRegistration) basePrice += 15000;

    setCalculatedPrice(basePrice);
  }, [calcType, calcSize, calcWidth, needMounting, needRegistration]);

  const { ref: categoriesRef, isVisible: categoriesVisible } = useInView<HTMLDivElement>(0.1);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', phone: '', msg: '' });
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen w-full transition-colors duration-500 overflow-x-hidden">
      
      {/* Шапка сайта */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-5 max-w-[1920px] mx-auto pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full liquid-glass pointer-events-auto backdrop-blur-md">
          <a href="#home" className="text-xl sm:text-2xl tracking-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Азбука Рекламы<sup className="text-[10px] ml-0.5">®</sup>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'portfolio', label: 'Портфолио' },
              { id: 'calculator', label: 'Калькулятор' },
              { id: 'services', label: 'Услуги' },
              { id: 'process', label: 'Этапы' },
              { id: 'about', label: 'О компании' },
              { id: 'contact', label: 'Контакты' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-300 hover:text-foreground ${
                  activeLink === link.id ? 'text-foreground font-bold' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold liquid-glass text-foreground border border-foreground/10 hover:scale-[1.03] transition-all cursor-pointer"
              title="Переключить тему"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} className="text-[#FF9500]" />
                  <span className="hidden xs:inline">Кремовый свет</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-[#5856D6]" />
                  <span className="hidden xs:inline">Глубокий космос</span>
                </>
              )}
            </button>

            <a href="#contact" className="hidden sm:inline-block rounded-full px-5 py-2 text-xs font-semibold bg-foreground text-background hover:scale-[1.03] transition-transform">
              Начать проект
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-foreground rounded-full hover:bg-foreground/5 transition-colors"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-3/4 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-24 left-4 right-4 liquid-glass p-6 rounded-3xl flex flex-col gap-4 border border-foreground/10 backdrop-blur-lg md:hidden pointer-events-auto">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'portfolio', label: 'Наши проекты' },
              { id: 'calculator', label: 'Онлайн калькулятор' },
              { id: 'services', label: 'Услуги и цены' },
              { id: 'process', label: 'Как мы работаем' },
              { id: 'about', label: 'О фабрике' },
              { id: 'contact', label: 'Связаться с нами' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm uppercase tracking-wider font-semibold transition-colors py-2 border-b border-foreground/5 ${
                  activeLink === link.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Главный экран (Hero) с неоновым SVG артом */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-24 text-center overflow-hidden z-10 bg-background transition-colors duration-500">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-background select-none pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-70 md:opacity-90" viewBox="0 0 1200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="neon-glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="13" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="11" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-violet" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="14" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neon-glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <linearGradient id="neon-vertical-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="8%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>

              <mask id="neon-boundary-mask">
                <rect x="-100" y="-100" width="1400" height="1000" fill="url(#neon-vertical-fade)" />
              </mask>
            </defs>
            
            <g mask="url(#neon-boundary-mask)">
              <path d="M -50,140 Q 180,60 130,260 T 450,110" fill="none" stroke="#ff0055" strokeWidth="4" strokeLinecap="round" filter="url(#neon-glow-red)" className="opacity-70" />
              <path d="M -50,140 Q 180,60 130,260 T 450,110" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="opacity-95" />
              <path d="M 1150,180 Q 880,40 760,280 T 1280,420" fill="none" stroke="#00f3ff" strokeWidth="5" strokeLinecap="round" filter="url(#neon-glow-cyan)" className="opacity-60" />
              <path d="M 1150,180 Q 880,40 760,280 T 1280,420" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="opacity-95" />
              <path d="M 100,160 C 450,260 850,70 1100,190" fill="none" stroke="#B39F85" strokeWidth="4.5" strokeLinecap="round" filter="url(#neon-glow-gold)" className="opacity-55" />
              <path d="M 100,160 C 450,260 850,70 1100,190" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" className="opacity-90" />
              <path d="M 1250,110 C 1020,-10 820,320 530,360 S 140,290 -120,340" fill="none" stroke="#00ff66" strokeWidth="4.5" strokeLinecap="round" filter="url(#neon-glow-green)" className="opacity-60" />
              <path d="M 1250,110 C 1020,-10 820,320 530,360 S 140,290 -120,340" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="opacity-95" />
              <path d="M 550,-40 C 440,220 700,430 350,480 S -60,520 -110,380" fill="none" stroke="#ff7700" strokeWidth="5" strokeLinecap="round" filter="url(#neon-glow-orange)" className="opacity-60" />
              <path d="M 550,-40 C 440,220 700,430 350,480 S -60,520 -110,380" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="opacity-90" />
              <path d="M -90,260 C 240,160 820,350 1280,240" fill="none" stroke="#9d00ff" strokeWidth="5" strokeLinecap="round" filter="url(#neon-glow-violet)" className="opacity-60" />
              <path d="M -90,260 C 240,160 820,350 1280,240" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="opacity-95" />
              <path d="M -100,420 C 280,480 620,380 920,440 S 1120,390 1320,410" fill="none" stroke="#ff0055" strokeWidth="4" strokeLinecap="round" filter="url(#neon-glow-red)" className="opacity-60" />
              <path d="M -100,420 C 280,480 620,380 920,440 S 1120,390 1320,410" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" className="opacity-90" />
              <path d="M -60,520 C 380,340 880,510 1280,390" fill="none" stroke="#00f3ff" strokeWidth="4.5" strokeLinecap="round" filter="url(#neon-glow-cyan)" className="opacity-60" />
              <path d="M -60,520 C 380,340 880,510 1280,390" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="opacity-95" />
              <path d="M -50,560 C 450,440 780,580 1250,460" fill="none" stroke="#B39F85" strokeWidth="4" strokeLinecap="round" filter="url(#neon-glow-gold)" className="opacity-55" />
              <path d="M -50,560 C 450,440 780,580 1250,460" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" className="opacity-90" />
              <path d="M -100,600 C 300,680 700,540 1000,750 S 1150,680 1300,720" fill="none" stroke="#a200ff" strokeWidth="4.5" strokeLinecap="round" filter="url(#neon-glow-violet)" className="opacity-65" />
              <path d="M -100,600 C 300,680 700,540 1000,750 S 1150,680 1300,720" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="opacity-90" />
              <path d="M 1280,520 C 950,590 1050,740 1280,770" fill="none" stroke="#ff7700" strokeWidth="5" strokeLinecap="round" filter="url(#neon-glow-orange)" className="opacity-60" />
              <path d="M 1280,520 C 950,590 1050,740 1280,770" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="opacity-90" />
              <path d="M -120,740 C 250,660 650,780 1320,680" fill="none" stroke="#00f3ff" strokeWidth="4.5" strokeLinecap="round" filter="url(#neon-glow-cyan)" className="opacity-60" />
              <path d="M -120,740 C 250,660 650,780 1320,680" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="opacity-95" />
            </g>
          </svg>
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, var(--foreground) 1.2px, transparent 1.2px)",
            backgroundSize: "40px 40px"
          }} />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-0 opacity-95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center select-none pointer-events-auto">
          <span className="text-[#B39F85] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-5 block font-bold">
            АЗБУКА РЕКЛАМЫ
          </span>
          <h1 className="text-[36px] xs:text-[44px] sm:text-7xl md:text-8xl lg:text-[105px] font-normal leading-[0.96] sm:leading-[0.92] tracking-[-1px] xs:tracking-[-2px] sm:tracking-[-2.46px] max-w-[1200px] text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Где <em className="not-italic text-muted-foreground">идеи</em> обретают форму <em className="not-italic text-muted-foreground">в металле и свете.</em>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mt-8 leading-relaxed font-medium">
            Собственное производство наружной рекламы полного цикла. Разрабатываем дизайн-макеты, изготавливаем объемные буквы, лайтбоксы, выставочные стенды и осуществляем монтаж с гарантией по всей России. Берем на себя полный цикл юридического согласования вывесок.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="#portfolio" className="luxury-shimmer liquid-glass rounded-full px-10 py-4 text-sm font-semibold text-foreground border border-foreground/10">Смотреть работы</a>
            <a href="#calculator" className="luxury-shimmer rounded-full px-10 py-4 text-sm font-semibold bg-foreground text-background">Рассчитать стоимость</a>
          </div>
        </div>

        <a href="#portfolio" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-xs tracking-widest uppercase font-semibold text-muted-foreground hover:text-foreground transition-colors animate-bounce">
          <span>Кейсы</span>
          <ChevronDown size={14} className="mt-1" />
        </a>
      </header>

      {/* Портфолио (3D-Барабан) */}
      <section id="portfolio" className="relative min-h-screen py-24 bg-background flex flex-col justify-center items-center overflow-hidden border-t border-foreground/5 select-none transition-colors duration-500">
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mb-6 pointer-events-auto">
          <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Наши Проекты</h2>
        </div>
        <div className="w-full relative z-10">
          <Portfolio3D />
        </div>
      </section>

      {/* Интерактивный калькулятор сметы */}
      <section id="calculator" className="relative py-24 px-6 md:px-12 bg-background border-t border-foreground/5 z-10 transition-colors duration-500">
        <div className="max-w-7xl lg:max-w-[1340px] px-4 md:px-8 mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Расчет Стоимости</h2>
            <p className="text-[#9C948B] text-base sm:text-xl mt-4 leading-relaxed max-w-2xl mx-auto font-medium">
              Выберите тип конструкции и введите ее параметры для мгновенного получения ориентировочной сметы под ключ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 p-4 sm:p-10 rounded-3xl liquid-glass border border-foreground/10 flex flex-col gap-5 sm:gap-8">
              
              <div className="flex lg:hidden items-center justify-between p-4 rounded-2xl bg-foreground text-background shadow-md border border-foreground/15">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold opacity-75 font-mono">Предварительная смета</span>
                  <span className="text-[10px] opacity-60 font-mono">с учётом выбранных опций</span>
                </div>
                <span className="text-2xl font-black font-mono tracking-tight">{calculatedPrice.toLocaleString()} ₽</span>
              </div>

              <div>
                <label className="text-xs sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono block mb-3">1. Тип рекламной конструкции</label>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-4">
                  {[
                    { id: 'letters', label: 'Световые объемные буквы', info: '85 руб. / см высоты' },
                    { id: 'lightbox', label: 'Световой короб (лайтбокс)', info: 'от 7500 руб. / кв.м' },
                    { id: 'neon', label: 'Гибкий неон на акриле', info: '125 руб. / м контура' },
                    { id: 'panel', label: 'Панель-кронштейн (двухсторонний)', info: 'от 9800 руб.' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setCalcType(type.id as 'letters' | 'lightbox' | 'neon' | 'panel');
                        if (type.id === 'letters' || type.id === 'neon') setCalcSize(30);
                        if (type.id === 'lightbox') setCalcSize(100);
                      }}
                      className={`p-3.5 sm:p-5 rounded-2xl border text-left flex flex-col justify-between h-[96px] sm:h-[120px] transition-all duration-300 ${
                        calcType === type.id ? 'bg-foreground text-background border-foreground shadow-lg scale-[1.01]' : 'bg-foreground/5 text-foreground border-foreground/10 hover:bg-foreground/10'
                      }`}
                    >
                      <span className="text-xs sm:text-base font-extrabold leading-snug">{type.label}</span>
                      <span className={`text-[10px] sm:text-xs font-mono mt-1 ${calcType === type.id ? 'text-background/90' : 'text-muted-foreground'}`}>{type.info}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {calcType === 'letters' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono">Высота букв</label>
                      <span className="text-base sm:text-lg font-bold text-foreground font-mono">{calcSize} см</span>
                    </div>
                    <input type="range" min="10" max="120" value={calcSize} onChange={(e) => setCalcSize(Number(e.target.value))} className="w-full accent-foreground bg-foreground/15 h-1.5 rounded-full appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1.5">
                      <span>10 см</span>
                      <span>120 см</span>
                    </div>
                  </div>
                )}

                {calcType === 'lightbox' && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono">Высота короба</label>
                        <span className="text-base sm:text-lg font-bold text-foreground font-mono">{calcSize} см</span>
                      </div>
                      <input type="range" min="30" max="250" value={calcSize} onChange={(e) => setCalcSize(Number(e.target.value))} className="w-full accent-foreground bg-foreground/15 h-1.5 rounded-full appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1.5">
                        <span>30 см</span>
                        <span>250 см</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono">Ширина короба</label>
                        <span className="text-base sm:text-lg font-bold text-foreground font-mono">{calcWidth} см</span>
                      </div>
                      <input type="range" min="50" max="600" value={calcWidth} onChange={(e) => setCalcWidth(Number(e.target.value))} className="w-full accent-foreground bg-foreground/15 h-1.5 rounded-full appearance-none cursor-pointer" />
                      <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1.5">
                        <span>50 см</span>
                        <span>600 см</span>
                      </div>
                    </div>
                  </div>
                )}

                {calcType === 'neon' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono">Длина светодиодной ленты</label>
                      <span className="text-base sm:text-lg font-bold text-foreground font-mono">{calcSize} метров</span>
                    </div>
                    <input type="range" min="2" max="50" value={calcSize} onChange={(e) => setCalcSize(Number(e.target.value))} className="w-full accent-foreground bg-foreground/15 h-1.5 rounded-full appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1.5">
                      <span>2 м</span>
                      <span>50 м</span>
                    </div>
                  </div>
                )}

                {calcType === 'panel' && (
                  <div className="text-sm sm:text-base text-muted-foreground font-mono bg-foreground/5 p-5 rounded-2xl border border-foreground/5 leading-relaxed">
                    {/* Панель-кронштейны имеют фиксированный диаметр от 50 до 80 см. Двухстороннее исполнение на металлокаркасе. Стоимость указана за единицу. */}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 border-t border-foreground/10 pt-6">
                <label className="text-sm sm:text-base uppercase tracking-wider font-bold text-[#9C948B] font-mono block mb-2">2. Дополнительные опции</label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" checked={needMounting} onChange={(e) => setNeedMounting(e.target.checked)} className="w-[18px] h-[18px] accent-foreground rounded border-foreground/10" />
                  <div>
                    <span className="text-sm sm:text-base font-bold block text-foreground">Монтажные работы под ключ</span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">Включает крепеж, сборку, высотные работы и запуск</span>
                  </div>
                </label>
                <label className="flex items-center gap-4 cursor-pointer mt-3">
                  <input type="checkbox" checked={needRegistration} onChange={(e) => setNeedRegistration(e.target.checked)} className="w-[18px] h-[18px] accent-foreground rounded border-foreground/10" />
                  <div>
                    <span className="text-sm sm:text-base font-bold block text-foreground">Согласование вывески в администрации</span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">Разработка техпроекта и полное сопровождение (+15 000 руб.)</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 rounded-3xl bg-[#0E0D0C] text-white border border-white/10 flex flex-col justify-between h-full min-h-[490px] transition-all">
              <div style={{ fontFamily: '"JetBrains Mono", monospace' }} className="flex flex-col gap-6 text-base font-mono">
                <div className="text-[#B39F85] font-extrabold text-lg sm:text-xl tracking-wider">РАСЧЕТНАЯ СМЕТА РАБОТ</div>
                <div className="border-b border-white/10 pb-5 flex flex-col gap-3 text-white/95 text-sm sm:text-base">
                  <div>ТИП: <span className="font-bold">{calcType.toUpperCase()}</span></div>
                  {calcType === 'lightbox' ? (
                    <div>РАЗМЕР: <span className="font-bold">{calcSize}см х {calcWidth}см</span></div>
                  ) : (
                    <div>РАЗМЕР/ОБЪЕМ: <span className="font-bold">{calcSize} {calcType === 'letters' || calcType === 'neon' ? 'ед.' : 'м'}</span></div>
                  )}
                  <div>МОНТАЖ: <span className="font-bold text-amber-400">{needMounting ? 'ВКЛЮЧЕН (+20% + 3000р)' : 'НЕТ'}</span></div>
                  <div>СОГЛАСОВАНИЕ: <span className="font-bold text-amber-400">{needRegistration ? 'ОБЕСПЕЧИВАЕТСЯ (+15000р)' : 'САМОСТОЯТЕЛЬНО'}</span></div>
                </div>
                <div className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2">
                  * Данный расчет является предварительным и базируется на стандартных материалах (акрил Plexiglas, ПВХ Unext, диоды ELF, трансформаторы MeanWell).
                </div>
              </div>
              <div className="mt-10">
                <span className="text-sm tracking-wider uppercase text-white/40 block font-mono">ОРИЕНТИРОВОЧНЫЙ БЮДЖЕТ</span>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white block mt-2" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  {calculatedPrice.toLocaleString()} ₽
                </span>
                <a href="#contact" className="luxury-shimmer w-full block text-center rounded-full px-6 py-5 mt-8 text-lg font-bold bg-white text-black">Отправить смету технологу</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги фабрики (Изометрический 3D-слайдер) */}
      <section id="services" className="relative py-24 bg-background text-foreground min-h-screen flex flex-col justify-center transition-colors duration-500 overflow-hidden">
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mb-6 pt-8">
          <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Наши услуги
          </h2>
        </div>

        <div ref={categoriesRef} className={`w-full transition-all duration-1000 ease-out transform ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <Services3DSlider />
        </div>
      </section>

      {/* Описание технологий и преимуществ ЧПУ */}
      <section className="relative py-24 px-6 md:px-12 bg-background border-t border-foreground/5 z-10 transition-colors duration-500">
        <div className="max-w-7xl lg:max-w-[1340px] px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeIn delay={0.1} y={40} className="flex flex-col gap-6">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Согласование вывесок под ключ</h3>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                Наружная реклама регулируется строгими городскими регламентами (например, Постановлением 902-ПП в Москве и региональными дизайн-кодами). Несанкционированное размещение ведет к штрафам до 500 000 руб. и принудительному демонтажу.
              </p>
              <div className="flex flex-col gap-4 font-medium text-base sm:text-lg text-foreground mt-2">
                <div className="flex items-center gap-4">
                  <CheckCircle2 size={22} className="text-[#34C759] flex-shrink-0" />
                  <span>Разрабатываем проектную и конструкторскую документацию.</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 size={22} className="text-[#34C759] flex-shrink-0" />
                  <span>Подаем и сопровождаем заявления в Комитет архитектуры.</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 size={22} className="text-[#34C759] flex-shrink-0" />
                  <span>Гарантируем 100% юридическую чистоту и защиту от демонтажа.</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25} y={40} className="flex flex-col gap-6">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Собственная фабрика и ЧПУ оборудование</h3>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                Мы не являемся рекламным агентством-посредником. У нас работает полноценный цех по сборке наружной рекламы. Мы лично закупаем материалы и контролируем качество на всех этапах работы.
              </p>
              <div className="flex flex-col gap-4 font-medium text-base sm:text-lg text-foreground mt-2">
                <div className="flex items-center gap-4">
                  <Wrench size={22} className="text-[#B39F85] flex-shrink-0" />
                  <span>Фрезерно-гравировальные ЧПУ станки для точного раскроя композита и акрила.</span>
                </div>
                <div className="flex items-center gap-4">
                  <Wrench size={22} className="text-[#B39F85] flex-shrink-0" />
                  <span>Автоматизированные бортогибочные станки для создания идеального контура букв.</span>
                </div>
                <div className="flex items-center gap-4">
                  <Wrench size={22} className="text-[#B39F85] flex-shrink-0" />
                  <span>Прямые закупки светодиодов ELF и трансформаторов MeanWell.</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Этапы производства */}
      <section id="process" className="relative py-24 px-6 md:px-12 bg-background border-t border-foreground/5 z-10 transition-colors duration-500">
        <div className="max-w-7xl lg:max-w-[1340px] px-4 md:px-8 mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Этапы Работы</h2>
            <p className="text-[#9C948B] text-base sm:text-xl mt-4 leading-relaxed max-w-2xl mx-auto font-medium">
              Мы выстроили понятную цепочку производства, исключающую ошибки замера и проектирования.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-stretch relative">
            {[
              { num: '01', title: 'Замер', desc: 'Бесплатный выезд нашего инженера с образцами материалов для точной фиксации параметров.' },
              { num: '02', title: 'Дизайн-проект', desc: 'Разрабатываем макет с фотопривязкой к фасаду, согласовываем шрифты и светимость.' },
              { num: '03', title: 'Согласование', desc: 'Подаем документы на регистрацию в Комитет архитектуры для легализации.' },
              { num: '04', title: 'Завод', desc: 'Вырезаем на ЧПУ и собираем вывеску на собственном автоматизированном конвейере.' },
              { num: '05', title: 'Монтаж', desc: 'Монтируем силами профессиональных альпинистов, подключаем и даем гарантию.' },
            ].map((step, idx) => (
              <FadeIn 
                key={idx} 
                delay={idx * 0.1} 
                y={30} 
                className="relative z-10 flex flex-col h-full p-6 sm:p-10 rounded-3xl bg-foreground/5 border border-foreground/5 hover:border-foreground/20 text-center items-center justify-start transition-all hover:-translate-y-2 duration-300 w-full min-h-[300px] md:min-h-[330px]"
              >
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#B39F85] block">{step.num}</span>
                <h4 className="text-xl sm:text-2xl font-black text-foreground mt-5 block text-center">{step.title}</h4>
                <p className="text-muted-foreground text-sm sm:text-base leading-normal mt-3 text-center">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* О фабрике (Секция с летающими CSS 3D фигурами) */}
      <section id="about" className="relative min-h-screen py-24 px-5 sm:px-8 md:px-10 flex flex-col justify-center items-center overflow-hidden z-10 bg-background transition-colors duration-500" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <div className="absolute top-[6%] left-[4%] sm:left-[6%] md:left-[8%] z-0 pointer-events-none">
          <Cube3D />
        </div>
        <div className="absolute bottom-[10%] left-[4%] sm:left-[6%] md:left-[10%] z-0 pointer-events-none">
          <TorusRing3D />
        </div>
        <div className="absolute top-[6%] right-[4%] sm:right-[6%] md:right-[8%] z-0 pointer-events-none">
          <Prism3D />
        </div>
        <div className="absolute bottom-[10%] right-[4%] sm:right-[6%] md:right-[10%] z-0 pointer-events-none">
          <Pyramid3D />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-16 sm:gap-20">
          <div className="flex flex-col items-center gap-10">
            <div className="w-full text-center">
              <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-4xl sm:text-7xl md:text-[110px] lg:text-[140px]">О фабрике</h2>
            </div>
            <div className="text-center px-4 md:px-12 text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-foreground leading-relaxed sm:leading-relaxed tracking-tight max-w-5xl mx-auto select-text antialiased text-balance">
              Более 15 лет наша команда занимается созданием вывесок и рекламных конструкций. Мы создаем качественный дизайн, берем на себя согласование проектов в администрации и осуществляем качественный монтаж. Мы любим проекты, которые бросают вызов нашему мастерству!
            </div>
          </div>
          <div className="z-10">
            <a href="#contact" className="inline-block rounded-full px-10 py-3 sm:px-12 sm:py-4 border-2 border-[#E3E3E3] hover:opacity-90 active:opacity-75 transition-all text-xs sm:text-sm font-semibold uppercase tracking-widest text-white text-center cursor-pointer" style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)', boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset', outline: '2px solid #E3E3E3', outlineOffset: '-3px' }}>Связаться с нами</a>
          </div>
        </div>
      </section>

      {/* Секция FAQ (Аккордеон) */}
      <section id="faq" className="relative py-24 px-6 md:px-12 bg-background border-t border-foreground/5 z-10 transition-colors duration-500">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Часто Задаваемые Вопросы</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { q: 'Сколько времени занимает изготовление вывески?', a: 'Стандартный срок производства объемных букв или лайтбоксов на нашем заводе составляет от 3 до 7 рабочих дней в зависимости от сложности конструкции. Разработка дизайна и замеры осуществляются в течение 1–2 дней.' },
              { q: 'Какие документы нужны для согласования вывески?', a: 'Мы готовим проектно-конструкторскую документацию самостоятельно: разрабатываем дизайн-проект с фотопривязкой к фасаду, подготавливаем чертежи крепежных узлов, электрическую схему и расчет ветровых нагрузок. От вас потребуются только правоустанавливающие документы на помещение (договор аренды или выписка из ЕГРН).' },
              { q: 'Какую гарантию вы предоставляете на изделия?', a: 'Мы уверены в своем оборудовании и материалах, поэтому даем полную официальную гарантию по договору 2 года на любые световые конструкции (включая диоды, блоки питания и акриловое лицо) и 5 лет на металлические каркасы и несущие элементы.' },
              { q: 'Возможна ли доставка и монтаж в других регионах?', a: 'Да, наша монтажная служба регулярно выезжает на объекты по всей Нижегородской области, Москве и соседним регионам. Также осуществляем надежную доставку жесткой обрешеткой транспортными компаниями по всей России с подробной инструкцией и трафаретом для самостоятельного монтажа.' }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-foreground/10 pb-6">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left py-6 flex justify-between items-center text-foreground font-extrabold hover:opacity-85 transition-opacity"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl tracking-tight">{faq.q}</span>
                  <ChevronDown size={28} className={`transform transition-transform duration-300 text-[#B39F85] ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="text-foreground/80 text-lg sm:text-xl md:text-2xl leading-relaxed pb-6 pt-2 max-w-4xl font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контактная форма обратной связи */}
      <section id="contact" className="relative py-24 px-6 md:px-12 bg-background border-t border-foreground/5 z-10 transition-colors duration-500">
        <div className="max-w-7xl lg:max-w-[1340px] px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-12 xl:col-span-7">
              <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Начать Проект</h2>
              <p className="text-muted-foreground text-base sm:text-xl mt-4 max-w-2xl leading-relaxed font-medium">
                Заполните форму ниже, опишите задачу или прикрепите готовый макет. Наш главный технолог свяжется с вами в течение 15 минут для уточнения деталей.
              </p>

              {formSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] flex items-center gap-3 max-w-xl">
                  <CheckCircle2 size={20} />
                  <div>
                    <span className="font-bold block">Заявка успешно отправлена!</span>
                    <span className="text-xs mt-0.5 block opacity-90">Мы перезвоним вам в течение 15 минут.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col gap-6 max-w-xl text-base">
                  <div>
                    <label className="text-xs sm:text-sm uppercase font-bold text-muted-foreground tracking-wider font-mono block mb-2">Имя или Компания</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванович"
                      className="w-full px-5 py-4.5 rounded-xl liquid-glass text-foreground placeholder-muted-foreground/60 border border-foreground/15 focus:outline-none focus:border-foreground text-sm sm:text-base font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm uppercase font-bold text-muted-foreground tracking-wider font-mono block mb-2">Номер телефона</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full px-5 py-4.5 rounded-xl liquid-glass text-foreground placeholder-muted-foreground/60 border border-foreground/15 focus:outline-none focus:border-foreground text-sm sm:text-base font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm uppercase font-bold text-muted-foreground tracking-wider font-mono block mb-2">Описание задачи / Размеры</label>
                    <textarea
                      rows={4}
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      placeholder="Необходимо изготовить световые буквы 'Кафе' высотой 40 см на композитной подложке..."
                      className="w-full px-5 py-4.5 rounded-xl liquid-glass text-foreground placeholder-muted-foreground/60 border border-foreground/15 focus:outline-none focus:border-foreground resize-none text-sm sm:text-base font-medium"
                    />
                  </div>
                  <button type="submit" className="w-full py-4.5 rounded-xl bg-foreground text-background font-extrabold text-sm sm:text-base hover:scale-[1.01] active:scale-[0.99] transition-transform flex items-center justify-center gap-2.5 mt-2 shadow-lg">
                    <Send size={16} />
                    <span>Отправить запрос</span>
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-12 xl:col-span-5 p-8 sm:p-10 rounded-3xl liquid-glass border border-foreground/10 flex flex-col gap-10">
              <div className="flex flex-col gap-8 text-sm sm:text-base">
                <div className="flex items-start gap-4">
                  <Phone size={22} className="text-[#B39F85] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39F85] block font-mono font-bold mb-1">Telephone</span>
                    <a href="tel:+79671342218" className="text-lg sm:text-xl font-bold block text-foreground hover:text-[#B39F85] transition-colors">+7 (967) 134-22-18</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={22} className="text-[#B39F85] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39F85] block font-mono font-bold mb-1">Email</span>
                    <a href="mailto:info@abcrek.ru" className="text-lg sm:text-xl font-bold block text-foreground hover:text-[#B39F85] transition-colors font-mono">info@abcrek.ru</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={22} className="text-[#B39F85] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39F85] block font-mono font-bold mb-1">Адрес фабрики и офиса</span>
                    <span className="text-lg sm:text-xl font-bold block mt-0.5 leading-snug text-foreground">г. Нижний Новгород, ул. Интернациональная, д. 95, к. 1</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={22} className="text-[#B39F85] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39F85] block font-mono font-bold mb-1">Часы работы</span>
                    <span className="text-lg sm:text-xl font-bold block mt-0.5 text-foreground">Пн – Пт: с 9:00 до 18:00</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-8 flex flex-col gap-4">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-[#B39F85] block font-mono font-bold mb-1">НАПИСАТЬ НАПРЯМУЮ</span>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://wa.me/79671342218" target="_blank" rel="noreferrer" className="flex-1 text-center py-4 rounded-full text-sm font-bold bg-[#25D366] text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-md">WhatsApp</a>
                  <a href="https://t.me/abcadvertising" target="_blank" rel="noreferrer" className="flex-1 text-center py-4 rounded-full text-sm font-bold bg-[#0088cc] text-white hover:opacity-90 hover:scale-[1.01] transition-all shadow-md">Telegram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Подвал (Dotted Footer) */}
      <footer id="footer" className="site-footer">
        <div className="footer-dots" aria-hidden="true">
          <div className="footer-dots__line" />
        </div>
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <h2 className="text-foreground">Проверенные передовые технологии производства вывесок</h2>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <a href="#home" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Главная</a>
              <a href="#portfolio" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Портфолио</a>
              <a href="#calculator" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Калькулятор</a>
              <a href="#services" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Наши Услуги</a>
            </nav>
            <nav className="site-footer__nav" aria-label="Company links">
              <a href="#process" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Как мы работаем</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">О фабрике</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Наши Контакты</a>
            </nav>
            <nav className="site-footer__nav" aria-label="Social links">
              <a href="https://vk.com/azbyka_reklami" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">ВКонтакте</a>
              <a href="https://t.me/abcadvertising" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground hover:translate-x-[3px] transition-all">Telegram канал</a>
            </nav>
          </div>
          <div className="site-footer__brand-row">
            <div className="site-footer__brand" aria-label="Азбука Рекламы home">
              <span className="site-footer__mark" aria-hidden="true" />
              <span className="text-[25px] xs:text-[34px] sm:text-[9vw] xl:text-[180px] font-bold block flex-1 whitespace-nowrap tracking-[-0.055em] leading-[0.78]">Азбука Рекламы</span>
            </div>
          </div>
          <div className="site-footer__legal text-muted-foreground/70 text-[9px] flex flex-wrap gap-2 md:gap-4 mt-6">
            <p className="margin-0">© 2026 Азбука Рекламы. Все права защищены.</p>
            <a href="#privacy" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
