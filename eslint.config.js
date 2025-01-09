import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import airbnb from "eslint-config-airbnb-typescript"
import prettier from "eslint-config-prettier"
import boundaries from "eslint-plugin-boundaries"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"

export default [
	js.configs.recommended,
	prettier,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
		},
		plugins: {
			"@typescript-eslint": typescript,
			"react-refresh": reactRefresh,
			"react-hooks": reactHooksPlugin,
			"jsx-a11y": jsxA11yPlugin,
			react: reactPlugin,
			boundaries,
		},
		rules: {
			...airbnb.rules,
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...jsxA11yPlugin.configs.recommended.rules,
			"no-undef": "off",
			"no-console": "warn",
			"react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"boundaries/entry-point": [
				2,
				{
					default: "disallow",
					rules: [
						{
							target: [["shared", { segment: "lib" }]],
							allow: "*/index.ts",
						},
						{
							target: [["shared", { segment: "lib" }]],
							allow: "*.(ts|tsx)",
						},
						{
							target: [["shared", { segment: "constants" }]],
							allow: "index.ts",
						},
						{
							target: [["shared", { segment: "ui" }]],
							allow: "**",
						},
						{
							target: ["app", "pages", "widgets", "features", "entities"],
							allow: "index.(ts|tsx)",
						},
					],
				},
			],
			"boundaries/element-types": [
				2,
				{
					default: "allow",
					message: "${file.type} is not allowed to import (${dependency.type})",
					rules: [
						{
							from: ["shared"],
							disallow: ["app", "pages", "widgets", "features", "entities"],
							message:
								"Shared module must not import upper layers (${dependency.type})",
						},
						{
							from: ["entities"],
							message:
								"Entity must not import upper layers (${dependency.type})",
							disallow: ["app", "pages", "widgets", "features"],
						},
						{
							from: ["entities"],
							message: "Entity must not import other entity",
							disallow: [["entities", { entity: "!${entity}" }]],
						},
						{
							from: ["features"],
							message:
								"Feature must not import upper layers (${dependency.type})",
							disallow: ["app", "pages", "widgets"],
						},
						{
							from: ["features"],
							message: "Feature must not import other feature",
							disallow: [["features", { feature: "!${feature}" }]],
						},
						{
							from: ["widgets"],
							message:
								"Feature must not import upper layers (${dependency.type})",
							disallow: ["app", "pages"],
						},
						{
							from: ["widgets"],
							message: "Widget must not import other widget",
							disallow: [["widgets", { widget: "!${widget}" }]],
						},
						{
							from: ["pages"],
							message: "Page must not import upper layers (${dependency.type})",
							disallow: ["app"],
						},
						{
							from: ["pages"],
							message: "Page must not import other page",
							disallow: [["pages", { page: "!${page}" }]],
						},
					],
				},
			],
		},
		settings: {
			react: {
				version: "detect",
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
				},
			},
			"boundaries/include": ["src/**/*"],
			"boundaries/elements": [
				{ type: "app", pattern: "src/app", capture: ["app"] },
				{ type: "pages", pattern: "src/pages/*", capture: ["page"] },
				{ type: "widgets", pattern: "src/widgets/*", capture: ["widget"] },
				{ type: "features", pattern: "src/features/*", capture: ["feature"] },
				{ type: "entities", pattern: "src/entities/*", capture: ["entity"] },
				{ type: "shared", pattern: "src/shared/*", capture: ["segment"] },
			],
		},
	},
]
