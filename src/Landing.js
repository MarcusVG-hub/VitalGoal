import React, { useState } from 'react';
import Contact from './pages/Contact';
const C = {
  green:    '#1B7A3E',
  green2:   '#28A855',
  green3:   '#34D468',
  greenSoft:'#D4F5E0',
  gold:     '#B5883A',
  goldSoft: '#F4E4C1',
  bg:       '#F5FBF6',
  bgAlt:    '#EAF6ED',
  dark:     '#0D2415',
  text:     '#1A3322',
  muted:    '#4A7A5A',
  white:    '#FFFFFF',
  border:   'rgba(27,122,62,0.15)',
};


function AnimationStyles() {
  return (
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to   { opacity: 1; transform: scale(1); }
      }
      .anim-fadeup {
        opacity: 0;
        animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
      }
      .anim-fadein {
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;
      }
      .hover-lift {
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      }
      .hover-lift:hover {
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 40px rgba(27,122,62,0.15) !important;
      }
      .hover-lift-dark:hover {
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.3) !important;
      }
      .hover-btn {
        transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease !important;
      }
      .hover-btn:hover {
        transform: translateY(-2px) !important;
        opacity: 0.92 !important;
      }
      .hover-btn:active {
        transform: scale(0.97) !important;
      }
      .hover-nav {
        transition: color 0.2s ease !important;
      }
      .hover-nav:hover {
        color: #1B7A3E !important;
      }
      .reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .faq-item {
        transition: background 0.2s ease !important;
      }
      .faq-item:hover {
        background: #EAF6ED !important;
      }
      .nav-links {
        display: flex;
        gap: 32px;
        align-items: center;
      }
      @media (max-width: 640px) {
        .nav-links { display: none; }
        .nav-links-mobile { display: flex !important; }
      }
      @media (min-width: 641px) {
        .nav-links-mobile { display: none !important; }
      }
    `}</style>
  );
}

// Scroll reveal hook
function useReveal() {
  const [refs] = React.useState(() => new Map());
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [refs]);
  const ref = (key) => (el) => { if (el) refs.set(key, el); };
  return ref;
}

function Blobs() {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'hidden' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="b1"><feGaussianBlur stdDeviation="40"/></filter>
        <filter id="b2"><feGaussianBlur stdDeviation="55"/></filter>
        <filter id="b3"><feGaussianBlur stdDeviation="35"/></filter>
      </defs>
      <ellipse cx="10%" cy="15%" rx="320" ry="260" fill="#28A855" opacity="0.09" filter="url(#b1)"/>
      <ellipse cx="88%" cy="8%"  rx="240" ry="200" fill="#1B7A3E" opacity="0.07" filter="url(#b2)"/>
      <ellipse cx="55%" cy="45%" rx="180" ry="150" fill="#34D468" opacity="0.06" filter="url(#b3)"/>
      <ellipse cx="92%" cy="85%" rx="300" ry="240" fill="#28A855" opacity="0.08" filter="url(#b1)"/>
      <ellipse cx="8%"  cy="80%" rx="160" ry="140" fill="#1B7A3E" opacity="0.06" filter="url(#b2)"/>
    </svg>
  );
}

function DotGrid() {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.35 }}>
      <defs>
        <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={C.green} opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  );
}

// ── App mockup using pure CSS/SVG ──
function AppMockup() {
  return (
    <div style={{
      position: 'relative', width: '260px', margin: '60px auto 0',
      filter: 'drop-shadow(0 32px 64px rgba(27,122,62,0.25))',
    }}>
      {/* Phone frame */}
      <div style={{
        width: '260px', height: '520px',
        background: '#0a0a0f',
        borderRadius: '40px',
        border: '2px solid rgba(255,255,255,0.12)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          width: '80px', height: '20px',
          background: '#0a0a0f',
          borderRadius: '0 0 14px 14px',
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
        }}/>

        {/* App header */}
        <div style={{ padding: '28px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', background: 'linear-gradient(135deg, #34d399, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>⚡ VitalGoal</div>
              <div style={{ color: '#6b7280', fontSize: '9px', marginTop: '1px' }}>Hello, Marcus 👋</div>
            </div>
            <div style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', color: '#fb923c', fontSize: '8px', fontWeight: '700', borderRadius: '20px', padding: '3px 8px' }}>🔥 7 day streak</div>
          </div>
        </div>

        {/* Metric rings */}
        <div style={{ display: 'flex', gap: '6px', padding: '10px 10px 6px' }}>
          {[
            { icon:'💧', val:'6/8', label:'Water', color:'#38bdf8', pct:75 },
            { icon:'🚶', val:'8.2k', label:'Steps', color:'#34d399', pct:82 },
            { icon:'😴', val:'7.5h', label:'Sleep', color:'#a78bfa', pct:94 },
          ].map(m => (
            <div key={m.label} style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'8px 6px', textAlign:'center' }}>
              <svg width="32" height="32" style={{ transform:'rotate(-90deg)', display:'block', margin:'0 auto' }}>
                <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
                <circle cx="16" cy="16" r="12" fill="none" stroke={m.color} strokeWidth="3"
                  strokeDasharray={`${2*Math.PI*12}`}
                  strokeDashoffset={`${2*Math.PI*12*(1-m.pct/100)}`}
                  strokeLinecap="round"/>
              </svg>
              <div style={{ color:'#fff', fontWeight:'700', fontSize:'9px', marginTop:'3px' }}>{m.val}</div>
              <div style={{ color:'#6b7280', fontSize:'8px' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div style={{ padding:'6px 10px 8px' }}>
          <div style={{ color:'#fff', fontSize:'9px', fontWeight:'700', marginBottom:'6px' }}>📈 7-Day Steps</div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'4px', height:'36px' }}>
            {[35,55,42,70,60,48,85].map((h,i) => (
              <div key={i} style={{ flex:1, height:`${h}%`, background: i===6 ? '#34d399' : '#34d39966', borderRadius:'3px 3px 0 0' }}/>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'3px' }}>
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <div key={i} style={{ flex:1, color: i===6 ? '#34d399' : '#374151', fontSize:'7px', textAlign:'center' }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Streak chips */}
        <div style={{ display:'flex', gap:'5px', padding:'0 10px 8px' }}>
          {[['🔥','7','streak'],['🏆','14','best'],['⚖️','22.4','BMI']].map(([icon,val,lbl]) => (
            <div key={lbl} style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'6px 4px', textAlign:'center' }}>
              <div style={{ fontSize:'12px' }}>{icon}</div>
              <div style={{ color:'#fff', fontWeight:'700', fontSize:'10px' }}>{val}</div>
              <div style={{ color:'#6b7280', fontSize:'7px' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Mood row */}
        <div style={{ display:'flex', justifyContent:'space-around', padding:'0 16px 10px' }}>
          {['😞','😐','🙂','😄','🤩'].map((e,i) => (
            <div key={i} style={{ fontSize:'16px', opacity: i===3 ? 1 : 0.25, transform: i===3 ? 'scale(1.2)' : 'scale(1)' }}>{e}</div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(10,10,15,0.95)', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', padding:'8px 0 12px' }}>
          {[['📊','Home'],['✏️','Log'],['🛒','Shop'],['👤','Profile']].map(([icon,label],i) => (
            <div key={label} style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontSize:'14px' }}>{icon}</div>
              <div style={{ fontSize:'8px', color: i===0 ? '#34d399' : '#4b5563', fontWeight:'600' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Glow under phone */}
      <div style={{ position:'absolute', bottom:'-20px', left:'10%', right:'10%', height:'40px', background:'rgba(27,122,62,0.3)', filter:'blur(20px)', borderRadius:'50%' }}/>
    </div>
  );
}


function PricingCards({ onGetStarted }) {
  const [premiumAnnual, setPremiumAnnual] = React.useState(false);

  const Toggle = ({ value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: !value ? '#fff' : 'rgba(255,255,255,0.4)' }}>Monthly</span>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: '44px', height: '24px', borderRadius: '12px',
          background: value ? '#34D468' : 'rgba(255,255,255,0.2)',
          cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        }}
      >
        <div style={{
          position: 'absolute', top: '3px',
          left: value ? '23px' : '3px',
          width: '18px', height: '18px', borderRadius: '50%',
          background: '#fff', transition: 'left 0.2s',
        }}/>
      </div>
      <span style={{ fontSize: '13px', fontWeight: '600', color: value ? '#fff' : 'rgba(255,255,255,0.4)' }}>Annual</span>
      <span style={{ background: '#34D468', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', color: '#0D2415', fontWeight: '700' }}>Save 40%</span>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'stretch', maxWidth: '700px', margin: '0 auto' }}>

      {/* Free */}
      <div style={{ background: '#fff', border: '1px solid rgba(27,122,62,0.15)', borderRadius: '24px', padding: '36px 28px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#4A7A5A', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>Free</div>
        <div style={{ color: '#1A3322', fontWeight: '700', fontSize: '40px', marginBottom: '4px' }}>€0</div>
        <div style={{ color: '#4A7A5A', fontSize: '14px', marginBottom: '28px' }}>Forever free</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
          {['Full health tracker','Water, steps, sleep, calories, mood','7-day charts and insights','Streak tracking','BMI calculator'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#1A3322', fontSize: '14px' }}>
              <span style={{ color: '#1B7A3E', fontWeight: '700', fontSize: '16px', flexShrink: 0 }}>✓</span>{f}
            </div>
          ))}
        </div>
        <button onClick={onGetStarted} style={{ width: '100%', background: '#EAF6ED', border: '1px solid rgba(27,122,62,0.15)', borderRadius: '50px', color: '#1B7A3E', fontSize: '15px', fontWeight: '700', padding: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
          Get Started Free
        </button>
      </div>

      {/* Premium */}
      <div style={{ background: '#0D2415', border: '2px solid #28A855', borderRadius: '24px', padding: '36px 28px', textAlign: 'left', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#28A855', borderRadius: '50px', padding: '4px 12px', color: '#fff', fontSize: '11px', fontWeight: '700' }}>🔥 Popular</div>
        <div style={{ color: '#34D468', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>Premium</div>
        <Toggle value={premiumAnnual} onChange={setPremiumAnnual} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
          <div style={{ color: '#fff', fontWeight: '700', fontSize: '40px' }}>{premiumAnnual ? '€89.99' : '€14.99'}</div>
          {premiumAnnual && <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', textDecoration: 'line-through' }}>€179.88</div>}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '28px' }}>
          {premiumAnnual ? 'per year · €7.50/mo · 7-day free trial' : 'per month · 7-day free trial'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
          {[
            'Everything in Free',
            'Unlimited data history',
            'Priority support',
            '10% off all guides',
            'Early access to new features',
            'Premium profile badge',
            '🤖 AI Health Assistant (coming soon)',
            '📊 AI weekly health report (coming soon)',
            '🎯 Personalised AI recommendations (coming soon)',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
              <span style={{ color: '#34D468', fontWeight: '700', fontSize: '16px', flexShrink: 0 }}>✓</span>{f}
            </div>
          ))}
        </div>
        <a href={premiumAnnual ? 'https://buy.stripe.com/14A3cugWF0hF8JQ6bSfAc0f' : 'https://buy.stripe.com/7sYdR85dX7K75xE0RyfAc06'} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #1B7A3E, #28A855)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '15px', fontWeight: '700', padding: '14px', textDecoration: 'none', textAlign: 'center', boxShadow: '0 8px 32px rgba(27,122,62,0.4)', boxSizing: 'border-box' }}>
          Start Free Trial →
        </a>
      </div>

    </div>
  );
}



function Landing({ onGetStarted }) {
  const [openFaq, setOpenFaq] = useState(null);
  const reveal = useReveal();
  const [showContact, setShowContact] = useState(false);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Nunito', 'Segoe UI', sans-serif", overflowX: 'hidden' }}>
      <AnimationStyles />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
        background: 'rgba(245,251,246,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px', background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>⚡ VitalGoal</div>
        <div className="nav-links">
          <a href="#features" className="hover-nav" style={{ color: C.muted, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>Features</a>
          <a href="#shop"     className="hover-nav" style={{ color: C.muted, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>Shop</a>
          <a href="#why"      className="hover-nav" style={{ color: C.muted, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>Why Us</a>
          <button onClick={onGetStarted} className="hover-btn" style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '15px', fontWeight: '600', padding: '10px 24px', cursor: 'pointer', boxShadow: `0 4px 20px ${C.green}44` }}>Get Started Free</button>
        </div>
        <button onClick={onGetStarted} className="nav-links-mobile" style={{ display: 'none', background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '14px', fontWeight: '600', padding: '9px 18px', cursor: 'pointer' }}>Start Free</button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(100px, 12vw, 140px) clamp(20px, 5vw, 32px) clamp(60px, 8vw, 80px)', background: '#E8F5EC', position: 'relative', overflow: 'hidden' }}>
        <Blobs />
        <DotGrid />
        <div style={{ position:'relative', zIndex:1, maxWidth:'780px', margin:'0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: C.white, border: `1px solid ${C.border}`, borderRadius: '50px', padding: '8px 20px', marginBottom: '40px', boxShadow: `0 2px 16px ${C.green}14` }}>
            <span style={{ fontSize: '16px' }}>🌿</span>
            <span style={{ color: C.green, fontSize: '14px', fontWeight: '600' }}>Built by someone who actually uses it</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: '700', lineHeight: '1.08', letterSpacing: '-2px', color: C.dark, margin: '0 0 28px' }}>
            Track your health.<br />
            Read the science.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green} 0%, ${C.green2} 60%, ${C.green3} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Become your best self.</span>
          </h1>

          <p style={{ color: C.muted, fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: '1.65', maxWidth: '560px', margin: '0 auto 48px', fontWeight: '500' }}>
            Most health apps waste your time. VitalGoal lets you log your water, sleep, steps, calories and mood in seconds — then gets out of your day. No complicated menus. No confusion. Just done.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '17px', fontWeight: '600', padding: '16px 40px', cursor: 'pointer', boxShadow: `0 8px 32px ${C.green}40` }}>Start Tracking Free →</button>
            <a href="#shop" style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '50px', color: C.green, fontSize: '17px', fontWeight: '600', padding: '16px 40px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>Browse Guides</a>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['💧','Hydration'],['😴','Sleep'],['🚶','Steps'],['🔥','Calories'],['😊','Mood'],['⚖️','BMI']].map(([icon,label]) => (
              <div key={label} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '50px', padding: '10px 20px', fontSize: '14px', fontWeight: '600', color: C.text, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>

          {/* App mockup */}
          <AppMockup />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: C.green, padding: '24px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px 40px', textAlign: 'center' }}>
          {[
            ['6', 'Health Guides'],
            ['5', 'Daily Metrics'],
            ['100%', 'Free App'],
            ['0', 'Subscriptions'],
            ['30s', 'Daily Log Time'],
          ].map(([val, label]) => (
            <div key={label}>
              <div style={{ color: C.white, fontWeight: '700', fontSize: '32px', lineHeight: '1' }}>{val}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div ref={reveal('app')} className="reveal" style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>📱 The App</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', letterSpacing: '-1.5px', color: C.dark, margin: '0 0 20px' }}>
            Everything you need.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Nothing you don't.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: '18px', lineHeight: '1.65', maxWidth: '520px', margin: '0 auto 72px', fontWeight: '500' }}>
            A beautifully simple health tracker that works on any device. No download. No account required to start.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {[
              { icon:'📊', title:'Smart Dashboard',  desc:'See all your health metrics at a glance with beautiful progress rings and 7-day trend charts.' },
              { icon:'✏️', title:'Daily Logging',     desc:'Log water, steps, sleep, calories, weight and mood in seconds with intuitive one-tap controls.' },
              { icon:'📈', title:'Weekly Insights',   desc:'Track your trends over time and see exactly how your habits are evolving week by week.' },
              { icon:'🔥', title:'Streak Tracking',   desc:'Build lasting consistency with daily streaks that motivate you to show up every single day.' },
              { icon:'⚖️', title:'BMI Calculator',    desc:'Monitor your body composition with a built-in BMI tracker linked directly to your profile.' },
              { icon:'🔒', title:'100% Private',      desc:'Your data belongs to you. No ads, no data selling, no subscriptions. Ever.' },
            ].map(f => (
              <div key={f.title} className="hover-lift" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(27,122,62,0.06)' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>{f.icon}</div>
                <div style={{ color: C.dark, fontWeight: '700', fontSize: '17px', marginBottom: '10px' }}>{f.title}</div>
                <div style={{ color: C.muted, fontSize: '15px', lineHeight: '1.6' }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={onGetStarted} style={{ marginTop: '56px', background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '17px', fontWeight: '600', padding: '16px 40px', cursor: 'pointer', boxShadow: `0 8px 32px ${C.green}40` }}>Try the App Free →</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)', background: C.bgAlt }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div ref={reveal('reviews')} className="reveal" style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>⭐ What People Say</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', letterSpacing: '-1px', color: C.dark, margin: '0 0 56px' }}>
            Real people.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Real results.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {[
              { name: 'Sarah M.', age: '28', quote: "I've tried every health app out there. VitalGoal is the only one I actually stuck with. The daily streak feature alone changed everything for me.", stars: 5 },
              { name: 'James K.', age: '34', quote: "The Sleep Unlocked guide genuinely fixed my sleep in two weeks. I was sceptical but the science is solid and the advice actually works.", stars: 5 },
              { name: 'Priya R.', age: '25', quote: "So simple. I log everything in under a minute every morning. After 30 days I could actually see my habits improving in the charts. Love it.", stars: 5 },
            ].map(t => (
              <div key={t.name} className="hover-lift" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(27,122,62,0.06)' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array(t.stars).fill('⭐').map((s,i) => <span key={i} style={{ fontSize: '14px' }}>{s}</span>)}
                </div>
                <p style={{ color: C.text, fontSize: '15px', lineHeight: '1.65', margin: '0 0 20px', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: C.green }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ color: C.dark, fontWeight: '700', fontSize: '14px' }}>{t.name}</div>
                    <div style={{ color: C.muted, fontSize: '12px' }}>Age {t.age}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PRICING */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: C.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>💚 Pricing</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', letterSpacing: '-1.5px', color: C.dark, margin: '0 0 20px' }}>
            Choose your plan.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Cancel anytime.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: '18px', lineHeight: '1.65', maxWidth: '520px', margin: '0 auto 56px', fontWeight: '500' }}>
            Start with a 7-day free trial on all paid plans. No credit card needed until your trial ends.
          </p>

          <PricingCards onGetStarted={onGetStarted} />

          <p style={{ color: C.muted, fontSize: '14px', marginTop: '40px' }}>
            🔒 Secure payment via Stripe · Cancel anytime · 7-day free trial on all plans
          </p>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: C.white, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice">
          <defs><filter id="bs"><feGaussianBlur stdDeviation="50"/></filter></defs>
          <ellipse cx="90%" cy="30%" rx="300" ry="250" fill={C.green} opacity="0.05" filter="url(#bs)"/>
          <ellipse cx="10%" cy="70%" rx="250" ry="200" fill={C.green2} opacity="0.04" filter="url(#bs)"/>
        </svg>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div ref={reveal('shop')} className="reveal" style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>📚 The Shop</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', letterSpacing: '-1.5px', color: C.dark, margin: '0 0 20px' }}>
            Science-backed guides.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Real results.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: '18px', lineHeight: '1.65', maxWidth: '520px', margin: '0 auto 72px', fontWeight: '500' }}>
            No fads. No fluff. Just clear, practical guides grounded in peer-reviewed research.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {[
              { emoji:'💧', title:'The Hydration Code',       price:'€14.99',  desc:'Transform your energy, skin and focus by mastering daily hydration habits.',                            isPremium: false, link:'https://buy.stripe.com/6oU3cugWF6G3d06fMsfAc0b' },
              { emoji:'😴', title:'Sleep Unlocked',         price:'€14.99',  desc:'Fix your sleep, build a night routine and wake up energised every single day.',                        isPremium: false, link:'https://buy.stripe.com/cNi00icGp5BZ7FMfMsfAc0c' },
              { emoji:'🔥', title:'Fat Loss Simplified',      price:'€14.99',  desc:'Lose fat and keep it off with a simple, science-backed calorie and habit guide.',                      isPremium: false, link:'https://buy.stripe.com/9B6bJ00XHc0n9NUcAgfAc0d' },
              { emoji:'💪', title:'Build Muscle at Home',     price:'€14.99',  desc:'Build real muscle with no gym and no equipment using progressive bodyweight training.',                isPremium: false, link:'https://buy.stripe.com/7sYcN46i11lJ6BIgQwfAc0e' },
              { emoji:'🌱', title:'30 Day Glow Up Blueprint',     price:'€24.99', desc:'A complete month of daily health, fitness and mindset tasks to transform how you look and feel.',      isPremium: true,  badge:'⭐ Premium', link:'https://buy.stripe.com/aFa9ASgWF1lJe4a2ZGfAc0a' },
              { emoji:'🧠', title:'Mental Clarity Blueprint', price:'€24.99', desc:'Reduce brain fog, build laser focus and create a daily routine that keeps your mind sharp all day.',   isPremium: true,  badge:'⭐ Premium', link:'https://buy.stripe.com/bJefZgayh5BZ1hocAgfAc09' },
            ].map(e => (
              <div key={e.title} className="hover-lift" style={{ background: C.bg, border: e.isPremium ? `1.5px solid ${C.gold}55` : `1px solid ${C.border}`, borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', boxShadow: e.isPremium ? `0 4px 24px ${C.gold}22` : '0 4px 24px rgba(27,122,62,0.07)' }}>
                {e.badge && (
                  <div style={{ alignSelf: 'flex-start', background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: '50px', padding: '4px 12px', color: C.gold, fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>{e.badge}</div>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
                  <div style={{ width:'52px', height:'52px', borderRadius:'14px', background: e.isPremium ? C.goldSoft : C.greenSoft, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', flexShrink:0 }}>{e.emoji}</div>
                  <div>
                    <div style={{ color: C.dark, fontWeight: '700', fontSize: '16px' }}>{e.title}</div>
                    <div style={{ color: C.muted, fontSize: '13px', marginTop: '2px' }}>📄 Guide</div>
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: '14px', lineHeight: '1.6', flex: 1, margin: '0 0 20px' }}>{e.desc}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'16px', borderTop:`1px solid ${C.border}` }}>
                  <div style={{ color: e.isPremium ? C.gold : C.green, fontWeight: '700', fontSize: '24px' }}>{e.price}</div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" style={{ background: e.isPremium ? `linear-gradient(135deg, ${C.gold}, #D4A843)` : `linear-gradient(135deg, ${C.green}, ${C.green2})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '14px', fontWeight: '600', padding: '10px 24px', textDecoration: 'none', display: 'inline-block', boxShadow: e.isPremium ? `0 4px 16px ${C.gold}44` : `0 4px 16px ${C.green}44` }}>Buy Now →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', background: C.bgAlt }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div ref={reveal('why')} className="reveal" style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>💚 Why VitalGoal</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '700', letterSpacing: '-1.5px', color: C.dark, margin: '0 0 20px' }}>
            Built for people,<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>not profit.</span>
          </h2>
          <p style={{ color: C.muted, fontSize: '18px', lineHeight: '1.65', maxWidth: '520px', margin: '0 auto 72px', fontWeight: '500' }}>
            We built VitalGoal because health tools should be simple, honest and accessible to everyone.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { icon:'🚫', title:'No Subscriptions',  desc:'The app is free. Guides are one-time purchases. No recurring charges. Ever.' },
              { icon:'🔒', title:'Your Data is Yours', desc:'We never sell your data, show ads or share your information with anyone.' },
              { icon:'📱', title:'Works Everywhere',   desc:'Works on any phone, tablet or computer instantly. No app store needed.' },
              { icon:'🧬', title:'Science-Backed',     desc:'Every guide is grounded in peer-reviewed research, not trends.' },
            ].map(w => (
              <div key={w.title} className="hover-lift" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(27,122,62,0.06)' }}>
                <div style={{ width:'60px', height:'60px', borderRadius:'18px', background: C.greenSoft, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', margin:'0 auto 20px' }}>{w.icon}</div>
                <div style={{ color: C.dark, fontWeight: '700', fontSize: '16px', marginBottom: '10px' }}>{w.title}</div>
                <div style={{ color: C.muted, fontSize: '14px', lineHeight: '1.6' }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '24px', color: C.green, fontSize: '14px', fontWeight: '600' }}>❓ FAQ</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', letterSpacing: '-1px', color: C.dark, margin: '0 0 48px' }}>
            Questions? <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Answered.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            {[
              { q: 'Is the app really free?', a: 'Yes, completely. The VitalGoal health tracker app is free to use with no hidden charges, no premium tier and no subscription. Create an account and start tracking today.' },
              { q: 'How do I get my guide after buying?', a: 'Instantly. As soon as your payment is confirmed, Stripe sends an automatic email with a secure download link to the address you used at checkout. No waiting, no manual delivery.' },
              { q: 'Does the app work on my phone?', a: 'Yes. VitalGoal works in any modern browser on iPhone, Android, or any computer. Just visit getvitalgoal.com and sign up. No app store download required.' },
              { q: 'Can I use the app without buying an guide?', a: 'Absolutely. The app and the guides are completely separate. The app is free forever. The guides are optional guides if you want deeper knowledge on specific topics.' },
              { q: 'Is my health data private?', a: 'Yes. Your data is stored securely in your own account and is never shared, sold or used for advertising. You can delete your account and all data at any time.' },
              { q: 'What if I want a refund?', a: 'Due to the digital nature of our products, all sales are final. Once an guide has been delivered we are unable to offer refunds. If you have any issues accessing your purchase, contact us at hello@getvitalgoal.com and we will help you out.' },
            ].map((f, i) => (
              <div key={i} className="faq-item" style={{ border: `1px solid ${C.border}`, borderRadius: '16px', overflow: 'hidden', background: C.bg }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ color: C.dark, fontWeight: '700', fontSize: '16px', fontFamily: 'inherit' }}>{f.q}</span>
                  <span style={{ color: C.green, fontSize: '20px', fontWeight: '700', flexShrink: 0, marginLeft: '16px' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: C.muted, fontSize: '15px', lineHeight: '1.65' }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <p style={{ color: C.muted, fontSize: '16px', marginBottom: '16px', fontWeight: '500' }}>Still have questions?</p>
            <button onClick={() => setShowContact(true)} style={{
              display: 'inline-block',
              background: C.greenSoft,
              border: `1.5px solid ${C.green}44`,
              borderRadius: '50px',
              color: C.green,
              fontSize: '16px',
              fontWeight: '700',
              padding: '14px 36px',
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${C.green}18`,
              fontFamily: 'inherit',
            }}>✉️ Contact Us</button>
          </div>
        </div>
      </section>


      {/* FOUNDER */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)', background: C.white }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: C.greenSoft, borderRadius: '50px', padding: '6px 20px', marginBottom: '32px', color: C.green, fontSize: '14px', fontWeight: '600' }}>👋 Why I built this</div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '700', letterSpacing: '-1px', color: C.dark, margin: '0 0 24px', lineHeight: '1.2' }}>
                "I just wanted something<br />
                <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green3})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>simple that works."</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '17px', lineHeight: '1.75', margin: '0 0 20px' }}>
                I'm Marcus. I'm in my early twenties and I built VitalGoal because I couldn't find a health app that respected my time.
              </p>
              <p style={{ color: C.muted, fontSize: '17px', lineHeight: '1.75', margin: '0 0 20px' }}>
                Every app I tried was either too complicated, too slow, or buried the things I actually needed. I just wanted to log my water and steps in under 10 seconds and move on with my day.
              </p>
              <p style={{ color: C.muted, fontSize: '17px', lineHeight: '1.75', margin: '0 0 32px' }}>
                So I built it myself. No fluff. No wasted time. Just the habits that actually matter, tracked as fast as possible.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: C.greenSoft, border: `2px solid ${C.green}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', color: C.green }}>M</div>
                <div>
                  <div style={{ color: C.dark, fontWeight: '700', fontSize: '16px' }}>Marcus</div>
                  <div style={{ color: C.muted, fontSize: '13px' }}>Founder, VitalGoal</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '200px' }}>
              {[
                { num: '30s', label: 'to log your entire day' },
                { num: '6', label: 'science-backed guides' },
                { num: '5', label: 'health metrics tracked' },
                { num: '0', label: 'wasted time' },
              ].map(s => (
                <div key={s.label} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px' }}>
                  <div style={{ color: C.green, fontWeight: '700', fontSize: '32px', lineHeight: '1' }}>{s.num}</div>
                  <div style={{ color: C.muted, fontSize: '14px', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 48px)', textAlign: 'center', background: C.dark, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice">
          <defs><filter id="bc"><feGaussianBlur stdDeviation="60"/></filter></defs>
          <ellipse cx="15%" cy="40%" rx="350" ry="280" fill={C.green} opacity="0.12" filter="url(#bc)"/>
          <ellipse cx="85%" cy="60%" rx="280" ry="220" fill={C.green2} opacity="0.10" filter="url(#bc)"/>
        </svg>
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(52,212,104,0.12)', borderRadius: '50px', padding: '6px 20px', marginBottom: '32px', color: C.green3, fontSize: '14px', fontWeight: '600' }}>🌿 Start your journey</div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '700', letterSpacing: '-2px', color: C.white, margin: '0 0 24px', lineHeight: '1.1' }}>
            Track your health.<br />Read the science.<br />
            <span style={{ background: `linear-gradient(135deg, ${C.green3}, ${C.green2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Become your best self.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', lineHeight: '1.65', marginBottom: '48px', fontWeight: '500' }}>
            The all-in-one health toolkit for people serious about improving their life. Free to start. Life-changing to stick with.
          </p>
          <button onClick={onGetStarted} style={{ background: `linear-gradient(135deg, ${C.green2}, ${C.green3})`, border: 'none', borderRadius: '50px', color: C.white, fontSize: '18px', fontWeight: '600', padding: '18px 48px', cursor: 'pointer', boxShadow: `0 8px 40px ${C.green}50` }}>Start Free Today →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '48px clamp(20px, 5vw, 48px)', background: C.dark, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', background: `linear-gradient(135deg, ${C.green3}, ${C.green2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>⚡ VitalGoal</div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', marginBottom: '24px' }}>Your health journey starts here.</p>
          <div style={{ display:'flex', gap:'32px', justifyContent:'center', flexWrap:'wrap', marginBottom: '32px' }}>
            {[['Features','#features'],['Shop','#shop'],['Why Us','#why'],['Contact','#faq']].map(([label,href]) => (
              <a key={label} href={href} style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:'14px', fontWeight:'600' }}>{label}</a>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '13px' }}>© 2025 VitalGoal. All rights reserved.</p>
        </div>
      </footer>

      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </div>
  );
}

export default Landing;