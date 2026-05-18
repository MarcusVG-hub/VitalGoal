import React from 'react';

function Header({ name, streak }) {
  return (
    <div style={{
      padding: '22px 20px 14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      {/* Logo */}
      <div>
        <div style={{
          fontSize: '22px',
          fontWeight: '800',
          letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #34d399, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ⚡ VitalGoal
        </div>
        <div style={{
          color: '#6b7280',
          fontSize: '14px',
          marginTop: '2px',
        }}>
          Hello, {name || 'there'} 👋
        </div>
      </div>

      {/* Streak badge */}
      <div style={{
        background: 'rgba(251,146,60,0.15)',
        border: '1px solid rgba(251,146,60,0.3)',
        color: '#fb923c',
        fontSize: '13px',
        fontWeight: '600',
        borderRadius: '20px',
        padding: '5px 12px',
        whiteSpace: 'nowrap',
      }}>
        🔥 {streak || 0} day streak
      </div>
    </div>
  );
}

export default Header;