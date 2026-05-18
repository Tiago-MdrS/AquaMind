import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/home",      label: "Home" },
  { to: "/desafios",  label: "Desafios" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ranking",   label: "Ranking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user  = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  function logout() {
    localStorage.clear();
    setOpen(false);
    navigate("/", { replace: true });
  }

  if (!token || location.pathname === "/") return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 9999, // ALTURA MÁXIMA PARA NÃO SUMIR ATRÁS DE ELEMENTOS
          height: '64px' // ALTURA FIXA ALINHADA COM O SEU LAYOUT GLOBAL
        }}
      >
        {/* Linha de brilho superior */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, #38bdf8 40%, #22d3ee 60%, transparent)',
        }} />

        <div style={{
          background: scrolled ? 'rgba(7,19,31,0.95)' : 'rgba(7,19,31,0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid rgba(56,189,248,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}>

          {/* ── DESKTOP ── */}
          {!isMobile && (
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 40px',
              height: '64px',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
            }}>
              {/* LOGO */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <NavLink to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'white' }}>
                    Aqua
                  </span>
                  <span style={{
                    fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em',
                    background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.5))',
                  }}>
                    Mind
                  </span>
                </NavLink>
              </div>

              {/* LINKS */}
              <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {links.map(({ to, label }) => (
                  <NavLink key={to} to={to} style={{ textDecoration: 'none', position: 'relative' }}>
                    {({ isActive }) => (
                      <div style={{ position: 'relative', padding: '8px 16px', borderRadius: '10px' }}>
                        {isActive && (
                          <motion.div
                            layoutId="pill"
                            style={{
                              position: 'absolute', inset: 0, borderRadius: '10px',
                              background: 'rgba(56,189,248,0.1)',
                              border: '1px solid rgba(56,189,248,0.25)',
                              boxShadow: '0 0 16px rgba(56,189,248,0.08)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                        <span style={{
                          position: 'relative', zIndex: 1,
                          fontSize: '0.75rem', fontWeight: 700,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: isActive ? 'white' : 'rgba(255,255,255,0.45)',
                          transition: 'color 0.2s',
                        }}>
                          {label}
                        </span>
                        {isActive && (
                          <div style={{
                            position: 'absolute', bottom: '4px',
                            left: '50%', transform: 'translateX(-50%)',
                            width: '4px', height: '4px', borderRadius: '50%',
                            background: '#38bdf8', boxShadow: '0 0 6px #38bdf8',
                          }} />
                        )}
                      </div>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* USUÁRIO + SAIR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 12px', borderRadius: '999px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 900, flexShrink: 0,
                    background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                    color: '#07131f',
                  }}>
                    {(user?.name || 'U')[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                    Olá,&nbsp;
                    <span style={{
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {user?.name || 'usuário'}
                    </span>
                  </span>
                </div>

                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: '6px 16px', borderRadius: '999px',
                    fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.22)',
                    color: 'rgba(252,165,165,0.9)',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.18)'
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.22)'
                  }}
                >
                  Sair
                </motion.button>
              </div>
            </div>
          )}

          {/* ── MOBILE HEADER ── */}
          {isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: '64px', padding: '0 24px',
            }}>
              <NavLink to="/home" style={{ textDecoration: 'none', display: 'flex' }}>
                <span style={{ fontWeight: 900, fontSize: '1.4rem', color: 'white' }}>Aqua</span>
                <span style={{
                  fontWeight: 900, fontSize: '1.4rem',
                  background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Mind</span>
              </NavLink>

              <button
                onClick={() => setOpen(o => !o)}
                aria-label="Menu"
                style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '5px',
                  background: open ? 'rgba(56,189,248,0.1)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    style={{
                      display: 'block', height: '1.5px', borderRadius: '2px',
                      background: 'white', width: i === 1 ? '60%' : '75%',
                    }}
                    animate={
                      open
                        ? i === 0 ? { rotate: 45,  y: 6.5 }
                        : i === 1 ? { opacity: 0, scaleX: 0 }
                        :           { rotate: -45, y: -6.5 }
                        : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                    }
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* ── MENU MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', 
              top: '64px', 
              left: 0, 
              right: 0, 
              zIndex: 9998, // ABAIXO APENAS DA NAVBAR FIXA
              background: 'rgba(7,19,31,0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(56,189,248,0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              padding: '20px 24px 28px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '4px',
            }}
          >
            {links.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={to}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                    background: isActive ? 'rgba(56,189,248,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(56,189,248,0.15)' : '1px solid transparent',
                    transition: 'all 0.2s',
                  })}
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}

            <div style={{
              marginTop: '16px', paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 900,
                  background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
                  color: '#07131f',
                }}>
                  {(user?.name || 'U')[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                  Olá,&nbsp;
                  <span style={{ fontWeight: 700, color: '#38bdf8' }}>
                    {user?.name || 'usuário'}
                  </span>
                </span>
              </div>

              <button
                onClick={logout}
                style={{
                  padding: '8px 18px', borderRadius: '12px',
                  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.22)',
                  color: 'rgba(252,165,165,0.9)',
                }}
              >
                Sair
              </button>
            </div>
          </motion.div> 
        )}
      </AnimatePresence>
    </>
  );
}