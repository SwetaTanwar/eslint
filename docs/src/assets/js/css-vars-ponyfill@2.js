/*!
 * css-vars-ponyfill
 * v2.1.2
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
			? define(t)
			: ((e = e || self).cssVars = t());
})(this, function () {
	"use strict";
	function e() {
		return (e =
			Object.assign ||
			function (e) {
				for (var t = 1; t < arguments.length; t++) {
					var r = arguments[t];
					for (var n in r)
						Object.prototype.hasOwnProperty.call(r, n) &&
							(e[n] = r[n]);
				}
				return e;
			}).apply(this, arguments);
	}
	function t(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) {
					for (var t = 0, r = new Array(e.length); t < e.length; t++)
						r[t] = e[t];
					return r;
				}
			})(e) ||
			(function (e) {
				if (
					Symbol.iterator in Object(e) ||
					"[object Arguments]" === Object.prototype.toString.call(e)
				)
					return Array.from(e);
			})(e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to spread non-iterable instance",
				);
			})()
		);
	}
	function r(e) {
		var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: {},
			r = {
				mimeType: t.mimeType || null,
				onBeforeSend: t.onBeforeSend || Function.prototype,
				onSuccess: t.onSuccess || Function.prototype,
				onError: t.onError || Function.prototype,
				onComplete: t.onComplete || Function.prototype,
			},
			n = Array.isArray(e) ? e : [e],
			o = Array.apply(null, Array(n.length)).map(function (e) {
				return null;
			});
		function s() {
			return !(
				"<" ===
				(arguments.length > 0 && void 0 !== arguments[0]
					? arguments[0]
					: ""
				)
					.trim()
					.charAt(0)
			);
		}
		function a(e, t) {
			r.onError(e, n[t], t);
		}
		function c(e, t) {
			var s = r.onSuccess(e, n[t], t);
			(e = !1 === s ? "" : s || e),
				(o[t] = e),
				-1 === o.indexOf(null) && r.onComplete(o);
		}
		var i = document.createElement("a");
		n.forEach(function (e, t) {
			if (
				(i.setAttribute("href", e),
				(i.href = String(i.href)),
				Boolean(document.all && !window.atob) &&
					i.host.split(":")[0] !== location.host.split(":")[0])
			) {
				if (i.protocol === location.protocol) {
					var n = new XDomainRequest();
					n.open("GET", e),
						(n.timeout = 0),
						(n.onprogress = Function.prototype),
						(n.ontimeout = Function.prototype),
						(n.onload = function () {
							s(n.responseText) ? c(n.responseText, t) : a(n, t);
						}),
						(n.onerror = function (e) {
							a(n, t);
						}),
						setTimeout(function () {
							n.send();
						}, 0);
				} else
					console.warn(
						"Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(
							e,
							")",
						),
					),
						a(null, t);
			} else {
				var o = new XMLHttpRequest();
				o.open("GET", e),
					r.mimeType &&
						o.overrideMimeType &&
						o.overrideMimeType(r.mimeType),
					r.onBeforeSend(o, e, t),
					(o.onreadystatechange = function () {
						4 === o.readyState &&
							(200 === o.status && s(o.responseText)
								? c(o.responseText, t)
								: a(o, t));
					}),
					o.send();
			}
		});
	}
	function n(e) {
		var t = {
				cssComments: /\/\*[\s\S]+?\*\//g,
				cssImports:
					/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,
			},
			n = {
				rootElement: e.rootElement || document,
				include: e.include || 'style,link[rel="stylesheet"]',
				exclude: e.exclude || null,
				filter: e.filter || null,
				useCSSOM: e.useCSSOM || !1,
				onBeforeSend: e.onBeforeSend || Function.prototype,
				onSuccess: e.onSuccess || Function.prototype,
				onError: e.onError || Function.prototype,
				onComplete: e.onComplete || Function.prototype,
			},
			s = Array.apply(
				null,
				n.rootElement.querySelectorAll(n.include),
			).filter(function (e) {
				return (
					(t = e),
					(r = n.exclude),
					!(
						t.matches ||
						t.matchesSelector ||
						t.webkitMatchesSelector ||
						t.mozMatchesSelector ||
						t.msMatchesSelector ||
						t.oMatchesSelector
					).call(t, r)
				);
				var t, r;
			}),
			a = Array.apply(null, Array(s.length)).map(function (e) {
				return null;
			});
		function c() {
			if (-1 === a.indexOf(null)) {
				var e = a.join("");
				n.onComplete(e, a, s);
			}
		}
		function i(e, t, o, s) {
			var i = n.onSuccess(e, o, s);
			(function e(t, o, s, a) {
				var c =
					arguments.length > 4 && void 0 !== arguments[4]
						? arguments[4]
						: [];
				var i =
					arguments.length > 5 && void 0 !== arguments[5]
						? arguments[5]
						: [];
				var l = u(t, s, i);
				l.rules.length
					? r(l.absoluteUrls, {
							onBeforeSend: function (e, t, r) {
								n.onBeforeSend(e, o, t);
							},
							onSuccess: function (e, t, r) {
								var s = n.onSuccess(e, o, t),
									a = u((e = !1 === s ? "" : s || e), t, i);
								return (
									a.rules.forEach(function (t, r) {
										e = e.replace(t, a.absoluteRules[r]);
									}),
									e
								);
							},
							onError: function (r, n, u) {
								c.push({ xhr: r, url: n }),
									i.push(l.rules[u]),
									e(t, o, s, a, c, i);
							},
							onComplete: function (r) {
								r.forEach(function (e, r) {
									t = t.replace(l.rules[r], e);
								}),
									e(t, o, s, a, c, i);
							},
						})
					: a(t, c);
			})(
				(e = void 0 !== i && !1 === Boolean(i) ? "" : i || e),
				o,
				s,
				function (e, r) {
					null === a[t] &&
						(r.forEach(function (e) {
							return n.onError(e.xhr, o, e.url);
						}),
						!n.filter || n.filter.test(e)
							? (a[t] = e)
							: (a[t] = ""),
						c());
				},
			);
		}
		function u(e, r) {
			var n =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: [],
				s = {};
			return (
				(s.rules = (
					e.replace(t.cssComments, "").match(t.cssImports) || []
				).filter(function (e) {
					return -1 === n.indexOf(e);
				})),
				(s.urls = s.rules.map(function (e) {
					return e.replace(t.cssImports, "$1");
				})),
				(s.absoluteUrls = s.urls.map(function (e) {
					return o(e, r);
				})),
				(s.absoluteRules = s.rules.map(function (e, t) {
					var n = s.urls[t],
						a = o(s.absoluteUrls[t], r);
					return e.replace(n, a);
				})),
				s
			);
		}
		s.length
			? s.forEach(function (e, t) {
					var s = e.getAttribute("href"),
						u = e.getAttribute("rel"),
						l =
							"LINK" === e.nodeName &&
							s &&
							u &&
							"stylesheet" === u.toLowerCase(),
						f = "STYLE" === e.nodeName;
					if (l)
						r(s, {
							mimeType: "text/css",
							onBeforeSend: function (t, r, o) {
								n.onBeforeSend(t, e, r);
							},
							onSuccess: function (r, n, a) {
								var c = o(s, location.href);
								i(r, t, e, c);
							},
							onError: function (r, o, s) {
								(a[t] = ""), n.onError(r, e, o), c();
							},
						});
					else if (f) {
						var d = e.textContent;
						n.useCSSOM &&
							(d = Array.apply(null, e.sheet.cssRules)
								.map(function (e) {
									return e.cssText;
								})
								.join("")),
							i(d, t, e, location.href);
					} else (a[t] = ""), c();
				})
			: n.onComplete("", []);
	}
	function o(e) {
		var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: location.href,
			r = document.implementation.createHTMLDocument(""),
			n = r.createElement("base"),
			o = r.createElement("a");
		return (
			r.head.appendChild(n),
			r.body.appendChild(o),
			(n.href = t),
			(o.href = e),
			o.href
		);
	}
	var s = a;
	function a(e, t, r) {
		e instanceof RegExp && (e = c(e, r)),
			t instanceof RegExp && (t = c(t, r));
		var n = i(e, t, r);
		return (
			n && {
				start: n[0],
				end: n[1],
				pre: r.slice(0, n[0]),
				body: r.slice(n[0] + e.length, n[1]),
				post: r.slice(n[1] + t.length),
			}
		);
	}
	function c(e, t) {
		var r = t.match(e);
		return r ? r[0] : null;
	}
	function i(e, t, r) {
		var n,
			o,
			s,
			a,
			c,
			i = r.indexOf(e),
			u = r.indexOf(t, i + 1),
			l = i;
		if (i >= 0 && u > 0) {
			for (n = [], s = r.length; l >= 0 && !c; )
				l == i
					? (n.push(l), (i = r.indexOf(e, l + 1)))
					: 1 == n.length
						? (c = [n.pop(), u])
						: ((o = n.pop()) < s && ((s = o), (a = u)),
							(u = r.indexOf(t, l + 1))),
					(l = i < u && i >= 0 ? i : u);
			n.length && (c = [s, a]);
		}
		return c;
	}
	function u(t) {
		var r = e(
			{},
			{ preserveStatic: !0, removeComments: !1 },
			arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
		);
		function n(e) {
			throw new Error("CSS parse error: ".concat(e));
		}
		function o(e) {
			var r = e.exec(t);
			if (r) return (t = t.slice(r[0].length)), r;
		}
		function a() {
			return o(/^{\s*/);
		}
		function c() {
			return o(/^}/);
		}
		function i() {
			o(/^\s*/);
		}
		function u() {
			if ((i(), "/" === t[0] && "*" === t[1])) {
				for (var e = 2; t[e] && ("*" !== t[e] || "/" !== t[e + 1]); )
					e++;
				if (!t[e]) return n("end of comment is missing");
				var r = t.slice(2, e);
				return (t = t.slice(e + 2)), { type: "comment", comment: r };
			}
		}
		function l() {
			for (var e, t = []; (e = u()); ) t.push(e);
			return r.removeComments ? [] : t;
		}
		function f() {
			for (i(); "}" === t[0]; ) n("extra closing bracket");
			var e = o(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
			if (e)
				return e[0]
					.trim()
					.replace(
						/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g,
						"",
					)
					.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
						return e.replace(/,/g, "‌");
					})
					.split(/\s*(?![^(]*\)),\s*/)
					.map(function (e) {
						return e.replace(/\u200C/g, ",");
					});
		}
		function d() {
			o(/^([;\s]*)+/);
			var e = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,
				t = o(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
			if (t) {
				if (((t = t[0].trim()), !o(/^:\s*/)))
					return n("property missing ':'");
				var r = o(
						/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/,
					),
					s = {
						type: "declaration",
						property: t.replace(e, ""),
						value: r ? r[0].replace(e, "").trim() : "",
					};
				return o(/^[;\s]*/), s;
			}
		}
		function p() {
			if (!a()) return n("missing '{'");
			for (var e, t = l(); (e = d()); ) t.push(e), (t = t.concat(l()));
			return c() ? t : n("missing '}'");
		}
		function m() {
			i();
			for (
				var e, t = [];
				(e = o(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/));

			)
				t.push(e[1]), o(/^,\s*/);
			if (t.length)
				return { type: "keyframe", values: t, declarations: p() };
		}
		function v() {
			if ((i(), "@" === t[0])) {
				var e =
					(function () {
						var e = o(/^@([-\w]+)?keyframes\s*/);
						if (e) {
							var t = e[1];
							if (!(e = o(/^([-\w]+)\s*/)))
								return n("@keyframes missing name");
							var r,
								s = e[1];
							if (!a()) return n("@keyframes missing '{'");
							for (var i = l(); (r = m()); )
								i.push(r), (i = i.concat(l()));
							return c()
								? {
										type: "keyframes",
										name: s,
										vendor: t,
										keyframes: i,
									}
								: n("@keyframes missing '}'");
						}
					})() ||
					(function () {
						var e = o(/^@supports *([^{]+)/);
						if (e)
							return {
								type: "supports",
								supports: e[1].trim(),
								rules: y(),
							};
					})() ||
					(function () {
						if (o(/^@host\s*/)) return { type: "host", rules: y() };
					})() ||
					(function () {
						var e = o(/^@media([^{]+)*/);
						if (e)
							return {
								type: "media",
								media: (e[1] || "").trim(),
								rules: y(),
							};
					})() ||
					(function () {
						var e = o(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
						if (e)
							return {
								type: "custom-media",
								name: e[1].trim(),
								media: e[2].trim(),
							};
					})() ||
					(function () {
						if (o(/^@page */))
							return {
								type: "page",
								selectors: f() || [],
								declarations: p(),
							};
					})() ||
					(function () {
						var e = o(/^@([-\w]+)?document *([^{]+)/);
						if (e)
							return {
								type: "document",
								document: e[2].trim(),
								vendor: e[1] ? e[1].trim() : null,
								rules: y(),
							};
					})() ||
					(function () {
						if (o(/^@font-face\s*/))
							return { type: "font-face", declarations: p() };
					})() ||
					(function () {
						var e = o(/^@(import|charset|namespace)\s*([^;]+);/);
						if (e) return { type: e[1], name: e[2].trim() };
					})();
				if (e && !r.preserveStatic) {
					var s = !1;
					if (e.declarations)
						s = e.declarations.some(function (e) {
							return /var\(/.test(e.value);
						});
					else
						s = (e.keyframes || e.rules || []).some(function (e) {
							return (e.declarations || []).some(function (e) {
								return /var\(/.test(e.value);
							});
						});
					return s ? e : {};
				}
				return e;
			}
		}
		function h() {
			if (!r.preserveStatic) {
				var e = s("{", "}", t);
				if (e) {
					var o =
							/:(?:root|host)(?![.:#(])/.test(e.pre) &&
							/--\S*\s*:/.test(e.body),
						a = /var\(/.test(e.body);
					if (!o && !a) return (t = t.slice(e.end + 1)), {};
				}
			}
			var c = f() || [],
				i = r.preserveStatic
					? p()
					: p().filter(function (e) {
							var t =
									c.some(function (e) {
										return /:(?:root|host)(?![.:#(])/.test(
											e,
										);
									}) && /^--\S/.test(e.property),
								r = /var\(/.test(e.value);
							return t || r;
						});
			return (
				c.length || n("selector missing"),
				{ type: "rule", selectors: c, declarations: i }
			);
		}
		function y(e) {
			if (!e && !a()) return n("missing '{'");
			for (
				var r, o = l();
				t.length && (e || "}" !== t[0]) && (r = v() || h());

			)
				r.type && o.push(r), (o = o.concat(l()));
			return e || c() ? o : n("missing '}'");
		}
		return { type: "stylesheet", stylesheet: { rules: y(!0), errors: [] } };
	}
	function l(t) {
		var r = e(
				{},
				{ parseHost: !1, store: {}, onWarning: function () {} },
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: {},
			),
			n = new RegExp(
				":".concat(r.parseHost ? "host" : "root", "(?![.:#(])"),
			);
		return (
			"string" == typeof t && (t = u(t, r)),
			t.stylesheet.rules.forEach(function (e) {
				"rule" === e.type &&
					e.selectors.some(function (e) {
						return n.test(e);
					}) &&
					e.declarations.forEach(function (e, t) {
						var n = e.property,
							o = e.value;
						n && 0 === n.indexOf("--") && (r.store[n] = o);
					});
			}),
			r.store
		);
	}
	function f(e) {
		var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: "",
			r = arguments.length > 2 ? arguments[2] : void 0,
			n = {
				charset: function (e) {
					return "@charset " + e.name + ";";
				},
				comment: function (e) {
					return 0 === e.comment.indexOf("__CSSVARSPONYFILL")
						? "/*" + e.comment + "*/"
						: "";
				},
				"custom-media": function (e) {
					return "@custom-media " + e.name + " " + e.media + ";";
				},
				declaration: function (e) {
					return e.property + ":" + e.value + ";";
				},
				document: function (e) {
					return (
						"@" +
						(e.vendor || "") +
						"document " +
						e.document +
						"{" +
						o(e.rules) +
						"}"
					);
				},
				"font-face": function (e) {
					return "@font-face{" + o(e.declarations) + "}";
				},
				host: function (e) {
					return "@host{" + o(e.rules) + "}";
				},
				import: function (e) {
					return "@import " + e.name + ";";
				},
				keyframe: function (e) {
					return e.values.join(",") + "{" + o(e.declarations) + "}";
				},
				keyframes: function (e) {
					return (
						"@" +
						(e.vendor || "") +
						"keyframes " +
						e.name +
						"{" +
						o(e.keyframes) +
						"}"
					);
				},
				media: function (e) {
					return "@media " + e.media + "{" + o(e.rules) + "}";
				},
				namespace: function (e) {
					return "@namespace " + e.name + ";";
				},
				page: function (e) {
					return (
						"@page " +
						(e.selectors.length ? e.selectors.join(", ") : "") +
						"{" +
						o(e.declarations) +
						"}"
					);
				},
				rule: function (e) {
					var t = e.declarations;
					if (t.length)
						return e.selectors.join(",") + "{" + o(t) + "}";
				},
				supports: function (e) {
					return "@supports " + e.supports + "{" + o(e.rules) + "}";
				},
			};
		function o(e) {
			for (var o = "", s = 0; s < e.length; s++) {
				var a = e[s];
				r && r(a);
				var c = n[a.type](a);
				c && ((o += c), c.length && a.selectors && (o += t));
			}
			return o;
		}
		return o(e.stylesheet.rules);
	}
	a.range = i;
	var d = "--",
		p = "var";
	function m(t) {
		var r = e(
			{},
			{
				preserveStatic: !0,
				preserveVars: !1,
				variables: {},
				onWarning: function () {},
			},
			arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
		);
		return (
			"string" == typeof t && (t = u(t, r)),
			(function e(t, r) {
				t.rules.forEach(function (n) {
					n.rules
						? e(n, r)
						: n.keyframes
							? n.keyframes.forEach(function (e) {
									"keyframe" === e.type &&
										r(e.declarations, n);
								})
							: n.declarations && r(n.declarations, t);
				});
			})(t.stylesheet, function (e, t) {
				for (var n = 0; n < e.length; n++) {
					var o = e[n],
						s = o.type,
						a = o.property,
						c = o.value;
					if ("declaration" === s)
						if (r.preserveVars || !a || 0 !== a.indexOf(d)) {
							if (-1 !== c.indexOf(p + "(")) {
								var i = h(c, r);
								i !== o.value &&
									((i = v(i)),
									r.preserveVars
										? (e.splice(n, 0, {
												type: s,
												property: a,
												value: i,
											}),
											n++)
										: (o.value = i));
							}
						} else e.splice(n, 1), n--;
				}
			}),
			f(t)
		);
	}
	function v(e) {
		return (
			(e.match(/calc\(([^)]+)\)/g) || []).forEach(function (t) {
				var r = "calc".concat(t.split("calc").join(""));
				e = e.replace(t, r);
			}),
			e
		);
	}
	function h(e) {
		var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: {},
			r = arguments.length > 2 ? arguments[2] : void 0;
		if (-1 === e.indexOf("var(")) return e;
		var n = s("(", ")", e);
		return n
			? "var" === n.pre.slice(-3)
				? 0 === n.body.trim().length
					? (t.onWarning(
							"var() must contain a non-whitespace string",
						),
						e)
					: n.pre.slice(0, -3) +
						(function (e) {
							var n = e.split(",")[0].replace(/[\s\n\t]/g, ""),
								o = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
								s = Object.prototype.hasOwnProperty.call(
									t.variables,
									n,
								)
									? String(t.variables[n])
									: void 0,
								a = s || (o ? String(o) : void 0),
								c = r || e;
							return (
								s ||
									t.onWarning(
										'variable "'.concat(
											n,
											'" is undefined',
										),
									),
								a && "undefined" !== a && a.length > 0
									? h(a, t, c)
									: "var(".concat(c, ")")
							);
						})(n.body) +
						h(n.post, t)
				: n.pre + "(".concat(h(n.body, t), ")") + h(n.post, t)
			: (-1 !== e.indexOf("var(") &&
					t.onWarning(
						'missing closing ")" in the value "'.concat(e, '"'),
					),
				e);
	}
	var y = "undefined" != typeof window,
		g =
			y &&
			window.CSS &&
			window.CSS.supports &&
			window.CSS.supports("(--a: 0)"),
		S = { group: 0, job: 0 },
		b = {
			rootElement: y ? document : null,
			shadowDOM: !1,
			include: "style,link[rel=stylesheet]",
			exclude: "",
			variables: {},
			onlyLegacy: !0,
			preserveStatic: !0,
			preserveVars: !1,
			silent: !1,
			updateDOM: !0,
			updateURLs: !0,
			watch: null,
			onBeforeSend: function () {},
			onWarning: function () {},
			onError: function () {},
			onSuccess: function () {},
			onComplete: function () {},
		},
		E = {
			cssComments: /\/\*[\s\S]+?\*\//g,
			cssKeyframes: /@(?:-\w*-)?keyframes/,
			cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
			cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
			cssVarDeclRules:
				/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
			cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
			cssVarFunc: /var\(\s*--[\w-]/,
			cssVars:
				/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/,
		},
		w = { dom: {}, job: {}, user: {} },
		C = !1,
		O = null,
		A = 0,
		x = null,
		j = !1;
	function k() {
		var r =
				arguments.length > 0 && void 0 !== arguments[0]
					? arguments[0]
					: {},
			o = "cssVars(): ",
			s = e({}, b, r);
		function a(e, t, r, n) {
			!s.silent &&
				window.console &&
				console.error("".concat(o).concat(e, "\n"), t),
				s.onError(e, t, r, n);
		}
		function c(e) {
			!s.silent && window.console && console.warn("".concat(o).concat(e)),
				s.onWarning(e);
		}
		if (y) {
			if (s.watch)
				return (
					(s.watch = b.watch),
					(function (e) {
						function t(e) {
							return (
								"LINK" === e.tagName &&
								-1 !==
									(e.getAttribute("rel") || "").indexOf(
										"stylesheet",
									) &&
								!e.disabled
							);
						}
						if (!window.MutationObserver) return;
						O && (O.disconnect(), (O = null));
						(O = new MutationObserver(function (r) {
							r.some(function (r) {
								var n,
									o = !1;
								return (
									"attributes" === r.type
										? (o = t(r.target))
										: "childList" === r.type &&
											((n = r.addedNodes),
											(o =
												Array.apply(null, n).some(
													function (e) {
														var r =
																1 ===
																	e.nodeType &&
																e.hasAttribute(
																	"data-cssvars",
																),
															n =
																(function (e) {
																	return (
																		"STYLE" ===
																			e.tagName &&
																		!e.disabled
																	);
																})(e) &&
																E.cssVars.test(
																	e.textContent,
																);
														return (
															!r && (t(e) || n)
														);
													},
												) ||
												(function (t) {
													return Array.apply(
														null,
														t,
													).some(function (t) {
														var r =
																1 ===
																t.nodeType,
															n =
																r &&
																"out" ===
																	t.getAttribute(
																		"data-cssvars",
																	),
															o =
																r &&
																"src" ===
																	t.getAttribute(
																		"data-cssvars",
																	),
															s = o;
														if (o || n) {
															var a =
																	t.getAttribute(
																		"data-cssvars-group",
																	),
																c =
																	e.rootElement.querySelector(
																		'[data-cssvars-group="'.concat(
																			a,
																			'"]',
																		),
																	);
															o &&
																(L(
																	e.rootElement,
																),
																(w.dom = {})),
																c &&
																	c.parentNode.removeChild(
																		c,
																	);
														}
														return s;
													});
												})(r.removedNodes))),
									o
								);
							}) && k(e);
						})).observe(document.documentElement, {
							attributes: !0,
							attributeFilter: ["disabled", "href"],
							childList: !0,
							subtree: !0,
						});
					})(s),
					void k(s)
				);
			if (
				(!1 === s.watch && O && (O.disconnect(), (O = null)),
				!s.__benchmark)
			) {
				if (C === s.rootElement)
					return void (function (e) {
						var t =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: 100;
						clearTimeout(x),
							(x = setTimeout(function () {
								(e.__benchmark = null), k(e);
							}, t));
					})(r);
				if (
					((s.__benchmark = T()),
					(s.exclude = [
						O
							? '[data-cssvars]:not([data-cssvars=""])'
							: '[data-cssvars="out"]',
						s.exclude,
					]
						.filter(function (e) {
							return e;
						})
						.join(",")),
					(s.variables = (function () {
						var e =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: {},
							t = /^-{2}/;
						return Object.keys(e).reduce(function (r, n) {
							return (
								(r[
									t.test(n)
										? n
										: "--".concat(n.replace(/^-+/, ""))
								] = e[n]),
								r
							);
						}, {});
					})(s.variables)),
					!O)
				)
					if (
						(Array.apply(
							null,
							s.rootElement.querySelectorAll(
								'[data-cssvars="out"]',
							),
						).forEach(function (e) {
							var t = e.getAttribute("data-cssvars-group");
							(t
								? s.rootElement.querySelector(
										'[data-cssvars="src"][data-cssvars-group="'.concat(
											t,
											'"]',
										),
									)
								: null) || e.parentNode.removeChild(e);
						}),
						A)
					) {
						var i = s.rootElement.querySelectorAll(
							'[data-cssvars]:not([data-cssvars="out"])',
						);
						i.length < A && ((A = i.length), (w.dom = {}));
					}
			}
			if ("loading" !== document.readyState)
				if (g && s.onlyLegacy) {
					if (s.updateDOM) {
						var d =
							s.rootElement.host ||
							(s.rootElement === document
								? document.documentElement
								: s.rootElement);
						Object.keys(s.variables).forEach(function (e) {
							d.style.setProperty(e, s.variables[e]);
						});
					}
				} else
					!j &&
					(s.shadowDOM ||
						s.rootElement.shadowRoot ||
						s.rootElement.host)
						? n({
								rootElement: b.rootElement,
								include: b.include,
								exclude: s.exclude,
								onSuccess: function (e, t, r) {
									return (
										(e = (
											(e = e
												.replace(E.cssComments, "")
												.replace(
													E.cssMediaQueries,
													"",
												)).match(E.cssVarDeclRules) ||
											[]
										).join("")) || !1
									);
								},
								onComplete: function (e, t, r) {
									l(e, { store: w.dom, onWarning: c }),
										(j = !0),
										k(s);
								},
							})
						: ((C = s.rootElement),
							n({
								rootElement: s.rootElement,
								include: s.include,
								exclude: s.exclude,
								onBeforeSend: s.onBeforeSend,
								onError: function (e, t, r) {
									var n =
											e.responseURL ||
											_(r, location.href),
										o = e.statusText
											? "(".concat(e.statusText, ")")
											: "Unspecified Error" +
												(0 === e.status
													? " (possibly CORS related)"
													: "");
									a(
										"CSS XHR Error: "
											.concat(n, " ")
											.concat(e.status, " ")
											.concat(o),
										t,
										e,
										n,
									);
								},
								onSuccess: function (e, t, r) {
									var n = s.onSuccess(e, t, r);
									return (
										(e =
											void 0 !== n && !1 === Boolean(n)
												? ""
												: n || e),
										s.updateURLs &&
											(e = (function (e, t) {
												return (
													(
														e
															.replace(
																E.cssComments,
																"",
															)
															.match(E.cssUrls) ||
														[]
													).forEach(function (r) {
														var n = r.replace(
																E.cssUrls,
																"$1",
															),
															o = _(n, t);
														e = e.replace(
															r,
															r.replace(n, o),
														);
													}),
													e
												);
											})(e, r)),
										e
									);
								},
								onComplete: function (r, n) {
									var o =
											arguments.length > 2 &&
											void 0 !== arguments[2]
												? arguments[2]
												: [],
										i = {},
										d = s.updateDOM
											? w.dom
											: Object.keys(w.job).length
												? w.job
												: (w.job = JSON.parse(
														JSON.stringify(w.dom),
													)),
										p = !1;
									if (
										(o.forEach(function (e, t) {
											if (E.cssVars.test(n[t]))
												try {
													var r = u(n[t], {
														preserveStatic:
															s.preserveStatic,
														removeComments: !0,
													});
													l(r, {
														parseHost: Boolean(
															s.rootElement.host,
														),
														store: i,
														onWarning: c,
													}),
														(e.__cssVars = {
															tree: r,
														});
												} catch (t) {
													a(t.message, e);
												}
										}),
										s.updateDOM && e(w.user, s.variables),
										e(i, s.variables),
										(p = Boolean(
											(document.querySelector(
												"[data-cssvars]",
											) ||
												Object.keys(w.dom).length) &&
												Object.keys(i).some(
													function (e) {
														return i[e] !== d[e];
													},
												),
										)),
										e(d, w.user, i),
										p)
									)
										L(s.rootElement), k(s);
									else {
										var v = [],
											h = [],
											y = !1;
										if (
											((w.job = {}),
											s.updateDOM && S.job++,
											o.forEach(function (t) {
												var r = !t.__cssVars;
												if (t.__cssVars)
													try {
														m(
															t.__cssVars.tree,
															e({}, s, {
																variables: d,
																onWarning: c,
															}),
														);
														var n = f(
															t.__cssVars.tree,
														);
														if (s.updateDOM) {
															if (
																(t.getAttribute(
																	"data-cssvars",
																) ||
																	t.setAttribute(
																		"data-cssvars",
																		"src",
																	),
																n.length)
															) {
																var o =
																		t.getAttribute(
																			"data-cssvars-group",
																		) ||
																		++S.group,
																	i =
																		n.replace(
																			/\s/g,
																			"",
																		),
																	u =
																		s.rootElement.querySelector(
																			'[data-cssvars="out"][data-cssvars-group="'.concat(
																				o,
																				'"]',
																			),
																		) ||
																		document.createElement(
																			"style",
																		);
																(y =
																	y ||
																	E.cssKeyframes.test(
																		n,
																	)),
																	u.hasAttribute(
																		"data-cssvars",
																	) ||
																		u.setAttribute(
																			"data-cssvars",
																			"out",
																		),
																	i ===
																	t.textContent.replace(
																		/\s/g,
																		"",
																	)
																		? ((r =
																				!0),
																			u &&
																				u.parentNode &&
																				(t.removeAttribute(
																					"data-cssvars-group",
																				),
																				u.parentNode.removeChild(
																					u,
																				)))
																		: i !==
																				u.textContent.replace(
																					/\s/g,
																					"",
																				) &&
																			([
																				t,
																				u,
																			].forEach(
																				function (
																					e,
																				) {
																					e.setAttribute(
																						"data-cssvars-job",
																						S.job,
																					),
																						e.setAttribute(
																							"data-cssvars-group",
																							o,
																						);
																				},
																			),
																			(u.textContent =
																				n),
																			v.push(
																				n,
																			),
																			h.push(
																				u,
																			),
																			u.parentNode ||
																				t.parentNode.insertBefore(
																					u,
																					t.nextSibling,
																				));
															}
														} else
															t.textContent.replace(
																/\s/g,
																"",
															) !== n &&
																v.push(n);
													} catch (e) {
														a(e.message, t);
													}
												r &&
													t.setAttribute(
														"data-cssvars",
														"skip",
													),
													t.hasAttribute(
														"data-cssvars-job",
													) ||
														t.setAttribute(
															"data-cssvars-job",
															S.job,
														);
											}),
											(A = s.rootElement.querySelectorAll(
												'[data-cssvars]:not([data-cssvars="out"])',
											).length),
											s.shadowDOM)
										)
											for (
												var g,
													b = [s.rootElement].concat(
														t(
															s.rootElement.querySelectorAll(
																"*",
															),
														),
													),
													O = 0;
												(g = b[O]);
												++O
											)
												if (
													g.shadowRoot &&
													g.shadowRoot.querySelector(
														"style",
													)
												) {
													var x = e({}, s, {
														rootElement:
															g.shadowRoot,
													});
													k(x);
												}
										s.updateDOM && y && M(s.rootElement),
											(C = !1),
											s.onComplete(
												v.join(""),
												h,
												JSON.parse(JSON.stringify(d)),
												T() - s.__benchmark,
											);
									}
								},
							}));
			else
				document.addEventListener("DOMContentLoaded", function e(t) {
					k(r), document.removeEventListener("DOMContentLoaded", e);
				});
		}
	}
	function M(e) {
		var t = [
			"animation-name",
			"-moz-animation-name",
			"-webkit-animation-name",
		].filter(function (e) {
			return getComputedStyle(document.body)[e];
		})[0];
		if (t) {
			for (
				var r = e.getElementsByTagName("*"),
					n = [],
					o = 0,
					s = r.length;
				o < s;
				o++
			) {
				var a = r[o];
				"none" !== getComputedStyle(a)[t] &&
					((a.style[t] += "__CSSVARSPONYFILL-KEYFRAMES__"),
					n.push(a));
			}
			document.body.offsetHeight;
			for (var c = 0, i = n.length; c < i; c++) {
				var u = n[c].style;
				u[t] = u[t].replace("__CSSVARSPONYFILL-KEYFRAMES__", "");
			}
		}
	}
	function _(e) {
		var t =
				arguments.length > 1 && void 0 !== arguments[1]
					? arguments[1]
					: location.href,
			r = document.implementation.createHTMLDocument(""),
			n = r.createElement("base"),
			o = r.createElement("a");
		return (
			r.head.appendChild(n),
			r.body.appendChild(o),
			(n.href = t),
			(o.href = e),
			o.href
		);
	}
	function T() {
		return y && (window.performance || {}).now
			? window.performance.now()
			: new Date().getTime();
	}
	function L(e) {
		Array.apply(
			null,
			e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'),
		).forEach(function (e) {
			return e.setAttribute("data-cssvars", "");
		});
	}
	return (
		(k.reset = function () {
			for (var e in ((C = !1),
			O && (O.disconnect(), (O = null)),
			(A = 0),
			(x = null),
			(j = !1),
			w))
				w[e] = {};
		}),
		k
	);
});

// Default values
cssVars({
	// Targets
	rootElement: document,
	shadowDOM: false,

	// Sources
	include: "link[rel=stylesheet],style",
	exclude: "",
	variables: {},

	// Options
	onlyLegacy: true,
	preserveStatic: true,
	preserveVars: false,
	silent: false,
	updateDOM: true,
	updateURLs: true,
	watch: false,

	// Callbacks
	onBeforeSend(xhr, elm, url) {
		// ...
	},
	onWarning(message) {
		// ...
	},
	onError(message, elm, xhr, url) {
		// ...
	},
	onSuccess(cssText, elm, url) {
		// ...
	},
	onComplete(cssText, styleElms, cssVariables, benchmark) {
		// ...
	},
});
