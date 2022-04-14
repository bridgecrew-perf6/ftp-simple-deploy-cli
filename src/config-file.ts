import { DeployOptions } from "@ftp-simple-deploy/lib";
import { validateConfig } from "./helpers/validateOptions";

export const tryLoadConfigOrThrow = async (path: string): Promise<DeployOptions> => {
  const {default: def, ...configModule} = await import(path);

  const validationResult = await validateConfig(configModule);

  if(!validationResult.error) {
    const deployOptions = configModule as DeployOptions;

    if(!deployOptions.logger)
      deployOptions.logger = console.log;
    
    return deployOptions;
  }

  throw new Error(validationResult.error.message);
};