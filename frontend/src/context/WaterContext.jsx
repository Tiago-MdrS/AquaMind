import { createContext, useContext, useState } from 'react'

const WaterContext = createContext()

// 1. Desafios resetados com progresso em 0% e status done: false
const initialChallenges = [
  { id: 1,  icon: '🚿', title: 'Banho de 5 minutos',      desc: 'Reduza seu banho por 7 dias consecutivos',           progress: 0,  done: false },
  { id: 2,  icon: '🌧️', title: 'Captação de chuva',       desc: 'Use água da chuva por 1 semana',                     progress: 0,  done: false },
  { id: 3,  icon: '🥗', title: 'Dieta hídrica leve',      desc: 'Consuma menos de 120L/dia por 5 dias',               progress: 0,  done: false },
  { id: 4,  icon: '♻️', title: 'Reutilização de água',    desc: 'Reaproveite água do cozimento por 7 dias',           progress: 0,  done: false, reused: false },
  { id: 5,  icon: '🦷', title: 'Torneira consciente',     desc: 'Feche a torneira ao escovar os dentes por 7 dias',   progress: 0,  done: false },
  { id: 6,  icon: '🚗', title: 'Lavagem sustentável',     desc: 'Lave o carro com balde em vez de mangueira',         progress: 0,  done: false },
  { id: 7,  icon: '🪣', title: 'Balde no banho',          desc: 'Colete a água fria do banho para reutilizar',        progress: 0,  done: false },
  { id: 8,  icon: '🌱', title: 'Irrigação inteligente',   desc: 'Regue plantas apenas ao amanhecer por 10 dias',      progress: 0,  done: false },
  { id: 9,  icon: '🍽️', title: 'Louça eficiente',        desc: 'Acumule louças antes de lavar por 7 dias',           progress: 0,  done: false },
  { id: 10, icon: '🔧', title: 'Caça ao vazamento',       desc: 'Verifique e repare todos os vazamentos da casa',     progress: 0,  done: false },
  { id: 11, icon: '🧹', title: 'Varrer em vez de lavar',  desc: 'Use vassoura no quintal por 15 dias seguidos',       progress: 0,  done: false },
  { id: 12, icon: '💧', title: 'Meta dos 100L',           desc: 'Consuma menos de 100L em um único dia',              progress: 0,  done: false },
  { id: 13, icon: '🧺', title: 'Máquina cheia',           desc: 'Só ligue a máquina de lavar com carga máxima',       progress: 0,  done: false },
  { id: 14, icon: '🥦', title: 'Bacia na pia',            desc: 'Lave frutas e legumes em bacia por 7 dias',          progress: 0,  done: false },
  { id: 15, icon: '🕯️', title: 'Dia sem desperdício',     desc: 'Passe um dia inteiro sem desperdiçar nem 1L',        progress: 0,  done: false },
  { id: 16, icon: '📊', title: 'Monitorar por 30 dias',   desc: 'Registre seu consumo diário por um mês completo',    progress: 0,  done: false },
  { id: 17, icon: '🏫', title: 'Conscientizar alguém',    desc: 'Ensine uma dica de economia para um amigo ou familiar', progress: 0, done: false },
  { id: 18, icon: '🌊', title: 'Semana verde',            desc: 'Fique abaixo da meta todos os dias por 7 dias',      progress: 0,  done: false },
]

// 2. Histórico de meses zerado para o gráfico de linhas começar limpo
const initialConsumption = [
  { mes: 'Jan', litros: 0 },
  { mes: 'Fev', litros: 0 },
  { mes: 'Mar', litros: 0 },
  { mes: 'Abr', litros: 0 },
  { mes: 'Mai', litros: 0 },
  { mes: 'Jun', litros: 0 },
  { mes: 'Jul', litros: 0 },
]

export function WaterProvider({ children }) {
  const [challenges, setChallenges] = useState(initialChallenges)
  const [consumption]               = useState(initialConsumption)
  
  // 3. Estados de pontuação, streak e consumo diário iniciados em ZERO
  const [todayLiters, setTodayLiters] = useState(0)
  const [points, setPoints]           = useState(0)
  const [streak]                      = useState(0)

  function updateProgress(id, value) {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, progress: Math.min(100, value), done: value >= 100 }
          : c
      )
    )
    setPoints(p => p + 10)
  }

  function toggleReuse(id) {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id ? { ...c, reused: !c.reused, progress: c.reused ? 0 : c.progress, done: c.reused ? false : c.done } : c
      )
    )
    setPoints(p => p + 5)
  }

  function addConsumption(liters) {
    setTodayLiters(prev => Math.max(0, prev + liters))
  }

  const avgLiters = consumption.reduce((s, d) => s + d.litros, 0) / consumption.length
  
  // Proteção para não dar erro de divisão por zero na economia
  const saving = avgLiters === 0 ? 0 : Math.round(((avgLiters - todayLiters) / avgLiters) * 100)

  return (
    <WaterContext.Provider value={{
      challenges, consumption,
      todayLiters, points, streak,
      avgLiters, saving,
      updateProgress, addConsumption, toggleReuse,
    }}>
      {children}
    </WaterContext.Provider>
  )
}

export function useWater() {
  return useContext(WaterContext)
}