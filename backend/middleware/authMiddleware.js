const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No auth token, access denied" });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied." });

    req.user = { id: verified.userId, userType: verified.userType };
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).send('Authentication required');
    }
    const { userType } = req.user;
    if (allowedRoles.includes(userType)) {
      return next();
    } else {
      return res.status(403).send('Forbidden');
    }
  };
};

module.exports = { auth, verifyRoles };
