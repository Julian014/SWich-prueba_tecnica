import app from "./app.js";
import pool from "./database/connection.js";

const PORT = process.env.PORT || 3000;

// 🔌 Test de conexión a la base de datos
const startServer = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Base de datos conectada correctamente");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:");
    console.error(error);
    process.exit(1); // 👈 mata el server si no hay DB
  }
};

startServer();
