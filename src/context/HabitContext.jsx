import React, { createContext, useContext, useState, useEffect } from 'react';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

const getTodayStr = () => new Date().toISOString().split('T')[0];

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }
  return days;
};

const INITIAL_HABITS = [
  {
    id: '1',
    title: 'Morning Mobility & Stretch',
    routine: 'Morning',
    priority: 'High',
    streak: 4,
    completedDates: [getTodayStr()],
  },
  {
    id: '2',
    title: 'Deep Work Session (90 mins)',
    routine: 'Afternoon',
    priority: 'High',
    streak: 7,
    completedDates: [],
  },
  {
    id: '3',
    title: 'Read 20 Pages (No Screens)',
    routine: 'Night',
    priority: 'Medium',
    streak: 2,
    completedDates: [],
  },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitpulse_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('habitpulse_water');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === getTodayStr()) return parsed.count;
    }
    return 3;
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('habitpulse_xp');
    return saved ? Number(saved) : 240;
  });

  useEffect(() => {
    localStorage.setItem('habitpulse_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(
      'habitpulse_water',
      JSON.stringify({ date: getTodayStr(), count: waterIntake })
    );
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('habitpulse_xp', xp.toString());
  }, [xp]);

  const addHabit = (title, routine, priority) => {
    const newHabit = {
      id: Date.now().toString(),
      title,
      routine,
      priority,
      streak: 0,
      completedDates: [],
    };
    setHabits((prev) => [newHabit, ...prev]);
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabitToday = (id) => {
    const today = getTodayStr();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const isCompletedToday = habit.completedDates.includes(today);
        if (isCompletedToday) {
          setXp((x) => Math.max(0, x - 25));
          return {
            ...habit,
            streak: Math.max(0, habit.streak - 1),
            completedDates: habit.completedDates.filter((d) => d !== today),
          };
        } else {
          setXp((x) => x + 25);
          return {
            ...habit,
            streak: habit.streak + 1,
            completedDates: [...habit.completedDates, today],
          };
        }
      })
    );
  };

  const updateWater = (delta) => {
    setWaterIntake((prev) => {
      const next = Math.min(8, Math.max(0, prev + delta));
      if (next > prev) setXp((x) => x + 10);
      return next;
    });
  };

  const today = getTodayStr();
  const completedTodayCount = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const completionRate =
    habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;

  const level = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  const weeklyStats = getLast7Days().map((day) => {
    const completedOnDay = habits.filter((h) =>
      h.completedDates.includes(day.date)
    ).length;
    const rate =
      habits.length > 0 ? Math.round((completedOnDay / habits.length) * 100) : 0;
    return { ...day, rate };
  });

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        toggleHabitToday,
        waterIntake,
        updateWater,
        xp,
        level,
        xpProgress,
        completionRate,
        completedTodayCount,
        weeklyStats,
        today,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};