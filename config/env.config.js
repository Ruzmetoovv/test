const dotenv = require("dotenv");
const { cleanEnv, num, str } = require("envalid");
dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num(),
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USER: str(),
  DB_PASS: str(),
  DB_NAME: str(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
});

module.exports = env;
