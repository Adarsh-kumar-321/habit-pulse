import React from 'react';
import { Flame, Trophy, Sparkles } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export default function Header() {
  const { level, xpProgress, xp, completionRate, completedTodayCount, habits } =
    useHabits();

  return (
    <header className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              HabitPulse
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Level {level}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {completedTodayCount} of {habits.length} habits completed today ({completionRate}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/70 px-4 py-2.5 rounded-xl border border-slate-700/60 min-w-[260px]">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {xp} Total XP
              </span>
              <span className="text-slate-400">{xpProgress}/100 XP</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}