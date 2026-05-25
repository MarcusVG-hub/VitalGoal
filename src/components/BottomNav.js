import React from 'react';

const tabs = [
  { id: 'dashboard', icon: '📊', label: 'Home' },
  { id: 'tracker',   icon: '✏️', label: 'Log' },
  { id: 'shop',      icon: '🛒', label: 'Shop' },
  { id: 'profile',   icon: '👤', label: 'Profile' },
];

function BottomNav({ currentTab, onTabChange }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(245,251,246,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(27,122,62,0.12)',
      display: 'flex', zIndex: 100,
      maxWidth: '480px', margin: '0 auto',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1, background: 'none', border: 'none',
            padding: '10px 0 14px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px',
            transition: 'opacity 0.15s',
          }}
        >
          <div style={{ fontSize: '20px' }}>{tab.icon}</div>
          <div style={{
            fontSize: '11px', fontWeight: '700',
            color: currentTab === tab.id ? '#1B7A3E' : '#9ca3af',
            transition: 'color 0.2s',
          }}>{tab.label}</div>
          {currentTab === tab.id && (
            <div style={{
              width: '20px', height: '3px',
              borderRadius: '2px',
              background: 'linear-gradient(135deg, #1B7A3E, #28A855)',
              marginTop: '1px',
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

export default BottomNav;