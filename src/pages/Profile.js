import React, { useState } from 'react';
import { calcBMI, bmiLabel, clamp } from '../data/storage';

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

function Profile({ state, onSave, onSignOut }) {
  const [form, setForm] = useState({ ...state.profile });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const bmi = calcBMI(form.height, form.weight);
  const bl = bmiLabel(bmi);
  const bc = !bmi ? '#9ca3af'
    : bmi < 18.5 ? '#38bdf8'
    : bmi < 25   ? '#34d399'
    : bmi < 30   ? '#fb923c'
    : '#ef4444';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* BMI Card */}
      {bmi && (
        <div style={{
          ...card,
          background: 'linear-gradient(135deg, rgba(52,211,153,0.12), rgba(56,189,248,0.08))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Ring pct={clamp(((+bmi - 15) / 25) * 100, 0, 100)} size={80} stroke={8} color={bc}>
              <span style={{ color: '#fff', fontWeight: '800', fontSize: '16px' }}>{bmi}</span>
            </Ring>
            <div>
              <div style={{ color: bc, fontWeight: '700', fontSize: '22px' }}>{bl}</div>
              <div style={{ color: '#9ca3af', fontSize: '13px' }}>Body Mass Index</div>
              <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                Healthy range: 18.5 – 24.9
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Info */}
      <div style={card}>
        <div style={cardTitle}>👤 Personal Info</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          <div>
            <label style={label}>Name</label>
            <input
              style={input} type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={label}>Age</label>
              <input style={input} type="number"
                value={form.age} onChange={e => set('age', e.target.value)}
                placeholder="yrs" min="1" max="120"
              />
            </div>
            <div>
              <label style={label}>Height (cm)</label>
              <input style={input} type="number"
                value={form.height} onChange={e => set('height', e.target.value)}
                placeholder="cm"
              />
            </div>
            <div>
              <label style={label}>Weight (kg)</label>
              <input style={input} type="number"
                value={form.weight} onChange={e => set('weight', e.target.value)}
                placeholder="kg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Health Goal */}
      <div style={card}>
        <div style={cardTitle}>🎯 Health Goal</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {[
            ['lose',     '🔥 Lose Weight',   'Calorie deficit, more movement'],
            ['maintain', '⚖️ Stay Healthy',   'Balanced lifestyle'],
            ['gain',     '💪 Build Muscle',   'High protein, strength training'],
          ].map(([v, l, sub]) => (
            <button key={v} onClick={() => set('goal', v)} style={{
              ...goalBtn,
              ...(form.goal === v ? goalActive : {}),
            }}>
              <div>
                <div style={{ fontWeight: '600' }}>{l}</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={card}>
        <div style={cardTitle}>🏅 Achievements</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
          {[
            ['🔥', state.streaks.current, 'Current Streak'],
            ['🏆', state.streaks.best,    'Best Streak'],
          ].map(([icon, val, lbl]) => (
            <div key={lbl} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px', padding: '14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px' }}>{icon}</div>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '24px' }}>{val}</div>
              <div style={{ color: '#6b7280', fontSize: '12px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={() => onSave(form)} style={btnPrimary}>
        Save Profile ✓
      </button>

      {/* Sign Out */}
      <button onClick={onSignOut} style={{
        width: '100%',
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '12px',
        color: '#ef4444',
        fontSize: '16px',
        fontWeight: '700',
        padding: '14px',
        cursor: 'pointer',
        marginTop: '4px',
      }}>
        Sign Out
      </button>

    </div>
  );
}

// ── Styles ──
const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px', padding: '16px',
};
const cardTitle = { color: '#fff', fontWeight: '700', fontSize: '15px' };
const label = { color: '#6b7280', fontSize: '12px', marginBottom: '4px', display: 'block' };
const input = {
  width: '100%', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#fff',
  fontSize: '15px', padding: '10px 12px',
  outline: 'none', boxSizing: 'border-box',
};
const goalBtn = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#9ca3af',
  fontSize: '14px', padding: '12px 16px',
  cursor: 'pointer', textAlign: 'left', width: '100%',
};
const goalActive = {
  background: 'rgba(52,211,153,0.12)',
  border: '1px solid #34d399', color: '#34d399',
};
const btnPrimary = {
  width: '100%',
  background: 'linear-gradient(135deg, #34d399, #38bdf8)',
  border: 'none', borderRadius: '12px',
  color: '#0a0a0f', fontSize: '16px',
  fontWeight: '800', padding: '14px', cursor: 'pointer',
};

export default Profile;