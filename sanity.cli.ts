import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // `pnpm typegen`: schema → sanity/schema.json, then query result types → sanity.types.ts.
  typegen: {
    path: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    schema: "./sanity/schema.json",
    generates: "./sanity.types.ts",
  },
});
