import { Language, Translations } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  [Language.EN]: {
    title: "Hanukkah Menorah",
    selectDay: "Select Night",
    lightCandles: "Light Candles",
    reset: "Reset",
    loadingInsight: "Asking the rabbi (AI)...",
    insightError: "Could not retrieve insight.",
    blessingTitle: "Blessings",
    blessingContent: "Baruch atah Adonai Eloheinu Melech ha-olam, asher kid'shanu b-mitzvotav, v-tzivanu l-hadlik ner shel Hanukkah.",
    shamash: "Shamash",
    day: "Day",
    getInsight: "Reveal Daily Insight"
  },
  [Language.RU]: {
    title: "Ханукальная Менора",
    selectDay: "Выберите ночь",
    lightCandles: "Зажечь свечи",
    reset: "Сброс",
    loadingInsight: "Спрашиваем раввина (ИИ)...",
    insightError: "Не удалось получить толкование.",
    blessingTitle: "Благословения",
    blessingContent: "Барух ата Адонай Элохейну Мелех ха-олам, ашер кидшану бе-мицвотав ве-цивану лехадлик нер шель Ханука.",
    shamash: "Шамаш",
    day: "День",
    getInsight: "Мудрость дня"
  },
  [Language.AZ]: {
    title: "Hanukka Menorası",
    selectDay: "Gecəni seçin",
    lightCandles: "Şamları yandırın",
    reset: "Sıfırla",
    loadingInsight: "Rəbbindən soruşuruq (AI)...",
    insightError: "Məlumat alına bilmədi.",
    blessingTitle: "Xeyir-dua",
    blessingContent: "Barux ata Adonai Eloheynu Melex ha-olam, aşer kidşanu b-mitzvotav, v-tzivanu l-hadlik ner şel Hanukka.",
    shamash: "Şamaş",
    day: "Gün",
    getInsight: "Günün Hikməti"
  },
  [Language.HE]: {
    title: "חנוכייה",
    selectDay: "בחר לילה",
    lightCandles: "הדלק נרות",
    reset: "אפס",
    loadingInsight: "...שואל את הרב (AI)",
    insightError: "לא ניתן היה לקבל תובנה",
    blessingTitle: "ברכות",
    blessingContent: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה.",
    shamash: "שמש",
    day: "יום",
    getInsight: "תובנה יומית"
  }
};

export const CANDLE_COLORS = [
  "#FF4136", // Red
  "#0074D9", // Blue
  "#2ECC40", // Green
  "#FFDC00", // Yellow
  "#B10DC9", // Purple
  "#FF851B", // Orange
  "#39CCCC", // Teal
  "#F012BE", // Magenta
];

// Physical slots 0 to 8. 4 is Shamash.
// Right to Left: 8, 7, 6, 5, (4), 3, 2, 1, 0
// Day 1: Slot 8.
// Day 2: Slot 7, 8.
// ...
// Day 8: Slot 0, 1, 2, 3, 5, 6, 7, 8.
export const getSlotsForDay = (day: number): number[] => {
  const slots: number[] = [];
  // Add Shamash
  slots.push(4);
  
  // Add day candles (Right side first, filling leftwards)
  // The 'newest' candle is the leftmost one of the group, which corresponds to lower indices in our physical layout (if 0 is left).
  // Wait, let's map standard Hanukkiah:
  // Left [0 1 2 3] [4=Shamash] [5 6 7 8] Right
  // Day 1: Place candle at 8. Light 8.
  // Day 2: Place candles at 7, 8. Light 7 then 8.
  // Day 8: Place candles at 0,1,2,3, 5,6,7,8. Light 0,1,2,3,5,6,7,8.
  
  // So for Day N, we need slots: (8 - N + 1) to 8, excluding 4 if it overlaps? 
  // Actually, indices > 4 are on the right. Indices < 4 are on the left.
  // Let's simplify: 
  // We have 8 non-Shamash slots. Let's call them logic indices 1-8 (Right to Left).
  // Logic 1 -> Slot 8
  // Logic 2 -> Slot 7
  // Logic 3 -> Slot 6
  // Logic 4 -> Slot 5
  // Logic 5 -> Slot 3 (skip 4)
  // Logic 6 -> Slot 2
  // Logic 7 -> Slot 1
  // Logic 8 -> Slot 0
  
  const activeSlots: number[] = [];
  for (let i = 1; i <= day; i++) {
     if (i <= 4) {
       activeSlots.push(9 - i); // Logic 1->8, Logic 2->7...
     } else {
       activeSlots.push(9 - i - 1); // Logic 5->3 (skip 4)...
     }
  }
  
  return activeSlots; // This returns the indices of slots that HAVE candles.
};

export const getLightingOrder = (day: number): number[] => {
  // Always Shamash first
  const order = [4];
  
  // Then Newest to Oldest.
  // Newest is the one with the lowest physical index in our map (since we fill right to left).
  // Example Day 2: Slots are 7, 8. Newest is 7. Order: 4 -> 7 -> 8.
  // Example Day 1: Slot 8. Order: 4 -> 8.
  
  const daySlots = getSlotsForDay(day); // e.g. Day 2 returns [7, 8] (excluding shamash logic check above, wait. My getSlotsForDay didn't return Shamash? Ah it pushed 4 first but I need to be careful).
  
  // Let's refactor getSlotsForDay to just return day candles
  const candleSlots = [];
  for (let i = 1; i <= day; i++) {
     if (i <= 4) {
       candleSlots.push(9 - i); 
     } else {
       candleSlots.push(9 - i - 1);
     }
  }
  
  // Sort ascending = Left to Right (Physical 0 -> 8)
  // This matches the "Light from Left to Right" rule for the placed candles.
  candleSlots.sort((a, b) => a - b);
  
  return order.concat(candleSlots);
};