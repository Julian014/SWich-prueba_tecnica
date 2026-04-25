import { useState } from "react";
import { loginRequest } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem("user", JSON.stringify({
        email
      }));

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
      maxWidth: 400,
      margin: "auto",
      padding: 20,
      fontFamily: "Arial"
    }}>
      <h2>Iniciar sesión</h2>

      {/* ❌ ERROR */}
      {error && (
        <div style={{
          background: "#ffe5e5",
          color: "#b00020",
          padding: 10,
          borderRadius: 6,
          marginBottom: 10
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: loading ? "#999" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}