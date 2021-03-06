import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const {
  npm_package_name: NAME,
  npm_package_version: VERSION,
  npm_package_homepage: HOMEPAGE,
  npm_package_license: LICENSE,
} = process.env;
const YEAR = new Date().getFullYear();

const dependenciesConfig = {
  input: "dependencies.src.mjs",
  output: [
    {
      file: `dependencies.mjs`,
      format: "esm",
    },
  ],
  plugins: [resolve(), commonjs()],
};

const defaultConfig = {
  input: "src/index.mjs",
  output: [
    {
      file: `target/node/${NAME}.cjs`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `target/module/${NAME}.mjs`,
      format: "module",
      sourcemap: true,
    },
    {
      file: `target/module/${NAME}.min.mjs`,
      format: "module",
      plugins: [terser()],
    },
    {
      file: `target/browser/${NAME}.iife.js`,
      format: "iife",
      name: NAME,
      banner: `/*! ${NAME} v${VERSION} | (c) 2015-${YEAR} (${LICENSE}) | ${HOMEPAGE} */`,
      sourcemap: true,
    },
    {
      file: `target/browser/${NAME}.iife.min.js`,
      format: "iife",
      name: NAME,
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      runtimeHelpers: true,
    }),
  ],
};

const customElementConfig = {
  input: "src/custom-element.mjs",
  output: [
    {
      file: `target/module/math-up-element.mjs`,
      format: "module",
      sourcemap: true,
    },
    {
      file: `target/module/math-up-element.min.mjs`,
      format: "module",
      plugins: [terser()],
    },
    {
      file: `target/browser/math-up-element.iife.js`,
      format: "iife",
      name: "MathUpElement",
      banner: `/*! ${NAME} v${VERSION} | (c) 2015-${YEAR} (${LICENSE}) | ${HOMEPAGE} */`,
      sourcemap: true,
    },
    {
      file: `target/browser/math-up-element.iife.min.js`,
      format: "iife",
      name: "MathUpElement",
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      runtimeHelpers: true,
    }),
  ],
};

export default function rollup(args) {
  if (args.configDeps === true) {
    return dependenciesConfig;
  }

  return [dependenciesConfig, defaultConfig, customElementConfig];
}
