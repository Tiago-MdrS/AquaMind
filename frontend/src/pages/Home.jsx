import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function Bubbles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 50 + 10;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              borderRadius: '50%',
              border: '1px solid rgba(56,189,248,0.18)',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.13), rgba(59,184,216,0.04))',
              animation: `rise ${Math.random() * 16 + 10}s linear ${Math.random() * 12}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0) scale(1);    opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-115vh) scale(1.12); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const stats = [
  { value: '2.3B', label: 'pessoas sem água potável' },
  { value: '70%', label: 'da água doce vai à agricultura' },
  { value: '1/3', label: 'dos aquíferos em colapso' },
];

const cards = [
  {
    icon: '🌍',
    title: 'Consciência ambiental',
    text: 'Entenda como pequenas atitudes diárias ajudam a reduzir o desperdício e preservar recursos para as próximas gerações.',
    color: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
  },
  {
    icon: '💧',
    title: 'Controle de consumo',
    text: 'Registre seus hábitos, visualize gráficos detalhados e acompanhe sua evolução ao longo do tempo no dashboard.',
    color: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.2)',
  },
  {
    icon: '🏆',
    title: 'Desafios e ranking',
    text: 'Complete metas sustentáveis, acumule pontos e dispute posições com outros usuários comprometidos com o planeta.',
    color: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
  },
];

const steps = [
  { num: '01', title: 'Crie sua conta', text: 'Cadastro rápido e gratuito. Seu perfil fica salvo com histórico completo.' },
  { num: '02', title: 'Registre o consumo', text: 'Informe seus gastos diários de água de forma simples e intuitiva.' },
  { num: '03', title: 'Acompanhe e evolua', text: 'Veja gráficos, conquiste desafios e melhore seus hábitos continuamente.' },
];

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#07131f', color: 'white' }}>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '96px 24px 0',
        background: 'radial-gradient(ellipse at 25% 55%, #0d3d52 0%, #051d28 65%)',
      }}>
        <Bubbles />

        {/* glow orbs */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(circle at 80% 15%, rgba(56,189,248,0.07) 0%, transparent 45%),
            radial-gradient(circle at 10% 80%, rgba(34,211,238,0.05) 0%, transparent 40%)
          `,
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px', borderRadius: '999px', marginBottom: '36px',
              background: 'rgba(56,189,248,0.06)',
              border: '1px solid rgba(56,189,248,0.2)',
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#38bdf8',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8', display: 'inline-block' }} />
            Plataforma de consciência hídrica
          </motion.div>

          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ lineHeight: 1, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '28px' }}
          >
            <span style={{ display: 'block', color: 'white', fontSize: 'clamp(3rem, 8.5vw, 6.5rem)' }}>
              Água é
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3.4rem, 10vw, 8rem)',
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.35))',
            }}>
              vida.
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(1.1rem, 3vw, 2.2rem)',
              color: 'rgba(255,255,255,0.28)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginTop: '12px',
            }}>
              Use com consciência.
            </span>
          </motion.h1>

          {/* sub */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              color: 'rgba(255,255,255,0.55)', fontWeight: 300,
              fontSize: '1.1rem', lineHeight: 1.75,
              maxWidth: '600px', margin: '0 auto 48px',
            }}
          >
            O AquaMind une tecnologia, educação ambiental e gamificação para
            ajudar você a acompanhar seu consumo, cumprir desafios sustentáveis
            e criar hábitos mais conscientes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 32px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                  color: '#07131f', fontWeight: 800, fontSize: '0.95rem',
                  cursor: 'pointer', boxShadow: '0 0 30px rgba(56,189,248,0.25)',
                  letterSpacing: '0.02em',
                }}
              >
                Ir para o Dashboard
              </motion.div>
            </Link>
            <Link to="/desafios" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 32px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Ver Desafios
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px' }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="#0d3d52" opacity="0.7"/>
            <path d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,70 1440,80 L1440,120 L0,120 Z" fill="#051d28"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS
      ══════════════════════════════ */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #051d28 0%, #07131f 100%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
          {stats.map((s, i) => (
            <motion.div
              key={i} {...fadeUp(i * 0.1)}
              style={{ textAlign: 'center', padding: '32px 24px' }}
            >
              <div style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900,
                background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}>
                {s.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 500 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* divisor */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2) 30%, rgba(34,211,238,0.2) 70%, transparent)' }} />

      {/* ══════════════════════════════
          CARDS
      ══════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#07131f' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#38bdf8',
            }}>
              Como funciona
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            style={{
              textAlign: 'center', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em', marginBottom: '16px',
            }}
          >
            Sua Jornada{' '}
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Sustentável
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.14)}
            style={{
              textAlign: 'center', color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px', margin: '0 auto 64px',
              lineHeight: 1.75, fontWeight: 300,
            }}
          >
            Acompanhe seu progresso em um ambiente simples, visual e motivador.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {cards.map((card, i) => (
              <motion.div
                key={i} {...fadeUp(i * 0.1)}
                whileHover={{ y: -8 }}
                style={{
                  padding: '40px 32px',
                  borderRadius: '24px',
                  background: card.color,
                  border: `1px solid ${card.border}`,
                  backdropFilter: 'blur(20px)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', cursor: 'default',
                  transition: 'box-shadow 0.3s',
                }}
                onHoverStart={e => e.target.style && (e.target.style.boxShadow = `0 20px 60px rgba(56,189,248,0.08)`)}
                onHoverEnd={e => e.target.style && (e.target.style.boxShadow = 'none')}
              >
                <div style={{
                  fontSize: '3rem', marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 12px rgba(56,189,248,0.2))',
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '12px', color: 'white' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {card.text}
                </p>
                <div style={{
                  marginTop: '24px', height: '2px', width: '48px', borderRadius: '999px',
                  background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* divisor */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15) 30%, rgba(34,211,238,0.15) 70%, transparent)' }} />


      {/* ══════════════════════════════
          CTA FINAL
      ══════════════════════════════ */}
      <section style={{
        padding: '120px 24px',
        background: '#07131f',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* glow de fundo */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.06) 0%, transparent 65%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)}>
            <div style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900,
              letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px',
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.3))',
              }}>
                Cada gota conta.
              </span>
              <br />
              <span style={{ color: 'white' }}>A sua também.</span>
            </div>
          </motion.div>

          <motion.p
            {...fadeUp(0.1)}
            style={{
              color: 'rgba(255,255,255,0.45)', fontWeight: 300,
              fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '48px',
            }}
          >
            Junte-se a quem já está transformando seus hábitos. Acompanhe seu consumo,
            participe de desafios e faça parte da mudança.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '16px 40px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                  color: '#07131f', fontWeight: 800, fontSize: '1rem',
                  cursor: 'pointer', boxShadow: '0 0 40px rgba(56,189,248,0.2)',
                  letterSpacing: '0.02em',
                }}
              >
                Começar agora
              </motion.div>
            </Link>
            <Link to="/ranking" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '16px 40px', borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Ver Ranking
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}