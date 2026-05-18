import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWater } from '../context/WaterContext'

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function Desafios() {
  const { challenges, updateProgress, toggleReuse, points, streak, saving } = useWater()
  const [selected, setSelected] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL') // ALL, DOING, DONE

  // Mapeamento de Categorias para os 8 desafios limpos
  const categories = [
    { id: 'daily', title: '🌊 Economia Diária', ids: [1, 2, 3] },
    { id: 'sust', title: '♻️ Sustentabilidade', ids: [4, 5, 6] },
    { id: 'special', title: '🏆 Metas Especiais', ids: [7, 8] },
  ]

  function handleUpdate(challenge) {
    const v = parseFloat(inputVal)
    if (isNaN(v) || v < 0) return

    let finalProgress = 0
    switch (challenge.id) {
      case 1:
        finalProgress = v <= 5 ? 100 : Math.max(0, 100 - (v - 5) * 15)
        break
      case 2:
        finalProgress = v === 0 ? 100 : Math.max(0, 100 - v * 20)
        break
      default:
        finalProgress = Math.min(100, v)
        break
    }

    updateProgress(challenge.id, Math.round(finalProgress))
    setSelected(null)
    setInputVal('')
  }

  function getInputPlaceholder(id) {
    switch (id) {
      case 1: return "Minutos"
      case 2: return "Minutos"
      default: return "Progresso %"
    }
  }

  const done = challenges.filter(c => c.done).length
  const total = challenges.length
  const pctGeral = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="min-h-screen bg-deep pt-24 pb-16 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        
        {/* ================= HEADER CENTRALIZADO ================= */}
        <motion.div {...fadeUp()} className="text-center flex flex-col items-center mb-2">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-sky/60 block mb-2">
            Dashboard / Gamification
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white">
            Seus <span className="text-gradient">Desafios</span>
          </h1>
        </motion.div>

        {/* ================= BARRA SUPERIOR PREMIUM (Estatísticas) ================= */}
        <motion.div 
          {...fadeUp(0.05)} 
          className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 shadow-2xl overflow-hidden w-full"
        >
          {/* Sutil glow de fundo */}
          <div className="absolute top-0 left-1/4 w-72 h-32 bg-sky/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10 text-center sm:text-left">
            <div className="flex flex-col gap-1 sm:border-r border-white/5">
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Sequência</span>
              <span className="text-2xl font-bold font-mono text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                🔥 {streak} {streak === 1 ? 'dia' : 'dias'}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:border-r border-white/5">
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Economia</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                💧 {saving > 0 ? `${saving}%` : '0%'}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:border-r border-white/5">
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Pontuação</span>
              <span className="text-2xl font-bold font-mono text-accent">
                ⭐ {points} XP
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Evolução</span>
              <span className="text-2xl font-bold font-mono text-sky">
                📈 {pctGeral}%
              </span>
            </div>
          </div>

          {/* Linha de progresso geral integrada */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-sky via-accent to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pctGeral}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span className="text-white/30 text-xs font-mono">{done}/{total}</span>
          </div>
        </motion.div>

        {/* ================= SISTEMA DE FILTROS (Abas) ================= */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center md:justify-start gap-2 border-b border-white/5 pb-2">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'DOING', label: 'Em andamento' },
            { id: 'DONE', label: 'Concluídos' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                activeFilter === tab.id 
                  ? 'bg-white/10 text-white shadow-md' 
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ================= LISTAGEM POR CATEGORIAS & GRID RESPONSIVO ================= */}
        <div className="flex flex-col gap-10">
          {categories.map((cat, catIdx) => {
            // Filtragem avançada combinando categoria + estado do desafio
            const catChallenges = challenges.filter(c => {
              const belongsToCat = cat.ids.includes(c.id)
              if (!belongsToCat) return false
              if (activeFilter === 'DOING') return !c.done
              if (activeFilter === 'DONE') return c.done
              return true
            })

            // Esconde a seção inteira se não houver cards que correspondam ao filtro ativo
            if (catChallenges.length === 0) return null

            return (
              <motion.section 
                key={cat.id} 
                {...fadeUp(0.15 + catIdx * 0.05)}
                className="flex flex-col gap-4"
              >
                <h2 className="text-white/70 font-display text-sm font-semibold tracking-wider uppercase pl-1">
                  {cat.title}
                </h2>

                {/* Grid Responsivo Inteligente: minmax evita quebra feia */}
                <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
                  {catChallenges.map((c, i) => (
                    <motion.div
                      key={c.id}
                      whileHover={{ y: -4, scale: 1.01, borderColor: 'rgba(255,255,255,0.15)' }}
                      className={`relative bg-white/[0.03] backdrop-blur-[18px] border rounded-xl p-5 flex flex-col justify-between transition-colors duration-300 ${
                        c.done 
                          ? 'border-emerald-500/20 shadow-lg shadow-emerald-500/[0.02]' 
                          : 'border-white/[0.06] hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Topo do Card */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl bg-white/5 w-10 h-10 flex items-center justify-center rounded-lg shadow-inner">
                            {c.icon}
                          </span>
                          <div>
                            <h3 className="font-display text-sm font-bold text-white tracking-tight">
                              {c.title}
                            </h3>
                            <p className="text-white/40 text-xs mt-0.5 line-clamp-1">
                              {c.desc}
                            </p>
                          </div>
                        </div>
                        {c.done && (
                          <span className="text-emerald-400 text-sm font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            Pronto
                          </span>
                        )}
                      </div>

                      {/* Estrutura de Interação Otimizada */}
                      <div className="w-full flex flex-col gap-3">
                        {/* Botão Dinâmico de Reutilização (Desafio ID 4) */}
                        {c.id === 4 && (
                          <button
                            onClick={() => toggleReuse(c.id)}
                            className={`text-[11px] font-semibold py-1.5 rounded-lg border transition-all duration-200 w-full ${
                              c.reused
                                ? 'bg-gradient-to-r from-sky/20 to-accent/20 text-sky border-sky/30'
                                : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {c.reused ? '✓ Reutilizado hoje' : 'Marcar Reutilização'}
                          </button>
                        )}

                        {/* Barra de Progresso Minimalista */}
                        <div className="w-full">
                          <div className="flex justify-between text-[10px] text-white/30 mb-1 font-mono">
                            <span>Progresso</span>
                            <span className={c.done ? 'text-emerald-400' : 'text-accent'}>{c.progress}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                c.done ? 'bg-emerald-400' : 'bg-gradient-to-r from-sky to-accent'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${c.progress}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Botão Menor de Registro */}
                        {!c.done && c.id !== 4 && (
                          <button
                            onClick={() => {
                              setSelected(selected === c.id ? null : c.id)
                              setInputVal('')
                            }}
                            className="text-[11px] text-white/40 hover:text-sky transition-colors font-mono self-start"
                          >
                            {selected === c.id ? '✕ Cancelar' : '↓ Registrar dados'}
                          </button>
                        )}

                        {/* Form Inline Expandível */}
                        <AnimatePresence>
                          {selected === c.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="flex gap-2 pt-1">
                                <input
                                  type="number"
                                  min={0}
                                  value={inputVal}
                                  onChange={e => setInputVal(e.target.value)}
                                  placeholder={getInputPlaceholder(c.id)}
                                  className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white placeholder-white/20 text-xs focus:outline-none focus:border-accent/50 w-full font-mono text-center"
                                />
                                <button
                                  onClick={() => handleUpdate(c)}
                                  className="bg-white text-deep font-bold text-[11px] px-3 py-1 rounded-md hover:bg-white/90 transition-colors whitespace-nowrap"
                                >
                                  Salvar
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
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