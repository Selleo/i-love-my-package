export interface JSONPackage {
  name: string;
  version: string;
  description: string;
  author: string;
  private: boolean;
  license: string;
  scripts: Scripts;
  dependencies: Dependencies;
  devDependencies: DevDependencies;
  "lint-staged": LintStaged;
}

export interface Dependencies {
  "@nestjs/common": string;
  "@nestjs/config": string;
  "@nestjs/core": string;
  "@nestjs/platform-express": string;
  "@nestjs/typeorm": string;
  "class-transformer": string;
  "class-validator": string;
  express: string;
  pg: string;
  "reflect-metadata": string;
  rimraf: string;
  rxjs: string;
  "type-fest": string;
  typeorm: string;
  "typeorm-naming-strategies": string;
}

export interface DevDependencies {
  "@nestjs/cli": string;
  "@nestjs/schematics": string;
  "@nestjs/testing": string;
  "@types/eslint": string;
  "@types/eslint-plugin-prettier": string;
  "@types/express": string;
  "@types/jest": string;
  "@types/multer": string;
  "@types/node": string;
  "@types/pg": string;
  "@types/prettier": string;
  "@types/rimraf": string;
  "@types/source-map-support": string;
  "@types/supertest": string;
  "@typescript-eslint/eslint-plugin": string;
  "@typescript-eslint/parser": string;
  "cross-env": string;
  eslint: string;
  "eslint-config-prettier": string;
  "eslint-plugin-import": string;
  "eslint-plugin-prettier": string;
  "eslint-plugin-simple-import-sort": string;
  husky: string;
  jest: string;
  "lint-staged": string;
  prettier: string;
  "pretty-quick": string;
  "source-map-support": string;
  supertest: string;
  "ts-jest": string;
  "ts-loader": string;
  "ts-node": string;
  "tsconfig-paths": string;
  typescript: string;
}

export interface LintStaged {
  "{src,test}/**/*.{js,jsx,ts,tsx}": string[];
}

export interface Scripts {
  prepare: string;
  prebuild: string;
  build: string;
  format: string;
  start: string;
  "start:dev": string;
  "start:debug": string;
  "start:prod": string;
  lint: string;
  test: string;
  "test:watch": string;
  "test:cov": string;
  "test:debug": string;
  "test:e2e": string;
  "test:e2e:watch": string;
  typeorm: string;
}
