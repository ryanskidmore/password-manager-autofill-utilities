import typescript from 'rollup-plugin-typescript2';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES2020',
            module: 'ES2020',
            moduleResolution: 'node',
            declaration: true,
            declarationMap: true,
            strict: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            forceConsistentCasingInFileNames: true,
            skipLibCheck: true,
            resolveJsonModule: true,
            isolatedModules: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist', '**/*.test.ts'],
        },
      }),
    ],
    external: ['react'],
  },
  // ES modules build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES2020',
            module: 'ESNext',
            moduleResolution: 'node',
            declaration: true,
            declarationMap: true,
            strict: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            forceConsistentCasingInFileNames: true,
            skipLibCheck: true,
            resolveJsonModule: true,
            isolatedModules: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist', '**/*.test.ts'],
        },
      }),
    ],
    external: ['react'],
  },
]; 