import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/shared/Logo';

export default function AccessibilityStatement() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <Link to="/"><Logo variant="wordmark" height={28} /></Link>
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-700 transition">חזרה לעמוד הראשי</Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">הצהרת נגישות</h1>
        <p className="text-sm text-slate-400 mb-10">עודכן לאחרונה: מרץ 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          {/* 1. מחויבות לנגישות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">1. מחויבות לנגישות</h2>
            <p>
              אנו ב-Union רואים חשיבות עליונה בהנגשת הפלטפורמה והשירותים שלנו לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות. אנו מחויבים לספק חוויית שימוש שוויונית, נגישה ומכובדת לכל משתמש/ת, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
            </p>
          </section>

          {/* 2. תקן הנגישות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">2. תקן הנגישות</h2>
            <p>
              אתר זה תוכנן ונבנה כך שיעמוד, ככל הניתן, בדרישות תקן הנגישות הישראלי (ת"י 5568) המבוסס על הנחיות WCAG 2.0/2.1 ברמת AA (Level AA) של ארגון W3C הבינלאומי. תקן זה מגדיר כיצד להנגיש תכני אינטרנט לאנשים עם מוגבלויות שונות.
            </p>
          </section>

          {/* 3. אמצעי הנגישות שננקטו */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">3. אמצעי הנגישות שננקטו</h2>
            <p className="mb-3">במסגרת מחויבותנו לנגישות, ננקטו האמצעים הבאים:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>מבנה סמנטי:</strong> האתר בנוי עם תגיות HTML סמנטיות ומבנה כותרות היררכי תקין, המאפשרים ניווט יעיל באמצעות טכנולוגיות מסייעות.</li>
              <li><strong>ניווט באמצעות מקלדת:</strong> כלל הפעולות באתר ניתנות לביצוע באמצעות מקלדת בלבד, ללא צורך בעכבר.</li>
              <li><strong>תאימות לקוראי מסך:</strong> האתר תואם לשימוש עם קוראי מסך נפוצים (כגון NVDA, JAWS, VoiceOver).</li>
              <li><strong>ניגודיות צבעים:</strong> הקפדנו על ניגודיות צבעים מספקת בין טקסט לרקע, בהתאם לדרישות התקן.</li>
              <li><strong>טקסט חלופי:</strong> תמונות באתר כוללות תיאור טקסטואלי חלופי (alt text) המאפשר הבנת התוכן ללא צפייה בתמונה.</li>
              <li><strong>התאמה למסכים:</strong> האתר מותאם לתצוגה בגדלי מסך שונים (רספונסיבי), כולל מכשירים ניידים וטאבלטים.</li>
              <li><strong>גודל טקסט:</strong> ניתן להגדיל את גודל הטקסט באתר באמצעות הגדרות הדפדפן ללא פגיעה בפונקציונליות.</li>
              <li><strong>טפסים נגישים:</strong> כל שדות הקלט באתר מלווים בתוויות (labels) ברורות ובהנחיות שימוש.</li>
            </ul>
          </section>

          {/* 4. תוסף הנגישות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">4. תוסף נגישות</h2>
            <p>
              באתר מוטמע תוסף הנגישות של חברת <strong>Enable</strong>, המספק כלים נוספים להתאמה אישית של חוויית הגלישה. התוסף זמין באמצעות כפתור הנגישות הצף המופיע בכל עמודי האתר, ומאפשר בין היתר: שינוי גודל טקסט, שינוי ניגודיות, השהיית אנימציות, הדגשת קישורים ועוד.
            </p>
          </section>

          {/* 5. רכז/ת נגישות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">5. רכז/ת נגישות</h2>
            <p className="mb-3">מינינו רכז/ת נגישות אשר אחראי/ת על יישום הנגישות בפלטפורמה ועל טיפול בפניות הציבור בנושא. פרטי הרכז/ת:</p>
            <ul className="space-y-1">
              <li><strong>ארגון:</strong> Union</li>
              <li><strong>דוא"ל:</strong> <a href="mailto:Unionil.support@gmail.com" className="text-indigo-600 underline">Unionil.support@gmail.com</a></li>
              <li><strong>טלפון:</strong> <a href="tel:0504777135" className="text-indigo-600 underline">050-4777135</a></li>
            </ul>
          </section>

          {/* 6. דיווח על בעיות נגישות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">6. דיווח על בעיות נגישות</h2>
            <p className="mb-3">
              אנו עושים מאמצים רבים להנגיש את האתר באופן מלא, אך ייתכן שחלק מהעמודים או התכנים טרם הונגשו באופן מושלם. אם נתקלתם בבעיית נגישות באתר, אנא פנו אלינו ונטפל בכך בהקדם.
            </p>
            <p className="mb-3">ניתן לדווח על בעיות נגישות באמצעות:</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>דוא"ל: <a href="mailto:Unionil.support@gmail.com" className="text-indigo-600 underline">Unionil.support@gmail.com</a></li>
              <li>טלפון: <a href="tel:0504777135" className="text-indigo-600 underline">050-4777135</a></li>
            </ul>
            <p>
              אנו מתחייבים לבחון כל פנייה ולהשיב תוך 5 ימי עסקים.
            </p>
          </section>

          {/* 7. תאריך עדכון */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">7. תאריך עדכון</h2>
            <p>
              הצהרת נגישות זו עודכנה לאחרונה בתאריך <strong>מרץ 2026</strong>. אנו מתעדכנים ובודקים את הנגישות באתר באופן שוטף ופועלים לשיפור מתמיד.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="full" height={24} className="brightness-0 invert opacity-60" />
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to="/terms" className="hover:text-slate-300 transition">תקנון</Link>
              <Link to="/accessibility" className="hover:text-slate-300 transition">הצהרת נגישות</Link>
              <a href="mailto:Unionil.support@gmail.com" className="hover:text-slate-300 transition">צור קשר</a>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-6 text-center text-sm text-slate-600">
            <p>&copy; 2026 UNION Platform. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
