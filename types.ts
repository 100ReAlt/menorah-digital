export enum Language {
  EN = 'en',
  RU = 'ru',
  AZ = 'az',
  HE = 'he'
}

export interface Translations {
  title: string;
  selectDay: string;
  lightCandles: string;
  reset: string;
  loadingInsight: string;
  insightError: string;
  blessingTitle: string;
  blessingContent: string;
  shamash: string;
  day: string;
  getInsight: string;
}

export interface CandleState {
  id: number; // 0-8. 4 is Shamash usually in center, but logically we might map differently. 
  // Let's map 0-7 as day candles (Right to Left physically: 7,6,5,4,3,2,1,0?? No, traditional is R->L placement)
  // Let's use physical slots 0 (Left) to 8 (Right). 
  // Middle index 4 is Shamash.
  // Day 1: Place at 8.
  // Day 2: Place at 7, 8.
  // Day 8: Place at 0,1,2,3, 5,6,7,8.
  
  isPlaced: boolean;
  isLit: boolean;
  color: string;
}

export interface DayInsight {
  day: number;
  text: string;
}