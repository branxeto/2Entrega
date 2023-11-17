import jwt from "jsonwebtoken";
import { tokensValidos } from '../routes/tablas.js';
import { verificarToken } from '../routes/tablas.js';

const getCurrentUser = async (req) => {
  const cookie = req.cookies["jwt"];

  if (!cookie) return null;

  try {
    const decoded = await verificarToken(cookie, 'miFirma');
    console.log('Token válido:', decoded);
    return decoded;

  } catch (error) {
    console.error('Error:', error);
    null;
  }
};

export default getCurrentUser;