// const { createLogger, transports, format } = require("winston");
require("winston-mongodb");
const uri =
  "mongodb+srv://meron:lQqkCFgttO0nJ4Bs@cluster0.x2l7l.mongodb.net/finalProject?retryWrites=true&w=majority";

// const logger = createLogger({
//   transports: [
//     new transports.MongoDB({
//       level: "info",
//       db: uri,
//       options: { useUnifiedTopology: true },
//       collection: "logs",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//   ],
// });

// module.exports = logger;
const winston = require("winston");
const expressWinston = require("express-winston");

const requestLog = expressWinston.logger({
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.json({
    //     space: 2,
    //   }),
    // }),
    new winston.transports.MongoDB({
      db: uri,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        poolSize: 2,
      },
    }),
  ],
  meta: true,
  msg: "Request: HTTP {{req.method}} {{req.url}}",
  requestWhitelist: ["url", "method", "originalUrl", "query", "body"],
});

exports.requestLog = requestLog;
