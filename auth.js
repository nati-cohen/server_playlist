const jwt = require('jsonwebtoken')

async function createToken(data) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: "1d" })
}

async function verify(req, res, next) {
    try {
        const token = req.headers.authorization.split("Bearer ")[1]
        heder.email=jwt.verify(token, process.env.SECRET)
        next()
    }
    catch (err) {
        res.sendStatus(401)
    }
}


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1]
  if (!token) {
    return res.status(401).json({ error: "Authorization token missing." });
  }
  
  try {
    const decodedToken = jwt.verify(token,process.env.SECRET);
    console.log(decodedToken);
    req.user = decodedToken.id; // Attach the user object to the request for future use
      next(); 
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Invalid token." });
    }
  };

module.exports = { createToken, verify , verifyToken}