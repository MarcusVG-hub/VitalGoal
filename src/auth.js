import React, { useState } from 'react';
import { signIn, signUp } from '../auth';

const C = {
  green:  '#1B7A3E',
  green2: '#28A855',
  green3: '#34D468',
  greenSoft: '#D4F5E0',
  bg:     '#F5FBF6',
  bgAlt:  '#EAF6ED',
  dark:   '#0D2415',
  text:   '#1A3322',
  muted:  '#4A7A5A',
  border: 'rgba(27,122,62,0.15)',
  white:  '#FFFFFF',
};

function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = async () => {
    setError(null);
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.'); return;
    }
    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    setLoading(true);
    try {
      if (mode === 'login') await signIn(email, password);
      else await signUp(email, password, name);
      onAuth();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>

      {/* Background blobs */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="ab1"><feGaussianBlur stdDeviation="50"/></filter>
          <filter id="ab2"><feGaussianBlur stdDeviation="70"/></filter>
        </defs>
        <ellipse cx="10%" cy="10%" rx="300" ry="250" fill={C.green} opacity="0.08" filter="url(#ab1)"/>
        <ellipse cx="90%" cy="20%" rx="250" ry="200" fill={C.green2} opacity="0.06" filter="url(#ab2)"/>
        <ellipse cx="80%" cy="85%" rx="280" ry="230" fill={C.green3} opacity="0.07" filter="url(#ab1)"/>
        <ellipse cx="15%" cy="80%" rx="200" ry="180" fill={C.green} opacity="0.05" filter="url(#ab2)"/>
      </svg>

      {/* Dot grid */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.3 }}>
        <defs>
          <pattern id="adots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={C.green} opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#adots)"/>
      </svg>

      {/* Top section */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', position: 'relative', zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{
          fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px',
          background: `linear-gradient(135deg, ${C.green}, ${C.green2})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>⚡ VitalGoal</div>
        <div style={{ color: C.muted, fontSize: '14px', marginBottom: '40px', fontWeight: '500' }}>
          Track your health. Become your best self.
        </div>

        {/* Card */}
        <div style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: '24px',
          padding: '32px 28px',
          width: '100%', maxWidth: '400px',
          boxShadow: '0 8px 40px rgba(27,122,62,0.12)',
        }}>

          <h2 style={{ color: C.dark, fontWeight: '800', fontSize: '24px', margin: '0 0 6px', textAlign: 'center' }}>
            {mode === 'login' ? 'Welcome back! 👋' : 'Create account 🌱'}
          </h2>
          <p style={{ color: C.muted, fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
            {mode === 'login' ? 'Sign in to continue your health journey' : 'Start your health journey today'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {mode === 'signup' && (
              <input
                style={iStyle}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}

            <input
              style={iStyle}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...iStyle, paddingRight: '44px' }}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0,
              }}>{showPassword ? '🙈' : '👁️'}</button>
            </div>

            {/* Confirm password */}
            {mode === 'signup' && (
              <div style={{ position: 'relative' }}>
                <input
                  style={{
                    ...iStyle, paddingRight: '44px',
                    borderColor: confirmPassword && password !== confirmPassword ? 'rgba(220,38,38,0.4)' : C.border,
                  }}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0,
                }}>{showConfirm ? '🙈' : '👁️'}</button>
                {confirmPassword && password !== confirmPassword && (
                  <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px' }}>Passwords do not match</div>
                )}
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
                borderRadius: '10px', padding: '10px 14px',
                color: '#DC2626', fontSize: '13px',
              }}>⚠️ {error}</div>
            )}

            <button
              onClick={handle}
              disabled={loading}
              style={{
                width: '100%', marginTop: '4px',
                background: loading ? C.greenSoft : `linear-gradient(135deg, ${C.green}, ${C.green2})`,
                border: 'none', borderRadius: '50px',
                color: loading ? C.muted : C.white,
                fontSize: '16px', fontWeight: '700', padding: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : `0 8px 24px rgba(27,122,62,0.3)`,
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>

          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', color: C.muted, fontSize: '14px' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setConfirmPassword(''); }}
              style={{ color: C.green, fontWeight: '700', cursor: 'pointer' }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </span>
          </div>

        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🔒 100% Private', '⚡ Free Forever', '🌿 No Ads'].map(b => (
            <div key={b} style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: '50px', padding: '7px 16px',
              fontSize: '13px', fontWeight: '600', color: C.muted,
              boxShadow: '0 2px 8px rgba(27,122,62,0.06)',
            }}>{b}</div>
          ))}
        </div>

      </div>

    </div>
  );
}

const iStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1.5px solid rgba(27,122,62,0.15)',
  background: '#F5FBF6',
  color: '#1A3322',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
};

export default Auth;