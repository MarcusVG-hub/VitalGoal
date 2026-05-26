import React, { useState, useEffect, useRef } from 'react';
import { todayStr } from '../data/storage';

const C = {
  bg: '#F5FBF6', white: '#FFFFFF', green: '#1B7A3E',
  green2: '#28A855', green3: '#34D468', greenSoft: '#D4F5E0',
  dark: '#0D2415', text: '#1A3322', muted: '#4A7A5A',
  border: 'rgba(27,122,62,0.12)', shadow: '0 2px 16px rgba(27,122,62,0.08)',
};

const fields = [
  { key: 'water',    icon: '💧', label: 'Water',    unit: 'glasses', type: 'stepper', max: 20,   step: 1,   color: '#0284C7', bg: '#E0F2FE' },
  { key: 'steps',    icon: '🚶', label: 'Steps',    unit: 'steps',   type: 'number',  max: 50000,step: 500, color: '#1B7A3E', bg: '#D4F5E0' },
  { key: 'sleep',    icon: '😴', label: 'Sleep',    unit: 'hours',   type: 'slider',  max: 12,   step: 0.5, color: '#7C3AED', bg: '#EDE9FE' },
  { key: 'calories', icon: '🔥', label: 'Calories', unit: 'kcal',    type: 'calories',max: 5000, step: 50,  color: '#EA580C', bg: '#FFEDD5' },
  { key: 'weight',   icon: '⚖️', label: 'Weight',   unit: 'kg',      type: 'number',  max: 300,  step: 0.1, color: '#B5883A', bg: '#FEF3C7' },
  { key: 'mood',     icon: '😊', label: 'Mood',     unit: '',        type: 'mood',    max: 5,    step: 1,   color: '#DB2777', bg: '#FCE7F3' },
];

const moodEmojis = ['😞','😐','🙂','😄','🤩'];

