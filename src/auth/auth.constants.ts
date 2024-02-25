import { env } from 'process';
import * as dotenv from 'dotenv';

// Carrega o arquivo .env dentro do process.env
dotenv.config();

export const JWT_CONSTANTS = {
  secret: env.APP_SECRET,
};

export const JWT_CONSTANTS_INVITE = {
  secret: env.APP_SECRET_INVITE,
};

export const JWT_CONSTANTS_INTERNAL_SETTING = {
  secret: env.APP_SECRET_INTERNAL_SETTING,
};

export interface ExtendedRequest extends Request {
  credential_component_id?: number;
}
