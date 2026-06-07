import { config as conf } from "dotenv";

declare const process: {
  env: {
    MONGODB_URL?: string;
    PORT?: string;
    ACCESS_TOKEN_SECRET?: string;
    REFRESH_TOKEN_SECRET?: string;
    HASH_SECRET?: string;
  }; 
  exit(code?: number): never;
};

conf();

const _config = {
  port: Number(process.env.PORT || 5000),
  databaseUrl:
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/biooscoops",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  hashingSecret: process.env.HASH_SECRET as string,
};

export const config = Object.freeze(_config);
