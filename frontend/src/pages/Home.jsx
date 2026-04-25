import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-8">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center border border-gray-200">
        <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200">
          <span className="text-sm font-semibold text-green-800">
            Sesión expira en: {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-green-900 mb-4">
          Bienvenido a SWinch 🚀
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Tu sesión ha iniciado correctamente. Desde aquí podrás gestionar tu experiencia dentro de la plataforma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-green-800 mb-2">Pedidos</h3>
            <p className="text-sm text-gray-500">Consulta y gestiona tus pedidos.</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-green-800 mb-2">Perfil</h3>
            <p className="text-sm text-gray-500">Administra tu información personal.</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-green-800 mb-2">Configuración</h3>
            <p className="text-sm text-gray-500">Ajusta preferencias y seguridad.</p>
          </div>
        </div>
      </div>
    </div>
  );
}