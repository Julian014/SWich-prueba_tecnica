import db from "../database/connection.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // validar email
    if (!email) {
      return res.status(400).json({
        error: "MISSING_EMAIL",
        message: "El correo es obligatorio",
      });
    }

    // normalizar email
    const emailNormalized = email.toLowerCase();

    // buscar usuario
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      emailNormalized,
    ]);

    // respuesta segura (no revelar existencia)
    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "Si el correo existe, enviaremos instrucciones de recuperación.",
      });
    }

    const user = rows[0];

    // generar token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    // calcular expiración en hora local (15 minutos)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // guardar token en DB
    await db.query(
      `
      UPDATE users 
      SET reset_token = ?, reset_token_expires = ?
      WHERE id = ?
      `,
      [token, expiresAt, user.id],
    );

    // configurar nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // link de recuperación
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // enviar correo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailNormalized,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Recuperar contraseña</h2>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expira en 15 minutos.</p>
      `,
    });

    return res.status(200).json({
      message: "Correo de recuperación enviado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Error interno del servidor",
    });
  }
};

export { forgotPassword };
