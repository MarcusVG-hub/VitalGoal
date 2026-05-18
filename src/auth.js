import { supabase } from './supabase';

// Sign up with email and password
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  if (error) throw error;
  return data;
}

// Sign in with email and password
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Save profile to Supabase
export async function saveProfile(userId, profile) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profile });
  if (error) throw error;
}

// Load profile from Supabase
export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

// Save health log to Supabase
export async function saveHealthLog(userId, date, logData) {
  const { error } = await supabase
    .from('health_logs')
    .upsert({
      user_id: userId,
      log_date: date,
      ...logData
    });
  if (error) throw error;
}

// Load health logs from Supabase
export async function loadHealthLogs(userId) {
  const { data, error } = await supabase
    .from('health_logs')
    .select('*')
    .eq('user_id', userId);
  if (error) return [];
  // Convert array to object keyed by date
  const logs = {};
  data.forEach(log => {
    logs[log.log_date] = {
      water: log.water,
      steps: log.steps,
      sleep: log.sleep,
      calories: log.calories,
      weight: log.weight,
      mood: log.mood,
      notes: log.notes,
    };
  });
  return logs;
}

// Save streaks to Supabase
export async function saveStreaks(userId, streaks) {
  const { error } = await supabase
    .from('streaks')
    .upsert({
      user_id: userId,
      current_streak: streaks.current,
      best_streak: streaks.best,
      last_log: streaks.lastLog,
    });
  if (error) throw error;
}

// Load streaks from Supabase
export async function loadStreaks(userId) {
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return { current: 0, best: 0, lastLog: null };
  return {
    current: data.current_streak,
    best: data.best_streak,
    lastLog: data.last_log,
  };
}