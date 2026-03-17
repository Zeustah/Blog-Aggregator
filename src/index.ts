import { setUser, readConfig } from "./config";
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("Missing input for command.");
    process.exit(1);
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  try {
    runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    console.error("An error has occured", error);
    process.exit(1);
  }
}

main();
