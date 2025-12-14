import React, { useState, useEffect, useCallback } from 'react';
import { Language, CandleState } from './types';
import { TRANSLATIONS, CANDLE_COLORS, getSlotsForDay, getLightingOrder } from './constants';
import Menorah from './components/Menorah';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';
import { getDailyInsight } from './services/geminiService';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.RU);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [candles, setCandles] = useState<CandleState[]>([]);
  const [isLighting, setIsLighting] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  // Initialize candles empty
  useEffect(() => {
    resetCandles(currentDay);
    setInsight(null);
  }, [currentDay]);

  const resetCandles = (day: number) => {
    // 9 slots (0-8). 
    const newCandles: CandleState[] = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      isPlaced: false,
      isLit: false,
      color: CANDLE_COLORS[i % CANDLE_COLORS.length] // Assign stable colors based on slot
    }));

    // Place candles according to day (Rules: Place Right to Left)
    const activeSlots = getSlotsForDay(day);
    
    // Always Shamash (4)
    newCandles[4].isPlaced = true;
    newCandles[4].color = "#F0F0F0"; // White/Silver for Shamash

    // Place others
    activeSlots.forEach(slot => {
        // Find which candle 'color' to use? 
        // We can just set placed.
        // If we want random colors every day, we'd randomize here.
        // Let's stick to consistent slot colors for visual stability.
        newCandles[slot].isPlaced = true;
    });

    setCandles(newCandles);
    setIsLighting(false);
  };

  const handleLight = useCallback(async () => {
    if (isLighting) return;
    setIsLighting(true);

    const order = getLightingOrder(currentDay);
    
    // Light them one by one with delay
    for (const slotIndex of order) {
      setCandles(prev => {
        const next = [...prev];
        next[slotIndex] = { ...next[slotIndex], isLit: true };
        return next;
      });
      // Sound effect could go here
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsLighting(false);
  }, [currentDay, isLighting]);

  const handleInsight = async () => {
    setInsightLoading(true);
    setInsight(null);
    const text = await getDailyInsight(currentDay, language);
    setInsight(text);
    setInsightLoading(false);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className={`min-h-screen flex flex-col items-center py-8 px-4 font-sans selection:bg-hanukkah-gold selection:text-black ${language === Language.HE ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <header className="mb-8 text-center animate-rise">
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-hanukkah-gold to-yellow-600 font-bold mb-2 drop-shadow-sm">
          {t.title}
        </h1>
        <p className="text-hanukkah-silver/60 uppercase tracking-widest text-sm">
          {language === Language.EN ? 'Festival of Lights' : ''}
          {language === Language.RU ? 'Праздник огней' : ''}
          {language === Language.AZ ? 'İşıqlar Bayramı' : ''}
          {language === Language.HE ? 'חג האורים' : ''}
        </p>
      </header>

      {/* Main Menorah View */}
      <main className="w-full max-w-5xl mb-10">
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <Menorah candles={candles} />
        </div>
      </main>

      {/* Controls & Interaction */}
      <Controls 
        currentDay={currentDay} 
        setDay={setCurrentDay} 
        language={language} 
        setLanguage={setLanguage}
        onLight={handleLight}
        onReset={() => resetCandles(currentDay)}
        onInsight={handleInsight}
        isLighting={isLighting}
        insightLoading={insightLoading}
      />

      {/* Information Panel */}
      <InfoPanel language={language} insight={insight} day={currentDay} />

      {/* Footer */}
      <footer className="mt-16 text-center text-white/20 text-sm">
        <p>&copy; {new Date().getFullYear()} Interactive Menorah. Built with React & Gemini.</p>
      </footer>
    </div>
  );
};

export default App;