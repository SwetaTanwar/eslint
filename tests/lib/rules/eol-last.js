/**
 * @fileoverview Tests for eol-last rule.
 * @author Nodeca Team <https://github.com/nodeca>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/eol-last"),
	RuleTester = require("../../../lib/rule-tester/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("eol-last", rule, {
	valid: [
		"",
		"\n",
		"var a = 123;\n",
		"var a = 123;\n\n",
		"var a = 123;\n   \n",

		"\r\n",
		"var a = 123;\r\n",
		"var a = 123;\r\n\r\n",
		"var a = 123;\r\n   \r\n",

		{ code: "var a = 123;", options: ["never"] },
		{ code: "var a = 123;\nvar b = 456;", options: ["never"] },
		{ code: "var a = 123;\r\nvar b = 456;", options: ["never"] },

		// Deprecated: `"unix"` parameter
		{ code: "", options: ["unix"] },
		{ code: "\n", options: ["unix"] },
		{ code: "var a = 123;\n", options: ["unix"] },
		{ code: "var a = 123;\n\n", options: ["unix"] },
		{ code: "var a = 123;\n   \n", options: ["unix"] },

		// Deprecated: `"windows"` parameter
		{ code: "", options: ["windows"] },
		{ code: "\n", options: ["windows"] },
		{ code: "\r\n", options: ["windows"] },
		{ code: "var a = 123;\r\n", options: ["windows"] },
		{ code: "var a = 123;\r\n\r\n", options: ["windows"] },
		{ code: "var a = 123;\r\n   \r\n", options: ["windows"] },
	],

	invalid: [
		{
			code: "var a = 123;",
			output: "var a = 123;\n",
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 1,
					column: 13,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},
		{
			code: "var a = 123;\n   ",
			output: "var a = 123;\n   \n",
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 2,
					column: 4,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},
		{
			code: "var a = 123;\n",
			output: "var a = 123;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 1,
					column: 13,
					endLine: 2,
					endColumn: 1,
				},
			],
		},
		{
			code: "var a = 123;\r\n",
			output: "var a = 123;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 1,
					column: 13,
					endLine: 2,
					endColumn: 1,
				},
			],
		},
		{
			code: "var a = 123;\r\n\r\n",
			output: "var a = 123;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 2,
					column: 1,
					endLine: 3,
					endColumn: 1,
				},
			],
		},
		{
			code: "var a = 123;\nvar b = 456;\n",
			output: "var a = 123;\nvar b = 456;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 2,
					column: 13,
					endLine: 3,
					endColumn: 1,
				},
			],
		},
		{
			code: "var a = 123;\r\nvar b = 456;\r\n",
			output: "var a = 123;\r\nvar b = 456;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 2,
					column: 13,
					endLine: 3,
					endColumn: 1,
				},
			],
		},
		{
			code: "var a = 123;\n\n",
			output: "var a = 123;",
			options: ["never"],
			errors: [
				{
					messageId: "unexpected",
					type: "Program",
					line: 2,
					column: 1,
					endLine: 3,
					endColumn: 1,
				},
			],
		},

		// Deprecated: `"unix"` parameter
		{
			code: "var a = 123;",
			output: "var a = 123;\n",
			options: ["unix"],
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 1,
					column: 13,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},
		{
			code: "var a = 123;\n   ",
			output: "var a = 123;\n   \n",
			options: ["unix"],
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 2,
					column: 4,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},

		// Deprecated: `"windows"` parameter
		{
			code: "var a = 123;",
			output: "var a = 123;\r\n",
			options: ["windows"],
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 1,
					column: 13,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},
		{
			code: "var a = 123;\r\n   ",
			output: "var a = 123;\r\n   \r\n",
			options: ["windows"],
			errors: [
				{
					messageId: "missing",
					type: "Program",
					line: 2,
					column: 4,
					endLine: void 0,
					endColumn: void 0,
				},
			],
		},
	],
});
