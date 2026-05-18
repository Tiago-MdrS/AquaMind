import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWater } from '../context/WaterContext'

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

const categories = [
  { id: 'daily',   title: '🌊 Economia Diária',    ids: [1, 2, 3] },
  { id: 'sust',    title: '♻️ Sustentabilidade',    ids: [4, 5, 6] },
  { id: 'special', title: '🏆 Metas Especiais',     ids: [7, 8] },
]

const FILTERS = [
  { id: 'ALL',   label: 'Todos' },
  { id: 'DOING', label: 'Em andamento' },
  { id: 'DONE',  label: 'Concluídos' },
]

export default function Desafios() {
  const { challenges, updateProgress, toggleReuse, points, streak, saving } = useWater()
  const [selected,     setSelected]     = useState(null)
  const [inputVal,     setInputVal]     = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const done      = challenges.filter(c => c.done).length
  const total     = challenges.length
  const pctGeral  = total > 0 ? Math.round((done / total) * 100) : 0

  function handleUpdate(challenge) {
    const v = parseFloat(inputVal)
    if (isNaN(v) || v < 0) return
    let finalProgress = 0
    switch (challenge.id) {
      case 1: finalProgress = v <= 5 ? 100 : Math.max(0, 100 - (v - 5) * 15); break
      case 2: finalProgress = v === 0 ? 100 : Math.max(0, 100 - v * 20);      break
      default: finalProgress = Math.min(100, v);                                break
    }
    updateProgress(challenge.id, Math.round(finalProgress))
    setSelected(null)
    setInputVal('')
  }

  function getInputPlaceholder(id) {
    if (id === 1 || id === 2) return 'Minutos'
    return 'Progresso %'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07131f',
      paddingTop: '88px',
      paddingBottom: '80px',
      paddingLeft: '24px',
      paddingRight: '24px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* ── HEADER ── */}
        <motion.div {...fadeUp()} style={{ textAlign: 'center' }}>
          <span style={{
            display: 'block', marginBottom: '12px',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(56,189,248,0.55)',
            fontFamily: 'monospace',
          }}>
            Dashboard / Gamificação
          </span>
          <h1 style={{
            fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em', color: 'white', lineHeight: 1,
          }}>
            Seus{' '}
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Desafios
            </span>
          </h1>
        </motion.div>

        {/* ── STATS BAR ── */}
        <motion.div
          {...fadeUp(0.06)}
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '28px 32px',
            overflow: 'hidden',
          }}
        >
          {/* glow */}
          <div style={{
            position: 'absolute', top: '-20px', left: '25%',
            width: '300px', height: '100px',
            background: 'rgba(56,189,248,0.08)',
            borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '24px',
            position: 'relative', zIndex: 1,
          }}>
            {[
              { label: 'Sequência',  value: `🔥 ${streak} ${streak === 1 ? 'dia' : 'dias'}`, color: '#f59e0b' },
              { label: 'Economia',   value: `💧 ${saving > 0 ? saving + '%' : '0%'}`,        color: '#34d399' },
              { label: 'Pontuação',  value: `⭐ ${points} XP`,                               color: '#22d3ee' },
              { label: 'Evolução',   value: `📈 ${pctGeral}%`,                               color: '#38bdf8' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'monospace',
                }}>
                  {stat.label}
                </span>
                <span style={{
                  fontSize: '1.4rem', fontWeight: 800, color: stat.color,
                  fontFamily: 'monospace',
                }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* barra de progresso geral */}
          <div style={{
            marginTop: '24px', paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              flex: 1, height: '4px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctGeral}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                  height: '100%', borderRadius: '999px',
                  background: 'linear-gradient(90deg, #38bdf8, #22d3ee, #34d399)',
                }}
              />
            </div>
            <span style={{
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)',
              fontFamily: 'monospace', whiteSpace: 'nowrap',
            }}>
              {done} / {total} concluídos
            </span>
          </div>
        </motion.div>

        {/* ── FILTROS ── */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: 'flex', gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: '16px',
          }}
        >
          {FILTERS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '8px 18px', borderRadius: '10px', border: 'none',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === tab.id ? 'rgba(56,189,248,0.12)' : 'transparent',
                color: activeFilter === tab.id ? '#38bdf8' : 'rgba(255,255,255,0.35)',
                outline: activeFilter === tab.id ? '1px solid rgba(56,189,248,0.25)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── CATEGORIAS + CARDS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {categories.map((cat, catIdx) => {
            const catChallenges = challenges.filter(c => {
              if (!cat.ids.includes(c.id)) return false
              if (activeFilter === 'DOING') return !c.done
              if (activeFilter === 'DONE')  return c.done
              return true
            })
            if (catChallenges.length === 0) return null

            return (
              <motion.section key={cat.id} {...fadeUp(0.12 + catIdx * 0.05)}>

                {/* categoria label */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
                }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                  }}>
                    {cat.title}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                </div>

                {/* grid de cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '16px',
                }}>
                  {catChallenges.map((c) => (
                    <ChallengeCard
                      key={c.id}
                      c={c}
                      selected={selected}
                      setSelected={setSelected}
                      inputVal={inputVal}
                      setInputVal={setInputVal}
                      handleUpdate={handleUpdate}
                      toggleReuse={toggleReuse}
                      getInputPlaceholder={getInputPlaceholder}
                    />
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>

      </div>
    </div>
  )
}

function ChallengeCard({ c, selected, setSelected, inputVal, setInputVal, handleUpdate, toggleReuse, getInputPlaceholder }) {
  const isOpen = selected === c.id

  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        position: 'relative',
        background: c.done ? 'rgba(52,211,153,0.04)' : 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        border: c.done
          ? '1px solid rgba(52,211,153,0.2)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '18px',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        transition: 'border-color 0.3s, background 0.3s',
        overflow: 'hidden',
      }}
    >
      {/* glow no canto quando done */}
      {c.done && (
        <div style={{
          position: 'absolute', top: '-30px', right: '-30px',
          width: '100px', height: '100px',
          background: 'rgba(52,211,153,0.12)',
          borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none',
        }} />
      )}

      {/* topo: ícone + título + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {c.icon}
          </div>
          <div>
            <h3 style={{
              fontWeight: 800, fontSize: '0.95rem', color: 'white',
              letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '4px',
            }}>
              {c.title}
            </h3>
            <p style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.4,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {c.desc}
            </p>
          </div>
        </div>

        {c.done && (
          <div style={{
            flexShrink: 0, padding: '4px 10px', borderRadius: '8px',
            background: 'rgba(52,211,153,0.12)',
            border: '1px solid rgba(52,211,153,0.25)',
            fontSize: '0.68rem', fontWeight: 700, color: '#34d399',
            fontFamily: 'monospace', whiteSpace: 'nowrap',
          }}>
            ✓ Pronto
          </div>
        )}
      </div>

      {/* progresso */}
      <div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace', marginBottom: '6px',
        }}>
          <span>Progresso</span>
          <span style={{ color: c.done ? '#34d399' : '#22d3ee' }}>{c.progress}%</span>
        </div>
        <div style={{
          height: '3px', borderRadius: '999px',
          background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${c.progress}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              height: '100%', borderRadius: '999px',
              background: c.done
                ? '#34d399'
                : 'linear-gradient(90deg, #38bdf8, #22d3ee)',
            }}
          />
        </div>
      </div>

      {/* ações */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* botão reutilização (id 4) */}
        {c.id === 4 && (
          <button
            onClick={() => toggleReuse(c.id)}
            style={{
              padding: '8px 14px', borderRadius: '10px', border: 'none',
              fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s',
              background: c.reused ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.04)',
              color: c.reused ? '#38bdf8' : 'rgba(255,255,255,0.4)',
              outline: c.reused ? '1px solid rgba(56,189,248,0.25)' : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {c.reused ? '✓ Reutilizado hoje' : 'Marcar reutilização'}
          </button>
        )}

        {/* botão registrar */}
        {!c.done && c.id !== 4 && (
          <button
            onClick={() => { setSelected(isOpen ? null : c.id); setInputVal('') }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.72rem', color: isOpen ? 'rgba(255,255,255,0.35)' : 'rgba(56,189,248,0.7)',
              fontFamily: 'monospace', textAlign: 'left', padding: '0',
              transition: 'color 0.2s',
            }}
          >
            {isOpen ? '✕ Cancelar' : '↓ Registrar dados'}
          </button>
        )}

        {/* input expandível */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                <input
                  type="number"
                  min={0}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder={getInputPlaceholder(c.id)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', fontSize: '0.8rem',
                    fontFamily: 'monospace', textAlign: 'center',
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  onClick={() => handleUpdate(c)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                    color: '#07131f', fontWeight: 800, fontSize: '0.78rem',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}