import { config as conf } from "dotenv";

declare const process: {
  env: {
    MONGODB_URL?: string;
    PORT?: string;
  };
  exit(code?: number): never;
};

conf();

const _config = {
  port: Number(process.env.PORT || 5000),
  databaseUrl:
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/biooscoops",
};

export const config = Object.freeze(_config);
