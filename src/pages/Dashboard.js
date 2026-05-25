import React from 'react';
import { todayStr } from '../data/storage';

const C = {
  bg: '#F5FBF6', bgAlt: '#EAF6ED', white: '#FFFFFF',
  green: '#1B7A3E', green2: '#28A855', green3: '#34D468',
  greenSoft: '#D4F5E0', dark: '#0D2415', text: '#1A3322',
  muted: '#4A7A5A', border: 'rgba(27,122,62,0.12)',
  shadow: '0 2px 16px rgba(27,122,62,0.08)',
};

const metrics = [
  { key: 'water',    icon: '💧', label: 'Water',    unit: 'glasses', goal: 8,    color: '#0284C7', bg: '#E0F2FE' },
  { key: 'steps',    icon: '🚶', label: 'Steps',    unit: 'steps',   goal: 10000, color: '#1B7A3E', bg: '#D4F5E0' },
  { key: 'sleep',    icon: '😴', label: 'Sleep',    unit: 'hours',   goal: 8,    color: '#7C3AED', bg: '#EDE9FE' },
  { key: 'calories', icon: '🔥', label: 'Calories', unit: 'kcal',    goal: 2000, color: '#EA580C', bg: '#FFEDD5' },
  { key: 'mood',     icon: '😊', label: 'Mood',     unit: '/5',      goal: 5,    color: '#DB2777', bg: '#FCE7F3' },
  { key: 'weight',   icon: '⚖️', label: 'Weight',   unit: 'kg',      goal: null, color: '#B5883A', bg: '#FEF3C7' },
];

function Ring({ pct, color, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 1));
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)' }}/>
    </svg>
  );
}

function MetricCard({ m, value }) {
  const pct = m.goal ? value / m.goal : 0;
  const display = value || 0;
  return (
    <div style={{
      background: C.white, borderRadius: '16px',
      padding: '16px', border: `1px solid ${C.border}`,
      boxShadow: C.shadow, display: 'flex',
      flexDirection: 'column', gap: '10px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,122,62,0.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = C.shadow; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{m.icon}</div>
          <div style={{ color: C.muted, fontSize: '13px', fontWeight: '600' }}>{m.label}</div>
        </div>
        {m.goal && <Ring pct={pct} color={m.color} size={44}/>}
      </div>
      <div>
        <span style={{ color: m.color, fontWeight: '800', fontSize: '22px' }}>{display}</span>
        <span style={{ color: C.muted, fontSize: '13px', marginLeft: '4px' }}>{m.unit}</span>
        {m.goal && <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px' }}>Goal: {m.goal.toLocaleString()}</div>}
      </div>
      {m.goal && (
        <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ height: '100%', borderRadius: '2px', background: m.color, width: `${Math.min(pct * 100, 100)}%`, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }}/>
        </div>
      )}
    </div>
  );
}

function WeekChart({ logs }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split('T')[0];
    const s = d.toLocaleDateString('en', { weekday: 'short' })[0];
    return { key, short: s, steps: logs[key]?.steps || 0 };
  });
  const max = Math.max(...days.map(d => d.steps), 1);
  return (
    <div style={{ background: C.white, borderRadius: '16px', padding: '20px', border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
      <div style={{ color: C.text, fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>📈 7-Day Steps</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
        {days.map((d, i) => {
          const isToday = d.key === todayStr();
          const h = Math.max((d.steps / max) * 100, 4);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: isToday ? C.green2 : C.greenSoft, height: `${h}%`, transition: 'height 0.5s ease' }}/>
              <div style={{ fontSize: '11px', fontWeight: '700', color: isToday ? C.green : C.muted }}>{d.short}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ state, onTabChange }) {
  const today = state.logs[todayStr()] || {};
  const { current = 0, best = 0 } = state.streaks || {};

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Streak banner */}
      <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, borderRadius: '20px', padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: `0 8px 32px rgba(27,122,62,0.3)` }}>
        <div>
          <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: '600', marginBottom: '4px' }}>Current streak</div>
          <div style={{ fontSize: '36px', fontWeight: '800', lineHeight: 1 }}>🔥 {current} days</div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>Best: {best} days</div>
        </div>
        <button onClick={() => onTabChange('tracker')} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50px', color: '#fff', fontSize: '13px', fontWeight: '700', padding: '10px 18px', cursor: 'pointer' }}>
          Log Today →
        </button>
      </div>

      {/* Metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {metrics.filter(m => m.key !== 'weight').map(m => (
          <MetricCard key={m.key} m={m} value={today[m.key] || 0}/>
        ))}
      </div>

      {/* Weight */}
      <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, boxShadow: C.shadow, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚖️</div>
          <div>
            <div style={{ color: C.muted, fontSize: '13px', fontWeight: '600' }}>Weight</div>
            <div style={{ color: '#B5883A', fontWeight: '800', fontSize: '20px' }}>{today.weight || '—'} <span style={{ color: C.muted, fontSize: '13px', fontWeight: '500' }}>kg</span></div>
          </div>
        </div>
        {state.profile?.height && today.weight && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: C.muted, fontSize: '11px' }}>BMI</div>
            <div style={{ color: C.green, fontWeight: '800', fontSize: '18px' }}>
              {(today.weight / Math.pow(state.profile.height / 100, 2)).toFixed(1)}
            </div>
          </div>
        )}
      </div>

      {/* 7 day chart */}
      <WeekChart logs={state.logs}/>

    </div>
  );
}

export default Dashboard;