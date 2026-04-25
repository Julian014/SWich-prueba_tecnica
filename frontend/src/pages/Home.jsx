import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = ["Tamaño", "Pan", "Carne", "Queso", "Vegetales", "Salsas"];

const SIZES = [
  { id: "15cm", label: "15 centímetros", desc: "Porción personal", price: 10000, emoji: "🥖" },
  { id: "30cm", label: "30 centímetros", desc: "Porción grande", price: 15000, emoji: "🥖" },
];

const BREADS = [
  { id: "miel", label: "Miel y avena", price: 0 },
  { id: "italiano-hierbas", label: "Italiano con hierbas y queso", price: 200 },
  { id: "trigo", label: "Trigo con 9 cereales", price: 100 },
  { id: "italiano-normal", label: "Italiano normal", price: 0 },
  { id: "suculento", label: "Suculento italiano", price: 300 },
  { id: "romero", label: "Romero y sal marina", price: 300 },
];

const MEATS = [
  { id: "pollo", label: "Pollo rostizado", price: 1200, emoji: "🍗" },
  { id: "atun", label: "Atún clásico", price: 1200, emoji: "🐟" },
  { id: "pavo", label: "Filete de pavo", price: 1500, emoji: "🥩" },
  { id: "roast", label: "Roast beef", price: 1300, emoji: "🥩" },
  { id: "vegetariano", label: "Vegetariano", price: 1200, emoji: "🥦" },
];

const CHEESES = [
  { id: "americano", label: "Americano", price: 500, emoji: "🧀" },
  { id: "cheddar", label: "Cheddar", price: 500, emoji: "🧀" },
  { id: "mozzarella", label: "Mozzarella", price: 600, emoji: "🧀" },
  { id: "provolone", label: "Provolone", price: 700, emoji: "🧀" },
];

const VEGGIES = [
  { id: "lechuga", label: "Lechuga", price: 0, emoji: "🥬" },
  { id: "tomate", label: "Tomate", price: 0, emoji: "🍅" },
  { id: "pepino", label: "Pepino", price: 0, emoji: "🥒" },
  { id: "cebolla", label: "Cebolla", price: 0, emoji: "🧅" },
  { id: "pimiento", label: "Pimiento", price: 100, emoji: "🫑" },
  { id: "aceitunas", label: "Aceitunas", price: 200, emoji: "🫒" },
];

const SAUCES = [
  { id: "mayonesa", label: "Mayonesa", price: 0 },
  { id: "mostaza", label: "Mostaza", price: 0 },
  { id: "ranch", label: "Ranch", price: 0 },
  { id: "chipotle", label: "Chipotle", price: 200 },
  { id: "sriracha", label: "Sriracha", price: 200 },
  { id: "bbq", label: "BBQ", price: 100 },
];

const NAV_ICONS = {
  Inicio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    </svg>
  ),
  Explorar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  "Mi pedido": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="2.5" rx="1.25"/>
      <rect x="3" y="10.75" width="18" height="2.5" rx="1.25"/>
      <rect x="3" y="16.5" width="18" height="2.5" rx="1.25"/>
    </svg>
  ),
  Historial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 15"/>
    </svg>
  ),
  Perfil: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
};

function fmt(n) {
  return "$" + n.toLocaleString("es-CO");
}

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpiresAt");
    window.location.href = "/";
  };

  return (
    <div className="sw-logout-box" onClick={handleLogout}>
      <div className="sw-logout-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>
      <div className="sw-logout-content">
        <span className="sw-logout-title">Cerrar sesión</span>
        <span className="sw-logout-subtitle">Salir de tu cuenta</span>
      </div>
    </div>
  );
}

