import {
  createUser,
  deleteUser,
  getUserByName,
  getUsers,
} from "src/lib/db/queries/users";
import { CommandHandler } from "./commands";
import { readConfig, setUser } from "src/config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Input must be 1 argument.");
  }
  if (!(await getUserByName(args[0]))) {
    throw new Error("User does not exist.");
  }
  setUser(args[0]);
  console.log(`Logged in as ${args[0]}.`);
}

export async function register(cmdName: string, ...args: string[]) {
  if (!args[0]) {
    throw new Error("A name is required.");
  }
  const name = args[0];
  if (await getUserByName(name)) {
    throw new Error("User already exists.");
  } else {
    const newUser = await createUser(name);
    setUser(name);
    console.log(`${name} has been registered.`, newUser);
  }
}

export async function reset(cmdName: string) {
  try {
    await deleteUser();
    console.log("Users table has been reset.");
  } catch (err) {
    console.error("Failed to reset Users table:", err);
    process.exit(1);
  }
}

export async function users(cmdName: string) {
  for (const users of await getUsers()) {
    if (users.name === readConfig().currentUserName) {
      console.log(`* ${users.name} (current)`);
    } else {
      console.log(`* ${users.name}`);
    }
  }
}
