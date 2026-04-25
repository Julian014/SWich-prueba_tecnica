import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await loginRequest(email, password);

      if (!res.ok) {
        setError(res.message || "Error al iniciar sesión");
        return;
      }

      // ✅ guardar token
      localStorage.setItem("token", res.token);

      // opcional: guardar usuario
      localStorage.setItem("user", JSON.stringify({ email }));

      // ✅ feedback visual
      alert("Login exitoso 🚀");

    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      background: "#F3F4F6",
      padding: "30px"
    }}>
      {/* Importar fuente Sora */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .swinch-input {
          width: 100%;
          padding: 13px 14px 13px 44px;
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          outline: none;
          color: #111827;
          background: #fff;
          transition: border-color 0.2s;
        }
        .swinch-input:focus {
          border-color: #22C55E;
        }
        .swinch-input::placeholder {
          color: #9CA3AF;
        }

        .swinch-btn-login {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #14532D 0%, #22C55E 100%);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Sora', sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: opacity 0.2s, transform 0.1s;
          box-shadow: 0 4px 20px rgba(20, 83, 45, 0.25);
        }
        .swinch-btn-login:hover:not(:disabled) {
          opacity: 0.92;
        }
        .swinch-btn-login:active:not(:disabled) {
          transform: scale(0.99);
        }
        .swinch-btn-login:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .swinch-social-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
        }
        .swinch-social-btn:hover {
          border-color: #22C55E;
          transform: scale(1.06);
        }

        .swinch-right-btn {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.55);
          color: #fff;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 13px;
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .swinch-right-btn:hover {
          background: rgba(255,255,255,0.12);
        }

        .swinch-forgot {
          font-size: 13px;
          color: #14532D;
          text-decoration: none;
          font-weight: 600;
        }
        .swinch-forgot:hover {
          text-decoration: underline;
        }

        .swinch-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #9CA3AF;
          display: flex;
          align-items: center;
        }
        .swinch-eye:hover { color: #6B7280; }

        @keyframes swinch-blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-10px, 10px); }
        }
        @keyframes swinch-blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(10px, -8px); }
        }
        .swinch-blob1 { animation: swinch-blob1 8s ease-in-out infinite; }
        .swinch-blob2 { animation: swinch-blob2 10s ease-in-out infinite; }

        @media (max-width: 768px) {
          .swinch-right-panel { display: none !important; }
          .swinch-left-panel { flex: none !important; width: 100% !important; min-height: 100vh !important; }
        }
      `}</style>

      <div style={{
        width: "100%",
        maxWidth: 1100,
        height: "700px",
        display: "flex",
        borderRadius: 24,
        overflow: "hidden",
        background: "#FFFFFF",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)"
      }}>

        {/* ── LEFT PANEL ── */}
        <div
          className="swinch-left-panel"
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFFFFF",
            padding: "40px 44px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "#F0FDF4",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="2.5" rx="1.25" fill="#14532D"/>
                <rect x="3" y="10.75" width="18" height="2.5" rx="1.25" fill="#22C55E"/>
                <rect x="3" y="16.5" width="18" height="2.5" rx="1.25" fill="#14532D"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#14532D", lineHeight: 1 }}>SWinch</div>
              <div style={{ fontSize: 8, letterSpacing: "3px", color: "#9CA3AF", fontWeight: 600, marginTop: 2 }}>SANDWICHES</div>
            </div>
          </div>

          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: "linear-gradient(135deg, #14532D, #22C55E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
              boxShadow: "0 4px 16px rgba(20,83,45,0.25)"
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: "#111827", margin: 0 }}>Inicia sesión</h2>
            <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>Bienvenido de nuevo a SWinch</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEE2E2", color: "#B91C1C",
              padding: "10px 14px", borderRadius: 10,
              marginBottom: 14, fontSize: 13
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <input
                className="swinch-input"
                placeholder="Usuario o correo electrónico"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2"/>
                <path d="M8 11V7a4 4 0 018 0v4"/>
              </svg>
              <input
                className="swinch-input"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                style={{ paddingRight: 42 }}
              />
              <button
                type="button"
                className="swinch-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "#14532D", width: 15, height: 15 }}
                />
                Recordarme
              </label>
              <a href="#" className="swinch-forgot">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="swinch-btn-login" disabled={loading}>
              <span>{loading ? "Ingresando..." : "INGRESAR"}</span>
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0", fontSize: 12, color: "#9CA3AF" }}>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }}/>
            o continúa con
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }}/>
          </div>

          {/* Social */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button className="swinch-social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="swinch-social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="swinch-right-panel"
          style={{
            width: "55%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "48px 48px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #14532D 0%, #166534 35%, #15803D 65%, #22C55E 100%)",
          }}
        >
        {/* Blobs decorativos */}
        <div className="swinch-blob1" style={{
          position: "absolute", width: 380, height: 380,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          top: -100, right: -100,
        }}/>
        <div className="swinch-blob2" style={{
          position: "absolute", width: 300, height: 300,
          borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
          background: "rgba(255,255,255,0.09)",
          bottom: 20, left: -80,
        }}/>
        <div style={{
          position: "absolute", width: 200, height: 200,
          borderRadius: "60% 40% 50% 50% / 50% 60% 40% 40%",
          background: "rgba(255,255,255,0.06)",
          top: "35%", right: "8%",
        }}/>

        {/* Nav top-right */}
        <div style={{
          position: "absolute", top: 24, right: 24,
          display: "flex", alignItems: "center", gap: 14
        }}>
          <button 
            className="swinch-right-btn"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, cursor: "pointer" }}>
            <span style={{ width: 20, height: 2, background: "rgba(255,255,255,0.75)", borderRadius: 2, display: "block" }}/>
            <span style={{ width: 20, height: 2, background: "rgba(255,255,255,0.75)", borderRadius: 2, display: "block" }}/>
            <span style={{ width: 20, height: 2, background: "rgba(255,255,255,0.75)", borderRadius: 2, display: "block" }}/>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ position: "relative", zIndex: 2, color: "#fff", maxWidth: 340 }}>
          <p style={{ fontSize: 22, fontWeight: 400, opacity: 0.88, margin: "0 0 4px" }}>Bienvenido a</p>
          <h1 style={{ fontSize: 52, fontWeight: 800, margin: "0 0 12px", lineHeight: 1 }}>SWinch.</h1>
          <p style={{ fontSize: 16, opacity: 0.88, lineHeight: 1.5, margin: "0 0 10px" }}>
            Arma el sándwich perfecto<br />a tu manera.
          </p>
          <svg width="84" height="14" viewBox="0 0 84 14" fill="none" style={{ display: "block", marginBottom: 32 }}>
            <path d="M2 9 Q21 3 42 9 Q63 15 82 7" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          </svg>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20, padding: "8px 16px",
            fontSize: 13, color: "rgba(255,255,255,0.92)"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Ingredientes frescos, momentos deliciosos.
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
