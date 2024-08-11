import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default antfu(
	{
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
		},
		ignores: ["src/utils/client/**/*.ts"],
	},
	...compat.config({
		extends: ["plugin:tailwindcss/recommended"],
		rules: {
			"tailwindcss/no-custom-classname": "off",
		},
	}),
);
