import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Terminal, ChevronUp, ChevronDown } from 'lucide-react';

export const EventLog: React.FC = () => {
  const { state } = useGame();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'action':
        return 'bg-emerald-950 text-emerald-400 border-emerald-700';
      case 'travel':
        return 'bg-cyan-950 text-cyan-400 border-cyan-700';
      case 'event':
        return 'bg-purple-950 text-purple-300 border-purple-700';
      case 'warning':
        return 'bg-rose-950 text-rose-400 border-rose-700 animate-pulse';
      case 'exam':
        return 'bg-amber-950 text-amber-300 border-amber-700';
      case 'system':
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600';
    }
  };

  const getBadgeLabel = (type: string) => {
    switch (type) {
      case 'action': return 'ACCIÓN';
      case 'travel': return 'TRASLADO';
      case 'event': return 'CRÓNICA';
      case 'warning': return 'ALERTA';
      case 'exam': return 'EXAMEN';
      case 'system': return 'ESTATUTO';
      default: return 'LOG';
    }
  };

  return (
    <div className="w-full bg-[#0d101a] border-t-2 border-[#3e4868] text-slate-300 font-mono text-xs select-none shadow-2xl relative">
      {/* Header Bar */}
      <div className="px-3 py-1.5 bg-[#141824] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold tracking-wider text-[11px] uppercase text-emerald-400">
            DIARIO DE PASILLOS & SUCESOS EN PUÁN
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            (Semana {state.currentWeek} de 16)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title={isCollapsed ? 'Expandir Registro' : 'Minimizar Registro'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Log Entries List */}
      {!isCollapsed && (
        <div className="p-3 max-h-36 sm:max-h-44 overflow-y-auto space-y-1.5 scrollbar-thin">
          {state.eventLogs.length === 0 ? (
            <div className="text-slate-600 italic py-2 text-center">
              No hay registros académicos todavía.
            </div>
          ) : (
            state.eventLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-start gap-2 leading-relaxed text-[11px] sm:text-xs py-0.5 border-b border-slate-900/60"
              >
                <span className="text-slate-500 shrink-0 font-mono text-[10px]">
                  [S{log.week}|{log.timeString}]
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold border shrink-0 ${getBadgeStyle(log.type)}`}>
                  {getBadgeLabel(log.type)}
                </span>
                <span className={`font-sans flex-1 ${
                  log.type === 'warning' ? 'text-rose-300 font-medium' :
                  log.type === 'exam' ? 'text-amber-300 font-medium' :
                  log.type === 'event' ? 'text-purple-200' :
                  log.type === 'travel' ? 'text-cyan-200' :
                  'text-slate-300'
                }`}>
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
