import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

export default function HabitForm() {
  const { addHabit } = useHabits();
  const [title, setTitle] = useState('');
  const [routine, setRoutine] = useState('Morning');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addHabit(title.trim(), routine, priority);
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 mb-6 shadow-sm"
    >
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Add a new daily habit or routine task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
        />

        <div className="flex gap-2">
          <select
            value={routine}
            onChange={(e) => setRoutine(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="Morning">🌅 Morning</option>
            <option value="Afternoon">☀️ Afternoon</option>
            <option value="Night">🌙 Night</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-sm shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </form>
  );
}