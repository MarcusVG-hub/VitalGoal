import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { loadProfile, saveProfile, loadHealthLogs, saveHealthLog, loadStreaks, saveStreaks, signOut } from './auth';
import { DEFAULT_STATE, todayStr } from './data/storage';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

// ── Onboarding ──────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', age: '', height: '', weight: '', goal: 'maintain',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const steps = [
    {
      emoji: '👋',
      title: "What's your name?",
      content: (
        <input
          style={obInput}
          placeholder="Your first name"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          autoFocus
        />
      ),
      ok: form.name.trim().length > 0,
    },
    {
      emoji: '📏',
      title: 'Your stats',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input style={obInput} type="number" placeholder="Age (years)"
            value={form.age} onChange={e => set('age', e.target.value)} />
          <input style={obInput} type="number" placeholder="Height (cm)"
            value={form.height} onChange={e => set('height', e.target.value)} />
          <input style={obInput} type="number" placeholder="Weight (kg)"
            value={form.weight} onChange={e => set('weight', e.target.value)} />
        </div>
      ),
      ok: form.age && form.height && form.weight,
    },
    {
      emoji: '🎯',
      title: 'Your health goal',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            ['lose',     '🔥 Lose Weight'],
            ['maintain', '⚖️ Stay Healthy'],
            ['gain',     '💪 Build Muscle'],
          ].map(([v, l]) => (
            <button key={v} onClick={() => set('goal', v)} style={{
              background: form.goal === v ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
              border: form.goal === v ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: form.goal === v ? '#34d399' : '#9ca3af',
              fontSize: '15px', fontWeight: '600',
              padding: '14px 16px', cursor: 'pointer',
              textAlign: 'left', width: '100%',
              transition: 'all 0.2s',
            }}>{l}</button>
          ))}
        </div>
      ),
      ok: true,
    },
  ];

  const cur = steps[step];

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '32px 24px',
        width: '100%', maxWidth: '380px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '22px', fontWeight: '800',
          background: 'linear-gradient(135deg, #34d399, #38bdf8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px', marginBottom: '8px',
        }}>⚡ VitalGoal</div>

        <div style={{ fontSize: '48px', margin: '16px 0 8px' }}>{cur.emoji}</div>
        <h2 style={{
          color: '#fff', margin: '0 0 24px',
          fontSize: '22px', fontWeight: '800',
        }}>{cur.title}</h2>

        <div style={{ width: '100%' }}>{cur.content}</div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', width: '100%' }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{
              flex: 1, background: 'rgba(255,255,255,0.08)',
              border: 'none', borderRadius: '12px',
              color: '#fff', fontSize: '15px',
              fontWeight: '600', padding: '13px', cursor: 'pointer',
            }}>Back</button>
          )}
          <button
            disabled={!cur.ok}
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDone(form)}
            style={{
              flex: 1,
              background: cur.ok
                ? 'linear-gradient(135deg, #34d399, #38bdf8)'
                : 'rgba(255,255,255,0.08)',
              border: 'none', borderRadius: '12px',
              color: cur.ok ? '#0a0a0f' : '#6b7280',
              fontSize: '15px', fontWeight: '800',
              padding: '13px', cursor: cur.ok ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {step < steps.length - 1 ? 'Next →' : "Let's Go! 🚀"}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginTop: '20px' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '4px',
              background: i === step ? '#34d399' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [state, setState] = useState({ ...DEFAULT_STATE });
  const [tab, setTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user.id);
      else { setState({ ...DEFAULT_STATE }); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load all user data from Supabase
  const loadUserData = async (userId) => {
    setLoading(true);
    try {
      const [profile, logs, streaks] = await Promise.all([
        loadProfile(userId),
        loadHealthLogs(userId),
        loadStreaks(userId),
      ]);
      setState({
        profile: profile || DEFAULT_STATE.profile,
        logs: logs || {},
        streaks: streaks || DEFAULT_STATE.streaks,
      });
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Save log entry
  const handleSaveLog = async (date, logData) => {
    const td = todayStr();
    const updatedLogs = { ...state.logs, [date]: logData };
    let { current, best, lastLog } = state.streaks;
    if (date === td && lastLog !== td) {
      const yest = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      current = lastLog === yest ? current + 1 : 1;
      best = Math.max(best, current);
      lastLog = td;
    }
    const newStreaks = { current, best, lastLog };
    setState(s => ({ ...s, logs: updatedLogs, streaks: newStreaks }));
    try {
      await saveHealthLog(user.id, date, logData);
      await saveStreaks(user.id, newStreaks);
      showToast('✅ Saved!');
    } catch (err) {
      showToast('❌ Error saving. Try again.');
    }
  };

  // Save profile
  const handleSaveProfile = async (profile) => {
    setState(s => ({ ...s, profile }));
    try {
      await saveProfile(user.id, profile);
      showToast('✅ Profile saved!');
    } catch (err) {
      showToast('❌ Error saving. Try again.');
    }
  };

  // Handle onboarding done
  const handleOnboardingDone = async (profile) => {
    setState(s => ({ ...s, profile }));
    try {
      await saveProfile(user.id, profile);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    setState({ ...DEFAULT_STATE });
    setTab('dashboard');
  };

  // Loading screen
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0a0f',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: '16px',
      }}>
        <div style={{
          fontSize: '32px', fontWeight: '800',
          background: 'linear-gradient(135deg, #34d399, #38bdf8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>⚡ VitalGoal</div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>Loading your data...</div>
      </div>
    );
  }

  // Not logged in — show auth screen
  if (!user) {
    return <Auth onAuth={() => {}} />;
  }

  // Logged in but no profile — show onboarding
  if (!state.profile.name) {
    return <Onboarding onDone={handleOnboardingDone} />;
  }

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#0a0a0f',
      position: 'relative',
    }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '90px', left: '50%',
          transform: 'translateX(-50%)',
          background: toast.includes('❌') ? '#ef4444' : '#10b981',
          color: '#fff', fontWeight: '700', fontSize: '14px',
          padding: '10px 24px', borderRadius: '24px',
          zIndex: 999, boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
        }}>{toast}</div>
      )}

      {/* Header */}
      <Header name={state.profile.name} streak={state.streaks.current} />

      {/* Page content */}
      <div style={{ padding: '16px 16px 100px' }}>
        {tab === 'dashboard' && (
          <Dashboard state={state} onTabChange={setTab} />
        )}
        {tab === 'tracker' && (
          <Tracker state={state} onSave={handleSaveLog} />
        )}
        {tab === 'shop' && (
          <Shop />
        )}
        {tab === 'profile' && (
          <Profile state={state} onSave={handleSaveProfile} onSignOut={handleSignOut} />
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav currentTab={tab} onTabChange={setTab} />
    </div>
  );
}

// ── Onboarding input style ──
const obInput = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#fff',
  fontSize: '15px', padding: '12px',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit',
};