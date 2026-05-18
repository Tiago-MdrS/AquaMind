import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/desafios", label: "Desafios" },
  { to: "/ranking", label: "Ranking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  function logout() {
    localStorage.clear();

    setOpen(false);

    navigate("/", {
      replace: true,
    });
  }

  if (!token || location.pathname === "/") {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-deep/90 backdrop-blur-xl border-b border-sky/10 shadow-lg shadow-black/20"
          : "bg-deep/70 backdrop-blur-md"
      }`}
    >
      <NavLink
        to="/dashboard"
        className="font-display text-2xl font-black tracking-tight"
      >
        <span className="text-white">Aqua</span>
        <span className="text-gradient">Mind</span>
      </NavLink>

      <ul className="hidden md:flex gap-8 items-center list-none">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-white/60 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}

        <li className="text-sm text-white/50">
          Olá, <span className="text-accent font-semibold">{user?.name}</span>
        </li>

        <li>
          <button
            onClick={logout}
            className="bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 font-bold text-sm px-5 py-2 rounded-full transition-all duration-200"
          >
            Sair
          </button>
        </li>
      </ul>

      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-deep/95 backdrop-blur-xl border-b border-sky/10 py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-accent" : "text-white/70"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="text-sm text-white/50 pt-2">
              Olá,{" "}
              <span className="text-accent font-semibold">{user?.name}</span>
            </div>

            <button
              onClick={logout}
              className="bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25 font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 text-left"
            >
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}