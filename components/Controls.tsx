import React from 'react';
import { Language, Translations } from '../types';
import { TRANSLATIONS } from '../constants';
import { Flame, RefreshCw, BookOpen, Sun, Globe } from 'lucide-react';

interface ControlsProps {
  currentDay: number;
  setDay: (day: number) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onLight: () => void;
  onReset: () => void;
  onInsight: () => void;
  isLighting: boolean;
  insightLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  currentDay,
  setDay,
  language,
  setLanguage,
  onLight,
  onReset,
  onInsight,
  isLighting,
  insightLoading
}) => {
  const t: Translations = TRANSLATIONS[language];
  const isRTL = language === Language.HE || language === Language.AZ; // AZ is LTR actually, but let's check. AZ is Latin script LTR. HE is RTL.

  return (
    <div className={`flex flex-col gap-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl w-full max-w-4xl mx-auto ${language === Language.HE ? 'rtl' : 'ltr'}`}>
      
      {/* Top Row: Language & Day Selection */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Language Toggle */}
        <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg">
           {[Language.EN, Language.RU, Language.AZ, Language.HE].map((lang) => (
             <button
               key={lang}
               onClick={() => setLanguage(lang)}
               className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${
                 language === lang 
                 ? 'bg-hanukkah-gold text-hanukkah-blue shadow-lg' 
                 : 'text-gray-300 hover:text-white hover:bg-white/10'
               }`}
             >
               {lang.toUpperCase()}
             </button>
           ))}
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-hanukkah-gold font-serif font-bold whitespace-nowrap hidden md:inline">{t.selectDay}:</span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
            <button
              key={day}
              onClick={() => setDay(day)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                currentDay === day
                  ? 'bg-hanukkah-gold border-hanukkah-gold text-hanukkah-blue scale-110 shadow-[0_0_15px_rgba(197,160,89,0.5)]'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onLight}
          disabled={isLighting}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-hanukkah-gold to-yellow-600 rounded-full font-bold text-hanukkah-blue shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Flame size={20} className={isLighting ? "animate-pulse" : ""} />
          {t.lightCandles}
        </button>

        <button
          onClick={onInsight}
          disabled={insightLoading}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-900/50 hover:bg-indigo-800/50 border border-indigo-400/30 rounded-full font-semibold text-indigo-200 transition-all"
        >
          {insightLoading ? <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" /> : <BookOpen size={20} />}
          {t.getInsight}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium text-gray-300 transition-all"
        >
          <RefreshCw size={18} />
          {t.reset}
        </button>
      </div>

    </div>
  );
};

export default Controls;