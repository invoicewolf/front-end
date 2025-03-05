import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	client: "@hey-api/client-fetch",
	input: "http://localhost:3000/api-json",
	output: {
		lint: "eslint",
		path: "src/utils/client",
	},
	plugins: [
		"@hey-api/schemas",
		"@hey-api/services",
		{
			dates: true,
			name: "@hey-api/transformers",
		},
		{
			enums: "typescript",
			name: "@hey-api/types",
		},
	],
});
