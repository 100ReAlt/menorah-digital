import React from 'react';
import { Language, Translations } from '../types';
import { TRANSLATIONS } from '../constants';
import { Sparkles } from 'lucide-react';

interface InfoPanelProps {
  language: Language;
  insight: string | null;
  day: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ language, insight, day }) => {
  const t: Translations = TRANSLATIONS[language];
  const isHebrew = language === Language.HE;

  return (
    <div className={`mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto ${isHebrew ? 'rtl' : 'ltr'}`}>
      
      {/* Blessings Card */}
      <div className="bg-hanukkah-blue/80 backdrop-blur-sm p-6 rounded-2xl border border-hanukkah-gold/30 shadow-lg text-center">
        <h3 className="text-xl font-serif text-hanukkah-gold mb-4 border-b border-white/10 pb-2">{t.blessingTitle}</h3>
        <p className={`text-lg leading-relaxed ${isHebrew ? 'font-hebrew text-2xl' : 'font-serif'}`}>
          {t.blessingContent}
        </p>
        <p className="mt-4 text-sm text-gray-400 italic">
          (Note: Additional blessings are recited on the first night)
        </p>
      </div>

      {/* Insight Card */}
      <div className="bg-indigo-950/80 backdrop-blur-sm p-6 rounded-2xl border border-indigo-400/30 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hanukkah-gold to-transparent opacity-50" />
        
        <h3 className="text-xl font-serif text-indigo-200 mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-yellow-400" />
          {t.day} {day}
        </h3>

        {insight ? (
          <div className="animate-rise">
            <p className={`text-lg text-white font-medium ${isHebrew ? 'font-hebrew' : ''}`}>
              "{insight}"
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">
            Click "Get Insight" to reveal a thought for today.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;