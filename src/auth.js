import { supabase } from './supabase';

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function saveProfile(userId, profile) {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profile });
  if (error) throw error;
}

export async function loadHealthLogs(userId) {
  const { data, error } = await supabase
    .from('health_logs')
    .select('*')
    .eq('user_id', userId);
  if (error) return {};
  const logs = {};
  data.forEach(log => { logs[log.date] = log.data; });
  return logs;
}

export async function saveHealthLog(userId, date, logData) {
  const { error } = await supabase
    .from('health_logs')
    .upsert({ user_id: userId, date, data: logData });
  if (error) throw error;
}

export async function loadStreaks(userId) {
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return { current: 0, best: 0, lastLog: null };
  return data;
}

export async function saveStreaks(userId, streaks) {
  const { error } = await supabase
    .from('streaks')
    .upsert({ user_id: userId, ...streaks });
  if (error) throw error;
}