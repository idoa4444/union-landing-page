import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useCountUp from '../../hooks/useCountUp';
import Logo from '../../components/shared/Logo';
import {
  ArrowLeft, TrendingDown, Users,
  CheckCircle, Globe, Heart, Target,
  ShoppingBag, Coins, Unlock,
  Package, Eye, Truck, Flower2, Wrench, ChevronDown,
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
          timeout = setTimeout(() => { isPaused.current = false; isDeleting.current = true; tick(); }, 2000);
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
          timeout = setTimeout(() => { isPaused.current = false; tick(); }, 500);
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    };
    charIdx.current = PHRASES[0].length;
    isPaused.current = true;
    timeout = setTimeout(() => { isPaused.current = false; isDeleting.current = true; tick(); }, 2000);
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
      <div className={`text-5xl sm:text-6xl md:text-6xl font-black tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        {count}{suffix}
      </div>
      <div className={`text-sm sm:text-sm mt-1.5 font-medium ${light ? 'text-white/60' : 'text-slate-400'}`}>{label}</div>
    </div>
  );
}

export default function CommunityLandingPage() {
  const typedText = useTypingLoop();

  const fundCategories = [
    { name: 'תשתיות ושיפוצים', amount: '₪14,000', pct: 100, color: 'bg-indigo-500' },
    { name: 'חינוך וחוגים', amount: '₪10,000', pct: 71, color: 'bg-purple-500' },
    { name: 'אירועים ותרבות', amount: '₪8,400', pct: 60, color: 'bg-emerald-500' },
    { name: 'בריאות וספורט', amount: '₪6,000', pct: 43, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden font-liebling" dir="rtl">

      {/* ══════════════════════════════════════════
          NAVBAR
          ══════════════════════════════════════════ */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <Logo variant="wordmark" height={28} className="cursor-pointer" onClick={() => window.location.href = 'https://app.union-il.com/'} />
          <button
            onClick={() => window.location.href = 'https://app.union-il.com/join/MOSHAV-DEMO/welcome'}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-[0.97] shadow-md shadow-indigo-500/20"
          >
            להצטרפות
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section className="bg-white pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-sm font-medium mb-8 animate-fade-in text-indigo-600">
            קנייה קבוצתית חכמה לקהילות
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-slate-900 mb-3 leading-[1.15] tracking-tight">
            <span className="inline-block min-h-[1.15em]">{typedText}</span>
            <span className="inline-block w-[2px] h-8 sm:h-10 md:h-12 bg-indigo-500 mr-1 animate-pulse rounded-full" />
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black mb-5">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              לקהילה ולתושבים
            </span>
          </p>

          <p className="text-base md:text-lg text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            UNION מאגדת קהילות לכוח קנייה משותף — ככל שיותר תושבים קונים ביחד, המחיר יורד לכולם. 5% מכל רכישה חוזרים ישירות לתקציב הקהילה שלכם. ללא עלות הצטרפות, ללא התחייבות.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => window.location.href = 'https://app.union-il.com/join/MOSHAV-DEMO/welcome'}
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-full font-bold text-base hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-[0.97] flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-indigo-500/25"
            >
              הצטרפו — זה חינם
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-400 px-7 py-3.5 rounded-full font-medium text-base hover:text-slate-700 transition w-full sm:w-auto"
            >
              איך זה עובד? ↓
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl md:max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {[
              { value: '40', suffix: '%', label: 'חיסכון ממוצע', color: 'text-indigo-600' },
              { value: '5', suffix: '%', label: 'חוזר לקהילה', color: 'text-purple-600' },
              { value: '0', suffix: '₪', label: 'עלות הצטרפות', color: 'text-emerald-600' },
            ].map((stat, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
              const count = useCountUp(parseInt(stat.value) || 0, isVisible, { duration: 2000 });
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`rounded-2xl p-5 sm:p-7 text-center border border-slate-100 bg-white transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-2 ${stat.color}`}>
                    {stat.suffix === '₪' ? `₪${count}` : `${count}${stat.suffix}`}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APP SHOWCASE — Real components from the app
          ══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">הצצה לאפליקציה</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              ככה זה נראה מבפנים
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">שני הפיצ׳רים שמשנים את הכל — מחירים שיורדים ותקציב קהילתי שגדל</p>
          </div>

          {/* ═══ FEATURE 1: Dynamic Pricing ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-24 md:mb-32">
            {/* Explanation — right side (RTL) */}
            {(() => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-4">
                    <TrendingDown size={12} />
                    מתוך דף המוצר באפליקציה
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                    ככל שיותר שכנים קונים —
                    <br />
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">המחיר יורד לכולם</span>
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    כל מוצר באפליקציה מציג מדרגות מחיר דינמיות. ככל שיותר תושבים מצטרפים לרכישה, כולם נהנים ממחיר נמוך יותר — בזמן אמת. לא צריך לחכות, לא צריך קופונים.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-full px-4 py-2 border border-slate-100">
                      <CheckCircle size={14} className="text-emerald-500" />
                      המחיר יורד אוטומטית
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-full px-4 py-2 border border-slate-100">
                      <CheckCircle size={14} className="text-emerald-500" />
                      שקוף לכל התושבים
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* App component — left side */}
            {(() => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
              return (
                <div ref={ref} className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <div className="bg-white rounded-3xl p-5 md:p-7 border border-slate-200 shadow-lg shadow-slate-200/50">
                    {/* Progress bar — from the app */}
                    <div className={`bg-white p-4 rounded-2xl border border-slate-100 mb-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900">התקדמות הקבוצה</h3>
                        <div className="flex items-center gap-1.5">
                          <Users size={13} className="text-indigo-600" />
                          <span className="text-xs font-bold text-indigo-600">34 הצטרפו</span>
                        </div>
                      </div>
                      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`absolute top-0 right-0 h-full bg-gradient-to-l from-indigo-600 via-purple-500 to-indigo-400 rounded-full transition-all duration-1500 ease-out ${isVisible ? 'w-[68%]' : 'w-0'}`} />
                      </div>
                      <p className="text-center text-xs font-medium text-slate-600 mt-2">
                        רק עוד <span className="text-indigo-600 font-extrabold">6 רוכשים</span> כדי לרדת למחיר של{' '}
                        <span className="text-indigo-600 font-extrabold">₪2,899</span>!
                      </p>
                    </div>

                    {/* Tier list */}
                    <div className="space-y-2">
                      <div className={`bg-white/70 p-3.5 rounded-2xl flex justify-between items-center border border-slate-100 transition-all duration-500 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                            <CheckCircle size={14} className="text-emerald-400" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-medium">10–19 רוכשים</span>
                            <p className="font-bold text-slate-400 text-sm">₪3,499</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-50 px-2 py-0.5 rounded-full">הושג</span>
                      </div>

                      <div className={`bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl flex justify-between items-center border-2 border-indigo-500 ring-4 ring-indigo-500/10 shadow-sm transition-all duration-500 delay-900 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                            <TrendingDown size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-indigo-600">המחיר שלך</span>
                              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">עכשיו</span>
                            </div>
                            <span className="text-xl font-black text-slate-900">₪3,199</span>
                            <p className="text-[10px] text-slate-500 font-medium">20–39 רוכשים</p>
                          </div>
                        </div>
                      </div>

                      <div className={`bg-white p-3.5 rounded-2xl flex justify-between items-center border border-dashed border-indigo-200 transition-all duration-500 delay-[1100ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center"><Target size={14} className="text-indigo-300" /></div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-medium">40–59 רוכשים</span>
                            <p className="font-bold text-slate-500 text-sm">₪2,899</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-400"><Unlock size={11} /><span className="text-[9px] font-bold">לפתיחה</span></div>
                      </div>

                      <div className={`bg-white p-3.5 rounded-2xl flex justify-between items-center border border-dashed border-indigo-200 transition-all duration-500 delay-[1300ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center"><Target size={14} className="text-indigo-300" /></div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-medium">60+ רוכשים</span>
                            <p className="font-bold text-slate-500 text-sm">₪2,599</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-400"><Unlock size={11} /><span className="text-[9px] font-bold">לפתיחה</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* ═══ FEATURE 2: Community Fund ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Explanation — first on mobile, left on desktop (RTL) */}
            {(() => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <div ref={ref} className={`lg:order-last transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold mb-4">
                    <Coins size={12} />
                    מתוך עמוד הקהילה באפליקציה
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                    5% מכל רכישה הופכים
                    <br />
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">לתקציב קהילתי אמיתי</span>
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    כל פעם שתושב קונה מוצר דרך האפליקציה, 5% מסכום הרכישה עוברים אוטומטית לתקציב הקהילה. התושבים מצביעים ביחד על מה להשתמש בכסף — גן משחקים, חוגים, אירועים. הכל שקוף, הכל דמוקרטי.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-full px-4 py-2 border border-slate-100">
                      <CheckCircle size={14} className="text-emerald-500" />
                      5% מכל רכישה
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-full px-4 py-2 border border-slate-100">
                      <CheckCircle size={14} className="text-emerald-500" />
                      הקהילה מצביעה
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-full px-4 py-2 border border-slate-100">
                      <CheckCircle size={14} className="text-emerald-500" />
                      שקיפות מלאה
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* App component — second on mobile, right on desktop (RTL) */}
            {(() => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
              return (
                <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <div className="space-y-4">
                    {/* Fund Card — purple gradient like in the app */}
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-500 rounded-2xl p-5 relative overflow-hidden shadow-lg shadow-purple-500/10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                            <Heart size={16} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-black text-sm">תקציב הקהילה</h3>
                            <p className="text-white/60 text-[10px]">5% מכל רכישה נכנסים לכאן</p>
                          </div>
                        </div>
                        <div className="text-white text-3xl font-black mb-1">₪12,340</div>
                        <p className="text-white/50 text-xs mb-3">נצבר אוטומטית מרכישות התושבים</p>
                        <div className="flex items-center gap-1.5 mb-3">
                          <Target size={11} className="text-white/60" />
                          <span className="text-white/70 text-xs">היעד: מגרש משחקים חדש — ₪50,000</span>
                        </div>
                        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                          <div className={`h-full bg-white rounded-full transition-all duration-1500 ease-out ${isVisible ? 'w-[25%]' : 'w-0'}`} />
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-white/40 text-[10px]">25% מהיעד</span>
                          <span className="text-white/40 text-[10px]">חסרים עוד ₪37,660</span>
                        </div>
                      </div>
                    </div>

                    {/* Goal voting */}
                    <div className={`bg-white rounded-2xl p-5 border border-slate-200 shadow-lg shadow-slate-200/50 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                      <p className="text-xs font-bold text-purple-600 tracking-wide uppercase mb-3">התושבים מצביעים ליעד הבא</p>
                      <div className="space-y-2">
                        {[
                          { icon: Flower2, label: 'גינה קהילתית', votes: 24, amount: 8200, target: 25000, color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
                          { icon: Wrench, label: 'שיפוץ מועדון', votes: 18, amount: 5400, target: 35000, color: 'bg-amber-50', iconColor: 'text-amber-500' },
                          { icon: Users, label: 'אירוע שכונתי', votes: 12, amount: 3100, target: 15000, color: 'bg-purple-50', iconColor: 'text-purple-500' },
                        ].map((goal, idx) => {
                          const pct = Math.round((goal.amount / goal.target) * 100);
                          return (
                            <div key={idx} className={`w-full bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${600 + idx * 150}ms` }}>
                              <div className={`w-9 h-9 rounded-xl ${goal.color} flex items-center justify-center flex-shrink-0`}>
                                <goal.icon size={18} className={goal.iconColor} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 mb-1">{goal.label}</div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">₪{goal.amount.toLocaleString()} / ₪{goal.target.toLocaleString()}</div>
                              </div>
                              <div className="text-left flex-shrink-0">
                                <div className="text-sm font-black text-purple-600">{goal.votes}</div>
                                <div className="text-[10px] text-slate-400">הצבעות</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT CATEGORIES
          ══════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">קטלוג מוצרים</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">מה אפשר לקנות?</h2>
            <p className="text-slate-400 mt-3">אלפי מוצרים ממותגים מיבואנים ישירים — הכל במקום אחד</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                name: 'אלקטרוניקה', desc: 'טלוויזיות, מחשבים, סמארטפונים',
                gradient: 'from-indigo-600 to-purple-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-12 h-8 rounded-lg border-2 border-white transition-all duration-1000 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
                    <div className={`w-5 h-5 rounded-full border-2 border-white -mt-2 mr-4 transition-all duration-1000 delay-300 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
                  </div>
                ),
              },
              {
                name: 'מוצרי בית', desc: 'מכשירי חשמל, ריהוט, כלי מטבח',
                gradient: 'from-purple-600 to-indigo-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-10 h-10 rounded-xl border-2 border-white transition-all duration-1000 ${vis ? 'rotate-0 opacity-100' : '-rotate-12 opacity-0'}`} />
                    <div className={`w-6 h-1.5 rounded-full bg-white -mt-6 mr-2 transition-all duration-1000 delay-200 ${vis ? 'opacity-100 w-6' : 'opacity-0 w-0'}`} />
                  </div>
                ),
              },
              {
                name: 'קוסמטיקה וטיפוח', desc: 'מותגים מובילים במחירי יבואן',
                gradient: 'from-pink-600 to-purple-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-4 h-10 rounded-full border-2 border-white transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} />
                    <div className={`w-3 h-3 rounded-full bg-white -mt-1 mr-0.5 transition-all duration-1000 delay-400 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                  </div>
                ),
              },
              {
                name: 'מזון ומשקאות', desc: 'מוצרי פרימיום, בריאות, אורגני',
                gradient: 'from-emerald-600 to-teal-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-8 h-8 rounded-full border-2 border-white transition-all duration-1000 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                    <div className={`w-2 h-5 rounded-full bg-white -mt-9 mr-3 transition-all duration-700 delay-300 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} />
                  </div>
                ),
              },
              {
                name: 'ילדים ותינוקות', desc: 'עגלות, צעצועים, ביגוד',
                gradient: 'from-violet-600 to-purple-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-6 h-6 rounded-lg border-2 border-white rotate-45 transition-all duration-1000 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                    <div className={`w-4 h-4 rounded-full border-2 border-white -mt-3 mr-5 transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                ),
              },
              {
                name: 'גינה ועונתי', desc: 'כלי גינה, ריהוט חוץ, עונתי',
                gradient: 'from-teal-600 to-emerald-700',
                graphic: (vis) => (
                  <div className="absolute top-3 left-3 opacity-20">
                    <div className={`w-1.5 h-8 rounded-full bg-white transition-all duration-1000 ${vis ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} style={{ transformOrigin: 'bottom' }} />
                    <div className={`w-5 h-5 rounded-full border-2 border-white -mt-6 -mr-2 transition-all duration-700 delay-300 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                    <div className={`w-3 h-3 rounded-full border-2 border-white -mt-2 mr-2 transition-all duration-700 delay-500 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                  </div>
                ),
              },
            ].map((cat, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`relative bg-gradient-to-br ${cat.gradient} rounded-2xl p-5 sm:p-6 overflow-hidden cursor-default transition-all duration-500 ${
                    isVisible ? `opacity-100 translate-y-0 animate-float-${i + 1}` : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {cat.graphic(isVisible)}
                  <div className="relative z-10">
                    <h3 className="font-black text-white text-sm sm:text-base mb-1">{cat.name}</h3>
                    <p className="text-xs sm:text-sm text-white/60">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST STRIP
          ══════════════════════════════════════════ */}
      <section className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {[
              { icon: CheckCircle, text: 'מאובטח ומוצפן' },
              { icon: Globe, text: 'מחירי יבואן ישיר' },
              { icon: Coins, text: '5% לקרן הקהילה' },
              { icon: Unlock, text: 'ללא עלות הצטרפות' },
              { icon: Truck, text: 'משלוח עד הבית' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-600">
                <item.icon size={14} className="text-indigo-600 shrink-0" />
                <span className="text-xs font-bold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUE PROPOSITION — Large feature blocks
          ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">למה UNION?</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            חיסכון אמיתי לכם,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">הכנסה אמיתית לקהילה</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card 1 — For residents */}
          <div className="group relative rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-xs font-bold text-indigo-300 tracking-widest uppercase mb-6">לתושבים</div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                קונים חכם,<br />חוסכים באמת
              </h3>

              <div className="space-y-6">
                {[
                  { icon: TrendingDown, title: 'חיסכון של עד 40%', desc: 'מחירי יבואן על מוצרים שאתם כבר קונים' },
                  { icon: Package, title: 'אלפי מוצרים', desc: 'אלקטרוניקה, בית, קוסמטיקה, מזון — הכל במקום אחד' },
                  { icon: Truck, title: 'משלוח עד הבית', desc: 'אחריות יבואן רשמי, שקוף ובטוח' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-indigo-300" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — For community */}
          <div className="group relative rounded-[2rem] p-8 md:p-10 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-xs font-bold text-emerald-100 tracking-widest uppercase mb-6">בונוס → לקהילה</div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                כל רכישה בונה<br />את הקהילה שלכם
              </h3>

              <div className="space-y-6">
                {[
                  { icon: Coins, title: '5% מכל רכישה', desc: 'מופרשים אוטומטית לקרן הקהילתית' },
                  { icon: Eye, title: 'שקיפות מלאה', desc: 'רואים בדיוק כמה נצבר ולאן הכסף הולך' },
                  { icon: Heart, title: 'אתם מחליטים', desc: 'גן משחקים, חוגים, אירועים — הקהילה בוחרת' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-sm text-white/70">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — Premium numbered cards
          ══════════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">פשוט, מהיר, אמיתי</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900">
              3 צעדים להתחיל
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {[
              { num: '01', title: 'נכנסים דרך הקישור', desc: 'קיבלתם קישור מהקהילה? נרשמים ב-30 שניות וזהו.', icon: Globe, gradient: 'from-indigo-500 to-purple-600' },
              { num: '02', title: 'בוחרים מוצרים', desc: 'אלפי מוצרים במחירי יבואן. ככל שיותר שכנים קונים — המחיר יורד.', icon: ShoppingBag, gradient: 'from-purple-500 to-pink-500' },
              { num: '03', title: 'חוסכים ומרוויחים', desc: 'המוצרים מגיעים עד הבית. 5% חוזרים לקרן הקהילתית.', icon: Heart, gradient: 'from-emerald-500 to-teal-500' },
            ].map((step, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group relative bg-white rounded-3xl p-8 md:p-10 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full">
                    {/* Large number watermark */}
                    <div className={`absolute top-4 left-4 text-8xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-[0.07] leading-none select-none`}>
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>

                    <h3 className="font-black text-slate-900 text-2xl mb-3">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-4">
            {[
              { num: '01', title: 'נכנסים דרך הקישור', desc: 'קיבלתם קישור מהקהילה? נרשמים ב-30 שניות וזהו.', icon: Globe, gradient: 'from-indigo-500 to-purple-600' },
              { num: '02', title: 'בוחרים מוצרים', desc: 'אלפי מוצרים במחירי יבואן. ככל שיותר שכנים קונים — המחיר יורד.', icon: ShoppingBag, gradient: 'from-purple-500 to-pink-500' },
              { num: '03', title: 'חוסכים ומרוויחים', desc: 'המוצרים מגיעים עד הבית. 5% חוזרים לקרן הקהילתית.', icon: Heart, gradient: 'from-emerald-500 to-teal-500' },
            ].map((step, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative bg-white rounded-2xl p-6 border border-slate-100 overflow-hidden">
                    {/* Large number watermark */}
                    <div className={`absolute top-2 left-2 text-7xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-[0.06] leading-none select-none`}>
                      {step.num}
                    </div>

                    <div className="flex gap-4 items-start relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-xl mb-1">{step.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SAVINGS SHOWCASE — Dark immersive section
          ══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-dark" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-indigo-300 font-bold text-sm mb-3 tracking-wide">דוגמה אמיתית</p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              מכונת כביסה Samsung
            </h2>
            <p className="text-slate-400 mt-3 text-lg">ככל שיותר שכנים מצטרפים — המחיר יורד</p>
          </div>

          {/* Price comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-7 text-center border border-white/10">
              <div className="text-sm text-slate-400 mb-3 font-medium">מחיר בחנויות</div>
              <div className="text-4xl font-black text-white/50 line-through decoration-red-400/50 decoration-2">₪4,999</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-7 text-center border border-indigo-400/30 ring-1 ring-indigo-400/20 shadow-lg shadow-indigo-500/10">
              <div className="text-sm text-indigo-300 mb-3 font-medium">מחיר UNION</div>
              <div className="text-4xl font-black text-white">₪3,199</div>
              <div className="mt-2 text-xs text-indigo-300 font-bold bg-indigo-500/20 px-3 py-1 rounded-full inline-block">עם קנייה קבוצתית</div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur-md rounded-2xl p-7 text-center border border-emerald-400/20">
              <div className="text-sm text-emerald-300 mb-3 font-medium">חיסכון</div>
              <div className="text-4xl font-black text-emerald-400">₪1,800</div>
              <div className="mt-2 text-xs text-emerald-300 font-bold">36% פחות</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.href = 'https://app.union-il.com/join/MOSHAV-DEMO/welcome'}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-[0.97] shadow-lg shadow-indigo-500/30"
            >
              רוצים לראות עוד מחירים? הצטרפו →
            </button>
            <p className="text-xs text-slate-500 mt-4">* המחירים משתנים בהתאם להיקף הרכישה הקבוצתית</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FUND CALCULATOR — Clean visual
          ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <p className="text-emerald-600 font-bold text-sm mb-3 tracking-wide">הקרן הקהילתית</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              הכסף שלכם
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">חוזר אליכם</span>
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              תארו לעצמכם — גן משחקים חדש, חוגים לילדים, אירועי קהילה. הכל ממומן מקניות שגם ככה עשיתם.
            </p>
            <div className="space-y-3">
              {['תשתיות — גינות, מגרשים, שיפוצים', 'חינוך — חוגים וסדנאות', 'אירועים — חגים ופסטיבלים'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} className="text-emerald-600" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side — Fund allocation */}
          <div className="gradient-border rounded-3xl">
            <div className="bg-white rounded-3xl p-7 md:p-9">
              <div className="flex items-center justify-between mb-7">
                <div className="text-sm font-bold text-slate-400">חלוקת קרן לדוגמה</div>
                <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">שנתי</div>
              </div>
              {fundCategories.map((g, i) => {
                const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
                return (
                  <div key={i} ref={ref} className="mb-5 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700">{g.name}</span>
                      <span className="text-sm font-black text-slate-900">{g.amount}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${g.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: isVisible ? `${g.pct}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-400">סה״כ לדוגמה</span>
                <span className="text-lg font-black text-slate-900">₪38,400</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">* הסכומים משתנים בהתאם לגודל הקהילה והיקף הרכישות</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — Clean, premium
          ══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 dot-grid opacity-20" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">חוויות אמיתיות</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900">
              מה אומרים התושבים
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'רונית ש.', role: 'תושבת', company: 'קיבוץ יגור', text: 'קניתי מכונת כביסה ב-40% פחות. וחלק מהכסף חזר לקהילה.', gradient: 'from-purple-500 to-pink-500' },
              { name: 'יוסי מ.', role: 'מזכיר מושב', company: 'מושב בן עמי', text: 'תוך חודשיים הקרן צברה מספיק לשפץ את גן המשחקים.', gradient: 'from-indigo-500 to-purple-500' },
              { name: 'אבי ד.', role: 'יו"ר ועד', company: 'מושב שורש', text: 'הכל אוטומטי ושקוף. התושבים פשוט אוהבים את זה.', gradient: 'from-emerald-500 to-teal-500' },
            ].map((t, i) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
                    {/* Quote */}
                    <div className={`text-3xl font-black bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent mb-4 leading-none`}>"</div>
                    <p className="text-slate-600 text-base mb-6 leading-relaxed flex-grow">{t.text}</p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{t.name}</div>
                        <div className="text-xs text-slate-400">{t.role} · {t.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ — Accordion
          ══════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-bold text-sm mb-3 tracking-wide">יש שאלות?</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">שאלות נפוצות</h2>
          </div>

          <div className="border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden">
            {[
              { q: 'כמה עולה להצטרף?', a: 'חינם לחלוטין. אין דמי הצטרפות, אין מנוי חודשי, אין עמלות נסתרות. אתם משלמים רק על מוצרים שאתם בוחרים לקנות — במחיר יבואן.' },
              { q: 'איך מצטרפים?', a: 'מקבלים קישור מהקהילה שלכם, נרשמים ב-30 שניות עם מספר טלפון, ומיד רואים את החנות עם כל המוצרים והמחירים.' },
              { q: 'מי היבואנים?', a: 'אנחנו עובדים עם יבואנים רשמיים ומורשים בלבד. כל המוצרים מגיעים עם אחריות יבואן רשמי מלאה, בדיוק כמו בחנויות — רק בזול.' },
              { q: 'מה קורה עם האחריות?', a: 'כל מוצר מגיע עם אחריות יבואן רשמי מלאה. שירות, החלפות, תיקונים — הכל כמו שאתם מכירים, בלי פשרות.' },
              { q: 'איך עובדת הקרן הקהילתית?', a: '5% מכל רכישה של תושב עוברים אוטומטית לתקציב הקהילה. התושבים מצביעים ביחד על מה להשתמש בכסף — תשתיות, חינוך, אירועים. הכל שקוף בדשבורד.' },
              { q: 'אפשר לבטל?', a: 'כן, בכל רגע. אין התחייבות, אין תקופת מינימום. פשוט מפסיקים להשתמש.' },
            ].map((item, i) => {
              const [open, setOpen] = useState(false);
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-6 py-5 text-right hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-base">{item.q}</span>
                    <ChevronDown size={18} className={`text-slate-400 flex-shrink-0 mr-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
                    <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA — Full-width dark section
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-dark" />

        {/* Floating orbs */}
        <div className="absolute top-10 right-[20%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-orb" />
        <div className="absolute bottom-10 left-[20%] w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-orb-slow" />

        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            מוכנים להתחיל
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">לחסוך כקהילה?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">
            חיסכון לכם, הכנסה לקהילה, שקיפות מלאה. בלי סיבה לחכות.
          </p>
          <button
            onClick={() => window.location.href = 'https://app.union-il.com/join/MOSHAV-DEMO/welcome'}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-[0.97] shadow-xl shadow-indigo-500/30 flex items-center gap-2 mx-auto"
          >
            הצטרפו עכשיו — חינם
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
            <span>ללא עלות</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>ללא התחייבות</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>מאובטח</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER — Minimal, clean
          ══════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="full" height={24} className="brightness-0 invert opacity-60" />
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer transition">תנאי שימוש</span>
              <span className="hover:text-slate-300 cursor-pointer transition">פרטיות</span>
              <span className="hover:text-slate-300 cursor-pointer transition">צור קשר</span>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-6 text-center text-sm text-slate-600">
            <p>© 2026 UNION Platform. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
