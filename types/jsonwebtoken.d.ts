declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: unknown;
  }

  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: {
      expiresIn?: string | number;
      algorithm?: string;
      [key: string]: unknown;
    }
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: { [key: string]: unknown }
  ): string | JwtPayload;

  export function decode(
    token: string,
    options?: { complete?: boolean; json?: boolean }
  ): null | JwtPayload | string;
}
