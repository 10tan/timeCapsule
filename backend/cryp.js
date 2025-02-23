const crypto = require('crypto');

function generateJwtSecret() {
  return crypto.randomBytes(64).toString('hex'); // 64 bytes = 512 bits
}

const jwtSecret = generateJwtSecret();
console.log('JWT_SECRET=' + jwtSecret);
