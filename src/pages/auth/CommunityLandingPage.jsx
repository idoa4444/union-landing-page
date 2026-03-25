import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useCountUp from '../../hooks/useCountUp';
import Logo from '../../components/shared/Logo';
import {
  ArrowLeft, Shield, TrendingDown, Users, Zap,
  CheckCircle, ChevronLeft,
  BarChart3, Gift, Globe, Building, Heart,
  PieChart, ShoppingBag, Handshake, Eye,
  Coins, GraduationCap, Palette, Activity, TreePine,
} from 'lucide-react';

/* ── Looping Typing Animation Hook ── */
const PHRASES = [
  'קונים ביחד, חוסכים ביחד',
  'מחירי יבואן לכל תושב',
  'קרן קהילתית מכל רכישה',
  'חיסכון של עד 40%',
  'כוח קנייה של קהילה שלמה',
  'המחיר יורד ככל שמצטרפים',
];

function useTypingLoop() {
  const [text, setText] = useState(PHRASES[0]);
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);
  const isPaused = useRef(false);

  useEffect(() => {
    let timeout;

    const tick = () => {
      const currentPhrase = PHRASES[phraseIdx.current];
      if (isPaused.current) return;

      if (!isDeleting.current) {
        charIdx.current++;
        setText(currentPhrase.slice(0, charIdx.current));
        if (charIdx.current === currentPhrase.length) {
          isPaused.current = true;
          timeout = setTimeout(() => {
            isPaused.current = false;
            isDeleting.current = true;
            tick();
          }, 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        charIdx.current--;
        setText(currentPhrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          isDeleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % PHRASES.length;
          isPaused.current = true;
          timeout = setTimeout(() => {
            isPaused.current = false;
            tick();
          }, 500);
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    };

    charIdx.current = PHRASES[0].length;
    isPaused.current = true;
    timeout = setTimeout(() => {
      isPaused.current = false;
      isDeleting.current = true;
      tick();
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return text;
}

/* ── Animated counter ── */
function AnimatedStat({ value, suffix = '', label, light }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const count = useCountUp(parseInt(value) || 0, isVisible, { duration: 2000 });
  return (
    <div ref={ref} className="text-center">
      <div className={`text-2xl sm:text-3xl md:text-4xl font-black ${light ? 'text-white' : 'text-slate-900'}`}>
        {count}{suffix}
      </div>
      <div className={`text-xs sm:text-sm mt-1 ${light ? 'text-white/70' : 'text-slate-500'}`}>{label}</div>
    </div>
  );
}

/* ── Bento Card — Stat Accent ── */
function BentoStatCard({ value, suffix, label, gradient, index }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const count = useCountUp(parseInt(value) || 0, isVisible, { duration: 2200 });
  return (
    <div
      ref={ref}
      className={`${gradient} rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center text-white transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="text-5xl md:text-6xl font-black mb-2 tracking-tight">{count}{suffix}</div>
      <div className="text-sm md:text-base font-medium text-white/80">{label}</div>
    </div>
  );
}

/* ── Bento Card — Feature ── */
function BentoFeatureCard({ icon: Icon, title, desc, iconBg, index }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl p-8 md:p-10 shadow-soft border border-slate-100 hover:shadow-md transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={26} className="text-white" />
      </div>
      <h3 className="font-black text-slate-900 text-lg md:text-xl mb-2">{title}</h3>
      <p className="text-sm md:text-base text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── Dual Benefit Card ── */
function BenefitCard({ icon: Icon, title, desc, index }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`flex gap-4 items-start transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <h4 className="font-bold text-white text-base mb-1">{title}</h4>
        <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function CommunityLandingPage() {
  const navigate = useNavigate();
  const typedText = useTypingLoop();

  const communities = ['כפר שמריהו (85 משפחות)', 'מושב בן עמי (92 משפחות)', 'קיבוץ יגור (110 משפחות)', 'מושב שורש (64 משפחות)', 'קיבוץ גבעת ברנר (78 משפחות)', 'מושב בית חנן (55 משפחות)', 'קיבוץ נען (70 משפחות)', 'מושב אביחיל (48 משפחות)'];

  const steps = [
    { num: '01', title: 'נכנסים דרך הקישור', desc: 'קיבלתם קישור מהקהילה? נרשמים ב-30 שניות וזהו', icon: Globe },
    { num: '02', title: 'בוחרים מוצרים במחירי יבואן', desc: 'אלפי מוצרים. ככל שיותר שכנים קונים — המחיר יורד', icon: ShoppingBag },
    { num: '03', title: 'חוסכים ומרוויחים', desc: 'המוצרים מגיעים עד הבית. 5% חוזרים לקרן הקהילתית', icon: Heart },
  ];

  const residentBenefits = [
    { icon: TrendingDown, title: 'חיסכון של עד 40%', desc: 'על מוצרים שאתם כבר קונים — במחיר שחנויות משלמות ליבואנים' },
    { icon: ShoppingBag, title: 'אלפי מוצרים, משלוח עד הבית', desc: 'אלקטרוניקה, מוצרי בית, קוסמטיקה, מזון — הכל במקום אחד' },
    { icon: Shield, title: 'אחריות מלאה, בלי הפתעות', desc: 'אחריות יבואן רשמי, משלוח ישיר, הכל שקוף ובטוח' },
  ];

  const communityBenefits = [
    { icon: Coins, title: '5% מכל רכישה לקרן', desc: 'כל קנייה שלכם מזרימה 5% לקהילה — אוטומטית' },
    { icon: PieChart, title: 'שקיפות מלאה', desc: 'רואים בדיוק כמה נצבר ולאן הכסף הולך' },
    { icon: Heart, title: 'גן משחקים, חוגים, אירועים', desc: 'הקרן ממנה את מה שחשוב לכם — ואתם מחליטים' },
  ];

  const fundCategories = [
    { name: 'תשתיות ושיפוצים', amount: '₪14,000', pct: 100, color: 'bg-indigo-500' },
    { name: 'חינוך וחוגים', amount: '₪10,000', pct: 71, color: 'bg-purple-500' },
    { name: 'אירועים ותרבות', amount: '₪8,400', pct: 60, color: 'bg-emerald-500' },
    { name: 'בריאות וספורט', amount: '₪6,000', pct: 43, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden font-liebling" dir="rtl">
      {/* ── Navbar ── */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Logo variant="wordmark" height={28} className="cursor-pointer" onClick={() => window.location.href = 'https://union-os.vercel.app/'} />
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-600 font-medium hidden sm:block">✦ חינם לחלוטין</span>
            <button
              onClick={() => window.location.href = 'https://union-os.vercel.app/'}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-glow"
            >
              הצטרפו עכשיו — חינם
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium mb-6 animate-fade-in border border-orange-100">
              <Users size={16} />
              כבר 8+ קהילות ו-500 משפחות חוסכות ביחד
            </div>

            {/* Typing Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 leading-[1.1]">
              <span className="inline-block min-h-[1.2em]">{typedText}</span>
              <span className="inline-block w-0.5 h-8 sm:h-10 md:h-14 bg-indigo-600 mr-1 animate-pulse" />
              <br />
              <span className="highlight-mark bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                לקהילה ולתושבים
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              מוצרים במחירי יבואן. 5% מכל רכישה חוזרים לקהילה. בלי עלות, בלי התחייבות.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={() => window.location.href = 'https://union-os.vercel.app/'}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-glow hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                הצטרפו — זה חינם
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-600 px-8 py-4 rounded-2xl font-medium text-lg hover:bg-slate-50 transition border border-slate-200 w-full sm:w-auto"
              >
                איך זה עובד?
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-12">
              <AnimatedStat value="40" suffix="%" label="חיסכון ממוצע" />
              <div className="w-px h-10 sm:h-14 bg-slate-200" />
              <AnimatedStat value="5" suffix="%" label="לקרן הקהילה" />
              <div className="w-px h-10 sm:h-14 bg-slate-200" />
              <AnimatedStat value="80" suffix="+" label="משפחות בקהילה" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Names Marquee ── */}
      <section className="py-8 md:py-10 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
        <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 md:mb-6">
          הצטרפו ל-500+ משפחות שכבר חוסכות
        </p>
        <div className="flex gap-4 md:gap-8 animate-[ticker-scroll_25s_linear_infinite]">
          {[...communities, ...communities, ...communities].map((name, i) => (
            <div key={i} className="min-w-[160px] md:min-w-[200px] h-10 md:h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs md:text-sm flex-shrink-0 px-3">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── Dual Value — Side by Side ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
            מה יוצא לכם מזה?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            אתם חוסכים על מוצרים, והקהילה שלכם מרוויחה מכל רכישה
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resident Benefits */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-white/90 rounded-full text-xs font-medium mb-5">
                <Heart size={14} />
                לתושבים
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
                לקנות חכם,
                <br />
                לחסוך באמת
              </h3>
              <div className="space-y-5">
                {residentBenefits.map((b, i) => (
                  <BenefitCard key={i} {...b} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Community Benefits */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-white/90 rounded-full text-xs font-medium mb-5">
                <Building size={14} />
                בונוס לקהילה
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
                וגם — הקהילה שלך
                <br />
                מרוויחה מכל רכישה
              </h3>
              <div className="space-y-5">
                {communityBenefits.map((b, i) => (
                  <BenefitCard key={i} {...b} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Features Grid ── */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
              למה כולם מצטרפים?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              הקהילה שלכם כבר שם — הנה למה
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BentoStatCard
              value="40"
              suffix="%"
              label="חיסכון על מוצרים שאתם כבר קונים"
              gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
              index={0}
            />
            <BentoFeatureCard
              icon={Users}
              title="ככל שיותר שכנים קונים — המחיר יורד"
              desc="קנייה קבוצתית אמיתית. אתם לא לבד — כוח הקנייה של כל הקהילה עובד בשבילכם."
              iconBg="bg-gradient-to-br from-indigo-500 to-indigo-600"
              index={1}
            />
            <BentoFeatureCard
              icon={Coins}
              title="5% מכל רכישה חוזרים לקהילה"
              desc="אוטומטית, בלי בירוקרטיה. כל קנייה שלכם בונה את הקהילה."
              iconBg="bg-gradient-to-br from-orange-500 to-orange-600"
              index={2}
            />
            <BentoStatCard
              value="38"
              suffix="K₪"
              label="זה מה ש-80 משפחות מייצרות בשנה לקהילה"
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ── How It Works — Timeline ── */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
              איך זה עובד?
            </h2>
            <p className="text-slate-500">3 צעדים פשוטים להתחיל לחסוך</p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-10 right-[16.5%] left-[16.5%] h-0.5 bg-gradient-to-l from-indigo-300 via-purple-300 to-indigo-300 rounded-full" />
            <div className="grid grid-cols-3 gap-6 relative">
              {steps.map((step, i) => {
                const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    ref={ref}
                    className={`text-center transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 bg-white rounded-2xl border-2 border-indigo-200 shadow-soft flex items-center justify-center mx-auto relative z-10">
                        <Icon size={28} className="text-indigo-600" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-black z-20">
                        {step.num.replace('0', '')}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet — Vertical */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`flex gap-4 items-start transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 bg-white rounded-2xl border-2 border-indigo-200 shadow-soft flex items-center justify-center">
                      <Icon size={22} className="text-indigo-600" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-[10px] font-black">
                      {step.num.replace('0', '')}
                    </span>
                    {i < 2 && (
                      <div className="absolute top-14 right-1/2 translate-x-1/2 w-0.5 h-6 bg-indigo-200" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Community Fund Calculator ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center">
              כמה תחסכו?
            </h2>
            <p className="text-emerald-200 text-center mb-2 text-lg font-bold">
              חיסכון ממוצע למשפחה: ₪3,600 בשנה
            </p>
            <p className="text-indigo-200 text-center mb-10 max-w-lg mx-auto">
              ובנוסף — ₪38,400 חוזרים לקהילה שלכם בשנה
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-sm text-indigo-200 mb-2">משפחות בקהילה</div>
                <AnimatedStat value="80" label="" light />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-sm text-indigo-200 mb-2">ממוצע רכישה חודשי</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white">₪800</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 ring-2 ring-emerald-400/30">
                <div className="text-sm text-emerald-200 mb-2">לקרן הקהילתית בשנה</div>
                <AnimatedStat value="38400" suffix="" label="" light />
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-300 -mt-1">₪</div>
                <div className="mt-1 text-xs bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full inline-block">5% מכל רכישה</div>
              </div>
            </div>

            {/* Calculation formula */}
            <div className="text-center mt-6 text-sm text-indigo-300">
              80 משפחות × ₪800 × 12 חודשים × 5% = <strong className="text-white">₪38,400 בשנה</strong>
            </div>

            {/* Progress bar */}
            <div className="max-w-lg mx-auto mt-8">
              <div className="flex justify-between mb-1.5 text-xs text-indigo-300">
                <span>64 מתוך 80 משפחות כבר הצטרפו — אל תישארו בחוץ!</span>
                <span>64/80</span>
              </div>
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-[80%]" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* ── Community Fund Usage ── */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-4">
                <Coins size={14} />
                קרן קהילתית
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                הכסף שלכם
                <br />
                <span className="highlight-mark bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  חוזר אליכם
                </span>
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                תארו לעצמכם — גן משחקים חדש, חוגים לילדים, אירועי קהילה — ממומן מקניות שגם ככה עשיתם.
              </p>
              <div className="space-y-3">
                {[
                  'תשתיות — גינות, מגרשים, שיפוצים',
                  'חינוך — חוגים וסדנאות לילדים',
                  'אירועים — חגים, שבתות, פסטיבלים',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — Fund allocation card */}
            <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-6 md:p-8">
              <div className="text-sm font-bold text-slate-400 mb-5">חלוקת קרן — 2025</div>
              {fundCategories.map((g, i) => {
                const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
                return (
                  <div key={i} ref={ref} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-slate-700">{g.name}</span>
                      <span className="text-xs text-slate-400">{g.amount}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${g.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: isVisible ? `${g.pct}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">סה״כ קרן שנתית: ₪38,400</span>
                <span className="text-xs font-bold text-indigo-600">שקיפות מלאה</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Savings Example ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-center">
              מכונת כביסה Samsung — דוגמה אמיתית
            </h2>
            <p className="text-indigo-200 text-center mb-10 max-w-lg mx-auto">
              ככל שיותר שכנים מצטרפים — המחיר יורד לכולם
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <div className="text-sm text-indigo-200 mb-2">מחיר בחנויות</div>
                <div className="text-3xl font-black line-through decoration-red-400/60">₪4,999</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 ring-2 ring-indigo-400/30">
                <div className="text-sm text-indigo-200 mb-2">מחיר UNION</div>
                <div className="text-3xl font-black text-emerald-300">₪3,199</div>
                <div className="mt-1 text-xs bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full inline-block">עם 60+ קונים</div>
              </div>
              <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-400/30">
                <div className="text-sm text-emerald-200 mb-2">חוסכים</div>
                <div className="text-3xl font-black text-emerald-300">₪1,800</div>
                <div className="mt-1 text-xs text-emerald-200">36% הנחה</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="max-w-lg mx-auto mt-8">
              <div className="flex justify-between mb-1.5 text-xs text-indigo-300">
                <span>עוד 12 קונים — והמחיר יורד שוב!</span>
                <span>48/60</span>
              </div>
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-[80%]" />
              </div>
              <button
                onClick={() => window.location.href = 'https://union-os.vercel.app/join/MOSHAV-DEMO/welcome'}
                className="mt-4 text-sm text-indigo-300 hover:text-white transition font-medium"
              >
                הצטרפו והמחיר ירד ←
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-2">
            מצטרפים ל-500+ משפחות מרוצות
          </h2>
          <p className="text-slate-500 text-center mb-10">הנה מה שהם אומרים</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'רונית ש.', role: 'תושבת', company: 'קיבוץ יגור', text: 'קניתי מכונת כביסה ב-40% פחות. וחלק מהכסף חזר לקהילה.', rating: 5, accent: 'border-r-purple-500' },
              { name: 'יוסי מ.', role: 'מזכיר מושב', company: 'מושב בן עמי', text: 'תוך חודשיים הקרן צברה מספיק לשפץ את גן המשחקים.', rating: 5, accent: 'border-r-indigo-500' },
              { name: 'אבי ד.', role: 'יו"ר ועד', company: 'מושב שורש', text: 'הכל אוטומטי ושקוף. התושבים פשוט אוהבים את זה.', rating: 5, accent: 'border-r-emerald-500' },
            ].map((t, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`bg-white rounded-2xl p-6 border border-slate-100 border-r-4 ${t.accent} shadow-soft transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role} • {t.company}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">
          מוכנים להתחיל{' '}
          <span className="highlight-mark bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            לחסוך כקהילה
          </span>
          ?
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          הצטרפו עם הקהילה שלכם. חיסכון לתושבים, הכנסה לקהילה, ושקיפות מלאה.
        </p>
        <button
          onClick={() => window.location.href = 'https://union-os.vercel.app/'}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-glow hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 mx-auto"
        >
          הצטרפו עם הקהילה שלך
          <ArrowLeft size={20} />
        </button>
        <p className="text-sm text-slate-400 mt-4 flex items-center justify-center gap-2">
          <CheckCircle size={14} className="text-emerald-500" />
          ללא עלות • ללא התחייבות • הקמה ב-5 דקות
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="full" height={26} className="brightness-0 invert" />
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>תנאי שימוש</span>
              <span>פרטיות</span>
              <span>צור קשר</span>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 UNION Platform. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
