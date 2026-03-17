import { CommandHandler } from "./commands";
import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Input must be 1 argument.");
  }
  setUser(args[0]);
  console.log("New username has been set.");
}
