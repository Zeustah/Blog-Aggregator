import { setUser, readConfig } from "./config";

function main() {
  const config = readConfig();
  setUser(config, "Rafael");
  const newConfig = readConfig();
  console.log(newConfig);
}

main();
