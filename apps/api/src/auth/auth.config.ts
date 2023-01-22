import { ConfigType, registerAs } from "@nestjs/config";

export const authConfig = registerAs("auth", () => ({
  jwksUri: process.env.JWKS_URI,
}));

export type AuthConfigType = ConfigType<typeof authConfig>;
