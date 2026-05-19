import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Network, Brain } from 'lucide-react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <>
      <style>{`
        .hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; gap: 80px;
          width: 100%; position: relative; z-index: 1;
        }
        .hero-visual {
          flex: 0 0 380px; display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 1024px) {
          .hero-inner { gap: 48px; padding: 0 24px; }
          .hero-visual { flex: 0 0 300px; }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column; gap: 40px; padding: 0 20px; text-align: center; align-items: center; }
          .hero-visual { flex: none; width: 260px; }
          .hero-btns { justify-content: center !important; }
          .hero-p { max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .hero-inner { padding: 0 16px; }
          .hero-btns button { width: 100%; justify-content: center; }
          .hero-visual { width: 220px; }
        }
      `}</style>
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex',
        alignItems: 'center', background: 'transparent', overflow: 'hidden', paddingTop: 80,
      }}>
        <div className="hero-inner">
          {/* Left Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700, lineHeight: 1.15, color: '#fff', marginBottom: 24,
              }}>
                From Data to<br />
                <span style={{
                  background: 'linear-gradient(90deg, #fff 0%, var(--accent-cyan) 50%, #7c3aed 100%)',
                  backgroundSize: '200% auto', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite',
                }}>Decisions </span><br />
                Deploy AI at<br />
                <span style={{ color: 'var(--accent-cyan)' }}>Enterprise<br />Speed</span>
              </h1>

              <p className="hero-p" style={{
                fontFamily: 'Montserrat', fontSize: 14, fontWeight: 400,
                color: 'var(--text-secondary)', marginBottom: 36,
                maxWidth: 440, lineHeight: 1.7,
                opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
              }}>
                Decision Intelligence AI Hub powered by IDP.
              </p>

              <div className="hero-btns" style={{
                display: 'flex', gap: 14, flexWrap: 'wrap',
                opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.5s',
              }}>
                <button style={{
                  padding: '13px 28px',
                  background: 'linear-gradient(135deg, #00d4ff, #0080aa)',
                  border: 'none', borderRadius: 8, fontFamily: 'Montserrat',
                  fontWeight: 700, fontSize: 13, color: '#060d1a', cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(0,212,255,0.4)', transition: 'all 0.3s ease',
                }}
                onClick={() => {
                  window.location.href = "https://hub-dev.inteliment.ai/";
                }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 32px rgba(0,212,255,0.6)'; }}
                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 24px rgba(0,212,255,0.4)'; }}
                >Explore AI Solutions</button>

                <button style={{
                  padding: '13px 28px', background: 'transparent',
                  border: '1px solid rgba(0,212,255,0.4)', borderRadius: 8,
                  fontFamily: 'Montserrat', fontWeight: 600, fontSize: 13,
                  color: 'var(--accent-cyan)', cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onClick={() => {
                                  window.location.href = "https://inteliment.com/contact-us/";
                                }
                              }
                onMouseEnter={e => { e.target.style.background = 'rgba(0,212,255,0.1)'; e.target.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.transform = 'translateY(0)'; }}
                >Request Demo</button>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(60px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}>
            <OrbitVisual />
          </div>
        </div>
      </section>
    </>
  );
}

function OrbitVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '1' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.2)', animation: 'spin-slow 20s linear infinite',
      }}>
        {[0, 90, 180, 270].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%', width: 10, height: 10,
            borderRadius: '50%', background: 'var(--accent-cyan)',
            boxShadow: '0 0 10px var(--accent-cyan)',
            transform: `rotate(${deg}deg) translateX(160px) translateY(-50%) translateX(-5px)`,
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', inset: 40, borderRadius: '50%',
        border: '1px dashed rgba(124,58,237,0.4)', animation: 'spin-slow 12s linear infinite reverse',
      }}>
        {[45, 135, 225, 315].map(deg => (
          <div key={deg} style={{
            position: 'absolute', top: '50%', left: '50%', width: 7, height: 7,
            borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 8px #7c3aed',
            transform: `rotate(${deg}deg) translateX(120px) translateY(-50%) translateX(-3.5px)`,
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%',
        background: 'linear-gradient(135deg, #63d1c8 0%, #5aa9f7 50%, #7b61ff 100%)',
        border: '2px solid rgba(0,212,255,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'pulse-glow 3s ease-in-out infinite',
      }}>
        <Brain size={50} color="#000000" strokeWidth={1.5} />
      </div>
      {[
        { top: 10, right: 20, Icon: Sparkles },
        { top: 10, left: 20, Icon: Zap },
        { bottom: 10, right: 20, Icon: Network },
        { bottom: 10, left: 20, Icon: Brain },
      ].map((item, i) => {
        const { Icon, ...pos } = item;
        return (
          <div key={i} style={{
            position: 'absolute', ...pos, width: 48, height: 48, borderRadius: 12,
            background: 'rgba(6,18,40,0.85)', border: '1.5px solid rgba(0,212,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: `float ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 14px rgba(0,212,255,0.2), inset 0 0 10px rgba(0,212,255,0.05)',
          }}>
            <Icon size={22} color="#00d4ff" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }} />
          </div>
        );
      })}
    </div>
  );
}
