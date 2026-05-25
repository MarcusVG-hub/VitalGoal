import React, { useState } from 'react';

const C = {
  bg: '#F5FBF6', bgAlt: '#EAF6ED', white: '#FFFFFF',
  green: '#1B7A3E', green2: '#28A855', greenSoft: '#D4F5E0',
  dark: '#0D2415', text: '#1A3322', muted: '#4A7A5A',
  border: 'rgba(27,122,62,0.12)', shadow: '0 2px 16px rgba(27,122,62,0.08)',
};

function Profile({ state, onSave, onSignOut }) {
  const [form, setForm] = useState({ ...state.profile });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const bmi = form.weight && form.height
    ? (form.weight / Math.pow(form.height / 100, 2)).toFixed(1)
    : null;

  const bmiCategory = bmi
    ? bmi < 18.5 ? { label: 'Underweight', color: '#0284C7' }
    : bmi < 25   ? { label: 'Healthy',     color: '#1B7A3E' }
    : bmi < 30   ? { label: 'Overweight',  color: '#EA580C' }
    :              { label: 'Obese',        color: '#DC2626' }
    : null;

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    borderRadius: '12px', border: `1.5px solid ${C.border}`,
    background: C.bg, color: C.text, fontSize: '15px',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Profile card */}
      <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: `0 8px 32px rgba(27,122,62,0.3)` }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 auto 12px' }}>
          {form.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div style={{ color: '#fff', fontWeight: '800', fontSize: '20px' }}>{form.name || 'Your Name'}</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '4px' }}>
          {form.goal === 'lose' ? '🔥 Goal: Lose Weight' : form.goal === 'gain' ? '💪 Goal: Build Muscle' : '⚖️ Goal: Stay Healthy'}
        </div>
      </div>

      {/* BMI card */}
      {bmi && (
        <div style={{ background: C.white, borderRadius: '16px', padding: '16px', border: `1px solid ${C.border}`, boxShadow: C.shadow, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: C.muted, fontSize: '13px', fontWeight: '600' }}>Your BMI</div>
            <div style={{ color: bmiCategory.color, fontWeight: '800', fontSize: '32px', lineHeight: 1 }}>{bmi}</div>
            <div style={{ color: bmiCategory.color, fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>{bmiCategory.label}</div>
          </div>
          <div style={{ textAlign: 'right', color: C.muted, fontSize: '12px', lineHeight: '1.8' }}>
            <div>Under 18.5 — Underweight</div>
            <div style={{ color: C.green, fontWeight: '700' }}>18.5 – 24.9 — Healthy ✓</div>
            <div>25 – 29.9 — Overweight</div>
            <div>30+ — Obese</div>
          </div>
        </div>
      )}

      {/* Form */}
      <div style={{ background: C.white, borderRadius: '16px', padding: '20px', border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
        <div style={{ color: C.text, fontWeight: '700', fontSize: '16px', marginBottom: '16px' }}>👤 Your Profile</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Name</label>
            <input style={inputStyle} placeholder="Your name" value={form.name || ''} onChange={e => set('name', e.target.value)}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Age</label>
              <input style={inputStyle} type="number" placeholder="Age" value={form.age || ''} onChange={e => set('age', e.target.value)}/>
            </div>
            <div>
              <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Gender</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.gender || ''} onChange={e => set('gender', e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Height (cm)</label>
              <input style={inputStyle} type="number" placeholder="Height" value={form.height || ''} onChange={e => set('height', e.target.value)}/>
            </div>
            <div>
              <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Weight (kg)</label>
              <input style={inputStyle} type="number" placeholder="Weight" value={form.weight || ''} onChange={e => set('weight', e.target.value)}/>
            </div>
          </div>
          <div>
            <label style={{ color: C.muted, fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Goal</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[['lose','🔥 Lose Weight'],['maintain','⚖️ Stay Healthy'],['gain','💪 Build Muscle']].map(([v,l]) => (
                <button key={v} onClick={() => set('goal', v)} style={{
                  flex: 1, padding: '10px 6px', borderRadius: '10px', border: 'none',
                  background: form.goal === v ? C.greenSoft : '#F3F4F6',
                  outline: form.goal === v ? `1.5px solid ${C.green}` : '1.5px solid transparent',
                  color: form.goal === v ? C.green : C.muted,
                  fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} disabled={saving} style={{
        width: '100%', background: saving ? C.greenSoft : `linear-gradient(135deg, ${C.green}, ${C.green2})`,
        border: 'none', borderRadius: '14px', color: saving ? C.muted : '#fff',
        fontSize: '16px', fontWeight: '700', padding: '16px',
        cursor: saving ? 'not-allowed' : 'pointer',
        boxShadow: saving ? 'none' : `0 8px 24px rgba(27,122,62,0.3)`,
        transition: 'all 0.2s',
      }}>
        {saving ? 'Saving...' : '💾 Save Profile'}
      </button>

      {/* Sign out */}
      <button onClick={onSignOut} style={{
        width: '100%', background: 'none',
        border: '1.5px solid rgba(220,38,38,0.25)',
        borderRadius: '14px', color: '#DC2626',
        fontSize: '15px', fontWeight: '700', padding: '14px',
        cursor: 'pointer', transition: 'all 0.2s',
      }}>
        Sign Out
      </button>

    </div>
  );
}

export default Profile;