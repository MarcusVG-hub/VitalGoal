import React, { useState, useEffect } from 'react';
import { todayStr, clamp } from '../data/storage';

function Tracker({ state, onSave }) {
  const [logDate, setLogDate] = useState(todayStr());
  const [local, setLocal] = useState({
    water: 0, steps: 0, sleep: 0,
    calories: 0, mood: 3, notes: '', weight: '',
  });

  useEffect(() => {
    const existing = state.logs[logDate] || {};
    setLocal({
      water: 0, steps: 0, sleep: 0,
      calories: 0, mood: 3, notes: '', weight: '',
      ...existing,
    });
  }, [logDate, state.logs]);

  const set = (k, v) => setLocal(l => ({ ...l, [k]: v }));
  const inc = (k, by, min, max) => setLocal(l => ({ ...l, [k]: clamp((l[k] || 0) + by, min, max) }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Date picker */}
      <div style={card}>
        <label style={label}>📅 Logging date</label>
        <input
          type="date"
          value={logDate}
          max={todayStr()}
          onChange={e => setLogDate(e.target.value)}
          style={input}
        />
      </div>

      {/* Water */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={cardTitle}>💧 Water</div>
          <div style={{ color: '#38bdf8', fontWeight: '700', fontSize: '20px' }}>
            {local.water} <span style={{ fontSize: '13px', color: '#6b7280' }}>/ 8 glasses</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
          <button style={countBtn} onClick={() => inc('water', -1, 0, 8)}>−</button>
          <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} onClick={() => set('water', i + 1)} style={{
                flex: 1, height: '28px', borderRadius: '4px', cursor: 'pointer',
                background: i < local.water ? '#38bdf8' : 'rgba(255,255,255,0.08)',
                transition: 'background 0.2s',
              }}/>
            ))}
          </div>
          <button style={countBtn} onClick={() => inc('water', 1, 0, 8)}>+</button>
        </div>
      </div>

      {/* Steps */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={cardTitle}>🚶 Steps</div>
          <div style={{ color: '#34d399', fontWeight: '700', fontSize: '20px' }}>
            {(local.steps || 0).toLocaleString()}
          </div>
        </div>
        <input type="range" min={0} max={20000} step={100}
          value={local.steps || 0}
          onChange={e => set('steps', +e.target.value)}
          style={{ width: '100%', accentColor: '#34d399', marginTop: '12px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
          <span>0</span><span>5k</span><span>10k</span><span>15k</span><span>20k</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {[2500, 5000, 7500, 10000].map(s => (
            <button key={s} onClick={() => set('steps', s)}
              style={{ ...chip, ...(local.steps === s ? chipActive : {}) }}>
              {s >= 1000 ? s / 1000 + 'k' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={cardTitle}>😴 Sleep</div>
          <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '20px' }}>
            {local.sleep || 0} <span style={{ fontSize: '13px', color: '#6b7280' }}>hrs</span>
          </div>
        </div>
        <input type="range" min={0} max={12} step={0.5}
          value={local.sleep || 0}
          onChange={e => set('sleep', +e.target.value)}
          style={{ width: '100%', accentColor: '#a78bfa', marginTop: '12px' }}
        />
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {[6, 7, 7.5, 8, 9].map(h => (
            <button key={h} onClick={() => set('sleep', h)}
              style={{ ...chip, ...(local.sleep === h ? chipActive : {}) }}>
              {h}h
            </button>
          ))}
        </div>
      </div>

      {/* Calories */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={cardTitle}>🔥 Calories</div>
          <div style={{ color: '#fb923c', fontWeight: '700', fontSize: '20px' }}>
            {(local.calories || 0).toLocaleString()} <span style={{ fontSize: '13px', color: '#6b7280' }}>kcal</span>
          </div>
        </div>
        <input type="number" placeholder="Enter calories eaten"
          value={local.calories || ''}
          onChange={e => set('calories', +e.target.value)}
          style={{ ...input, marginTop: '12px' }}
        />
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {[1500, 1800, 2000, 2500].map(c => (
            <button key={c} onClick={() => set('calories', c)}
              style={{ ...chip, ...(local.calories === c ? chipActive : {}) }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Weight */}
      <div style={card}>
        <div style={cardTitle}>⚖️ Weight (kg)</div>
        <input type="number" step="0.1" placeholder="Today's weight"
          value={local.weight || ''}
          onChange={e => set('weight', +e.target.value)}
          style={{ ...input, marginTop: '10px' }}
        />
      </div>

      {/* Mood */}
      <div style={card}>
        <div style={cardTitle}>😊 Mood</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '14px' }}>
          {['😞','😐','🙂','😄','🤩'].map((e, i) => (
            <div key={i} onClick={() => set('mood', i + 1)} style={{
              fontSize: '32px', cursor: 'pointer',
              opacity: local.mood === i + 1 ? 1 : 0.3,
              transform: local.mood === i + 1 ? 'scale(1.3)' : 'scale(1)',
              transition: 'all 0.2s',
            }}>{e}</div>
          ))}
        </div>
        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '10px' }}>
          {['Rough day','Just okay','Pretty good','Great day!','Amazing! 🚀'][local.mood - 1]}
        </div>
      </div>

      {/* Notes */}
      <div style={card}>
        <div style={cardTitle}>📝 Notes</div>
        <textarea
          placeholder="Any notes about today..."
          value={local.notes || ''}
          onChange={e => set('notes', e.target.value)}
          rows={3}
          style={{ ...input, resize: 'none', marginTop: '10px', fontFamily: 'inherit' }}
        />
      </div>

      {/* Save */}
      <button onClick={() => onSave(logDate, local)} style={btnPrimary}>
        Save Today's Log ✓
      </button>

    </div>
  );
}

// ── Styles ──
const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: '16px',
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
const countBtn = {
  background: 'rgba(255,255,255,0.08)', border: 'none',
  borderRadius: '8px', color: '#fff', fontSize: '20px',
  width: '36px', height: '36px', cursor: 'pointer', flexShrink: 0,
};
const chip = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px', color: '#9ca3af',
  fontSize: '13px', padding: '5px 12px', cursor: 'pointer',
};
const chipActive = {
  background: 'rgba(52,211,153,0.15)',
  border: '1px solid #34d399', color: '#34d399',
};
const btnPrimary = {
  width: '100%',
  background: 'linear-gradient(135deg, #34d399, #38bdf8)',
  border: 'none', borderRadius: '12px',
  color: '#0a0a0f', fontSize: '16px',
  fontWeight: '800', padding: '14px', cursor: 'pointer',
};

export default Tracker;