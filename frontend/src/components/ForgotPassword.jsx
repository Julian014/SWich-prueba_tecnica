import { useState } from "react";

export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    console.log("Sending forgot password request:", email);

    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error sending recovery email");
      }

      setMessage(data.message);
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        padding: "18px",
        marginBottom: 18,
        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        animation: "fadeIn .25s ease"
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: "#14532D"
          }}
        >
          Recuperar contraseña
        </h3>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: 13,
            color: "#6B7280",
            lineHeight: 1.5
          }}
        >
          Ingresa tu correo y te enviaremos instrucciones para restablecer tu
          contraseña.
        </p>
      </div>

      {/* Form */}
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1.5px solid #E5E7EB",
            borderRadius: 12,
            fontSize: 14,
            outline: "none",
            marginBottom: 14,
            fontFamily: "Sora, sans-serif"
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 10
          }}
        >
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #14532D 0%, #22C55E 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(20,83,45,.20)"
            }}
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              background: "#fff",
              color: "#374151",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Cerrar
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: 14,
            padding: "12px",
            borderRadius: 12,
            background: "#FEF2F2",
            color: "#991B1B",
            fontSize: 13,
            border: "1px solid #FECACA"
          }}
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {message && (
        <div
          style={{
            marginTop: 14,
            padding: "12px",
            borderRadius: 12,
            background: "#ECFDF5",
            color: "#166534",
            fontSize: 13,
            border: "1px solid #BBF7D0"
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}