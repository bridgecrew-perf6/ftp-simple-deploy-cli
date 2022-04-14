#!/usr/bin/env node
import * as path from "path";
import { Command } from "commander";

import { tryLoadConfigOrThrow } from "./config-file";
import { deploy } from "@ftp-simple-deploy/lib";
import { init } from "./init";

const CONFIG_DEFAULT_PATH = "ftp-deploy.config.js";
const VERSION = "0.1.0";

export { DeployConnectionOptions, DeployOptions } from "@ftp-simple-deploy/lib";

const program = new Command();

program
  .name("ftp-deploy")
  .description("cli to easily deploy your applications via ftp")
  .version(VERSION || "version not defined", "-v, --version", "outputs the current program version");

program
  .command("init")
  .description("create a sample configuration file for ftp deployment")
  .action(async (): Promise<void> => {
    await init(path.resolve(process.cwd(), CONFIG_DEFAULT_PATH));
  });

program
  .command("deploy")
  .description("deploy your application using specified configuration file")
  .option("-c, --config <fileName>", `The path to a config`, CONFIG_DEFAULT_PATH)
  .action(async (config): Promise<void> => {
    try {
      const deployOptions = await tryLoadConfigOrThrow(path.resolve(process.cwd(), config));
      await deploy(deployOptions);
    } catch (e) {
      console.error("Failed to load config from " + config);
      console.log(e);
      return;
    }
  });

program.parse();