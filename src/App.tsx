import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { HUD } from './components/HUD';
import { CampusMap } from './components/CampusMap';
import { EventLog } from './components/EventLog';
import { LocationModal } from './components/LocationModal';
import { ExamModal } from './components/ExamModal';
import { RandomEventModal } from './components/RandomEventModal';
import { CharacterSelect } from './components/CharacterSelect';
import { GameOverModal } from './components/GameOverModal';

const GameMain: React.FC = () => {
  const { state } = useGame();

  if (state.phase === 'SELECT_ARCHETYPE') {
    return <CharacterSelect />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#0e111a] text-slate-100 relative overflow-x-hidden">
      {/* Sierra Retro Top HUD */}
      <HUD />

      {/* Main Campus Board Map */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-2 sm:px-4 py-2">
        <CampusMap />
      </main>

      {/* Retro Event Feed Log */}
      <EventLog />

      {/* Contextual & Event Modals */}
      <LocationModal />
      <ExamModal />
      <RandomEventModal />
      <GameOverModal />
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <GameMain />
    </GameProvider>
  );
}

export default App;
