/**
 * @fileoverview Tests for no-unsafe-finally
 * @author Onur Temizkan
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-unsafe-finally"),
	RuleTester = require("../../../lib/rule-tester/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-unsafe-finally", rule, {
	valid: [
		"var foo = function() {\n try { \n return 1; \n } catch(err) { \n return 2; \n } finally { \n console.log('hola!') \n } \n }",
		"var foo = function() { try { return 1 } catch(err) { return 2 } finally { console.log('hola!') } }",
		"var foo = function() { try { return 1 } catch(err) { return 2 } finally { function a(x) { return x } } }",
		"var foo = function() { try { return 1 } catch(err) { return 2 } finally { var a = function(x) { if(!x) { throw new Error() } } } }",
		"var foo = function() { try { return 1 } catch(err) { return 2 } finally { var a = function(x) { while(true) { if(x) { break } else { continue } } } } }",
		"var foo = function() { try { return 1 } catch(err) { return 2 } finally { var a = function(x) { label: while(true) { if(x) { break label; } else { continue } } } } }",
		"var foo = function() { try {} finally { while (true) break; } }",
		"var foo = function() { try {} finally { while (true) continue; } }",
		"var foo = function() { try {} finally { switch (true) { case true: break; } } }",
		"var foo = function() { try {} finally { do { break; } while (true) } }",
		{
			code: "var foo = function() { try { return 1; } catch(err) { return 2; } finally { var bar = () => { throw new Error(); }; } };",
			languageOptions: { ecmaVersion: 6 },
		},
		{
			code: "var foo = function() { try { return 1; } catch(err) { return 2 } finally { (x) => x } }",
			languageOptions: { ecmaVersion: 6 },
		},
		{
			code: "var foo = function() { try { return 1; } finally { class bar { constructor() {} static ehm() { return 'Hola!'; } } } };",
			languageOptions: { ecmaVersion: 6 },
		},
	],
	invalid: [
		{
			code: "var foo = function() { \n try { \n return 1; \n } catch(err) { \n return 2; \n } finally { \n return 3; \n } \n }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 7,
					column: 2,
				},
			],
		},
		{
			code: "var foo = function() { try { return 1 } catch(err) { return 2 } finally { if(true) { return 3 } else { return 2 } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 86,
				},
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 104,
				},
			],
		},
		{
			code: "var foo = function() { try { return 1 } catch(err) { return 2 } finally { return 3 } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 75,
				},
			],
		},
		{
			code: "var foo = function() { try { return 1 } catch(err) { return 2 } finally { return function(x) { return y } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 75,
				},
			],
		},
		{
			code: "var foo = function() { try { return 1 } catch(err) { return 2 } finally { return { x: function(c) { return c } } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 75,
				},
			],
		},
		{
			code: "var foo = function() { try { return 1 } catch(err) { return 2 } finally { throw new Error() } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ThrowStatement" },
					type: "ThrowStatement",
					line: 1,
					column: 75,
				},
			],
		},
		{
			code: "var foo = function() { try { foo(); } finally { try { bar(); } finally { return; } } };",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ReturnStatement" },
					type: "ReturnStatement",
					line: 1,
					column: 74,
				},
			],
		},
		{
			code: "var foo = function() { label: try { return 0; } finally { break label; } return 1; }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 1,
					column: 59,
				},
			],
		},
		{
			code: "var foo = function() { \n a: try { \n return 1; \n } catch(err) { \n return 2; \n } finally { \n break a; \n } \n }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 7,
					column: 2,
				},
			],
		},
		{
			code: "var foo = function() { while (true) try {} finally { break; } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 1,
					column: 54,
				},
			],
		},
		{
			code: "var foo = function() { while (true) try {} finally { continue; } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ContinueStatement" },
					type: "ContinueStatement",
					line: 1,
					column: 54,
				},
			],
		},
		{
			code: "var foo = function() { switch (true) { case true: try {} finally { break; } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 1,
					column: 68,
				},
			],
		},
		{
			code: "var foo = function() { a: while (true) try {} finally { switch (true) { case true: break a; } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 1,
					column: 84,
				},
			],
		},
		{
			code: "var foo = function() { a: while (true) try {} finally { switch (true) { case true: continue; } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "ContinueStatement" },
					type: "ContinueStatement",
					line: 1,
					column: 84,
				},
			],
		},
		{
			code: "var foo = function() { a: switch (true) { case true: try {} finally { switch (true) { case true: break a; } } } }",
			errors: [
				{
					messageId: "unsafeUsage",
					data: { nodeType: "BreakStatement" },
					type: "BreakStatement",
					line: 1,
					column: 98,
				},
			],
		},
	],
});