// ── Food Scanner Modal ──
function FoodScanner({ onClose, onResult, isPremium }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleImage = async (file) => {
    if (!file) return;
    setScanning(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      try {
        const res = await fetch('/api/scan-food', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
        }
      } catch (err) {
        setError('Failed to scan food. Please try again.');
      } finally {
        setScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isPremium) {
    return (
      <div style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={onClose}>
        <div style={{ background: C.white, borderRadius:'24px', padding:'32px 24px', width:'100%', maxWidth:'360px', textAlign:'center' }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔒</div>
          <h3 style={{ color: C.dark, fontWeight:'800', fontSize:'20px', margin:'0 0 12px' }}>Premium Feature</h3>
          <p style={{ color: C.muted, fontSize:'15px', lineHeight:'1.6', marginBottom:'24px' }}>
            The food scanner is available on Premium. Upgrade to scan your food and auto-fill calories instantly.
          </p>
          <a href="https://buy.stripe.com/7sYdR85dX7K75xE0RyfAc06" target="_blank" rel="noopener noreferrer"
            style={{ display:'block', background:`linear-gradient(135deg, ${C.green}, ${C.green2})`, borderRadius:'50px', color:'#fff', fontSize:'15px', fontWeight:'700', padding:'14px', textDecoration:'none', boxShadow:`0 8px 24px rgba(27,122,62,0.3)` }}>
            Upgrade to Premium →
          </a>
          <button onClick={onClose} style={{ marginTop:'12px', background:'none', border:'none', color:C.muted, fontSize:'14px', cursor:'pointer', fontFamily:'inherit' }}>Maybe later</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={onClose}>
      <div style={{ background: C.white, borderRadius:'24px', padding:'28px 24px', width:'100%', maxWidth:'380px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
          <h3 style={{ color: C.dark, fontWeight:'800', fontSize:'20px', margin:0 }}>📸 Food Scanner</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'22px', cursor:'pointer', color:C.muted }}>×</button>
        </div>

        {!scanning && !result && (
          <>
            <p style={{ color:C.muted, fontSize:'14px', lineHeight:'1.6', marginBottom:'20px' }}>
              Take a photo or upload an image of your food and we'll estimate the calories and macros automatically.
            </p>
            <input ref={fileRef} type="file" accept="image/*" capture="environment"
              style={{ display:'none' }} onChange={e => handleImage(e.target.files[0])}/>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <button onClick={() => fileRef.current.click()} style={{
                background: `linear-gradient(135deg, ${C.green}, ${C.green2})`,
                border:'none', borderRadius:'50px', color:'#fff',
                fontSize:'15px', fontWeight:'700', padding:'14px',
                cursor:'pointer', fontFamily:'inherit',
                boxShadow:`0 8px 24px rgba(27,122,62,0.3)`,
              }}>📷 Take Photo or Upload</button>
            </div>
          </>
        )}

        {scanning && (
          <div style={{ textAlign:'center', padding:'32px 0' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🔍</div>
            <div style={{ color:C.green, fontWeight:'700', fontSize:'16px' }}>Analysing your food...</div>
            <div style={{ color:C.muted, fontSize:'13px', marginTop:'8px' }}>This takes a few seconds</div>
          </div>
        )}

        {error && (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>❌</div>
            <div style={{ color:'#DC2626', fontWeight:'700', fontSize:'15px', marginBottom:'16px' }}>{error}</div>
            <button onClick={() => { setError(null); setResult(null); }} style={{
              background: C.greenSoft, border:`1px solid ${C.green}33`,
              borderRadius:'50px', color:C.green, fontSize:'14px',
              fontWeight:'700', padding:'10px 24px', cursor:'pointer', fontFamily:'inherit',
            }}>Try Again</button>
          </div>
        )}

        {result && (
          <div>
            <div style={{ background:C.bg, borderRadius:'16px', padding:'16px', marginBottom:'16px' }}>
              <div style={{ color:C.dark, fontWeight:'800', fontSize:'18px', marginBottom:'12px' }}>🍽️ {result.food}</div>
              <div style={{ color:C.muted, fontSize:'13px', marginBottom:'12px' }}>Estimated serving: {result.serving}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {[
                  { label:'Calories', value:`${result.calories} kcal`, color:'#EA580C' },
                  { label:'Protein',  value:`${result.protein}g`,      color:C.green },
                  { label:'Carbs',    value:`${result.carbs}g`,        color:'#0284C7' },
                  { label:'Fat',      value:`${result.fat}g`,          color:'#B5883A' },
                ].map(m => (
                  <div key={m.label} style={{ background:C.white, borderRadius:'10px', padding:'10px', border:`1px solid ${C.border}`, textAlign:'center' }}>
                    <div style={{ color:m.color, fontWeight:'800', fontSize:'16px' }}>{m.value}</div>
                    <div style={{ color:C.muted, fontSize:'11px', marginTop:'2px' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={() => { onResult(result.calories); onClose(); }} style={{
                flex:1, background:`linear-gradient(135deg, ${C.green}, ${C.green2})`,
                border:'none', borderRadius:'50px', color:'#fff',
                fontSize:'15px', fontWeight:'700', padding:'14px',
                cursor:'pointer', fontFamily:'inherit',
                boxShadow:`0 8px 24px rgba(27,122,62,0.3)`,
              }}>✅ Add Calories</button>
              <button onClick={() => { setResult(null); }} style={{
                flex:1, background:C.greenSoft, border:`1px solid ${C.green}33`,
                borderRadius:'50px', color:C.green,
                fontSize:'15px', fontWeight:'700', padding:'14px',
                cursor:'pointer', fontFamily:'inherit',
              }}>🔄 Rescan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldCard({ field, value, onChange, isPremium }) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div style={{ background:C.white, borderRadius:'16px', padding:'18px', border:`1px solid ${C.border}`, boxShadow:C.shadow }}>
      {showScanner && (
        <FoodScanner
          isPremium={isPremium}
          onClose={() => setShowScanner(false)}
          onResult={(calories) => onChange(calories)}
        />
      )}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
        <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:field.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>{field.icon}</div>
        <div>
          <div style={{ color:C.text, fontWeight:'700', fontSize:'15px' }}>{field.label}</div>
          {field.unit && <div style={{ color:C.muted, fontSize:'12px' }}>{field.unit}</div>}
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'8px' }}>
          {field.type === 'calories' && (
            <button onClick={() => setShowScanner(true)} style={{
              background: isPremium ? `linear-gradient(135deg, ${C.green}, ${C.green2})` : C.greenSoft,
              border:'none', borderRadius:'50px',
              color: isPremium ? '#fff' : C.green,
              fontSize:'12px', fontWeight:'700', padding:'5px 12px',
              cursor:'pointer', fontFamily:'inherit',
              boxShadow: isPremium ? `0 4px 12px rgba(27,122,62,0.3)` : 'none',
            }}>
              {isPremium ? '📸 Scan' : '🔒 Scan'}
            </button>
          )}
          <div style={{ color:field.color, fontWeight:'800', fontSize:'20px' }}>
            {value || 0}
          </div>
        </div>
      </div>

      {field.type === 'stepper' && (
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={() => onChange(Math.max(0, (value||0) - 1))} style={{ width:'40px', height:'40px', borderRadius:'12px', background:'#F3F4F6', border:'none', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.text }}>−</button>
          <div style={{ flex:1, display:'flex', gap:'4px' }}>
            {Array.from({ length: Math.min(field.max, 10) }, (_, i) => (
              <div key={i} onClick={() => onChange(i + 1)} style={{ flex:1, height:'8px', borderRadius:'4px', background: i < (value||0) ? field.color : '#F3F4F6', cursor:'pointer', transition:'background 0.2s' }}/>
            ))}
          </div>
          <button onClick={() => onChange(Math.min(field.max, (value||0) + 1))} style={{ width:'40px', height:'40px', borderRadius:'12px', background:field.color, border:'none', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>+</button>
        </div>
      )}

      {field.type === 'slider' && (
        <div>
          <input type="range" min={0} max={field.max} step={field.step} value={value||0}
            onChange={e => onChange(parseFloat(e.target.value))}
            style={{ width:'100%', accentColor:field.color }}/>
          <div style={{ display:'flex', justifyContent:'space-between', color:C.muted, fontSize:'11px', marginTop:'4px' }}>
            <span>0h</span><span>{field.max}h</span>
          </div>
        </div>
      )}

      {(field.type === 'number' || field.type === 'calories') && (
        <input
          type="number" min={0} max={field.max} step={field.step}
          value={value || ''}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{ width:'100%', padding:'10px 14px', borderRadius:'10px', border:`1.5px solid ${C.border}`, background:C.bg, color:C.text, fontSize:'16px', outline:'none', fontFamily:'inherit' }}
        />
      )}

      {field.type === 'mood' && (
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          {moodEmojis.map((e, i) => (
            <button key={i} onClick={() => onChange(i + 1)}
              style={{ fontSize:(value||0) === i+1 ? '30px' : '22px', background:(value||0) === i+1 ? '#FCE7F3' : 'transparent', border:'none', cursor:'pointer', padding:'6px', borderRadius:'12px', transition:'all 0.2s', transform:(value||0) === i+1 ? 'scale(1.15)' : 'scale(1)' }}>
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Tracker({ state, onSave }) {
  const [date, setDate] = useState(todayStr());
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Check if user is premium (placeholder — will connect to Supabase later)
  const isPremium = state.profile?.isPremium || false;

  useEffect(() => {
    setForm(state.logs[date] || {});
  }, [date, state.logs]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(date, form);
    setSaving(false);
  };

  return (
    <div className="page-enter" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* Date picker */}
      <div style={{ background:C.white, borderRadius:'16px', padding:'16px', border:`1px solid ${C.border}`, boxShadow:C.shadow, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ color:C.muted, fontSize:'12px', fontWeight:'600' }}>Logging for</div>
          <div style={{ color:C.text, fontWeight:'700', fontSize:'16px' }}>
            {date === todayStr() ? 'Today' : new Date(date).toLocaleDateString('en', { weekday:'long', month:'short', day:'numeric' })}
          </div>
        </div>
        <input type="date" value={date} max={todayStr()} onChange={e => setDate(e.target.value)}
          style={{ padding:'8px 12px', borderRadius:'10px', border:`1.5px solid ${C.border}`, background:C.bg, color:C.text, fontSize:'14px', outline:'none', fontFamily:'inherit', cursor:'pointer' }}/>
      </div>

      {/* Fields */}
      {fields.map(f => (
        <FieldCard key={f.key} field={f} value={form[f.key]} onChange={v => set(f.key, v)} isPremium={isPremium}/>
      ))}

      {/* Save button */}
      <button onClick={handleSave} disabled={saving} style={{
        width:'100%', background: saving ? '#D4F5E0' : `linear-gradient(135deg, ${C.green}, ${C.green2})`,
        border:'none', borderRadius:'14px', color: saving ? C.muted : '#fff',
        fontSize:'16px', fontWeight:'700', padding:'16px',
        cursor: saving ? 'not-allowed' : 'pointer',
        boxShadow: saving ? 'none' : `0 8px 24px rgba(27,122,62,0.3)`,
        transition:'all 0.2s',
      }}>
        {saving ? 'Saving...' : '✅ Save Log'}
      </button>

    </div>
  );
}

export default Tracker;