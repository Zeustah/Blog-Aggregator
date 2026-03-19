import { setUser, readConfig } from "./config";
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin, register, reset } from "./commands/users";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("Missing input for command.");
    process.exit(1);
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", register);
  registerCommand(registry, "reset", reset);
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    console.error("An error has occured", error);
    process.exit(1);
  }
  process.exit(0);
}

main();
