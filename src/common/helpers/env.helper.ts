import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(directory: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${directory}/.env`);
  const filename: string = env ? `${env}.env` : '.env.development';
  let filePath: string = resolve(`${directory}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
