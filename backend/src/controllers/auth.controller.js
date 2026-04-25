import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =====================
// REGISTER
// =====================
export const register = async (req, res) => {
  try {
    const { email, password, termsAccepted } = req.body;

    // 🔒 validar campos
    if (!email || !password) {
      return res.status(400).json({
        error: "MISSING_FIELDS",
        message: "Faltan datos"
      });
    }

    // 🔒 validar email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "INVALID_EMAIL",
        message: "Email inválido"
      });
    }

    // 🔒 validar contraseña
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

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      errors.push("Debe tener al menos un carácter especial");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: "WEAK_PASSWORD",
        message: "Contraseña no válida",
        details: errors
      });
    }

    // 🔒 normalizar email
    const emailNormalized = email.toLowerCase();

    // 🔍 verificar si ya existe
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [emailNormalized]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        error: "USER_EXISTS",
        message: "El correo ya está registrado"
      });
    }

    // 🔐 hash password
    const hash = await bcrypt.hash(password, 10);

    // 💾 guardar usuario
    await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [emailNormalized, hash]
    );

    return res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Error en el servidor"
    });
  }
};

// =====================
// LOGIN
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔒 validar campos
    if (!email || !password) {
      return res.status(400).json({
        error: "MISSING_FIELDS",
        message: "Faltan datos"
      });
    }

    // 🔒 normalizar email
    const emailNormalized = email.toLowerCase();

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [emailNormalized]
    );

    // 🔒 evitar enumeración de usuarios
    if (rows.length === 0) {
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Credenciales inválidas"
      });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Credenciales inválidas"
      });
    }

    // 🔐 generar token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Error en el servidor"
    });
  }
};