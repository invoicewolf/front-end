import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	client: "@hey-api/client-fetch",
	input: "https://api.invoicewolf.net/api-json",
	output: {
		lint: "eslint",
		path: "src/utils/client",
	},
	types: {
		enums: "typescript",
	},
});
