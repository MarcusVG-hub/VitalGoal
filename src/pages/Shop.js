import React, { useState } from 'react';

const products = [
  {
    id: 1,
    emoji: '💧',
    title: 'Hydration Mastery',
    desc: 'Learn how drinking more water can transform your energy, skin and focus in 30 days.',
    price: '€7',
    color: '#38bdf8',
    type: 'ebook',
    priceId: 'price_1TYuLHCCF1YwJaAOROvyhW9r',
  },
  {
    id: 2,
    emoji: '😴',
    title: 'Sleep Like a Pro',
    desc: 'The complete guide to fixing your sleep, building a night routine and waking up energised.',
    price: '€9',
    color: '#a78bfa',
    type: 'ebook',
    priceId: 'price_1TYuNVCCF1YwJaAOgeDuJ6jf',
  },
  {
    id: 3,
    emoji: '🔥',
    title: 'Fat Loss Simplified',
    desc: 'No fads, no nonsense. A simple calorie and habit guide to losing weight and keeping it off.',
    price: '€9',
    color: '#fb923c',
    type: 'ebook',
    priceId: 'price_1TYuObCCF1YwJaAOMKX84l4W',
  },
  {
    id: 4,
    emoji: '💪',
    title: 'Build Muscle at Home',
    desc: 'A beginner friendly guide to building real muscle with no gym and no equipment needed.',
    price: '€9',
    color: '#34d399',
    type: 'ebook',
    priceId: 'price_1TYuPLCCF1YwJaAO8rg29dbg',
  },
  {
    id: 5,
    emoji: '🌱',
    title: '30 Day Glow Up Challenge',
    desc: 'A full month of daily health, fitness and mindset tasks to completely transform how you look and feel.',
    price: '€19',
    color: '#34d399',
    type: 'course',
    badge: '⭐ Most Popular',
    priceId: 'price_1TYuQ3CCF1YwJaAOKARu6EQL',
  },
  {
    id: 6,
    emoji: '🧠',
    title: 'Mental Clarity Blueprint',
    desc: 'Reduce brain fog, build focus and create a daily routine that keeps your mind sharp all day.',
    price: '€19',
    color: '#38bdf8',
    type: 'course',
    badge: '🔥 New',
    priceId: 'price_1TYuQqCCF1YwJaAOH184fFtv',
  },
];

function ShopItem({ item }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: item.priceId,
          productName: item.title,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            {item.type === 'course' ? '📖 Course' : '📄 Ebook'}
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
        <button
          onClick={handleBuy}
          disabled={loading}
          style={{
            background: loading ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${item.color}, ${item.color}aa)`,
            border: 'none', borderRadius: '10px',
            color: loading ? '#6b7280' : '#0a0a0f',
            fontSize: '14px', fontWeight: '800',
            padding: '8px 20px', cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Get it →'}
        </button>
      </div>
    </div>
  );
}

function Shop() {
  const ebooks = products.filter(p => p.type === 'ebook');
  const courses = products.filter(p => p.type === 'course');

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

      {/* Ebooks */}
      <div>
        <div style={{
          color: '#fff', fontWeight: '700',
          fontSize: '16px', marginBottom: '12px',
        }}>
          📄 Ebooks
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ebooks.map(e => <ShopItem key={e.id} item={e} />)}
        </div>
      </div>

      {/* Courses */}
      <div>
        <div style={{
          color: '#fff', fontWeight: '700',
          fontSize: '16px', marginBottom: '12px',
        }}>
          📖 Courses
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map(c => <ShopItem key={c.id} item={c} />)}
        </div>
      </div>

      {/* Bottom note */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px', padding: '14px',
        textAlign: 'center', color: '#4b5563', fontSize: '13px',
      }}>
        🔒 All purchases are secure and delivered instantly via Stripe
      </div>

    </div>
  );
}

export default Shop;