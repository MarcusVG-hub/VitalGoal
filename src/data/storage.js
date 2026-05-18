const KEY = 'vitalgoal_v1';

export function loadData() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export const GOALS = {
  water: 8,
  steps: 10000,
  sleep: 8,
  calories: 2000,
};

export const DEFAULT_STATE = {
  profile: {
    name: '',
    age: '',
    height: '',
    weight: '',
    goal: 'maintain',
  },
  logs: {},
  streaks: {
    current: 0,
    best: 0,
    lastLog: null,
  },
};

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

export function calcBMI(height, weight) {
  if (!height || !weight) return null;
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

export function bmiLabel(bmi) {
  if (!bmi) return '—';
  return bmi < 18.5
    ? 'Underweight'
    : bmi < 25
    ? 'Healthy'
    : bmi < 30
    ? 'Overweight'
    : 'Obese';
}

export function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
      .toISOString()
      .split('T')[0];
    return d;
  });
}