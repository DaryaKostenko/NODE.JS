export const PORT = process.env.PORT ?? '300';

export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_NAME = process.env.DB_NAME ?? 'users';
export const DB_USER_NAME = process.env.DB_USER_NAME ?? 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'onelife111';

export const SECRET = process.env.SECRET ?? 'secret';
export const AUTH_HEADER = process.env.AUTH_HEADER ?? 'x-access-token';
export const AUTH_TOKEN_ID = process.env.AUTH_TOKEN_ID ?? 'AuthId'
export const AUTH_TOKEN_EXPIRATION = process.env.AUTH_TOKEN_EXPIRATION ??'30s';
export const AUTH_REFRESH_ID = process.env.AUTH_REFRESH_ID ?? 'RefreshId';
export const AUTH_REFRESH_EXPIRATION = process.env.AUTH_REFRESH_EXPIRATION ?? '1h';