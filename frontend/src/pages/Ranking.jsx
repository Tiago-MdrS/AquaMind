import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Medal,
  ArrowLeft,
  Crown,
  Loader2,
} from "lucide-react";

import { motion } from "framer-motion";
import { getRanking } from "../services/api";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.45,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanking() {
      try {
        const data = await getRanking();

        setRanking(data.ranking || []);
        setCurrentUser(data.currentUser || null);
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRanking();
  }, []);

  const topThree = ranking.slice(0, 3);

  // LISTA COMPLETA
  const others = ranking;

  return (
    <section className="w-full pt-24 pb-24 text-white">
      <div className="flex w-full flex-col items-center gap-10 px-6">
        {/* HEADER */}

        <motion.div
          {...fadeUp()}
          className="flex w-full flex-col items-center text-center"
        >
          <Link
            to="/dashboard"
            className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/10"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <div className="w-full rounded-[2rem] border border-cyan-400/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-7">
            <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300">
              Ranking geral
            </span>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                  Disputa dos{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                    economizadores
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                  Veja quem está economizando mais água e acumulando pontos no
                  AquaMind.
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">
                <Trophy size={28} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* SUA POSIÇÃO */}

        {currentUser && (
          <motion.div
            {...fadeUp(0.08)}
            className="w-full rounded-[1.8rem] border border-cyan-400/20 bg-cyan-400/10 p-5 text-center shadow-xl shadow-cyan-950/20 backdrop-blur-xl"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-200/70">
              Sua posição
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-black">
                Você está em{" "}
                <span className="text-cyan-300">
                  {currentUser.position}º
                </span>{" "}
                lugar
              </p>

              <p className="rounded-2xl bg-[#061622]/70 px-4 py-2 font-mono text-lg font-black text-cyan-300">
                {currentUser.score} pontos
              </p>
            </div>
          </motion.div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-cyan-300">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : ranking.length === 0 ? (
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/50">
            Nenhum usuário no ranking ainda.
          </div>
        ) : (
          <>
            {/* TOP 3 */}

            <div className="grid w-full gap-5 md:grid-cols-3">
              {topThree.map((user, index) => (
                <motion.div
                  key={user.id}
                  {...fadeUp(0.12 + index * 0.06)}
                  className={`relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-[1.8rem] border p-5 text-center shadow-2xl backdrop-blur-xl ${
                    index === 0
                      ? "border-yellow-300/30 bg-yellow-300/10"
                      : index === 1
                      ? "border-slate-300/20 bg-white/[0.05]"
                      : "border-orange-300/20 bg-orange-300/10"
                  }`}
                >
                  <div className="absolute right-4 top-4 text-4xl opacity-20">
                    {user.medal}
                  </div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#061622]/70">
                    {index === 0 ? (
                      <Crown className="text-yellow-300" size={24} />
                    ) : (
                      <Medal className="text-cyan-300" size={24} />
                    )}
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    {user.position}º lugar
                  </p>

                  <h2 className="mt-2 text-center text-xl font-black leading-tight">
                    {user.name}
                  </h2>

                  <p className="mt-4 text-center font-mono text-2xl font-black text-cyan-300">
                    {user.score}
                    <span className="ml-2 text-xs text-white/40">
                      pts
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CLASSIFICAÇÃO COMPLETA */}

            <div className="w-full rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 text-center shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="mb-5 flex flex-col items-center">
                <h2 className="text-xl font-black">
                  Classificação completa
                </h2>

                <p className="mt-1 text-sm text-white/45">
                  Lista geral de participantes por pontuação.
                </p>
              </div>

              <div className="space-y-4">
                {others.map((user, index) => (
                  <motion.div
                    key={user.id}
                    {...fadeUp(0.16 + index * 0.03)}
                    className="flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-[#061622]/60 px-4 py-4 text-center transition hover:border-cyan-400/20 hover:bg-cyan-400/5 md:flex-row md:justify-between"
                  >
                    <div className="flex flex-col items-center gap-3 md:flex-row">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 font-mono text-sm font-black text-cyan-300">
                        {user.position}º
                      </div>

                      <div className="text-center md:text-left">
                        <p className="text-sm font-bold text-white">
                          {user.medal} {user.name}
                        </p>

                        <p className="mt-1 text-[11px] text-white/40">
                          Participante AquaMind
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-lg font-black text-cyan-300">
                      {user.score} pts
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}