export default function SandwichBuilder() {
  const [activeStep, setActiveStep] = useState(1); // 0=Tamaño,1=Pan,...
  const [selectedSize, setSelectedSize] = useState("15cm");
  const [selectedBread, setSelectedBread] = useState("italiano-hierbas");
  const [selectedMeats, setSelectedMeats] = useState(["pollo"]);
  const [selectedCheeses, setSelectedCheeses] = useState([]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [activeNav, setActiveNav] = useState("Mi pedido");

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const sessionExpiresAt = localStorage.getItem("sessionExpiresAt");

    if (!sessionExpiresAt) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      const diff = new Date(sessionExpiresAt) - new Date();

      if (diff <= 0) {
        clearInterval(interval);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("sessionExpiresAt");
        navigate("/");
        return;
      }

      setTimeLeft(Math.floor(diff / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const size = SIZES.find((s) => s.id === selectedSize);
  const bread = BREADS.find((b) => b.id === selectedBread);
  const meatsSelected = MEATS.filter((m) => selectedMeats.includes(m.id));
  const cheesesSelected = CHEESES.filter((c) => selectedCheeses.includes(c.id));
  const veggiesSelected = VEGGIES.filter((v) => selectedVeggies.includes(v.id));
  const saucesSelected = SAUCES.filter((s) => selectedSauces.includes(s.id));

  const total =
    (size?.price || 0) +
    (bread?.price || 0) +
    meatsSelected.reduce((a, m) => a + m.price, 0) +
    cheesesSelected.reduce((a, c) => a + c.price, 0) +
    veggiesSelected.reduce((a, v) => a + v.price, 0) +
    saucesSelected.reduce((a, s) => a + s.price, 0);

  const toggleArr = (arr, setArr, id, max) => {
    if (arr.includes(id)) setArr(arr.filter((x) => x !== id));
    else if (!max || arr.length < max) setArr([...arr, id]);
    else setArr([...arr.slice(1), id]);
  };

  const nextStep = () => setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
  const nextLabel = STEPS[activeStep + 1] || "Confirmar";

  const pendingItems = [];
  if (activeStep < 3) pendingItems.push("Queso");
  if (activeStep < 4) pendingItems.push("Vegetales");
  if (activeStep < 5) pendingItems.push("Salsas");

  return (
    <div style={{
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#F3F4F6",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sw-left { display: flex; flex-direction: column; width: 62%; height: 100%; background: #fff; position: relative; }
        .sw-right { width: 38%; height: 100%; background: #F9FAFB; border-left: 1px solid #E5E7EB; display: flex; flex-direction: column; }

        .sw-header {
          background: linear-gradient(135deg, #0a3320 0%, #14532D 50%, #166534 100%);
          padding: 18px 20px 28px;
          position: relative;
          overflow: hidden;
        }
        .sw-header::after {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          right: -60px; top: -60px;
        }
        .sw-header::before {
          content: '';
          position: absolute;
          width: 130px; height: 130px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          right: 80px; bottom: -40px;
        }

        .sw-logo { display: flex; align-items: center; gap: 0; margin-bottom: 14px; }
        .sw-logo-text { font-size: 28px; font-weight: 800; color: #fff; line-height: 1; }
        .sw-logo-text span { color: #4ADE80; }
        .sw-logo-sub { font-size: 9px; letter-spacing: 3px; color: rgba(255,255,255,0.55); font-weight: 600; margin-top: 2px; }

        .sw-greeting { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .sw-subtitle { font-size: 13px; color: rgba(255,255,255,0.7); }

        .sw-header-menu {
          position: absolute; top: 18px; right: 18px;
          background: rgba(255,255,255,0.15); border-radius: 50%;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.25);
        }

        .sw-logout-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sw-logout-box:hover {
          background: rgba(255,255,255,0.18);
        }
        .sw-logout-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(220,38,38,0.18);
          color: #FCA5A5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sw-logout-content {
          display: flex;
          flex-direction: column;
        }
        .sw-logout-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
        }
        .sw-logout-subtitle {
          font-size: 10px;
          color: rgba(255,255,255,0.65);
        }

        .sw-steps {
          display: flex;
          border-bottom: 1px solid #E5E7EB;
          overflow-x: auto;
          scrollbar-width: none;
          background: #fff;
          flex-shrink: 0;
        }
        .sw-steps::-webkit-scrollbar { display: none; }

        .sw-step {
          padding: 12px 16px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #9CA3AF;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          position: relative;
        }
        .sw-step.completed { color: #6B7280; }
        .sw-step.active { color: #14532D; border-bottom-color: #14532D; }
        .sw-step-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #E5E7EB;
        }
        .sw-step.completed .sw-step-dot { background: #22C55E; }
        .sw-step.active .sw-step-dot { background: #14532D; }

        .sw-content { flex: 1; overflow-y: auto; padding: 20px; }
        .sw-content::-webkit-scrollbar { width: 4px; }
        .sw-content::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }

        .sw-section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .sw-section-title { font-size: 11px; font-weight: 700; color: #374151; letter-spacing: 0.5px; text-transform: uppercase; }
        .sw-badge {
          background: #DCFCE7; color: #166534;
          font-size: 11px; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
        }
        .sw-badge.warning { background: #FEF9C3; color: #854D0E; }

        .sw-size-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .sw-size-card {
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
          position: relative;
        }
        .sw-size-card.selected {
          border-color: #14532D;
          background: #F0FDF4;
        }
        .sw-size-check {
          position: absolute; top: 10px; right: 10px;
          width: 22px; height: 22px; border-radius: 50%;
          background: #14532D;
          display: flex; align-items: center; justify-content: center;
        }
        .sw-size-emoji { font-size: 28px; margin-bottom: 8px; display: block; }
        .sw-size-label { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 2px; }
        .sw-size-desc { font-size: 12px; color: #6B7280; margin-bottom: 8px; }
        .sw-size-price { font-size: 14px; font-weight: 700; color: #14532D; }

        .sw-bread-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .sw-bread-chip {
          padding: 8px 14px;
          border-radius: 20px;
          border: 1.5px solid #E5E7EB;
          font-size: 13px; font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
          display: flex; align-items: center; gap: 6px;
        }
        .sw-bread-chip.selected {
          background: #14532D;
          border-color: #14532D;
          color: #fff;
          font-weight: 600;
        }
        .sw-bread-price { font-size: 12px; opacity: 0.75; }

        .sw-meat-list { display: flex; flex-direction: column; gap: 10px; }
        .sw-meat-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          border: 1.5px solid #E5E7EB;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
        }
        .sw-meat-item.selected {
          border-color: #14532D;
          background: #F0FDF4;
        }
        .sw-meat-emoji {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: #F9FAFB;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .sw-meat-info { flex: 1; }
        .sw-meat-label { font-size: 14px; font-weight: 600; color: #111827; }
        .sw-meat-price { font-size: 13px; color: #6B7280; margin-top: 2px; }
        .sw-meat-check {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid #D1D5DB;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .sw-meat-item.selected .sw-meat-check {
          background: #14532D; border-color: #14532D;
        }

        .sw-bottom-bar {
          border-top: 1px solid #E5E7EB;
          padding: 16px 20px;
          background: #fff;
          flex-shrink: 0;
        }
        .sw-continue-btn {
          width: 100%;
          padding: 16px 20px;
          background: #111827;
          color: #fff;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s;
        }
        .sw-continue-btn:hover { background: #1F2937; }
        .sw-tips {
          display: flex; flex-direction: column; gap: 6px;
          margin-top: 12px;
          background: #FFFBEB;
          border-radius: 12px;
          padding: 12px 14px;
        }
        .sw-tip {
          font-size: 12px; color: #92400E;
          display: flex; align-items: center; gap: 8px;
        }

        .sw-nav {
          display: flex;
          border-top: 1px solid #E5E7EB;
          background: #fff;
          flex-shrink: 0;
        }
        .sw-nav-item {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          padding: 10px 4px 8px;
          cursor: pointer;
          transition: color 0.2s;
          color: #9CA3AF;
          font-size: 10px; font-weight: 600;
          gap: 4px;
        }
        .sw-nav-item.active { color: #14532D; }
        .sw-nav-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #14532D; margin-top: 2px;
        }

        /* RIGHT PANEL */
        .sw-summary-header {
          background: #111827;
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
          border-radius: 0;
        }
        .sw-summary-title { font-size: 16px; font-weight: 700; color: #fff; }
        .sw-summary-edit { font-size: 13px; color: #22C55E; font-weight: 600; cursor: pointer; }

        .sw-summary-items { flex: 1; overflow-y: auto; padding: 20px 24px; }
        .sw-summary-items::-webkit-scrollbar { width: 4px; }
        .sw-summary-items::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }

        .sw-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #F3F4F6;
        }
        .sw-summary-row:last-child { border-bottom: none; }
        .sw-summary-item-label { font-size: 14px; color: #374151; }
        .sw-summary-item-price { font-size: 14px; font-weight: 700; color: #14532D; }
        .sw-summary-pending { font-size: 13px; color: #9CA3AF; font-style: italic; }

        .sw-total-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px;
          border-top: 2px solid #E5E7EB;
          flex-shrink: 0;
          background: #fff;
        }
        .sw-total-label { font-size: 15px; font-weight: 700; color: #374151; }
        .sw-total-price { font-size: 28px; font-weight: 800; color: #14532D; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "1380px",
          height: "92vh",
          background: "#fff",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
          display: "flex",
        }}
      >
      {/* ── LEFT PANEL ── */}
      <div className="sw-left">
        {/* Header */}
        <div className="sw-header">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div className="sw-logo">
                <span className="sw-logo-text">SW<span>ich</span></span>
              </div>
              <div className="sw-logo-sub">TU SÁNDWICH, A TU MANERA</div>
            </div>
            <LogoutButton />
          </div>
          <div
            style={{
              marginTop: 14,
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Sesión expira en: {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="sw-greeting">¡Hola!</div>
            <div className="sw-subtitle">Arma tu sándwich ideal paso a paso</div>
          </div>
        </div>

        {/* Step tabs */}
        <div className="sw-steps">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`sw-step${i === activeStep ? " active" : i < activeStep ? " completed" : ""}`}
              onClick={() => i <= activeStep && setActiveStep(i)}
            >
              <div className="sw-step-dot" />
              {s}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="sw-content">
          {/* Step 0: Tamaño */}
          {activeStep === 0 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">TAMAÑO DEL SÁNDWICH</span>
                <span className="sw-badge">máx. 1 opción</span>
              </div>
              <div className="sw-size-grid">
                {SIZES.map((sz) => (
                  <div
                    key={sz.id}
                    className={`sw-size-card${selectedSize === sz.id ? " selected" : ""}`}
                    onClick={() => setSelectedSize(sz.id)}
                  >
                    {selectedSize === sz.id && (
                      <div className="sw-size-check">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    )}
                    <span className="sw-size-emoji">{sz.emoji}</span>
                    <div className="sw-size-label">{sz.label}</div>
                    <div className="sw-size-desc">{sz.desc}</div>
                    <div className="sw-size-price">{fmt(sz.price)}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 1: Pan */}
          {activeStep === 1 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">TIPO DE PAN</span>
                <span className="sw-badge">máx. 1 opción</span>
              </div>
              <div className="sw-bread-grid">
                {BREADS.map((b) => (
                  <div
                    key={b.id}
                    className={`sw-bread-chip${selectedBread === b.id ? " selected" : ""}`}
                    onClick={() => setSelectedBread(b.id)}
                  >
                    {b.label}
                    <span className="sw-bread-price">
                      {b.price === 0 ? "$0" : `+${fmt(b.price)}`}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Carne */}
          {activeStep === 2 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">CARNE</span>
                <span className="sw-badge warning">
                  {selectedMeats.length} de máx. 2 opciones
                </span>
              </div>
              <div className="sw-meat-list">
                {MEATS.map((m) => (
                  <div
                    key={m.id}
                    className={`sw-meat-item${selectedMeats.includes(m.id) ? " selected" : ""}`}
                    onClick={() => toggleArr(selectedMeats, setSelectedMeats, m.id, 2)}
                  >
                    <div className="sw-meat-emoji">{m.emoji}</div>
                    <div className="sw-meat-info">
                      <div className="sw-meat-label">{m.label}</div>
                      <div className="sw-meat-price">{fmt(m.price)}</div>
                    </div>
                    <div className="sw-meat-check">
                      {selectedMeats.includes(m.id) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Queso */}
          {activeStep === 3 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">QUESO</span>
                <span className="sw-badge warning">
                  {selectedCheeses.length} de máx. 2 opciones
                </span>
              </div>
              <div className="sw-meat-list">
                {CHEESES.map((c) => (
                  <div
                    key={c.id}
                    className={`sw-meat-item${selectedCheeses.includes(c.id) ? " selected" : ""}`}
                    onClick={() => toggleArr(selectedCheeses, setSelectedCheeses, c.id, 2)}
                  >
                    <div className="sw-meat-emoji">{c.emoji}</div>
                    <div className="sw-meat-info">
                      <div className="sw-meat-label">{c.label}</div>
                      <div className="sw-meat-price">+{fmt(c.price)}</div>
                    </div>
                    <div className="sw-meat-check">
                      {selectedCheeses.includes(c.id) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 4: Vegetales */}
          {activeStep === 4 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">VEGETALES</span>
                <span className="sw-badge">sin límite</span>
              </div>
              <div className="sw-meat-list">
                {VEGGIES.map((v) => (
                  <div
                    key={v.id}
                    className={`sw-meat-item${selectedVeggies.includes(v.id) ? " selected" : ""}`}
                    onClick={() => toggleArr(selectedVeggies, setSelectedVeggies, v.id, null)}
                  >
                    <div className="sw-meat-emoji">{v.emoji}</div>
                    <div className="sw-meat-info">
                      <div className="sw-meat-label">{v.label}</div>
                      <div className="sw-meat-price">{v.price === 0 ? "Gratis" : `+${fmt(v.price)}`}</div>
                    </div>
                    <div className="sw-meat-check">
                      {selectedVeggies.includes(v.id) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 5: Salsas */}
          {activeStep === 5 && (
            <>
              <div className="sw-section-header" style={{ marginTop: 4 }}>
                <span className="sw-section-title">SALSAS</span>
                <span className="sw-badge">sin límite</span>
              </div>
              <div className="sw-bread-grid">
                {SAUCES.map((s) => (
                  <div
                    key={s.id}
                    className={`sw-bread-chip${selectedSauces.includes(s.id) ? " selected" : ""}`}
                    onClick={() => toggleArr(selectedSauces, setSelectedSauces, s.id, null)}
                  >
                    {s.label}
                    <span className="sw-bread-price">
                      {s.price === 0 ? "gratis" : `+${fmt(s.price)}`}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="sw-bottom-bar">
          <button className="sw-continue-btn" onClick={nextStep}>
            <span>Continuar → {nextLabel}</span>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </button>
          <div className="sw-tips">
            <div className="sw-tip">
              <span>⚡</span>
              <span>Agrega hasta 2 carnes, quesos y vegetales sin límite</span>
            </div>
            <div className="sw-tip">
              <span>🥪</span>
              <span>Puedes personalizar tu sándwich en cada paso</span>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="sw-nav">
          {Object.entries(NAV_ICONS).map(([label, icon]) => (
            <div
              key={label}
              className={`sw-nav-item${activeNav === label ? " active" : ""}`}
              onClick={() => setActiveNav(label)}
            >
              {icon}
              <span>{label}</span>
              {activeNav === label && <div className="sw-nav-dot" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="sw-right">
        <div className="sw-summary-header">
          <span className="sw-summary-title">Resumen de tu pedido</span>
          <span className="sw-summary-edit">editar</span>
        </div>

        <div className="sw-summary-items">
          {/* Size */}
          {size && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">{size.label}</span>
              <span className="sw-summary-item-price">{fmt(size.price)}</span>
            </div>
          )}
          {/* Bread */}
          {bread && bread.price > 0 && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">{bread.label}</span>
              <span className="sw-summary-item-price">+{fmt(bread.price)}</span>
            </div>
          )}
          {bread && bread.price === 0 && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">{bread.label}</span>
              <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>Incluido</span>
            </div>
          )}
          {/* Meats */}
          {meatsSelected.map((m) => (
            <div key={m.id} className="sw-summary-row">
              <span className="sw-summary-item-label">{m.label}</span>
              <span className="sw-summary-item-price">+{fmt(m.price)}</span>
            </div>
          ))}
          {/* Cheeses */}
          {cheesesSelected.map((c) => (
            <div key={c.id} className="sw-summary-row">
              <span className="sw-summary-item-label">{c.label}</span>
              <span className="sw-summary-item-price">+{fmt(c.price)}</span>
            </div>
          ))}
          {/* Veggies + sauces combined */}
          {(veggiesSelected.length > 0 || saucesSelected.length > 0) && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">
                {[
                  ...veggiesSelected.map((v) => v.label),
                  ...saucesSelected.map((s) => s.label),
                ].join(", ")}
              </span>
              {veggiesSelected.reduce((a, v) => a + v.price, 0) + saucesSelected.reduce((a, s) => a + s.price, 0) > 0 ? (
                <span className="sw-summary-item-price">
                  +{fmt(veggiesSelected.reduce((a, v) => a + v.price, 0) + saucesSelected.reduce((a, s) => a + s.price, 0))}
                </span>
              ) : (
                <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>Gratis</span>
              )}
            </div>
          )}
          {/* Pending items */}
          {activeStep < 3 && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">Queso, Vegetales, Salsas</span>
              <span className="sw-summary-pending">pendiente</span>
            </div>
          )}
          {activeStep === 3 && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">Vegetales, Salsas</span>
              <span className="sw-summary-pending">pendiente</span>
            </div>
          )}
          {activeStep === 4 && (
            <div className="sw-summary-row">
              <span className="sw-summary-item-label">Salsas</span>
              <span className="sw-summary-pending">pendiente</span>
            </div>
          )}
        </div>

        <div className="sw-total-row">
          <span className="sw-total-label">Total estimado</span>
          <span className="sw-total-price">{fmt(total)}</span>
        </div>
      </div>
      </div>
    </div>
  );
}
