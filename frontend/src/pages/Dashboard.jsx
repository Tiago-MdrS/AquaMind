import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-deep pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <motion.div
          {...fadeUp()}
          className="glass rounded-3xl p-8 md:p-12 mb-10 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-sky/10 blur-3xl rounded-full" />

          <span className="font-mono text-xs tracking-[0.2em] uppercase text-sky block mb-4">
            Dashboard AquaMind
          </span>

          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-none">
            Olá, <span className="text-gradient">{user?.name}</span>
          </h1>

          <p className="text-white/55 font-light mt-5 max-w-2xl leading-relaxed">
            Continue completando desafios sustentáveis, acumule pontos
            e acompanhe sua evolução no ranking global.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/desafios"
              className="bg-gradient-to-r from-sky to-accent text-deep font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              Ver Desafios
            </Link>

            <Link
              to="/ranking"
              className="border border-sky/20 text-white/70 hover:text-white hover:border-accent px-6 py-3 rounded-xl transition-all"
            >
              Abrir Ranking
            </Link>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <motion.div
            {...fadeUp(0.1)}
            className="glass rounded-2xl p-6"
          >
            <span className="text-4xl">🌊</span>

            <h3 className="text-white text-lg font-bold mt-4">
              Sustentabilidade
            </h3>

            <p className="text-white/45 text-sm mt-2 leading-relaxed">
              Pequenas ações geram grandes impactos no meio ambiente.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            className="glass rounded-2xl p-6"
          >
            <span className="text-4xl">🏆</span>

            <h3 className="text-white text-lg font-bold mt-4">
              Ranking Global
            </h3>

            <p className="text-white/45 text-sm mt-2 leading-relaxed">
              Veja sua posição e dispute com outros usuários.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="glass rounded-2xl p-6"
          >
            <span className="text-4xl">💧</span>

            <h3 className="text-white text-lg font-bold mt-4">
              Economia de Água
            </h3>

            <p className="text-white/45 text-sm mt-2 leading-relaxed">
              Desenvolva hábitos sustentáveis através da gamificação.
            </p>
          </motion.div>

        </div>

        {/* QUICK ACTIONS */}
        <motion.div
          {...fadeUp(0.4)}
          className="glass rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-sky">
                Ações rápidas
              </span>

              <h2 className="font-display text-3xl font-black mt-2">
                Continue sua jornada sustentável
              </h2>
            </div>

            <button
              onClick={logout}
              className="bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-6 py-3 rounded-xl transition-all font-semibold"
            >
              Sair da conta
            </button>

          </div>
        </motion.div>

      </div>
    </div>
  );
}