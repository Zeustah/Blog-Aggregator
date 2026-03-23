import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

export function setUser(username: string) {
  const config = readConfig();
  config.currentUserName = username;
  writeConfig(config);
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("Invalid/Missing file type");
  }
  const jsonConfig: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name || "",
  };
  return jsonConfig;
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  const parsed = JSON.parse(data);
  const validatedParse = validateConfig(parsed);
  return validatedParse;
}

function writeConfig(config: Config) {
  const filePath = getConfigFilePath();
  const rawConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };
  fs.writeFileSync(filePath, JSON.stringify(rawConfig));
}
