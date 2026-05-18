import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

/* ── helpers ── */
function fadeUp(delay = 0) {
  return {
    initial:   { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:  { once: true },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

/* ── Bubble bg ── */
function Bubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => {
        const size = Math.random() * 50 + 12; 

        return (
          <div
            key={i}
            className="absolute rounded-full border border-sky/20"
            style={{
              width:  `${size}px`,
              height: `${size}px`,
              left:   `${Math.random() * 100}%`,
              bottom: '-10%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(59,184,216,0.04))',
              animation: `rise ${Math.random() * 15 + 8}s linear ${Math.random() * 10}s infinite`,
            }}
          />
        )
      })}
      <style>{`
        @keyframes rise {
          0%   { transform: translateY(0)   scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const cards = [
   { icon: '🌍', title: 'Crise hídrica global',   text: 'Hábitos inadequados contribuem para o desperdício e possíveis crises. Educação é a primeira linha de ação.' },
  { icon: '📱', title: 'Alcance digital',         text: 'Tecnologias digitais têm grande potencial de alcance, principalmente entre o público jovem cada vez mais conectado.' },
  { icon: '🎮', title: 'Engajamento ativo',       text: 'Aplicações interativas permitem não apenas informar, mas engajar com recursos visuais e participação ativa.' },
  { icon: '🌱', title: 'Educação ambiental',      text: 'Unindo tecnologia e meio ambiente, contribuímos para uma sociedade mais consciente sobre recursos naturais.' },
  { icon: '📊', title: 'Dados em tempo real',     text: 'Visualizar o impacto do próprio comportamento em dados é o método mais eficaz para criar mudanças duradouras.' },
  { icon: '🤝', title: 'Impacto coletivo',        text: 'Pequenas mudanças individuais, multiplicadas por milhões, geram transformações significativas no planeta.' },
]

export default function HomeLogged() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, #0d3d52 0%, #051d28 70%)' }}>
        <Bubbles />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 80% 20%, rgba(59,184,216,0.08) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(0,212,255,0.05) 0%, transparent 40%)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-accent border border-accent/30 px-4 py-2 rounded-full bg-accent/5 mb-8"
          >
            💧 Sistema Web · Conscientização Hídrica
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
          >
            <span className="block text-white">Água é</span>
            <span className="block text-gradient italic">vida.</span>
            <span className="block text-white/35" style={{ fontSize: '0.55em' }}>
              Use com consciência.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/60 font-light text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Uma plataforma interativa que une tecnologia e educação ambiental para transformar a forma como você consome e cuida da água.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-sky to-accent text-deep font-bold px-8 py-4 rounded-full text-base hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-accent/20 glow"
            >
              Ver Dashboard
            </Link>
            <Link
              to="/sobre"
              className="border border-sky/40 text-sky px-8 py-4 rounded-full text-base hover:bg-sky/10 transition-all duration-300 backdrop-blur-sm"
            >
              Saiba mais →
            </Link>
          </motion.div>
        </div>
        
        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0 h-28">
          <svg viewBox="0 0 1440 112" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,56 C240,96 480,16 720,56 C960,96 1200,16 1440,56 L1440,112 L0,112 Z" fill="#0d3d52" opacity="0.8"/>
            <path d="M0,76 C360,36 720,96 1080,56 C1260,36 1380,66 1440,76 L1440,112 L0,112 Z" fill="#051d28"/>
          </svg>
        </div>
      </section>

      {/* SEÇÃO DE CARDS */}
      <section className="py-24 px-6 bg-deep">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-center">
            Sua Jornada Sustentável
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-white/55 font-light max-w-lg mx-auto mb-12 text-justify">
            Desenvolva novos hábitos e transforme o consumo de água de forma interativa e gamificada.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={i} {...fadeUp(i * 0.08)}
                whileHover={{ y: -6, backgroundColor: 'rgba(59,184,216,0.07)' }}
                className="glass rounded-2xl p-6 cursor-default group transition-colors duration-300 flex flex-col items-center"
              >
                <span className="text-4xl mb-4 block text-center">{c.icon}</span>
                <h3 className="font-display text-xl font-bold mb-2 text-white text-center">{c.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed text-justify">{c.text}</p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-sky to-accent transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center flex flex-col items-center" style={{ background: 'linear-gradient(135deg,#0d3d52,#051d28)', borderTop: '1px solid rgba(59,184,216,0.1)' }}>
        <motion.p {...fadeUp(0.1)} className="text-white/55 font-light max-w-md mx-auto mb-8 text-justify">
          Lembre-se que cada pequena ação conta. Nos vemos no próximo desafio!
        </motion.p>
      </section>
    </>
  )
}