#!/usr/bin/env node
import * as path from "path";
import { Command } from "commander";

import { tryLoadConfigOrThrow } from "./config-file";
import { deploy, DeployOptions } from "@ftp-simple-deploy/lib";
import { init } from "./init";
import Joi from "joi";

const CONFIG_DEFAULT_PATH = "ftp-deploy.config.js";
const VERSION = "0.1.6";

export { DeployConnectionOptions, DeployOptions } from "@ftp-simple-deploy/lib";

const program = new Command();

program
  .name("ftp-simple-deploy")
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
  .action(async (options): Promise<void> => {
    const config = options.config;
    let deployOptions: DeployOptions;

    try {
      deployOptions = await tryLoadConfigOrThrow(path.resolve(process.cwd(), config));
    } catch (e) {
      if(e instanceof Joi.ValidationError) {
        console.error("Config validation error!");
        console.error(e.message);
        return;
      }

      console.error("Failed to load config from " + config);
      return;
    }

    try {
      await deploy(deployOptions);
    } catch (e) {
      console.error("An error occurred during the deployment");
      console.error(e);
    }
  });

program.parse();