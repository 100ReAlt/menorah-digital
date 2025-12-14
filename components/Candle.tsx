import React from 'react';

interface CandleProps {
  color: string;
  isLit: boolean;
  isPlaced: boolean;
  isShamash?: boolean;
}

const Candle: React.FC<CandleProps> = ({ color, isLit, isPlaced, isShamash }) => {
  if (!isPlaced) return <g />; // Invisible if not placed

  return (
    <g className="transition-all duration-1000 animate-rise origin-bottom">
      {/* Candle Body */}
      <rect
        x={-6}
        y={isShamash ? -50 : -40}
        width={12}
        height={isShamash ? 70 : 60}
        fill={color}
        rx={2}
        className="stroke-black/20 stroke-1"
      />
      
      {/* Wick */}
      <line
        x1={0}
        y1={isShamash ? -50 : -40}
        x2={0}
        y2={isShamash ? -54 : -44}
        stroke="#333"
        strokeWidth={2}
      />

      {/* Flame */}
      {isLit && (
        <g className="animate-flicker origin-bottom" style={{ transformBox: 'fill-box' }}>
           {/* Outer glow */}
           <circle cx={0} cy={isShamash ? -60 : -50} r={12} fill="rgba(255, 215, 0, 0.3)" filter="blur(4px)" />
           {/* Inner flame */}
           <path
             d={`M0,${isShamash ? -54 : -44} Q-4,${isShamash ? -65 : -55} 0,${isShamash ? -75 : -65} Q4,${isShamash ? -65 : -55} 0,${isShamash ? -54 : -44}`}
             fill="#FFD700"
           />
           <path
             d={`M0,${isShamash ? -54 : -44} Q-2,${isShamash ? -62 : -52} 0,${isShamash ? -68 : -58} Q2,${isShamash ? -62 : -52} 0,${isShamash ? -54 : -44}`}
             fill="#FFF"
             opacity={0.6}
           />
        </g>
      )}
    </g>
  );
};

export default Candle;