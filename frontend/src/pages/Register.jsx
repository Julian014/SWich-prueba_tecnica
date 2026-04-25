import { useState } from "react";
import { registerRequest } from "../services/auth.service";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    setErrors([]);
    setSuccess("");
    setLoading(true);

    try {
      const res = await registerRequest(email, password);

      if (!res.ok) {
        setError(res.message);

        if (res.details) {
          setErrors(res.details);
        }

        return;
      }

      setSuccess("Usuario registrado correctamente 🎉");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsAccepted(false);
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
      padding: "24px",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      background: "#F3F4F6"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        minHeight: "700px",
        background: "#FFFFFF",
        borderRadius: "28px",
        overflow: "hidden",
        display: "flex",
        boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.04)"
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }

        .sw-input {
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
        .sw-input:focus { border-color: #22C55E; }
        .sw-input::placeholder { color: #9CA3AF; }

        .sw-btn {
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
          gap: 10px;
          transition: opacity 0.2s, transform 0.1s;
          box-shadow: 0 4px 20px rgba(20, 83, 45, 0.25);
        }
        .sw-btn:hover:not(:disabled) { opacity: 0.92; }
        .sw-btn:active:not(:disabled) { transform: scale(0.99); }
        .sw-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .sw-eye {
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
        .sw-eye:hover { color: #6B7280; }

        .sw-right-btn {
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
        .sw-right-btn:hover { background: rgba(255,255,255,0.12); }

        @keyframes sw-blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-10px, 10px); }
        }
        @keyframes sw-blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(10px, -8px); }
        }
        .sw-blob1 { animation: sw-blob1 8s ease-in-out infinite; }
        .sw-blob2 { animation: sw-blob2 10s ease-in-out infinite; }

        @media (max-width: 768px) {
          .sw-right { display: none !important; }
          .sw-left { flex: none !important; width: 100% !important; min-height: 100vh !important; }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="sw-left" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        padding: "32px 36px",
      }}>
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

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: "linear-gradient(135deg, #14532D, #22C55E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
              boxShadow: "0 4px 16px rgba(20,83,45,0.25)"
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: "#111827", margin: 0 }}>Crear cuenta</h2>
            <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0", textAlign: "center" }}>
              Regístrate para acceder a la plataforma
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div style={{
              background: "#ECFDF5", color: "#047857",
              padding: "10px 14px", borderRadius: 10,
              marginBottom: 14, fontSize: 13,
              border: "1px solid #A7F3D0"
            }}>
              {success}
            </div>
          )}

          {/* ERROR GENERAL */}
          {error && (
            <div style={{
              background: "#FEE2E2", color: "#B91C1C",
              padding: "10px 14px", borderRadius: 10,
              marginBottom: 14, fontSize: 13
            }}>
              {error}
            </div>
          )}

          {/* ERRORES DETALLADOS */}
          {errors.length > 0 && (
            <ul style={{
              background: "#FFFBEB", color: "#92400E",
              padding: "10px 14px 10px 24px", borderRadius: 10,
              marginBottom: 14, fontSize: 13,
              border: "1px solid #FDE68A"
            }}>
              {errors.map((err, i) => (
                <li key={i} style={{ marginBottom: 2 }}>• {err}</li>
              ))}
            </ul>
          )}

          {/* Form */}
          <form onSubmit={handleRegister}>

            {/* Email */}
            <div style={{ marginBottom: 6 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
                <input
                  className="sw-input"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); setErrors([]); setSuccess(""); }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14, marginTop: 12 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 018 0v4"/>
                </svg>
                <input
                  className="sw-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); setErrors([]); setSuccess(""); }}
                  style={{ paddingRight: 42 }}
                />
                <button type="button" className="sw-eye" onClick={() => setShowPassword(!showPassword)}>
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
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Confirmar contraseña
              </label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 018 0v4"/>
                </svg>
                <input
                  className="sw-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                    setErrors([]);
                    setSuccess("");
                  }}
                  style={{ paddingRight: 42 }}
                />
              </div>
            </div>

            {/* Terms */}
            <label style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              fontSize: 13, color: "#374151", cursor: "pointer",
              margin: "14px 0 18px", lineHeight: 1.5
            }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => { setTermsAccepted(e.target.checked); setError(""); }}
                style={{ accentColor: "#14532D", width: 15, height: 15, marginTop: 1, flexShrink: 0 }}
              />
              <span>
                Acepto los{" "}
                <a
                  href="https://www.blogger.com/blog/post/edit/preview/6200808233495978326/8793834311437577272"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#14532D", fontWeight: 600, textDecoration: "none" }}
                >
                  términos y condiciones
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="sw-btn"
              disabled={loading || !password || !confirmPassword || password !== confirmPassword}
            >
              <span>{loading ? "Creando cuenta..." : "REGISTRARSE"}</span>
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: 13, color: "#6B7280", marginTop: 20 }}>
            ¿Ya tienes cuenta?{" "}
         <a href="/" style={{ color: "#14532D", fontWeight: 600, textDecoration: "none" }}>
  Inicia sesión
</a>
          </p>

        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="sw-right" style={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "36px 36px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #14532D 0%, #166534 35%, #15803D 65%, #22C55E 100%)",
      }}>
        {/* Blobs */}
        <div className="sw-blob1" style={{
          position: "absolute", width: 380, height: 380,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          top: -100, right: -100,
        }}/>
        <div className="sw-blob2" style={{
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

        {/* Nav */}
        <div style={{
          position: "absolute", top: 24, right: 24,
          display: "flex", alignItems: "center", gap: 14
        }}>
<a
  href="/"
  className="sw-right-btn"
  style={{
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center"
  }}
>
  Iniciar sesión
</a>          <div style={{ display: "flex", flexDirection: "column", gap: 4, cursor: "pointer" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 20, height: 2, background: "rgba(255,255,255,0.75)", borderRadius: 2, display: "block" }}/>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, color: "#fff", maxWidth: 300 }}>
          <p style={{ fontSize: 22, fontWeight: 400, opacity: 0.88, margin: "0 0 4px" }}>Únete a</p>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 12px", lineHeight: 1 }}>SWinch.</h1>
          <p style={{ fontSize: 16, opacity: 0.88, lineHeight: 1.5, margin: "0 0 10px" }}>
            Crea tu cuenta y arma<br />el sándwich perfecto.
          </p>
          <svg width="84" height="14" viewBox="0 0 84 14" fill="none" style={{ display: "block", marginBottom: 32 }}>
            <path d="M2 9 Q21 3 42 9 Q63 15 82 7" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          </svg>

          {/* Features */}
          {[
            { icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", text: "Ingredientes frescos, momentos deliciosos." },
            { icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", text: "Pedidos rápidos y personalizados." },
          ].map((item, i) => (
            <div key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20, padding: "8px 16px",
              fontSize: 13, color: "rgba(255,255,255,0.92)",
              marginBottom: 10, width: "100%"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8, flexShrink: 0 }}>
                <path d={item.icon}/>
              </svg>
              {item.text}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
