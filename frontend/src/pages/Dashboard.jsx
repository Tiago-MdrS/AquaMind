import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useWater } from "../context/WaterContext";

const COLORS = ["#00d4ff", "#38bdf8", "#0ea5e9", "#155e75"];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-[#07131f]/95 px-4 py-3 text-sm shadow-xl backdrop-blur-xl">
      <p className="mb-1 text-white/50">{label}</p>

      <p className="font-bold text-cyan-300">
        {payload[0].value} L
      </p>
    </div>
  );
}

export default function Dashboard() {
  const {
    consumption,
    todayLiters,
    points,
    streak,
    saving,
    addConsumption,
  } = useWater();

  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Banho");

  const [pieData, setPieData] = useState([
    { name: "Banho", value: 0 },
    { name: "Vaso", value: 0 },
    { name: "Pia", value: 0 },
    { name: "Outros", value: 0 },
  ]);

  function registerConsumption(value) {
    const liters = Number(value);

    if (Number.isNaN(liters) || liters === 0) return;

    addConsumption(liters);

    setPieData((prev) =>
      prev.map((item) =>
        item.name === category
          ? {
              ...item,
              value: Math.max(0, item.value + liters),
            }
          : item
      )
    );

    setInput("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerConsumption(input);
  }

  const metrics = [
    {
      label: "Hoje",
      value: `${todayLiters}L`,
      sub: "litros consumidos",
    },
    {
      label: "Economia",
      value: `${saving > 0 ? "↓" : "↑"}${Math.abs(saving)}%`,
      sub: "comparado à média",
    },
    {
      label: "Pontuação",
      value: `${points}pts`,
      sub: "total acumulado",
    },
    {
      label: "Sequência",
      value: `${streak}🔥`,
      sub: "dias consecutivos",
    },
  ];

  return (
    <section className="min-h-screen w-full px-4 pt-10 pb-20 text-white">
      <div className="mx-auto w-full max-w-7xl">
        {/* HEADER */}

        <motion.header
          {...fadeUp()}
          className="mb-10 rounded-[2rem] border border-cyan-400/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-9"
        >
          <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Painel de controle
          </span>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Seu{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                Acompanhe seu consumo de água, registre novos usos
                e visualize sua evolução de forma inteligente.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/10 px-6 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                Status
              </p>

              <p className="mt-1 text-xl font-black text-cyan-300">
                Monitorando
              </p>
            </div>
          </div>
        </motion.header>

        {/* MÉTRICAS */}

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              {...fadeUp(index * 0.07)}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-xl shadow-black/10 backdrop-blur-xl"
            >
              <p className="font-mono text-4xl font-black text-cyan-300">
                {metric.value}
              </p>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                {metric.label}
              </p>

              <p className="mt-2 text-sm text-white/55">
                {metric.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* PRIMEIRA LINHA */}

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* ÁREA */}

          <motion.div
            {...fadeUp(0.12)}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="mb-7">
              <h2 className="text-2xl font-black">
                Consumo mensal
              </h2>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Litros por período
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={consumption}
                margin={{
                  top: 10,
                  right: 15,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="waterArea"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#00d4ff"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="95%"
                      stopColor="#00d4ff"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="mes"
                  tick={{
                    fill: "rgba(255,255,255,0.45)",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "rgba(255,255,255,0.45)",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="litros"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  fill="url(#waterArea)"
                  dot={{
                    fill: "#00d4ff",
                    r: 4,
                  }}
                  activeDot={{
                    r: 7,
                    fill: "#fff",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* PIE */}

          <motion.div
            {...fadeUp(0.16)}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="mb-7">
              <h2 className="text-2xl font-black">
                Distribuição
              </h2>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Uso por categoria
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="48%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-white/60">
                      {value}
                    </span>
                  )}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value} L`,
                    "Consumo",
                  ]}
                  contentStyle={{
                    background: "#07131f",
                    border:
                      "1px solid rgba(34,211,238,0.2)",
                    borderRadius: 16,
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* SEGUNDA LINHA */}

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* FORM */}

          <motion.form
            {...fadeUp(0.2)}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-black">
              Registrar consumo
            </h2>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Adicione ou remova litros
            </p>

            <div className="mt-7 grid gap-4">
              <input
                type="number"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ex: 10 ou -10"
                className="w-full rounded-2xl border border-cyan-400/20 bg-white/5 px-4 py-4 font-mono text-white placeholder:text-white/30 outline-none transition focus:border-cyan-300"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full cursor-pointer rounded-2xl border border-cyan-400/20 bg-[#07131f] px-4 py-4 font-mono text-white outline-none transition focus:border-cyan-300"
              >
                <option value="Banho">
                  🚿 Banho
                </option>

                <option value="Vaso">
                  🚽 Vaso sanitário
                </option>

                <option value="Pia">
                  🚰 Pia
                </option>

                <option value="Outros">
                  ✨ Outros
                </option>
              </select>

              <button
                type="submit"
                className="rounded-2xl bg-gradient-to-r from-cyan-300 to-sky-400 px-6 py-4 font-black text-[#061622] transition hover:scale-[1.02]"
              >
                Registrar consumo
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[5, 15, 30, -10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    registerConsumption(value)
                  }
                  className="rounded-2xl border border-cyan-400/20 px-3 py-4 font-mono text-sm font-bold text-cyan-200 transition hover:bg-cyan-400/10"
                >
                  {value > 0
                    ? `+${value}L`
                    : `${value}L`}
                </button>
              ))}
            </div>
          </motion.form>

          {/* BAR */}

          <motion.div
            {...fadeUp(0.24)}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="mb-7">
              <h2 className="text-2xl font-black">
                Comparativo
              </h2>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                Consumo por dia
              </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={consumption}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="mes"
                  tick={{
                    fill: "rgba(255,255,255,0.45)",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "rgba(255,255,255,0.45)",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="litros"
                  radius={[10, 10, 0, 0]}
                >
                  {consumption.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index ===
                        consumption.length - 1
                          ? "#38bdf8"
                          : "#0ea5e9"
                      }
                      opacity={
                        index ===
                        consumption.length - 1
                          ? 1
                          : 0.65
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}