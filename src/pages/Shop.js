import React from 'react';

const ebooks = [
  {
    id: 1,
    emoji: '💧',
    title: 'Hydration Mastery',
    desc: 'Learn how drinking more water can transform your energy, skin and focus in 30 days.',
    price: '$7',
    color: '#38bdf8',
    link: 'https://vitalgoal.gumroad.com',
  },
  {
    id: 2,
    emoji: '😴',
    title: 'Sleep Like a Pro',
    desc: 'The complete guide to fixing your sleep, building a night routine and waking up energised.',
    price: '$9',
    color: '#a78bfa',
    link: 'https://vitalgoal.gumroad.com',
  },
  {
    id: 3,
    emoji: '🔥',
    title: 'Fat Loss Simplified',
    desc: 'No fads, no nonsense. A simple calorie and habit guide to losing weight and keeping it off.',
    price: '$9',
    color: '#fb923c',
    link: 'https://vitalgoal.gumroad.com',
  },
  {
    id: 4,
    emoji: '💪',
    title: 'Build Muscle at Home',
    desc: 'A beginner friendly guide to building real muscle with no gym and no equipment needed.',
    price: '$9',
    color: '#34d399',
    link: 'https://vitalgoal.gumroad.com',
  },
];

const courses = [
  {
    id: 1,
    emoji: '🌱',
    title: '30 Day Glow Up Challenge',
    desc: 'A full month of daily health, fitness and mindset tasks to completely transform how you look and feel.',
    price: '$19',
    color: '#34d399',
    badge: '⭐ Most Popular',
    link: 'https://vitalgoal.gumroad.com',
  },
  {
    id: 2,
    emoji: '🧠',
    title: 'Mental Clarity Blueprint',
    desc: 'Reduce brain fog, build focus and create a daily routine that keeps your mind sharp all day.',
    price: '$19',
    color: '#38bdf8',
    badge: '🔥 New',
    link: 'https://vitalgoal.gumroad.com',
  },
];

function ShopItem({ item, type }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Badge */}
      {item.badge && (
        <div style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          background: 'rgba(52,211,153,0.12)',
          border: '1px solid rgba(52,211,153,0.3)',
          borderRadius: '100px',
          padding: '3px 10px',
          color: '#34d399',
          fontSize: '11px',
          fontWeight: '600',
        }}>
          {item.badge}
        </div>
      )}

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '44px', height: '44px',
          borderRadius: '12px',
          background: `${item.color}22`,
          border: `1px solid ${item.color}44`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '22px',
          flexShrink: 0,
        }}>
          {item.emoji}
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
          <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
            {type === 'course' ? '📖 Course' : '📄 Ebook'}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.5' }}>
        {item.desc}
      </div>

      {/* Price + button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        <div style={{ color: item.color, fontWeight: '800', fontSize: '20px' }}>
          {item.price}
        </div>
        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
          background: `linear-gradient(135deg, ${item.color}, ${item.color}aa)`,
          border: 'none', borderRadius: '10px',
          color: '#0a0a0f', fontSize: '14px',
          fontWeight: '800', padding: '8px 20px',
          cursor: 'pointer', textDecoration: 'none',
          display: 'inline-block',
        }}>
          Get it →
        </a>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(56,189,248,0.1))',
        border: '1px solid rgba(52,211,153,0.2)',
        borderRadius: '16px', padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
        <div style={{ color: '#fff', fontWeight: '800', fontSize: '20px' }}>VitalGoal Shop</div>
        <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '6px' }}>
          Ebooks and courses to help you reach your health goals faster
        </div>
      </div>

      {/* Ebooks section */}
      <div>
        <div style={{
          color: '#fff', fontWeight: '700',
          fontSize: '16px', marginBottom: '12px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          📄 Ebooks
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ebooks.map(e => <ShopItem key={e.id} item={e} type="ebook" />)}
        </div>
      </div>

      {/* Courses section */}
      <div>
        <div style={{
          color: '#fff', fontWeight: '700',
          fontSize: '16px', marginBottom: '12px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          📖 Courses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map(c => <ShopItem key={c.id} item={c} type="course" />)}
        </div>
      </div>

      {/* Bottom note */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px', padding: '14px',
        textAlign: 'center', color: '#4b5563', fontSize: '13px',
      }}>
        🔒 All purchases are secure and delivered instantly via Gumroad
      </div>

    </div>
  );
}

export default Shop;