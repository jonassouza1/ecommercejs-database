const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // O token deve ser enviado no cabeçalho 'Authorization'

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  if (token !== `Bearer ${process.env.ACCESS_TOKEN}`) {
    return res.status(403).json({ message: "Acesso negado. Token inválido." });
  }

  next(); // Se o token for válido, prossiga para a rota
};

module.exports = authMiddleware;
