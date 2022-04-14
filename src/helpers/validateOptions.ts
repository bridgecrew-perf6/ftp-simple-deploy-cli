import { DeployOptions } from "@ftp-simple-deploy/lib";
import Joi from "joi";

type DeployOptionsValidationSchema = Required<{
  [key in keyof DeployOptions]: Joi.SchemaLike | Joi.SchemaLike[] ;
}>;

const configJoiValidationSchema: DeployOptionsValidationSchema = {
  backupsLocalDirectory: Joi.string().optional(),
  backupsRemoteDirectory: Joi.string().optional(),
  cleanRemoteDirectory: Joi.boolean().optional(),
  connection: Joi.object({
    host: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().optional(),
    port: Joi.number().optional()
  }),
  exclude: Joi.array().items(Joi.string()).optional(),
  include: Joi.array().items(Joi.string()).optional(),
  excludeFromBackup: Joi.array().items(Joi.string()).optional(),
  excludeFromCleaning: Joi.array().items(Joi.string()).optional(),
  logger: Joi.function().optional(),
  remotePath: Joi.string().required(),
  sourcePath: Joi.string().required(),
  replace: Joi.boolean().optional(),
  saveLocalBackups: Joi.boolean().optional(),
  saveRemoteBackups: Joi.boolean().optional()
};

const configJoiObject = Joi.object(configJoiValidationSchema);

export const validateConfig = async (obj: any): Promise<Joi.ValidationResult<any>> => {
  return await configJoiObject.validateAsync(obj);
};