import { setUser, readConfig } from "./config";
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin, register, reset, users } from "./commands/users";
import { handlerAgg } from "./commands/aggregate";
import { addfeed, handlerListFeeds } from "./commands/feeds";
import { follow, following } from "./commands/feed-follows";

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
  registerCommand(registry, "users", users);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", addfeed);
  registerCommand(registry, "feeds", handlerListFeeds);
  registerCommand(registry, "follow", follow);
  registerCommand(registry, "following", following);
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    console.error("An error has occured", error);
    process.exit(1);
  }
  process.exit(0);
}

main();
