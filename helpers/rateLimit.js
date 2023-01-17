// https://kittygiraudel.com/2022/05/16/rate-limit-nextjs-api-routes/

import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const applyMiddleware = (middleware) => {
  return (req, res) => {
    return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        return result instanceof Error ? reject(result) : resolve(result);
      });
    });
  };
};

const getIP = (req) => {
  return (
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress
  );
};

const limit = 4;
const windowMs = 60 * 60 * 1_000;
const delayAfter = Math.round(limit / 2);
const delayMs = 500;

const middlewares = [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

export default async function applyRateLimit(req, res) {
  await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(req, res))
  );
}
