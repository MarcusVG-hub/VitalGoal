import React from 'react';

function Header({ name, streak }) {
  return (
    <div style={{
      padding: '18px 20px 14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'sticky', top: 0, zIndex: 10,
      background: 'rgba(245,251,246,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(27,122,62,0.1)',
    }}>
      <div>
        <div style={{
          fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #1B7A3E, #28A855)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>⚡ VitalGoal</div>
        <div style={{ color: '#4A7A5A', fontSize: '13px', marginTop: '2px', fontWeight: '500' }}>
          Hello, {name || 'there'} 👋
        </div>
      </div>
      <div style={{
        background: 'rgba(234,111,60,0.1)',
        border: '1px solid rgba(234,111,60,0.25)',
        color: '#EA580C',
        fontSize: '12px', fontWeight: '700',
        borderRadius: '20px', padding: '5px 12px',
        whiteSpace: 'nowrap',
      }}>
        🔥 {streak || 0} day streak
      </div>
    </div>
  );
}

export default Header;