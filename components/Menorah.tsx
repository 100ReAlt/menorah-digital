import React from 'react';
import Candle from './Candle';
import { CandleState } from '../types';

interface MenorahProps {
  candles: CandleState[];
}

const Menorah: React.FC<MenorahProps> = ({ candles }) => {
  // Positions for 9 branches.
  // Center is 0,0. 
  // Spacing: 40px?
  const spacing = 45;
  
  // Slot Indices:
  // 0  1  2  3  [4]  5  6  7  8
  // L  L  L  L   S   R  R  R  R
  
  const getX = (index: number) => {
    return (index - 4) * spacing;
  };

  const getY = (index: number) => {
    // Shamash is higher or base is different? 
    // Usually branches curve up.
    // Let's draw a simple geometric menorah.
    return 0; // Base line for candle holder tops
  };

  return (
    <div className="w-full max-w-3xl mx-auto aspect-[16/9] flex items-center justify-center">
      <svg viewBox="-220 -150 440 250" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>

        {/* Base and Stem */}
        <path
          d="M-40,100 L40,100 L30,50 L-30,50 Z"
          fill="url(#goldGradient)"
        />
        <rect x="-10" y="-20" width="20" height="70" fill="url(#goldGradient)" />

        {/* Branches */}
        {/* We need curved paths from stem to holders */}
        {[0, 1, 2, 3, 5, 6, 7, 8].map((i) => {
          const x = getX(i);
          const controlY = 60; // How low the curve dips
          return (
            <path
              key={`branch-${i}`}
              d={`M0,20 Q${x/2},${controlY} ${x},20`}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}

        {/* Candle Holders */}
        {candles.map((candle, i) => {
          const x = getX(i);
          const isShamash = i === 4;
          return (
             <g key={candle.id} transform={`translate(${x}, 20)`}>
               {/* Holder Cup */}
               <path d="M-10,0 L10,0 L8,15 L-8,15 Z" fill="url(#goldGradient)" />
               
               {/* The Candle itself sits on top (y=0) */}
               <g transform="translate(0, 0)">
                 <Candle 
                   color={candle.color} 
                   isLit={candle.isLit} 
                   isPlaced={candle.isPlaced}
                   isShamash={isShamash}
                 />
               </g>
             </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Menorah;