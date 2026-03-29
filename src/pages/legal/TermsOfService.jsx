import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/shared/Logo';

export default function TermsOfService() {
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
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">תקנון ותנאי שימוש</h1>
        <p className="text-sm text-slate-400 mb-10">עודכן לאחרונה: מרץ 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          {/* 1. הגדרות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">1. הגדרות</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>"הפלטפורמה"</strong> או <strong>"UNION"</strong> — אתר האינטרנט והאפליקציה המופעלים על ידי חברת Union, הזמינים בכתובת union-il.com ובאפליקציה הנלווית.</li>
              <li><strong>"המשתמש/ת"</strong> — כל אדם הנרשם לפלטפורמה ו/או עושה בה שימוש, לרבות גלישה, רכישה או כל פעולה אחרת.</li>
              <li><strong>"השירות"</strong> — שירות הקנייה הקבוצתית המוצע באמצעות הפלטפורמה, לרבות כל השירותים הנלווים לו.</li>
              <li><strong>"קנייה קבוצתית"</strong> — מנגנון רכישה שבו מספר משתמשים רוכשים מוצר זהה במשותף, כאשר המחיר יורד ככל שמספר הרוכשים עולה.</li>
              <li><strong>"מדרגות מחיר"</strong> — טבלת מחירים דינמית המוצגת בעמוד המוצר, המשתנה בהתאם למספר המשתתפים ברכישה הקבוצתית.</li>
              <li><strong>"הקרן הקהילתית"</strong> — קרן המתוקצבת באופן אוטומטי מ-5% מכל רכישה באמצעות הפלטפורמה, המיועדת למימון פרויקטים ויוזמות קהילתיות.</li>
              <li><strong>"הקהילה"</strong> — ישוב, מושב, קיבוץ או שכונה אשר מופעל עבורם שירות UNION ייעודי.</li>
            </ul>
          </section>

          {/* 2. כללי */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">2. כללי</h2>
            <p className="mb-3">
              ברוכים הבאים לפלטפורמת UNION. הפלטפורמה מופעלת על ידי חברת Union (להלן: <strong>"החברה"</strong>), מדרך עוז 47.
            </p>
            <p className="mb-3">
              תקנון זה מהווה הסכם משפטי מחייב בין המשתמש/ת לבין החברה. השימוש בפלטפורמה, לרבות הרשמה, גלישה ו/או ביצוע רכישה, מהווה הסכמה מלאה ובלתי מסויגת לכל התנאים המפורטים בתקנון זה.
            </p>
            <p>
              החברה שומרת לעצמה את הזכות לעדכן את תנאי התקנון מעת לעת, לפי שיקול דעתה הבלעדי. המשך השימוש בפלטפורמה לאחר עדכון התקנון מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          {/* 3. תיאור השירות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">3. תיאור השירות</h2>
            <p className="mb-3">
              UNION מפעילה פלטפורמת קנייה קבוצתית חכמה המיועדת לקהילות — מושבים, קיבוצים ושכונות. הפלטפורמה מאפשרת לתושבי קהילה לרכוש מוצרים במשותף ולהנות ממחירי יבואן ישירים.
            </p>
            <p className="mb-3">
              <strong>מנגנון מדרגות מחיר דינמיות:</strong> כל מוצר בפלטפורמה מציג מדרגות מחיר המשתנות בהתאם למספר הרוכשים. ככל שיותר תושבים מצטרפים לרכישה קבוצתית, המחיר יורד לכלל המשתתפים. המחיר הסופי ייקבע בהתאם למספר הרוכשים בעת סגירת העסקה.
            </p>
            <p>
              <strong>הקרן הקהילתית:</strong> 5% מכל רכישה המבוצעת באמצעות הפלטפורמה מופרשים באופן אוטומטי לקרן הקהילתית של הישוב. התושבים רשאים להצביע על ייעוד הכספים — כגון שיפוץ מבנים, חוגים לילדים, אירועי קהילה ועוד. החברה מתחייבת לשקיפות מלאה בניהול הקרן.
            </p>
          </section>

          {/* 4. הרשמה וחשבון משתמש */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">4. הרשמה וחשבון משתמש</h2>
            <p className="mb-3">
              השימוש בפלטפורמה מותנה ברישום באמצעות קישור הזמנה מהקהילה. בעת ההרשמה, המשתמש/ת נדרש/ת למסור את הפרטים הבאים:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>שם מלא</li>
              <li>מספר טלפון נייד (ישראלי)</li>
              <li>סיסמה (6 תווים לפחות)</li>
            </ul>
            <p className="mb-3">
              המשתמש/ת מתחייב/ת למסור פרטים מדויקים, עדכניים ומלאים. מסירת פרטים כוזבים מהווה הפרה של תנאי השימוש ועלולה לגרום לחסימת החשבון.
            </p>
            <p className="mb-3">
              <strong>גיל מינימלי:</strong> השימוש בפלטפורמה מיועד לבני 18 ומעלה בלבד. בהרשמה לפלטפורמה, המשתמש/ת מצהיר/ה כי הינו/ה בן/בת 18 לפחות.
            </p>
            <p>
              המשתמש/ת אחראי/ת לשמירה על סודיות פרטי ההתחברות שלו/ה ולכל פעולה המבוצעת באמצעות חשבונו/ה.
            </p>
          </section>

          {/* 5. מחירים ותשלומים */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">5. מחירים ותשלומים</h2>
            <p className="mb-3">
              כל המחירים המוצגים בפלטפורמה נקובים בשקלים חדשים (₪) וכוללים מע"מ, אלא אם צוין אחרת במפורש.
            </p>
            <p className="mb-3">
              <strong>מחירים דינמיים:</strong> המחירים בפלטפורמה הם דינמיים ומשתנים בהתאם למספר המשתתפים ברכישה הקבוצתית. המחיר המוצג בעמוד המוצר הוא המחיר הנוכחי, והוא עשוי לרדת ככל שיצטרפו רוכשים נוספים. המחיר הסופי ייקבע בעת סגירת העסקה.
            </p>
            <p className="mb-3">
              <strong>תהליך ההזמנה:</strong> ביצוע הזמנות מתבצע באמצעות הפלטפורמה. אישור ההזמנה ותיאום התשלום מתבצעים באמצעות WhatsApp. פרטי ההזמנה, לרבות רשימת המוצרים, הכמויות והמחיר הכולל, יישלחו למשתמש/ת לאישור.
            </p>
            <p>
              <strong>הקרן הקהילתית:</strong> 5% מסכום כל רכישה מופרשים אוטומטית לקרן הקהילתית. סכום זה מוצג בבירור בעמוד סיכום ההזמנה לפני אישור הרכישה.
            </p>
          </section>

          {/* 6. ביטולים והחזרות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">6. מדיניות ביטולים והחזרות</h2>
            <p className="mb-3">
              בהתאם לחוק הגנת הצרכן, התשמ"א-1981 (סעיף 14ג — עסקת מכר מרחוק), למשתמש/ת עומדת הזכות לבטל עסקה בתוך <strong>14 ימים</strong> מיום קבלת המוצר או מיום קבלת מסמך הגילוי, לפי המאוחר מביניהם.
            </p>
            <p className="mb-3">
              <strong>זכות ביטול מורחבת:</strong> בהתאם לתיקון מס' 7 לחוק הגנת הצרכן, אנשים עם מוגבלות, אזרחים ותיקים (מעל גיל 65) ועולים חדשים (עד 5 שנים מיום העלייה) זכאים לתקופת ביטול מורחבת של <strong>4 חודשים</strong> מיום קבלת המוצר או מיום קבלת מסמך הגילוי, לפי המאוחר.
            </p>
            <p className="mb-3">
              <strong>דמי ביטול:</strong> החברה רשאית לגבות דמי ביטול בשיעור של עד 5% ממחיר המוצר או 100 ₪, לפי הנמוך מביניהם, בהתאם להוראות החוק.
            </p>
            <p className="mb-3">
              <strong>החרגות:</strong> לא ניתן לבטל עסקאות הנוגעות למוצרים פסידים (מזון, פרחים וכדומה), מוצרים שיוצרו במיוחד עבור המשתמש/ת, מוצרים שנפתחו ואינם ניתנים להחזרה מטעמי היגיינה, ותוכן דיגיטלי שנפתח או הורד.
            </p>
            <p>
              לביטול עסקה, יש לפנות אלינו בדוא"ל <a href="mailto:Unionil.support@gmail.com" className="text-indigo-600 underline">Unionil.support@gmail.com</a> או בטלפון <a href="tel:0504777135" className="text-indigo-600 underline">050-4777135</a>.
            </p>
          </section>

          {/* 7. משלוחים */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">7. משלוחים ואיסוף</h2>
            <p className="mb-3">
              המוצרים יסופקו למשתמש/ת בהתאם לאפשרויות האיסוף והמשלוח הזמינות בקהילה. זמני האספקה המשוערים יפורטו בעמוד המוצר ו/או בעת ביצוע ההזמנה.
            </p>
            <p className="mb-3">
              החברה תעשה כל מאמץ סביר לעמוד בלוחות הזמנים המצוינים, אך אינה אחראית לעיכובים הנובעים מנסיבות שאינן בשליטתה, לרבות עיכובי יבוא, מכס, כוח עליון או מגבלות לוגיסטיות.
            </p>
            <p>
              כל המוצרים מסופקים עם אחריות יבואן רשמי, בהתאם לתנאי היצרן.
            </p>
          </section>

          {/* 8. הגנת הפרטיות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">8. הגנת הפרטיות ומדיניות פרטיות</h2>
            <p className="mb-3">
              החברה מחויבת להגנה על פרטיות המשתמשים בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותקנותיו.
            </p>
            <p className="mb-3">
              <strong>מידע שנאסף:</strong> בעת ההרשמה והשימוש בפלטפורמה, אנו אוספים את המידע הבא: שם מלא, מספר טלפון, סיסמה מוצפנת, שיוך לקהילה, היסטוריית הזמנות, הצבעות בקרן הקהילתית ונתוני שימוש כלליים.
            </p>
            <p className="mb-3">
              <strong>שימוש במידע:</strong> המידע הנאסף משמש אך ורק לצורך מתן השירות, עיבוד הזמנות, ניהול הקרן הקהילתית, שיפור השירות ויצירת קשר עם המשתמשים. החברה לא תעביר מידע אישי לצדדים שלישיים, אלא אם נדרשה לכך על פי דין.
            </p>
            <p className="mb-3">
              <strong>אבטחת מידע:</strong> המידע מאוחסן בשרתים מאובטחים עם הצפנה בהעברה (SSL/TLS) ומנגנוני בקרת גישה ברמת שורה (Row Level Security). הסיסמאות מוצפנות באמצעות אלגוריתם bcrypt ואינן נשמרות בטקסט גלוי.
            </p>
            <p>
              <strong>זכויות המשתמש:</strong> המשתמש/ת רשאי/ת לבקש עיון, תיקון או מחיקה של המידע האישי שלו/ה בכל עת, באמצעות פנייה בדוא"ל ל-<a href="mailto:Unionil.support@gmail.com" className="text-indigo-600 underline">Unionil.support@gmail.com</a>.
            </p>
          </section>

          {/* 9. קניין רוחני */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">9. קניין רוחני</h2>
            <p>
              כלל התכנים המופיעים בפלטפורמה, לרבות עיצוב, טקסטים, גרפיקה, לוגו, סימני מסחר, קוד תוכנה ותכנים אחרים, הם קניינה הרוחני הבלעדי של חברת Union ו/או של צדדים שלישיים שהעניקו לה רישיון שימוש. אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי בתכנים אלה ללא אישור מראש ובכתב מהחברה.
            </p>
          </section>

          {/* 10. הגבלת אחריות */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">10. הגבלת אחריות</h2>
            <p className="mb-3">
              הפלטפורמה והשירותים ניתנים "כפי שהם" (AS IS). החברה אינה מתחייבת כי השירות יהיה רציף, ללא תקלות או מאובטח באופן מוחלט.
            </p>
            <p className="mb-3">
              החברה אינה אחראית לכל נזק ישיר, עקיף, מקרי או תוצאתי הנובע מהשימוש בפלטפורמה, לרבות אובדן נתונים, הפסד רווחים או פגיעה במוניטין, במידה המרבית המותרת על פי הדין החל.
            </p>
            <p>
              החברה אינה אחראית לתוכן, לאיכות או לזמינות של מוצרים של צדדים שלישיים המוצעים באמצעות הפלטפורמה, והאחריות למוצרים אלה חלה על היצרנים ו/או היבואנים הרלוונטיים.
            </p>
          </section>

          {/* 11. שינויים בתקנון */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">11. שינויים בתקנון</h2>
            <p>
              החברה שומרת לעצמה את הזכות לשנות, לעדכן או לתקן את תנאי תקנון זה בכל עת, לפי שיקול דעתה הבלעדי. שינויים מהותיים יפורסמו בפלטפורמה. המשך השימוש בפלטפורמה לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים. מומלץ לעיין בתקנון מעת לעת.
            </p>
          </section>

          {/* 12. דין חל וסמכות שיפוט */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">12. דין חל וסמכות שיפוט</h2>
            <p>
              על תקנון זה ועל כל הנובע ממנו יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל סכסוך הנוגע לתקנון זה או לשימוש בפלטפורמה תהיה נתונה לבתי המשפט המוסמכים במחוז תל אביב-יפו בלבד.
            </p>
          </section>

          {/* 13. יצירת קשר */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">13. יצירת קשר</h2>
            <p className="mb-3">לכל שאלה, בירור או פנייה בנוגע לתקנון זה או לשירותי הפלטפורמה, ניתן לפנות אלינו:</p>
            <ul className="space-y-1">
              <li><strong>חברה:</strong> Union</li>
              <li><strong>כתובת:</strong> מדרך עוז 47</li>
              <li><strong>דוא"ל:</strong> <a href="mailto:Unionil.support@gmail.com" className="text-indigo-600 underline">Unionil.support@gmail.com</a></li>
              <li><strong>טלפון:</strong> <a href="tel:0504777135" className="text-indigo-600 underline">050-4777135</a></li>
            </ul>
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
