import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Debe tener mínimo 8 caracteres");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Debe tener al menos una mayúscula");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Debe tener al menos una minúscula");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Debe tener al menos un número");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Debe tener al menos un carácter especial");
    }

    return errors;
  };

  const handleReset = async () => {
    setError("");
    setMessage("");
    setPasswordErrors([]);

    if (!password || !confirmPassword) {
      return setError("Todos los campos son obligatorios");
    }

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    const validations = validatePassword(password);

    if (validations.length > 0) {
      setPasswordErrors(validations);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://soluxinnovations.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al restablecer contraseña");
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
        background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
        padding: "20px",
        fontFamily: "Sora, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "white",
          borderRadius: "24px",
          padding: "35px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#14532D",
          }}
        >
          Restablecer contraseña
        </h2>

        <p
          style={{
            marginBottom: "24px",
            fontSize: "14px",
            color: "#6B7280",
            lineHeight: 1.6,
          }}
        >
          Crea una nueva contraseña segura para tu cuenta.
        </p>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "1.5px solid #E5E7EB",
            marginBottom: "14px",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "1.5px solid #E5E7EB",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        />

        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #14532D 0%, #22C55E 100%)",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(20,83,45,.20)",
          }}
        >
          {loading ? "Actualizando..." : "Restablecer contraseña"}
        </button>

        {passwordErrors.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px",
              borderRadius: "14px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
            }}
          >
            {passwordErrors.map((err, index) => (
              <p key={index} style={{ color: "#991B1B", fontSize: "13px", margin: "6px 0" }}>
                • {err}
              </p>
            ))}
          </div>
        )}

        {error && (
          <p style={{ marginTop: "14px", color: "#991B1B", fontSize: "13px" }}>
            {error}
          </p>
        )}

        {message && (
          <p style={{ marginTop: "14px", color: "#166534", fontSize: "13px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}