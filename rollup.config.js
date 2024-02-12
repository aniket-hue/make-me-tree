import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

const extensions = [".js", ".ts", ".tsx"];

// eslint-disable-next-line no-undef
const packageDir = process.cwd();

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
};

const babelOptions = {
  exclude: /node_modules/,
  extensions,
  configFile: `${packageDir}/babel.config.json`,
  babelHelpers: "runtime",
};

const nodeOptions = {
  extensions,
};

export default [
  {
    input: "./lib/index.ts",
    output: [
      {
        format: "cjs",
        file: `dist/index.js`,
      },
      {
        file: `dist/index.esm.js`,
        format: "esm",
      },
    ],
    plugins: [
      nodeResolve(nodeOptions),
      typescript({
        tsconfig: `${packageDir}/tsconfig.json`,
      }),
      excludeDependenciesFromBundle({ peerDependencies: true }),
      babel(babelOptions),
      commonjs(commonjsOptions),
      // terser(),
    ],
  },
];
