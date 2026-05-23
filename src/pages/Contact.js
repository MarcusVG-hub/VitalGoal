import React, { useState } from 'react';

function Contact({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handle = () => {
    const subject = encodeURIComponent('VitalGoal Contact: ' + form.name);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:hello@getvitalgoal.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        padding: '40px', width: '100%', maxWidth: '480px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
      }} onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#1A3322', fontWeight: '700', fontSize: '24px', margin: 0 }}>✉️ Contact Us</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>
            <p style={{ color: '#4A7A5A', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
              Have a question? We usually reply within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ color: '#4A7A5A', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Your Name</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
                  style={{ width: '100%', border: '1.5px solid rgba(27,122,62,0.2)', borderRadius: '12px', padding: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}/>
              </div>
              <div>
                <label style={{ color: '#4A7A5A', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Your Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com"
                  style={{ width: '100%', border: '1.5px solid rgba(27,122,62,0.2)', borderRadius: '12px', padding: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}/>
              </div>
              <div>
                <label style={{ color: '#4A7A5A', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Message</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="How can we help you?" rows={4}
                  style={{ width: '100%', border: '1.5px solid rgba(27,122,62,0.2)', borderRadius: '12px', padding: '12px', fontSize: '15px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}/>
              </div>
              <button onClick={handle} disabled={!form.name || !form.email || !form.message}
                style={{
                  background: form.name && form.email && form.message ? 'linear-gradient(135deg, #1B7A3E, #28A855)' : 'rgba(0,0,0,0.1)',
                  border: 'none', borderRadius: '50px',
                  color: form.name && form.email && form.message ? '#fff' : '#9ca3af',
                  fontSize: '16px', fontWeight: '700', padding: '14px',
                  cursor: form.name && form.email && form.message ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                }}>Send Message →</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ color: '#1A3322', fontWeight: '700', fontSize: '22px', marginBottom: '12px' }}>Message Sent!</h2>
            <p style={{ color: '#4A7A5A', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Your email app should have opened. If not, email us at hello@getvitalgoal.com
            </p>
            <button onClick={onClose} style={{ background: 'linear-gradient(135deg, #1B7A3E, #28A855)', border: 'none', borderRadius: '50px', color: '#fff', fontSize: '15px', fontWeight: '700', padding: '12px 32px', cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;