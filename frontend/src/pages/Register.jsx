import { useState } from "react";
import { registerRequest } from "../services/auth.service";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      setTermsAccepted(false);
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "system-ui, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#ffffff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            marginBottom: 6,
            fontSize: 26,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Crear cuenta
        </h2>

        <p style={{ marginBottom: 20, color: "#64748b", fontSize: 14 }}>
          Regístrate para acceder a la plataforma
        </p>

        {/* SUCCESS */}
        {success && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#047857",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            {success}
          </div>
        )}

        {/* ERROR GENERAL */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#b91c1c",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* ERRORES DETALLADOS */}
        {errors.length > 0 && (
          <ul
            style={{
              background: "#fffbeb",
              color: "#92400e",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
            }}
          >
            {errors.map((err, i) => (
              <li key={i}>• {err}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleRegister}>
          <label style={labelStyle}>Email</label>
          <input
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setErrors([]);
              setSuccess("");
            }}
            style={inputStyle}
          />

          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
              setErrors([]);
              setSuccess("");
            }}
            style={inputStyle}
          />

          <div
            style={{
              margin: "14px 0",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "#334155",
            }}
          >
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>Acepto los términos y condiciones</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "#94a3b8" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.2s",
              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.25)",
            }}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14,
  transition: "0.2s",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 13,
  color: "#475569",
  fontWeight: 500,
};