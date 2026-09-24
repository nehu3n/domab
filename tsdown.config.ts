import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  minify: true,
  sourcemap: true,
  treeshake: true,
  tsconfig: "tsconfig.json",
});
