import React from 'react';

const tabs = [
  { id: 'dashboard', icon: '📊', label: 'Home' },
  { id: 'tracker',   icon: '✏️', label: 'Log' },
  { id: 'shop',      icon: '🛒', label: 'Shop' },
  { id: 'profile',   icon: '👤', label: 'Profile' },
];

function BottomNav({ currentTab, onTabChange, onScan }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(245,251,246,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(27,122,62,0.12)',
      display: 'flex', alignItems: 'center',
      zIndex: 100, maxWidth: '480px', margin: '0 auto',
      padding: '6px 0 14px',
    }}>
      {/* Home + Log */}
      {tabs.slice(0, 2).map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1, background: 'none', border: 'none',
            padding: '6px 0', cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px',
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
              width: '20px', height: '3px', borderRadius: '2px',
              background: 'linear-gradient(135deg, #1B7A3E, #28A855)',
            }}/>
          )}
        </button>
      ))}

      {/* Center Scan Button */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={onScan}
          style={{
            width: '56px', height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B7A3E, #28A855)',
            border: '3px solid rgba(245,251,246,0.95)',
            boxShadow: '0 4px 20px rgba(27,122,62,0.4)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px',
            transition: 'transform 0.15s',
            marginBottom: '8px',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          📸
        </button>
      </div>

      {/* Shop + Profile */}
      {tabs.slice(2).map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1, background: 'none', border: 'none',
            padding: '6px 0', cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px',
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
              width: '20px', height: '3px', borderRadius: '2px',
              background: 'linear-gradient(135deg, #1B7A3E, #28A855)',
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

export default BottomNav;