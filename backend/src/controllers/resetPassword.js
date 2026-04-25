import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "La contraseña es obligatoria",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // usar hora actual desde Node.js para evitar diferencias de zona horaria
    const currentDate = new Date();

    const [rows] = await db.query(
      `
      SELECT * FROM users 
      WHERE id = ? 
      AND reset_token = ?
      AND reset_token_expires > ?
      `,
      [decoded.id, token, currentDate],
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Token inválido o expirado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `
      UPDATE users
      SET password = ?, reset_token = NULL, reset_token_expires = NULL
      WHERE id = ?
      `,
      [hashedPassword, decoded.id],
    );

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export { resetPassword };
