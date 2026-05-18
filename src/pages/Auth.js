import React, { useState } from 'react';
import { signIn, signUp } from '../auth';

function Auth({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
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
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '32px 24px',
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Logo */}
        <div style={{
          fontSize: '22px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #34d399, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
          marginBottom: '8px',
        }}>⚡ VitalGoal</div>

        <div style={{ fontSize: '48px', margin: '16px 0 8px' }}>
          {mode === 'login' ? '🔐' : '👋'}
        </div>

        <h2 style={{
          color: '#fff',
          margin: '0 0 8px',
          fontSize: '22px',
          fontWeight: '800',
        }}>
          {mode === 'login' ? 'Welcome back!' : 'Create account'}
        </h2>

        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          marginBottom: '24px',
        }}>
          {mode === 'login'
            ? 'Sign in to continue your health journey'
            : 'Start your health journey today'}
        </p>

        {/* Form */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>

          {/* Name field - signup only */}
          {mode === 'signup' && (
            <input
              style={inputStyle}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}

          <input
            style={inputStyle}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {/* Error message */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#ef4444',
              fontSize: '13px',
              textAlign: 'left',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handle}
            disabled={loading}
            style={{
              width: '100%',
              background: loading
                ? 'rgba(255,255,255,0.08)'
                : 'linear-gradient(135deg, #34d399, #38bdf8)',
              border: 'none',
              borderRadius: '12px',
              color: loading ? '#6b7280' : '#0a0a0f',
              fontSize: '16px',
              fontWeight: '800',
              padding: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
            }}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>

        </div>

        {/* Switch mode */}
        <div style={{
          marginTop: '20px',
          color: '#6b7280',
          fontSize: '14px',
        }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
            style={{ color: '#34d399', fontWeight: '600', cursor: 'pointer' }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '15px',
  padding: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

export default Auth;