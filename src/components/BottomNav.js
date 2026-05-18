import React from 'react';

const tabs = [
  { id: 'dashboard', icon: '📊', label: 'Home' },
  { id: 'tracker', icon: '✏️', label: 'Log' },
  { id: 'shop', icon: '🛒', label: 'Shop' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

function BottomNav({ currentTab, onTabChange }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      zIndex: 100,
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            padding: '10px 0 14px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ fontSize: '20px' }}>{tab.icon}</div>
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            color: currentTab === tab.id ? '#34d399' : '#4b5563',
            transition: 'color 0.2s',
          }}>
            {tab.label}
          </div>
          {/* Active dot */}
          {currentTab === tab.id && (
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#34d399',
              marginTop: '2px',
            }} />
          )}
        </button>
      ))}
    </div>
  );
}

export default BottomNav;