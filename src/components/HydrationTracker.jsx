import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export default function HydrationTracker() {
  const { waterIntake, updateWater } = useHabits();
  const goal = 8;

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">Hydration Goal</h3>
            <p className="text-xs text-slate-400">+10 XP per glass</p>
          </div>
        </div>
        <span className="text-sm font-bold text-sky-400">
          {waterIntake} / {goal} glasses
        </span>
      </div>

      <div className="grid grid-cols-8 gap-1.5 my-4">
        {Array.from({ length: goal }).map((_, idx) => (
          <div
            key={idx}
            className={`h-7 rounded-md transition-all ${
              idx < waterIntake
                ? 'bg-sky-500 shadow-sm shadow-sky-500/40'
                : 'bg-slate-700/60'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => updateWater(-1)}
          disabled={waterIntake === 0}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 transition"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => updateWater(1)}
          disabled={waterIntake === goal}
          className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1 transition"
        >
          <Plus className="w-4 h-4" /> Drink Water
        </button>
      </div>
    </div>
  );
}