import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [view, setView] = useState("login");

  return (
    <div>
      {view === "login" ? <Login /> : <Register />}

      <div style={{ textAlign: "center", marginTop: 10 }}>
        {view === "login" ? (
          <p>
            ¿No tienes cuenta?{" "}
            <button onClick={() => setView("register")}>
              Registrarse
            </button>
          </p>
        ) : (
          <p>
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => setView("login")}>
              Iniciar sesión
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;