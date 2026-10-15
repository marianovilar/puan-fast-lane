import React from 'react';
import { useGame } from '../context/GameContext';
import { Clock } from 'lucide-react';

interface RetroFastLaneClockProps {
  usedHours: number;
  maxHours: number;
  remainingHours: number;
}

export const RetroFastLaneClock: React.FC<RetroFastLaneClockProps> = ({
  usedHours,
  maxHours,
  remainingHours,
}) => {
  const safeMax = maxHours > 0 ? maxHours : 40;
  const fraction = Math.min(1, Math.max(0, usedHours / safeMax));
  const angle = fraction * 360;

  // SVG dimensions
  const size = 68;
  const cx = size / 2;
  const cy = size / 2;
  const r = 26;

  // 12 clock ticks (like an analog clock)
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const tickAngle = (i * 30 - 90) * (Math.PI / 180);
    const isMajor = i % 3 === 0;
    const innerR = isMajor ? r - 5 : r - 3;
    const x1 = cx + innerR * Math.cos(tickAngle);
    const y1 = cy + innerR * Math.sin(tickAngle);
    const x2 = cx + (r - 1) * Math.cos(tickAngle);
    const y2 = cy + (r - 1) * Math.sin(tickAngle);
    return { x1, y1, x2, y2, isMajor };
  });

  // Calculate red sector arc coordinates
  const rad = (angle - 90) * (Math.PI / 180);
  const endX = cx + r * Math.cos(rad);
  const endY = cy + r * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Hand tip coordinates
  const handLen = r - 3;
  const handX = cx + handLen * Math.cos(rad);
  const handY = cy + handLen * Math.sin(rad);

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* Sierra Retro Analog Clock */}
      <div className="relative shrink-0 select-none">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {/* Outer Metallic Bezel */}
          <circle
            cx={cx}
            cy={cy}
            r={r + 6}
            fill="#121626"
            stroke="#927137"
            strokeWidth="2.5"
          />
          {/* Inner Golden Rim */}
          <circle
            cx={cx}
            cy={cy}
            r={r + 3}
            fill="#090c14"
            stroke="#d4af37"
            strokeWidth="1"
          />

          {/* Clock Dial Face */}
          <circle cx={cx} cy={cy} r={r} fill="#0d111c" />

          {/* Red Used-Time Wedge (Jones in the Fast Lane Time Spent) */}
          {fraction >= 0.999 ? (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="#dc2626"
              stroke="#ef4444"
              strokeWidth="1"
              className="animate-pulse"
            />
          ) : fraction > 0.005 ? (
            <path
              d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
              fill="#dc2626"
              stroke="#ef4444"
              strokeWidth="0.8"
            />
          ) : null}

          {/* Hour Tick Marks */}
          {ticks.map((t, idx) => (
            <line
              key={idx}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isMajor ? '#f59e0b' : '#64748b'}
              strokeWidth={t.isMajor ? '1.5' : '1'}
              strokeLinecap="round"
            />
          ))}

          {/* Clock Hand (Leading Edge of Used Time) */}
          <line
            x1={cx}
            y1={cy}
            x2={handX}
            y2={handY}
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center Golden Pivot Pin */}
          <circle cx={cx} cy={cy} r="3" fill="#f59e0b" stroke="#451a03" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="1" fill="#fff" />
        </svg>

        {/* Low time warning badge */}
        {remainingHours <= 5 && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        )}
      </div>

      {/* Numerical readout */}
      <div className="flex flex-col justify-center font-mono">
        <div className="flex items-center gap-1 text-[9px] font-pixel text-amber-300 uppercase tracking-wide">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>TIEMPO USADO</span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-red-400 font-bold text-xs sm:text-sm font-mono flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-sm shadow-red-500/50" />
            {Math.round(usedHours * 10) / 10} hs
          </span>
          <span className="text-slate-500 text-[11px]">/</span>
          <span className="text-cyan-300 font-mono text-[11px]">
            {remainingHours} hs libres
          </span>
        </div>

        <div className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">
          {Math.round(fraction * 100)}% de {safeMax} hs semanales
        </div>
      </div>
    </div>
  );
};

export const BoardFooter: React.FC = () => {
  const { state } = useGame();
  const { player, hoursRemaining, maxWeeklyHours } = state;

  if (!player) return null;

  const usedHours = Math.max(0, maxWeeklyHours - hoursRemaining);

  return (
    <footer className="w-full mt-3 bg-[#111422] border-2 border-[#3e4868] rounded-lg p-2.5 sm:px-4 sm:py-2 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
      {/* Left side: Creator Credits requested by user */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded bg-[#1a2035] border border-amber-400/70 flex items-center justify-center text-amber-400 shadow-inner shrink-0 text-sm">
          🕹️
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-pixel text-[10px] sm:text-[11px] text-amber-300 tracking-wide leading-tight">
            Vibecodeado por <span className="text-slate-100 font-bold">Mariano Vilar</span>
          </div>
          <div className="font-mono text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <span>usando</span>
            <span className="font-bold text-cyan-300">Google AntiGravity</span>
            <span className="hidden md:inline-block text-[8px] bg-slate-800 text-amber-400/90 px-1 py-0.2 rounded border border-slate-700 font-pixel ml-1">
              PUÁN 480
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Jones in the Fast Lane analog red clock */}
      <div className="flex items-center justify-end w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
        <RetroFastLaneClock
          usedHours={usedHours}
          maxHours={maxWeeklyHours}
          remainingHours={hoursRemaining}
        />
      </div>
    </footer>
  );
};
