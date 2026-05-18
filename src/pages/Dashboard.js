import React from 'react';
import { calcBMI, bmiLabel, last7Days, GOALS, clamp } from '../data/storage';

function Ring({ pct, size, stroke, color, children }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (clamp(pct, 0, 100) / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.34,1.56,.64,1)' }}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

function MiniBar({ values, color, max }) {
  const peak = Math.max(...values, max || 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px' }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{
            width: '100%',
            height: `${clamp((v / peak) * 44, v > 0 ? 3 : 0, 44)}px`,
            background: color,
            opacity: i === values.length - 1 ? 1 : 0.4,
            borderRadius: '3px',
            transition: 'height 0.4s cubic-bezier(.34,1.56,.64,1)',
          }}/>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ state, onTabChange }) {
  const log = state.logs[new Date().toISOString().split('T')[0]] || {};
  const days = last7Days();
  const l7 = days.map(d => state.logs[d] || {});
  const bmi = calcBMI(state.profile.height, state.profile.weight);

  const metrics = [
    { label: 'Water',    value: log.water    || 0, goal: GOALS.water,    unit: 'glasses', color: '#38bdf8', icon: '💧', arr: l7.map(d => d.water    || 0) },
    { label: 'Steps',    value: log.steps    || 0, goal: GOALS.steps,    unit: 'steps',   color: '#34d399', icon: '🚶', arr: l7.map(d => d.steps    || 0) },
    { label: 'Sleep',    value: log.sleep    || 0, goal: GOALS.sleep,    unit: 'hrs',     color: '#a78bfa', icon: '😴', arr: l7.map(d => d.sleep    || 0) },
    { label: 'Calories', value: log.calories || 0, goal: GOALS.calories, unit: 'kcal',    color: '#fb923c', icon: '🔥', arr: l7.map(d => d.calories || 0) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Today's overview */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={cardTitle}>Today's Overview</div>
          <div style={{ color: '#9ca3af', fontSize: '13px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {metrics.map(m => (
            <div key={m.label} style={metricCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Ring pct={(m.value / m.goal) * 100} size={52} stroke={5} color={m.color}>
                  <span style={{ fontSize: '14px' }}>{m.icon}</span>
                </Ring>
                <div>
                  <div style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>{m.value.toLocaleString()}</div>
                  <div style={{ color: '#6b7280', fontSize: '11px' }}>/ {m.goal.toLocaleString()} {m.unit}</div>
                </div>
              </div>
              <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>{m.label} · 7-day</div>
              <MiniBar values={m.arr} color={m.color} max={m.goal} />
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[
          { icon: '🔥', value: state.streaks.current, label: 'day streak' },
          { icon: '🏆', value: state.streaks.best,    label: 'best streak' },
          { icon: '⚖️', value: bmi || '—',            label: bmiLabel(bmi) },
        ].map((s, i) => (
          <div key={i} style={statChip}>
            <div style={{ fontSize: '22px' }}>{s.icon}</div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: '11px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mood */}
      {log.mood && (
        <div style={{ ...card, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '32px' }}>{['😞','😐','🙂','😄','🤩'][log.mood - 1]}</div>
          <div>
            <div style={{ color: '#fff', fontWeight: '600' }}>Today's Mood</div>
            <div style={{ color: '#6b7280', fontSize: '13px' }}>{['Rough','Okay','Good','Great','Amazing!'][log.mood - 1]}</div>
          </div>
        </div>
      )}

      {/* Quick log button */}
      <button onClick={() => onTabChange('tracker')} style={btnPrimary}>
        ✏️ Log Today's Data
      </button>

      {/* Shop banner */}
      <div onClick={() => onTabChange('shop')} style={{
        ...card,
        background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(56,189,248,0.1))',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>📚 VitalGoal Shop</div>
          <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>Ebooks & courses to level up your health</div>
        </div>
        <div style={{ color: '#34d399', fontSize: '20px' }}>→</div>
      </div>

    </div>
  );
}

// ── Shared styles ──
const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: '16px',
};
const cardTitle = { color: '#fff', fontWeight: '700', fontSize: '15px' };
const metricCard = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '12px',
  padding: '12px',
};
const statChip = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '12px',
  padding: '12px 8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  textAlign: 'center',
};
const btnPrimary = {
  width: '100%',
  background: 'linear-gradient(135deg, #34d399, #38bdf8)',
  border: 'none',
  borderRadius: '12px',
  color: '#0a0a0f',
  fontSize: '16px',
  fontWeight: '800',
  padding: '14px',
  cursor: 'pointer',
};

export default Dashboard;