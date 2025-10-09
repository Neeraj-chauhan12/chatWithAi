const jwt =require('jsonwebtoken')
const redisClient = require('../services/redis.service')

exports.AuthMiddleware = async (req, res, next) => {
  // Try cookie first, then Authorization header
  let token = req.cookies && req.cookies.token
  if (!token) {
    const authHeader = req.headers && req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'unauthorized access' })
  }

  try {
    // const isBlackListed = await redisClient.get(token);
    // if (isBlackListed) return res.status(401).json({ message: 'unauthorized access' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id
    next()
  } catch {
    return res.status(401).json({ message: 'token not found' })
  }
}