import type { Config } from 'jest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
const tsconfigPaths = tsconfig.compilerOptions?.paths || {};

const jestModuleNameMapper: Record<string, string | string[]> = {
    '^.+\\.(css|less|scss|sass)\$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg|woff|woff2)\$': '<rootDir>/__mocks__/fileMock.js',
};

Object.keys(tsconfigPaths).forEach((key) => {
    const jestKey = '^' + key.replace('/*', '(.*)\$');
    const rawPath = tsconfigPaths[key][0]; 
    const tsPath = rawPath.replace('/*', '/\$1');
    jestModuleNameMapper[jestKey] = `<rootDir>/${tsPath}`;
});

const config: Config = {
    testEnvironment: 'jsdom',

    extensionsToTreatAsEsm: ['.ts', '.tsx'],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    
    transform: {
        '^.+\\.(ts|tsx)$': [
            '@swc/jest',
        {
            jsc: {
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                    decorators: true,
                },
                transform: {
                    react: {
                    runtime: 'automatic',
                    },
                },
                baseUrl: process.cwd(),
                paths: {
                    '@/*': ['./src/*']
                },
            },
        },
        ],
    },

    moduleNameMapper: {
        // '^@/shared/lib$': '<rootDir>/src/shared/lib/index.ts',
        '^@/(.*)$': '<rootDir>/src/\$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/style-mock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    testMatch: [
        // Находит файлы .test или .spec (с расширениями .ts, .tsx, .js, .jsx) 
        // внутри любых папок __tests__ на любом уровне вложенности
        '**/__tests__/**/*.[jt]s?(x)',
        
        // Опционально: находит файлы с расширением .test.ts или .spec.tsx, 
        // даже если они лежат без папки __tests__ (прямо в корне сегмента)
        '**/?(*.)+(spec|test).[jt]s?(x)'
      ],
};

export default config;
