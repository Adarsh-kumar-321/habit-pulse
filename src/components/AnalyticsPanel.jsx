import React from 'react';
import { BarChart3, Flame } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export default function AnalyticsPanel() {
  const { weeklyStats, habits } = useHabits();
  const topStreaks = [...habits].sort((a, b) => b.streak - a.streak).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white">7-Day Consistency</h3>
            <p className="text-xs text-slate-400">Daily habit completion rate</p>
          </div>
        </div>

        <div className="flex items-end justify-between h-32 gap-2 pt-4">
          {weeklyStats.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-700/50 rounded-t-md h-24 flex items-end overflow-hidden">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    day.rate >= 70
                      ? 'bg-emerald-500'
                      : day.rate > 0
                      ? 'bg-indigo-500'
                      : 'bg-slate-600/40'
                  }`}
                  style={{ height: `${Math.max(day.rate, 6)}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <h3 className="font-semibold text-sm text-white mb-3 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" /> Active Streak Leaders
        </h3>
        <div className="space-y-2.5">
          {topStreaks.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between text-xs bg-slate-900/60 px-3 py-2.5 rounded-xl border border-slate-800"
            >
              <span className="text-slate-200 truncate pr-2">{h.title}</span>
              <span className="font-bold text-orange-400 shrink-0">
                {h.streak} days
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}