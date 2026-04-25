import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.service";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const failedAttempts = Number(localStorage.getItem("failedAttempts") || 0);
    const blockedUntil = localStorage.getItem("blockedUntil");

    if (blockedUntil && new Date(blockedUntil) > new Date()) {
      setError("Cuenta bloqueada temporalmente por 3 intentos fallidos. Intenta más tarde.");
      return;
    }

    setError("");
    setLoading(true);

    if (!captchaToken) {
      setError("Por favor completa el captcha");
      setLoading(false);
      return;
    }

    try {
      const res = await loginRequest(email, password);

      if (!res.ok) {
        const attempts = failedAttempts + 1;
        localStorage.setItem("failedAttempts", attempts);

        if (attempts >= 3) {
          const blockedTime = new Date(Date.now() + 15 * 60 * 1000);
          localStorage.setItem("blockedUntil", blockedTime.toISOString());
          setError("Cuenta bloqueada por 15 minutos por múltiples intentos fallidos.");
          return;
        }

        setError(
          `${res.message || "Error al iniciar sesión"}. Intento ${attempts} de 3`
        );
        return;
      }

      // ✅ guardar token
      localStorage.setItem("token", res.token);
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("blockedUntil");

      // opcional: guardar usuario
      localStorage.setItem("user", JSON.stringify({ email }));

      // ✅ feedback visual
      alert("Login exitoso 🚀");

    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
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

        .swinch-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
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

          .swinch-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .swinch-forgot {
            font-size: 12px;
          }

          .swinch-recaptcha {
            transform: scale(0.92);
            transform-origin: left top;
          }
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
            <div className="swinch-options">
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "#14532D", width: 15, height: 15 }}
                />
                Recordarme
              </label>
              <button
                type="button"
                className="swinch-forgot"
                onClick={() => setShowForgotPassword(true)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {showForgotPassword && (
              <ForgotPassword onClose={() => setShowForgotPassword(false)} />
            )}

            {/* reCAPTCHA real */}
            <div className="swinch-recaptcha" style={{ marginBottom: 18 }}>
              <ReCAPTCHA
                sitekey="6LdQNMksAAAAAM6ecTaez0LdmRzNnVGP7riV9SAd"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="swinch-btn-login"
              disabled={loading || !captchaToken}
            >
              <span>{loading ? "Ingresando..." : "INGRESAR"}</span>
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          </form>



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
