import * as path from "path";
import * as fs from "fs/promises";

export const init = async (configDestination: string): Promise<void> => {
  const configTemplateFilePath = path.resolve(__dirname, "../config-template.js");
  await fs.copyFile(configTemplateFilePath, configDestination);
};