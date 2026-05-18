import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useWater } from '../context/WaterContext'

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

const COLORS = ['#00d4ff', '#3bb8d8', '#1a7fa0', '#0a4f6e']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-4 py-3 text-sm">
      <p className="text-white/60 mb-1">{label}</p>
      <p className="text-accent font-bold">{payload[0].value} L/dia</p>
    </div>
  )
}

export default function Dashboard() {
  const { consumption, todayLiters, points, streak, avgLiters, saving, addConsumption } = useWater()
  
  const [input, setInput] = useState('')
  const [category, setCategory] = useState("Banho")
  const [pieData, setPieData] = useState([
    { name: 'Banho', value: 0 },
    { name: 'Vaso', value: 0 },
    { name: 'Pia', value: 0 },
    { name: 'Outros', value: 0 },
  ])

  function handleAdd(e) {
    e.preventDefault()
    const v = parseFloat(input)
    if (!isNaN(v)) {
      addConsumption(v)
      setPieData(prev =>
        prev.map(item =>
          item.name === category
            ? { ...item, value: Math.max(0, item.value + v) } // Evita que o gráfico fique negativo
            : item
        )
      )
      setInput('')
    }
  }

  function handleQuickAdd(v) {
    addConsumption(v)
    setPieData(prev =>
      prev.map(item =>
        item.name === category
          ? { ...item, value: Math.max(0, item.value + v) }
          : item
      )
    )
  }

  const metrics = [
    { label: 'Hoje',       value: `${todayLiters}L`,  sub: 'litros consumidos' },
    { label: 'Economia',   value: `${saving > 0 ? '↓' : '↑'}${Math.abs(saving)}%`, sub: 'vs. média mensal' },
    { label: 'Pontuação',  value: `${points}pts`,     sub: 'total acumulado' },
    { label: 'Streak',     value: `${streak}🔥`,      sub: 'dias consecutivos' },
  ]

  return (
    <div className="min-h-screen bg-deep pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho */}
        <motion.div {...fadeUp()} className="mb-10">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-sky block mb-3">
            Painel de Controle
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight">
            Seu <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-white/50 font-light mt-2">
            Monitore seu consumo hídrico em tempo real.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="glass rounded-2xl p-5 text-center">
              <span className="font-mono text-3xl font-bold text-accent block">{m.value}</span>
              <span className="text-xs text-white/40 uppercase tracking-widest block mt-1">{m.label}</span>
              <span className="text-xs text-white/60 block mt-0.5">{m.sub}</span>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.1)} className="glass rounded-2xl p-6 mb-6">
          <h2 className="font-display text-xl font-bold mb-1">Consumo mensal</h2>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Litros por dia — últimos 7 meses</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={consumption} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="litros" stroke="#00d4ff" strokeWidth={2} fill="url(#gradArea)" dot={{ fill: '#00d4ff', r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div {...fadeUp(0.15)} className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold mb-1">Consumo por dia</h2>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Barras comparativas</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={consumption} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="mes" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="litros" radius={[6, 6, 0, 0]}>
                  {consumption.map((_, i) => (
                    <Cell key={i} fill={i === consumption.length - 1 ? '#ff6b6b' : '#00d4ff'} opacity={i === consumption.length - 1 ? 1 : 0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gráfico de Pizza (Distribuição Dinâmica) */}
          <motion.div {...fadeUp(0.2)} className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold mb-1">Distribuição de uso</h2>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Por categoria (Litros)</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend formatter={v => <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{v}</span>} />
                <Tooltip formatter={v => [`${v} L`]} contentStyle={{ background: '#0a3040', border: '1px solid rgba(59,184,216,0.2)', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Painel de Registro de Consumo */}
        <motion.div {...fadeUp(0.25)} className="glass rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold mb-1">Registrar consumo</h2>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Adicione ou remova litros do dia por categoria</p>
          <div className="flex flex-wrap gap-3 items-center">
            
            <input
              type="number"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ex: 10 ou -10"
              className="bg-white/5 border border-sky/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors w-44 font-mono"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/5 border border-sky/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors font-mono cursor-pointer"
            >
              <option value="Banho" className="bg-deep text-white">🚿 Banho</option>
              <option value="Vaso" className="bg-deep text-white">🚽 Vaso Sanitário</option>
              <option value="Pia" className="bg-deep text-white">🚰 Pia</option>
              <option value="Outros" className="bg-deep text-white">✨ Outros</option>
            </select>

            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-sky to-accent text-deep font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-200"
            >
              Registrar
            </button>

            {[+5, +15, +30, -10].map(v => (
              <button
                key={v}
                onClick={() => handleQuickAdd(v)}
                className="border border-sky/25 text-sky/80 text-sm px-4 py-3 rounded-xl hover:bg-sky/10 transition-colors font-mono"
              >
                {v > 0 ? `+${v}L` : `${v}L`}
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}