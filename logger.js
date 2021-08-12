const { createLogger, transports, format } = require("winston");
require("winston-mongodb");
const uri =
  "mongodb+srv://meron:lQqkCFgttO0nJ4Bs@cluster0.x2l7l.mongodb.net/finalProject?retryWrites=true&w=majority";

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "info",
      db: uri,
      options: { useUnifiedTopology: true },
      collection: "log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
