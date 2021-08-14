const jwt = require("jsonwebtoken");

const secret = "top-secret";
class JwtManager {
  generate(data) {
    const token = jwt.sign(data, secret);
    return token;
  }
  verify(token) {
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new JwtManager();
