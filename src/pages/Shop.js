import React from 'react';

const C = {
  bg: '#F5FBF6', bgAlt: '#EAF6ED', white: '#FFFFFF',
  green: '#1B7A3E', green2: '#28A855', green3: '#34D468',
  greenSoft: '#D4F5E0', gold: '#B5883A', goldSoft: '#F4E4C1',
  dark: '#0D2415', text: '#1A3322', muted: '#4A7A5A',
  border: 'rgba(27,122,62,0.12)', shadow: '0 2px 16px rgba(27,122,62,0.08)',
};

const products = [
  { id:1, emoji:'💧', title:'The Hydration Code',       price:'€14.99',  color: C.green,  bg:'#E0F2FE', link:'https://buy.stripe.com/6oU3cugWF6G3d06fMsfAc0b', desc:'Transform your energy and skin by mastering hydration.' },
  { id:2, emoji:'😴', title:'Sleep Unlocked',         price:'€14.99',  color:'#7C3AED', bg:'#EDE9FE', link:'https://buy.stripe.com/cNi00icGp5BZ7FMfMsfAc0c', desc:'Fix your sleep and wake up energised every day.' },
  { id:3, emoji:'🔥', title:'Fat Loss Simplified',      price:'€14.99',  color:'#EA580C', bg:'#FFEDD5', link:'https://buy.stripe.com/9B6bJ00XHc0n9NUcAgfAc0d', desc:'Lose fat and keep it off with science-backed habits.' },
  { id:4, emoji:'💪', title:'Build Muscle at Home',     price:'€14.99',  color: C.green,  bg: C.greenSoft, link:'https://buy.stripe.com/7sYcN46i11lJ6BIgQwfAc0e', desc:'Build real muscle with no gym needed.' },
  { id:5, emoji:'🌱', title:'30 Day Glow Up Blueprint',     price:'€24.99', color: C.gold,   bg: C.goldSoft,  link:'https://buy.stripe.com/aFa9ASgWF1lJe4a2ZGfAc0a', desc:'A full month of daily tasks to transform how you look and feel.', badge:'⭐ Premium' },
  { id:6, emoji:'🧠', title:'Mental Clarity Blueprint', price:'€24.99', color: C.gold,   bg: C.goldSoft,  link:'https://buy.stripe.com/bJefZgayh5BZ1hocAgfAc09', desc:'Reduce brain fog and build laser-sharp focus.', badge:'⭐ Premium' },
];

function ShopItem({ item }) {
  return (
    <div style={{
      background: C.white, borderRadius: '16px', padding: '18px',
      border: item.badge ? `1.5px solid ${C.gold}44` : `1px solid ${C.border}`,
      boxShadow: item.badge ? `0 4px 20px ${C.gold}18` : C.shadow,
      display: 'flex', flexDirection: 'column', gap: '10px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {item.badge && (
        <div style={{ alignSelf: 'flex-start', background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: '50px', padding: '3px 10px', color: C.gold, fontSize: '11px', fontWeight: '700' }}>{item.badge}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{item.emoji}</div>
        <div>
          <div style={{ color: C.dark, fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
          <div style={{ color: C.muted, fontSize: '12px' }}>📄 Guide</div>
        </div>
      </div>
      <div style={{ color: C.muted, fontSize: '13px', lineHeight: '1.5' }}>{item.desc}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ color: item.color, fontWeight: '800', fontSize: '22px' }}>{item.price}</div>
        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
          background: item.badge ? `linear-gradient(135deg, ${C.gold}, #D4A843)` : `linear-gradient(135deg, ${C.green}, ${C.green2})`,
          borderRadius: '50px', color: '#fff', fontSize: '13px', fontWeight: '700',
          padding: '8px 20px', textDecoration: 'none', display: 'inline-block',
          boxShadow: item.badge ? `0 4px 12px ${C.gold}44` : `0 4px 12px rgba(27,122,62,0.3)`,
          transition: 'transform 0.15s',
        }}>Buy Now →</a>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, borderRadius: '20px', padding: '20px', textAlign: 'center', boxShadow: `0 8px 32px rgba(27,122,62,0.3)` }}>
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>📚</div>
        <div style={{ color: '#fff', fontWeight: '800', fontSize: '20px' }}>VitalGoal Shop</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '6px' }}>Science-backed guides to help you reach your goals faster</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {products.map(p => <ShopItem key={p.id} item={p}/>)}
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '14px', textAlign: 'center', color: C.muted, fontSize: '13px' }}>
        🔒 All purchases are secure and delivered instantly via Stripe
      </div>
    </div>
  );
}

export default Shop;