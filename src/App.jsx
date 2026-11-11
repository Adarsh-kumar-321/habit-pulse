import React from 'react';
import { HabitProvider } from './context/HabitContext';
import Header from './components/Header';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import HydrationTracker from './components/HydrationTracker';
import AnalyticsPanel from './components/AnalyticsPanel';

export default function App() {
  return (
    <HabitProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
        <Header />

        <main className="max-w-6xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HabitForm />
            <HabitList />
          </div>

          <div className="space-y-6">
            <HydrationTracker />
            <AnalyticsPanel />
          </div>
        </main>
      </div>
    </HabitProvider>
  );
}