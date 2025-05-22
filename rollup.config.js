import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

console.log("🔥 Content script is being evaluated");

export default [
  // Content Script Bundle
  {
    input: "src/scripts/content/index.ts",
    output: {
      file: "dist/scripts/content.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: "src/scripts/background/index.ts",
    output: {
      file: "dist/scripts/background.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: "src/scripts/popup/index.ts",
    output: {
      file: "dist/scripts/popup.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
];
