import React, { useState } from 'react';
import { Check, Flame, Trash2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const PRIORITY_COLORS = {
  High: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

export default function HabitList() {
  const { habits, toggleHabitToday, deleteHabit, today } = useHabits();
  const [filter, setFilter] = useState('All');

  const filteredHabits =
    filter === 'All' ? habits : habits.filter((h) => h.routine === filter);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {['All', 'Morning', 'Afternoon', 'Night'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              filter === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredHabits.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-slate-400 text-sm">
            No habits found in this routine. Add one above to get started!
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const isCompleted = habit.completedDates.includes(today);
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                  isCompleted
                    ? 'bg-slate-800/30 border-emerald-500/30'
                    : 'bg-slate-800/70 border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                        : 'border-slate-500 hover:border-indigo-400'
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div>
                    <p
                      className={`font-medium text-sm transition ${
                        isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {habit.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400">
                        {habit.routine}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          PRIORITY_COLORS[habit.priority]
                        }`}
                      >
                        {habit.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      habit.streak > 0
                        ? 'bg-orange-500/15 text-orange-400'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{habit.streak}d</span>
                  </div>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-slate-500 hover:text-rose-400 transition p-1"
                    title="Delete habit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}