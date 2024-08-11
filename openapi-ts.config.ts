import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	client: "@hey-api/client-fetch",
	input: "http://localhost:3000/api-json",
	output: {
		lint: "eslint",
		path: "src/utils/client",
	},
	types: {
		enums: "typescript",
	},
});
